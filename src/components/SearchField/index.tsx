import React, {useCallback, useEffect, useRef, useState} from 'react';
import SearchSuggests from '@/components/SearchField/SearchSuggests';
import apiResolver, {APIResolver} from '@/api';
import {SearchSuggest} from '@/types/SearchSuggest';
import {SearchIcon} from '@/components/Icons';
import {useRouter} from 'next/router';
import {getQueryParam, getUrlParamsString} from '@/utils';
import isEmpty from 'lodash/isEmpty';

const { addHistory, deleteHistory, searchSuggests }: APIResolver = apiResolver();

function SearchField() {
  const router = useRouter();
  const initialQuery: string = getQueryParam(router.query?.['query']);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [suggests, setSuggests] = useState<SearchSuggest[]>([]);
  const [showSuggests, setShowSuggests] = useState<boolean>(false);

  const inputRef = useRef<any>();
  const suggestsRef = useRef<any>();

  const handleInputFocus = useCallback(() => {
    if (!isEmpty(suggests)) {
      setShowSuggests(true);
    }
  }, [suggests]);

  const applyQuery = useCallback((query: string, isInitial: boolean) => {
    setCurrentQuery(query);
    searchSuggests(query).then((response: SearchSuggest[]) => {
      setSuggests(response);
      setShowSuggests(!isInitial && !isEmpty(query) && !isEmpty(response));
    });
  }, []);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(e.target.value, false);
  }, [applyQuery]);

  const handleSearch = useCallback((query: string) => {
    if (!isEmpty(query)) {
      addHistory(query).then(() => {
        const urlParams = getUrlParamsString({
          ...router.query,
          query,
        });
        return router.push(`/search?${urlParams}`);
      });
    }
  }, [router]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(currentQuery);
    }
  }, [handleSearch, currentQuery]);

  const handleSearchClick = useCallback(() => {
    handleSearch(currentQuery);
  }, [handleSearch, currentQuery]);

  const handleSuggestSelect = useCallback((suggest: SearchSuggest) => {
    handleSearch(suggest.title);
  }, [handleSearch]);

  const handleSuggestRemove = useCallback((suggest: SearchSuggest) => {
    deleteHistory(suggest.title).then(() => {
      setSuggests(prevState => [
        ...prevState,
      ].filter((item: SearchSuggest) => item.title !== suggest.title));
    });
  }, []);

  useEffect(() => {
    applyQuery(initialQuery, true);
  }, [applyQuery, initialQuery]);

  useEffect(() => {
    setShowSuggests(false);
  }, [router.asPath]);

  useEffect(() => {
    if (suggests.length === 0) {
      setShowSuggests(false);
    }
  }, [suggests.length]);

  useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      setShowSuggests(suggestsRef.current && suggestsRef.current.contains(e.target)
        || (inputRef.current && inputRef.current.contains(e.target) && suggests.length > 0));
    };
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [suggests.length]);

  return (
    <div className="flex flex-1 gap-x-1 max-w-[360px] lg:max-w-[570px] relative">
      <input
        ref={inputRef}
        className="py-2 px-4 w-full justify-center border border-gray-300 dark:border-gray-900 outline-0
        bg-gray-200 from-zinc-200 backdrop-blur-2xl rounded-xl focus:border-gray-300 text-gray-700"
        value={currentQuery}
        onFocus={handleInputFocus}
        onChange={handleQueryChange}
        onKeyUp={handleKeyUp}
        placeholder="Поиск"
      />
      <span
        onClick={handleSearchClick}
        className={`p-4 rounded-full hover:shadow-md ${isEmpty(currentQuery)
          ? 'text-gray-400 pointer-events-none'
          : 'dark:text-sky-500 cursor-pointer'
        }`}
      >
        <SearchIcon />
      </span>
      {showSuggests &&
        <SearchSuggests
          ref={suggestsRef}
          suggests={suggests}
          width={inputRef?.current?.clientWidth}
          selectSuggest={handleSuggestSelect}
          removeSuggest={handleSuggestRemove}
        />
      }
    </div>
  );
}

export default SearchField;
