import { lazy, Suspense } from 'react';
import { GetServerSidePropsContext } from 'next';
import { SearchResponse } from '@/types/SearchResponse';
import { Created, Duration, OrderBy, SearchRequest } from '@/types/SearchRequest';
import { getQueryParam } from '@/utils';
import apiResolver from '@/api';
import snakeCase from 'lodash/snakeCase';

const { searchVideos } = apiResolver();

const SearchFilters = lazy(() => import('@/components/SearchFilters'));
const SearchResults = lazy(() => import('@/components/SearchResults'));

type Props = {
  searchRequest: SearchRequest;
  searchResponse?: SearchResponse;
}

export default function Search ({ searchRequest, searchResponse }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-y-4 pt-4 px-4 w-[min(100%,960px)]">
      <Suspense>
        <SearchFilters searchRequest={searchRequest}/>
        <SearchResults searchResponse={searchResponse}/>
      </Suspense>
    </div>
  );
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const query = getQueryParam(context.query?.['query']);
  const created = snakeCase(getQueryParam(context.query?.['created'])) as Created;
  const duration = snakeCase(getQueryParam(context.query?.['duration'])) as Duration;
  const orderBy = snakeCase(getQueryParam(context.query?.['order_by'])) as OrderBy;

  const searchRequest = {
    query,
    ...(Object.values(Created).includes(created) ? { created: created } : {}),
    ...(Object.values(Duration).includes(duration) ? { duration: duration } : {}),
    ...(Object.values(OrderBy).includes(orderBy) ? { orderBy: orderBy } : {}),
  };
  const searchResponse = await searchVideos(searchRequest);

  return {
    props: {
      searchRequest,
      searchResponse,
    },
  };
}
