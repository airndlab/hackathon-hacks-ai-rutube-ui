import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchResult } from '@/types/SearchResult';
import { SearchResponse } from '@/types/SearchResponse';
import { AutoSizer, Index, IndexRange, InfiniteLoader, List } from 'react-virtualized';
import { ListRowProps } from 'react-virtualized/dist/es/List';
import apiResolver from '@/api';
import isEmpty from 'lodash/isEmpty';

const { searchMoreVideos } = apiResolver();

type Props = {
  searchResponse?: SearchResponse | undefined;
}

function SearchResults ({ searchResponse }: Props) {
  const router = useRouter();
  const { totalElements = 0 } = searchResponse ?? {};
  const [loadedResults, setLoadedResults] = useState<SearchResult[]>([]);
  const [continuationToken, setContinuationToken] = useState<string | undefined>();

  useEffect(() => {
    setLoadedResults(searchResponse?.results ?? []);
  }, [router.asPath]);
  useEffect(() => {
    setContinuationToken(searchResponse?.continuationToken);
  }, [router.asPath]);

  const loadMoreRows = useCallback((params: IndexRange) => {
    return searchMoreVideos({
      query: '',
      continuationToken,
      startIndex: params.startIndex,
      stopIndex: params.stopIndex,
    }).then((res: SearchResponse) => {
      setLoadedResults(prevState => ([
        ...prevState,
        ...res.results,
      ]));
      if (!isEmpty(res.continuationToken)) {
        setContinuationToken(res.continuationToken);
      }
    });
  }, [continuationToken]);

  const isRowLoaded = useCallback(({ index }: Index) => (
    index < loadedResults.length
  ), [loadedResults.length]);

  const rowRenderer = useCallback(({ index, key, style }: ListRowProps) => {
    const result: SearchResult = loadedResults[index];
    return (
      <div key={key} style={style}>
        {isRowLoaded({ index })
          ? (
            <a
              href={result.link}
              target="_blank"
              className="h-full flex flex-row rounded-xl gap-4 p-0 w-full items-start justify-between"
            >
              <img
                src={result.img}
                alt={result.title}
                className="w-1/2 h-auto aspect-video"
              />
              <div className="w-1/2 text-left h-full flex flex-col relative">
                <p className="font-medium break-all text-sm md:text-lg line-clamp-1 sm:line-clamp-2 md:line-clamp-3
                text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-sky-500"
                >
                  {result.title}
                </p>
                <p className="break-words text-sm md:text-md text-gray-400 dark:text-white">
                  {result.viewCountText ?? ''}{result.publishedDateText ? ` • ${result.publishedDateText}` : ''}
                </p>
                {!isEmpty(result.lengthText) &&
                  <p
                    className="text-xs text-white absolute bottom-[35px] -left-[75px] bg-gray-900/80 rounded-xl px-2 py-1">
                    {result.lengthText}
                  </p>
                }
              </div>
            </a>
          )
          : (
            <div className="w-full h-[calc(100%-20px)] rounded-xl bg-gray-400/30 dark:bg-gray-700/30"/>
          )}
      </div>
    );
  }, [isRowLoaded]);

  return (
    <div className="w-full flex flex-1">
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={totalElements}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                width={width}
                height={height}
                rowHeight={width * 0.3}
                rowCount={totalElements}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}

export default SearchResults;
