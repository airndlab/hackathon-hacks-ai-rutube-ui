import {CloseIcon} from '@/components/Icons';
import {useCallback} from 'react';

type Props = {
  filterValue: string;
  filterTitle: string | undefined;
  filterEnumName: string;
  isSelected: boolean;
  handleSelect: any;
}

function SearchFilterColumnRow({ filterValue, filterTitle, filterEnumName, isSelected, handleSelect }: Props) {
  const onFilterSelect = useCallback(() => {
    if (!isSelected) {
      handleSelect(filterValue, filterEnumName);
    }
  }, [filterValue, handleSelect, isSelected]);

  const onFilterClear = useCallback(() => {
    handleSelect(null, filterEnumName);
  }, [handleSelect]);

  return (
    <div className="flex gap-x-2 items-center min-h-[1.5rem]">
      <span
        onClick={onFilterSelect}
        className={`text-sm select-none ${
          isSelected 
              ? 'text-indigo-800 dark:text-sky-500' 
              : 'text-gray-800 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-sky-500 cursor-pointer'
        }`}
      >
        {filterTitle}
      </span>
      {isSelected &&
        <span
          onClick={onFilterClear}
          className="text-gray-800 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-sky-500 cursor-pointer"
        >
          <CloseIcon />
        </span>
      }
    </div>
  );
}

export default SearchFilterColumnRow;
