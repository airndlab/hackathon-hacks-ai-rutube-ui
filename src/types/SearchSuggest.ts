import { SearchResult } from '@/types/SearchResult';

export enum SearchSuggestType {
  FROM_HISTORY,
  FROM_SEARCH,
}

export type SearchSuggest = {
  title: SearchResult['title'];
  type: SearchSuggestType;
};
