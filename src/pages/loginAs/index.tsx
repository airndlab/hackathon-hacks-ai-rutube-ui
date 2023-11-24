import { useEffect } from 'react';
import { getQueryParam } from '@/utils';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE_USER_ID_KEY } from '@/constants';
import isEmpty from 'lodash/isEmpty';

function LoginAs () {
  const router = useRouter();
  const userId: string = getQueryParam(router.query?.['userId']);

  useEffect(() => {
    if (!isEmpty(userId)) {
      localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId);
      router.replace('/');
    }
  }, [userId]);
}

export default LoginAs;
