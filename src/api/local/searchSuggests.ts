import { SearchSuggest, SearchSuggestType } from '@/types/SearchSuggest';
import isEmpty from 'lodash/isEmpty';
import words from 'lodash/words';
import some from 'lodash/some';
import toLower from 'lodash/toLower';
import filter from 'lodash/filter';
import map from 'lodash/map';
import axios from 'axios';

export default async function (query: string): Promise<SearchSuggest[]> {
  const queryWords = words(query);
  const localHistory = await axios.get<string[]>('/api/history').then((response) => response.data);

  const suggestsFromHistory: SearchSuggest[] = map(localHistory, (historicalQuery: string) => ({
    title: historicalQuery,
    type: SearchSuggestType.FROM_HISTORY,
  }));

  return Promise.resolve((isEmpty(query)
    ? suggestsFromHistory
    : filter(suggestsFromHistory, (historyItem: SearchSuggest) => {
      return some(queryWords, (queryWord: string) => {
        return toLower(historyItem.title).includes(toLower(queryWord));
      });
    }).slice(0, 10)));
}
