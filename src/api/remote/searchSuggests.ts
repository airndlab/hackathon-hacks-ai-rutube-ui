import axios from 'axios';
import { SearchSuggest, SearchSuggestType } from '@/types/SearchSuggest';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

export default function (query: string) {
  return axios.get<SearchSuggest[]>(`http://158.160.11.0:8081/suggests/${query}?max_cost=3`).
    then((response) => {
      return map(response.data, (suggest: any): SearchSuggest => ({
        title: suggest?.title?.[0] ?? '',
        type: SearchSuggestType.FROM_SEARCH,
      })).filter((suggest: SearchSuggest) => !isEmpty(suggest.title));
    });
}
