import { CSSProperties, forwardRef, LegacyRef, useMemo } from 'react';
import { SearchSuggest } from '@/types/SearchSuggest';
import SuggestOption from '@/components/SearchField/SuggestOption';
import map from 'lodash/map';

type Props = {
  suggests: SearchSuggest[];
  width: number;
  selectSuggest: (suggest: SearchSuggest) => void;
  removeSuggest: (suggest: SearchSuggest) => void;
};

function SearchSuggests ({ suggests, width, selectSuggest, removeSuggest }: Props, ref: LegacyRef<HTMLDivElement>) {
  const style: CSSProperties | undefined = useMemo(() => ({
    width: width ?? '540px',
  }), [width]);

  return (
    <div
      ref={ref}
      style={style}
      className="absolute z-50 flex flex-col bg-white rounded-xl top-[60px] px-4 py-6 gap-y-4"
    >
      {map(suggests, (suggest: SearchSuggest, idx: number) => (
        <SuggestOption
          key={`${idx}_${suggest.title}`}
          suggest={suggest}
          selectSuggest={selectSuggest}
          removeSuggest={removeSuggest}
        />
      ))}
    </div>
  );
}

export default forwardRef(SearchSuggests);
