import { useEffect, useRef, useState } from 'react';
import { UserIcon } from '@/components/Icons';

type Props = {
  userId: string | null;
  handleLogoutClick: () => void;
}

function AccountButton({ userId, handleLogoutClick }: Props) {
  const accountRootRef = useRef<any>();
  const dropdownRef = useRef<any>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      setDropdownOpen(prevState => {
        if (dropdownRef.current?.contains?.(e.target)) {
          return true;
        } else {
          return !prevState && accountRootRef.current?.contains?.(e.target);
        }
      });
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div
      ref={accountRootRef}
      className="my-auto border rounded-xl p-2 text-indigo-800 dark:text-sky-500 cursor-pointer
        hidden sm:flex gap-x-2 absolute right-[48px] bottom-[6px]"
    >
      <UserIcon />
      <span
        className="text-gray-600 dark:text-white relative select-none
          max-w-[30px] md:max-w-[54px] xl:max-w-[160px] 2xl:max-w-[256px] truncate"
      >
          {userId}
        </span>
      {dropdownOpen &&
        <div
          ref={dropdownRef}
          className="z-50 bg-white py-2 rounded-xl absolute top-[45px] right-0 flex flex-col gap-y-4 text-right"
        >
            <span
              className="text-gray-400 cursor-text px-4"
            >
              {userId}
            </span>
          <span
            onClick={handleLogoutClick}
            className="text-gray-600 cursor-pointer hover:bg-gray-300/30 px-2 rounded-md mx-2"
          >
              Выход
            </span>
        </div>
      }
    </div>
  );
}

export default AccountButton;
