export enum Created {
  any = 'any',
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  SELF_NAME = 'Created',
}

export enum Duration {
  any = 'any',
  short = 'short',
  medium = 'medium',
  long = 'long',
  movie = 'movie',
  SELF_NAME = 'Duration',
}

export enum OrderBy {
  relevant = 'relevant',
  created_ts_up = 'created_ts_up',
  created_ts_down = 'created_ts_down',
  hits = 'hits',
  SELF_NAME = 'OrderBy',
}

export type SearchRequest = {
  query: string;
  created?: Created;
  duration?: Duration;
  orderBy?: OrderBy;
  continuationToken?: string;
  startIndex?: number;
  stopIndex?: number;
};
