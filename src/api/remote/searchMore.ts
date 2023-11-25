import { SearchRequest } from '@/types/SearchRequest';
// import { SearchResponse } from '@/types/SearchResponse';
// import axios from 'axios';

export default function (searchRequest: SearchRequest) {
  // return axios.post<SearchResponse>(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/searchMore`, searchRequest).
  //   then((response) => response.data);
  return Promise.resolve([]);
}
