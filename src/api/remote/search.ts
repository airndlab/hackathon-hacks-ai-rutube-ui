import axios from 'axios';
import { SearchRequest } from '@/types/SearchRequest';
import { SearchResponse } from '@/types/SearchResponse';

export default function (searchRequest: SearchRequest) {
  return axios.post<SearchResponse>(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/search`, {
    query: searchRequest.query,
    size: 999,
    channels: 1,
  }).then((response) => {
    const results = response.data?.results ?? [];
    return {
      results,
      channels: response.data?.channels ?? [],
      totalElements: results.length,
    };
  });
}
