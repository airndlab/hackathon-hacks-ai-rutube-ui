import {Created, Duration, OrderBy, SearchRequest} from '@/types/SearchRequest';
import {FiltersIcon} from '@/components/Icons';
import {useCallback, useState} from 'react';
import SearchFilterColumn from '@/components/SearchFilters/SearchFilterColumn';
import {getUrlParamsString} from "@/utils";
import {useRouter} from 'next/router';
import isEmpty from 'lodash/isEmpty';
import UrlParamsObject from "@/types/UrlParamsObject";

type Props = {
  searchRequest: SearchRequest;
};

function SearchFilters({ searchRequest }: Props) {
  const router = useRouter();
  const {
    duration,
    created,
    orderBy,
  } = searchRequest;

  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const toggleFilters = useCallback(() => {
    setOpenFilters(prevState => !prevState);
  }, []);

  const handleSelect = useCallback((
    filterValue: Duration | Created | OrderBy | null | undefined, filterEnumName: string,
  ) => {
    const queryParams: UrlParamsObject = {
      ...router.query,
    };
    if (isEmpty(filterValue as string) || filterValue as string === 'any' || filterValue as string === 'relevant') {
      delete queryParams[filterEnumName];
    } else {
      queryParams[filterEnumName] = filterValue as string;
    }
    const urlSearchParams = getUrlParamsString(queryParams);

    router.push(`/search?${urlSearchParams}`);
  }, [router.asPath]);

  return (
    <div className="hidden sm:flex flex-col w-full border-b">
      <span
        onClick={toggleFilters}
        className="cursor-pointer p-3 -ml-3 mb-1 flex gap-x-2 items-center select-none rounded-full w-fit
        hover:bg-gray-400/30 text-gray-600 hover:text-indigo-800
        dark:hover:bg-gray-700/30 dark:text-white dark:hover:text-sky-500"
      >
        Фильтры
        <FiltersIcon />
      </span>
      <div className={`w-full pb-4 gap-x-6 ${openFilters ? 'flex' : 'hidden'}`}>
        <SearchFilterColumn
          title="Дата загрузки"
          filterValue={created}
          filterEnum={Created}
          handleSelect={handleSelect}
        />
        <SearchFilterColumn
          title="Длительность"
          filterValue={duration}
          filterEnum={Duration}
          handleSelect={handleSelect}
        />
        <SearchFilterColumn
          title="Упорядочить по"
          filterValue={orderBy}
          filterEnum={OrderBy}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default SearchFilters;
