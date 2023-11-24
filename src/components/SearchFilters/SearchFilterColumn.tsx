import {Created, Duration, OrderBy} from '@/types/SearchRequest';
import {EnumToValueResolver} from '@/constants';
import SearchFilterColumnRow from '@/components/SearchFilters/SearchFilterColumnRow';
import EnumValueDescription from "@/types/EnumValueDescription";
import snakeCase from 'lodash/snakeCase';
import map from 'lodash/map';

type Props = {
  title: string;
  filterValue: Duration | Created | OrderBy | undefined;
  filterEnum: any;
  handleSelect: any;
}

function SearchFilterColumn({ title, filterValue, filterEnum, handleSelect }: Props) {
  const filterEnumName: string = filterEnum?.SELF_NAME;
  const valueResolver: EnumValueDescription = EnumToValueResolver[filterEnumName];

  return (
    <div className="flex flex-col flex-1 gap-y-2">
      <span className="pb-2 font-bold text-sm text-gray-800 dark:text-white">{title}</span>
      {map(Object.values(filterEnum), (value: string) =>
        valueResolver?.[value]
          ? (
            <SearchFilterColumnRow
              key={value}
              filterValue={value}
              filterTitle={valueResolver?.[value]}
              filterEnumName={snakeCase(filterEnumName)}
              isSelected={filterValue as string === value}
              handleSelect={handleSelect}
            />
          )
          : null,
      )}
    </div>
  );
}

export default SearchFilterColumn;
