import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchResult } from '@/types/SearchResult';
import { SearchResponse } from '@/types/SearchResponse';
import { AutoSizer, Index, IndexRange, InfiniteLoader, List } from 'react-virtualized';
import { ListRowProps } from 'react-virtualized/dist/es/List';
import ListItem from '@/components/SearchResults/ListItem';
import apiResolver from '@/api';
import isEmpty from 'lodash/isEmpty';

const { searchMoreVideos } = apiResolver();

type Props = {
  searchResponse?: SearchResponse | undefined;
}

function SearchResults ({ searchResponse }: Props) {
  const router = useRouter();
  const listRef = useRef<any>();
  const { totalElements = 0 } = searchResponse ?? {};
  const [loadedResults, setLoadedResults] = useState<SearchResult[]>([]);
  const [continuationToken, setContinuationToken] = useState<string | undefined>();

  useEffect(() => {
    setLoadedResults(searchResponse?.results ?? []);
    setContinuationToken(searchResponse?.continuationToken);
    listRef.current?.forceUpdateGrid?.();
    listRef.current?.scrollToRow?.(0);
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
          ? <ListItem video={result}/>
          : <div className="w-full h-[calc(100%-20px)] rounded-xl bg-gray-400/30 dark:bg-gray-700/30"/>
        }
      </div>
    );
  }, [loadedResults]);

  return (
    <div className="w-full flex flex-1">
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={totalElements}
          >
            {({ onRowsRendered }) => (
              <List
                ref={listRef}
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
