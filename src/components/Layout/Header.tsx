import { lazy, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';
import SearchField from '@/components/SearchField';
import { USER_SESSION_CHANGED_EVENT } from '@/constants';
import ThemeSwitcher from '@/components/Layout/ThemeSwitcher';

const AuthBlock = lazy(() => import('@/components/Layout/AuthBlock'));

function Header () {
  const [keyTrigger, setKeyTrigger] = useState<boolean>(false);

  useEffect(() => {
    const triggerRerenderSearchWithSuggests = () => setKeyTrigger(prevState => !prevState);
    document.addEventListener(USER_SESSION_CHANGED_EVENT, triggerRerenderSearchWithSuggests);

    return () => {
      document.removeEventListener(USER_SESSION_CHANGED_EVENT, triggerRerenderSearchWithSuggests);
    };
  }, []);

  return (
    <div className="flex w-full gap-x-2 pt-12 px-2 relative">
      <div className="flex flex-1 gap-x-2 justify-center">
        <Link href="/" className="p-4 rounded-full hover:shadow-md text-indigo-800 dark:text-sky-500">
          <HomeIcon/>
        </Link>
        <SearchField key={`${keyTrigger}`}/>
      </div>
      <Suspense>
        <AuthBlock/>
      </Suspense>
      <ThemeSwitcher />
    </div>
  );
}

export default Header;
