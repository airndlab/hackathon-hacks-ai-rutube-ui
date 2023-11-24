import fs from 'fs';
import { v4 } from 'uuid';
import { serialize } from 'cookie';
import { User } from '@/types/User';
import { SESSION_COOKIE_KEY } from '@/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import isEmpty from 'lodash/isEmpty';

export function getSessionId (req: NextApiRequest): string {
  let sessionId: string | undefined;
  if (req.cookies.hasOwnProperty(SESSION_COOKIE_KEY)) {
    sessionId = req.cookies[SESSION_COOKIE_KEY];
  }

  return sessionId ?? '' as string;
}

function readFromFile() {
  if (!fs.existsSync('SESSION_USER_STORAGE.json')) {
    fs.openSync('SESSION_USER_STORAGE.json', 'w');
  }
  const data = fs.readFileSync('SESSION_USER_STORAGE.json', 'utf8');

  return isEmpty(data) ? {} : JSON.parse(data);
}

export function createSession (res: NextApiResponse, req: NextApiRequest, user?: User): string {
  const storage = readFromFile();
  const sessionIdFromRequest = req.cookies[SESSION_COOKIE_KEY] as string;
  if (!isEmpty(sessionIdFromRequest)) {
    if (storage.hasOwnProperty(sessionIdFromRequest as string)) {
      const associatedUser = storage[sessionIdFromRequest];
      if (associatedUser === (user ?? '')) {
        return sessionIdFromRequest as string;
      }
    } else {
      storage[sessionIdFromRequest] = user as User;
      fs.writeFileSync('SESSION_USER_STORAGE.json', JSON.stringify(storage));
      return sessionIdFromRequest as string;
    }
  }

  const newSessionId = v4();
  storage[newSessionId] = user as User;
  const sessionIdCookie = serialize(SESSION_COOKIE_KEY, newSessionId);
  res.setHeader('Set-Cookie', sessionIdCookie);
  fs.writeFileSync('SESSION_USER_STORAGE.json', JSON.stringify(storage));

  return newSessionId;
}

export function getUserBySessionId (sessionId: string): User {
  const storage = readFromFile();
  return storage[sessionId];
}
