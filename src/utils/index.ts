import trim from 'lodash/trim';
import UrlParamsObject from '@/types/UrlParamsObject';

export function getQueryParam (queryParams: string | string[] | undefined, defaultValue: any = ''): string {
  return trim(
    typeof queryParams === 'string' ? queryParams : queryParams?.[0],
  ) ?? defaultValue;
}

export function getUrlParamsString (paramsObj: UrlParamsObject): string {
  const urlSearchParams = new URLSearchParams();
  Object.keys(paramsObj).forEach((queryKey: string) => {
    urlSearchParams.append(queryKey, paramsObj[queryKey] as string);
  });

  return urlSearchParams.toString();
}
