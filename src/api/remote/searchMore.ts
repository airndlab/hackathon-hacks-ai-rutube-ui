import axios from 'axios';
import { SearchRequest } from '@/types/SearchRequest';
import { SearchResponse } from '@/types/SearchResponse';

export default function (searchRequest: SearchRequest) {
  return axios.post<SearchResponse>(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/searchMore`, searchRequest).
    then((response) => response.data);
}