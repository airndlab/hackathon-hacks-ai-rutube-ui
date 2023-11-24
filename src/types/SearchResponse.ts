import { SearchResult } from '@/types/SearchResult';
import { FoundChannel } from '@/types/FoundChannel';

export type SearchResponse = {
  results: SearchResult[];
  channels?: FoundChannel[];
  totalElements?: number;
  continuationToken?: string;
}
