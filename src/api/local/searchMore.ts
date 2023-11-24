import axios from 'axios';
import { SearchRequest } from '@/types/SearchRequest';
import { SearchResponse } from '@/types/SearchResponse';

export default function (searchRequest: SearchRequest) {
  return axios.get<SearchResponse>(`/api/localSearchMore?continuationToken=${searchRequest?.continuationToken ?? ''}`).
    then((response) => response.data);
}
