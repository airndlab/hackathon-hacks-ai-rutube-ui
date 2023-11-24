import { SearchResult } from '@/types/SearchResult';

export type SearchResponse = {
  results: SearchResult[];
  totalElements?: number;
  continuationToken?: string;
}
