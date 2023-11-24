import React, {useCallback} from 'react';
import {SearchSuggest, SearchSuggestType} from '@/types/SearchSuggest';
import {ClockIcon, SearchIcon} from '@/components/Icons';

type SuggestOptionProps = {
  suggest: SearchSuggest;
  selectSuggest: (suggest: SearchSuggest) => void;
  removeSuggest: (suggest: SearchSuggest) => void;
};

function SuggestOption({ suggest, selectSuggest, removeSuggest }: SuggestOptionProps) {
  const handleSuggestClick = useCallback(() => {
    selectSuggest(suggest);
  }, [suggest]);

  const handleRemoveClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeSuggest(suggest);
  }, [suggest]);

  return (
    <div
      onClick={handleSuggestClick}
      className="cursor-pointer flex justify-start items-center gap-x-2 text-gray-700 hover:text-gray-900"
    >
      <div className="min-w-[1.5rem]">
        {suggest.type === SearchSuggestType.FROM_HISTORY
            ? <ClockIcon />
            : <SearchIcon />
        }
      </div>
      <span className="text-inherit break-all">
        {suggest.title}
      </span>
      {suggest.type === SearchSuggestType.FROM_HISTORY &&
        <span
          onClick={handleRemoveClick}
          className="cursor-pointer text-gray-400 hover:text-gray-800 text-sm ml-auto"
        >
        забыть
      </span>
      }
    </div>
  );
}

export default SuggestOption;
