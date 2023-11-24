import axios from 'axios';
import {SearchSuggest} from '@/types/SearchSuggest';

export default function(query: string) {
  return axios.get<SearchSuggest[]>(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/suggests/${query}`)
              .then((response) => response.data);
}
