import { default as local_searchAPI } from './local/search';
import { default as local_searchMoreAPI } from './local/searchMore';
import { default as local_searchSuggestsAPI } from './local/searchSuggests';
import { default as remote_searchAPI } from './remote/search';
import { default as remote_searchMoreAPI } from './remote/searchMore';
import { default as remote_searchSuggestsAPI } from './remote/searchSuggests';

import { SearchResponse } from '@/types/SearchResponse';
import { SearchSuggest } from '@/types/SearchSuggest';
import { SearchRequest } from '@/types/SearchRequest';
import { User } from '@/types/User';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

export type APIResolver = {
  searchVideos: (searchRequest: SearchRequest) => Promise<SearchResponse>;
  searchMoreVideos: (searchRequest: SearchRequest) => Promise<SearchResponse>;
  searchSuggests: (query: string) => Promise<SearchSuggest[]>;
  createSession: (userId: User | string | null) => Promise<boolean>;
  getHistory: () => Promise<string[]>;
  addHistory: (query: string) => Promise<void>;
  deleteHistory: (query: string) => Promise<void>;
}

function getHistory () {
  return axios.get<string[]>('/api/history').then((response) => response.data);
}

function addHistory (query: string): Promise<void> {
  return axios.put(`/api/history?query=${query}`);
}

function deleteHistory (query: string): Promise<void> {
  return axios.delete(`/api/history?query=${query}`);
}

function createSession (userId: User | string | null): Promise<boolean> {
  return axios.post(`/api/session?userId=${userId ?? ''}`);
}

function resolveAPI (): APIResolver {
  if (isEmpty(process.env.NEXT_PUBLIC_BACKEND_HOST)) {
    return {
      searchVideos: local_searchAPI,
      searchMoreVideos: local_searchMoreAPI,
      searchSuggests: local_searchSuggestsAPI,
      createSession,
      getHistory,
      addHistory,
      deleteHistory,
    };
  } else {
    return {
      searchVideos: remote_searchAPI,
      searchMoreVideos: remote_searchMoreAPI,
      searchSuggests: remote_searchSuggestsAPI,
      createSession,
      getHistory,
      addHistory,
      deleteHistory,
    };
  }
}

export default resolveAPI;
