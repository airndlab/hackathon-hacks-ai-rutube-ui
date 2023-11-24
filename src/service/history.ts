import { User } from '@/types/User';
import isEmpty from 'lodash/isEmpty';
import { getUserBySessionId } from '@/service/session';
import { DEFAULT_SEARCH_HISTORY } from '@/constants';
import fs from 'fs';

function readFromFile (fileName: string) {
  if (!fs.existsSync(`${fileName}.json`)) {
    fs.openSync(`${fileName}.json`, 'w');
  }
  const data = fs.readFileSync(`${fileName}.json`, 'utf8');

  return isEmpty(data) ? {} : JSON.parse(data);
}

function getStorage (sessionId: string) {
  let storageName: string;
  let identifier: string | User;

  const user: User = getUserBySessionId(sessionId);
  if (isEmpty(user as string)) {
    storageName = 'SESSION_QUERY_STORAGE';
    identifier = sessionId;
  } else {
    storageName = 'USER_QUERY_STORAGE';
    identifier = user;
  }
  const storage = readFromFile(storageName);

  return {
    storage,
    storageName,
    identifier,
  };
}

export function getHistory (sessionId: string): string[] {
  const {
    storage,
    storageName,
    identifier,
  } = getStorage(sessionId);

  if (!storage.hasOwnProperty(identifier)) {
    storage[identifier] = [
      ...DEFAULT_SEARCH_HISTORY,
    ];
    fs.writeFileSync(`${storageName}.json`, JSON.stringify(storage));
  }

  return storage[identifier];
}

export function putHistory (sessionId: string, query: string): void {
  const {
    storage,
    storageName,
    identifier,
  } = getStorage(sessionId);

  if (!storage.hasOwnProperty(identifier)) {
    storage[identifier] = [
      ...DEFAULT_SEARCH_HISTORY,
    ];
  }
  const history = storage[identifier];
  if (history.indexOf(query) === -1) {
    history.unshift(query);
  }
  storage[identifier] = [
    ...history,
  ];

  fs.writeFileSync(`${storageName}.json`, JSON.stringify(storage));
}

export function removeHistory (sessionId: string, query: string): void {
  const {
    storage,
    storageName,
    identifier,
  } = getStorage(sessionId);

  if (!storage.hasOwnProperty(identifier)) {
    storage[identifier] = [
      ...DEFAULT_SEARCH_HISTORY,
    ];
  }
  const history = storage[identifier];
  const idx: number = history.indexOf(query);
  if (idx !== -1) {
    history.splice(idx, 1);
  }
  storage[identifier] = [
    ...history,
  ];

  fs.writeFileSync(`${storageName}.json`, JSON.stringify(storage));
}
