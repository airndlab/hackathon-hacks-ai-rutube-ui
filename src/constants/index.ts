import EnumValueDescription from '@/types/EnumValueDescription';
import EnumValueResolver from '@/types/EnumValueResolver';
import { Created, Duration, OrderBy } from '@/types/SearchRequest';

export const LOCAL_STORAGE_USER_ID_KEY: string = 'RUTUBA_LOCAL_USER_ID';

export const SESSION_COOKIE_KEY: string = 'RUTUBA_SESSION_ID';

export const USER_SESSION_CHANGED_EVENT: string = 'USER_SESSION_CHANGED';

export const CreatedValue: EnumValueDescription = {
  [Created.any]: 'За все время',
  [Created.day]: 'За сегодня',
  [Created.week]: 'За неделю',
  [Created.month]: 'За месяц',
  [Created.year]: 'За год',
};

export const DurationValue: EnumValueDescription = {
  [Duration.any]: 'Любая длительность',
  [Duration.short]: 'До 5 минут',
  [Duration.medium]: '5 - 20 минут',
  [Duration.long]: '20 - 60 минут',
  [Duration.movie]: 'Более 60 минут',
};

export const OrderByValue: EnumValueDescription = {
  [OrderBy.relevant]: 'по релевантности',
  [OrderBy.created_ts_up]: 'по дате: сначала новые',
  [OrderBy.created_ts_down]: 'по дате: сначала старые',
  [OrderBy.hits]: 'по просмотрам',
};

export const EnumToValueResolver: EnumValueResolver = {
  [Created.SELF_NAME]: CreatedValue,
  [Duration.SELF_NAME]: DurationValue,
  [OrderBy.SELF_NAME]: OrderByValue,
};

export const DEFAULT_SEARCH_HISTORY: string[] = [
  'как стать программистом',
  'где лежит гугл',
  'почему текут реки, если земля плоская',
  'где достать миллион',
  'коды майнкрафт',
];

export const STATIC_YOUTUBE_REQUEST_URL = 'https://www.youtube.com/youtubei/v1/search';
export const STATIC_YOUTUBE_REQUEST_BODY_PART = {
  'context': {
    'client': {
      'hl': 'ru',
      'gl': 'RU',
      'deviceMake': '',
      'deviceModel': '',
      'userAgent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36,gzip(gfe)',
      'clientName': 'WEB',
      'clientVersion': '2.20231117.01.04',
      'osName': 'X11',
      'osVersion': '',
      'originalUrl': 'https://www.youtube.com',
      'platform': 'DESKTOP',
      'clientFormFactor': 'UNKNOWN_FORM_FACTOR',
      'userInterfaceTheme': 'USER_INTERFACE_THEME_LIGHT',
      'browserName': 'Chrome',
      'browserVersion': '119.0.0.0',
      'acceptHeader': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'screenWidthPoints': 1920,
      'screenHeightPoints': 946,
      'screenPixelDensity': 1,
      'screenDensityFloat': 1,
      'utcOffsetMinutes': 180,
      'memoryTotalKbytes': '8000000',
    },
    'user': { 'lockedSafetyMode': false },
    'request': { 'useSsl': true, 'internalExperimentFlags': [], 'consistencyTokenJars': [] },
  },
};
