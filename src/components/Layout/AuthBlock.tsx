import apiResolver from '@/api';
import { useRouter } from 'next/router';
import AccountButton from '@/components/Layout/AccountButton';
import { useCallback, useEffect, useState } from 'react';
import { LOCAL_STORAGE_USER_ID_KEY, USER_SESSION_CHANGED_EVENT } from '@/constants';
import isEmpty from 'lodash/isEmpty';

const { createSession } = apiResolver();

function AuthBlock () {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY));
  }, [router.asPath]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      createSession(userId).then(() => {
        document.dispatchEvent(new Event(USER_SESSION_CHANGED_EVENT));
      });
    }, 350);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [userId]);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY);
    setUserId(null);
  }, []);

  return isEmpty(userId)
    ? null
    : (
      <AccountButton
        userId={userId}
        handleLogoutClick={handleLogoutClick}
      />
    );
}

export default AuthBlock;
