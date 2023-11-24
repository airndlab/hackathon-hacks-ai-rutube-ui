import axios from 'axios';
import { SearchRequest } from '@/types/SearchRequest';
import { SearchResponse } from '@/types/SearchResponse';
import { STATIC_YOUTUBE_REQUEST_BODY_PART, STATIC_YOUTUBE_REQUEST_URL } from '@/constants';
import isEmpty from 'lodash/isEmpty';
import isFinite from 'lodash/isFinite';
import map from 'lodash/map';

export default function (searchRequest: SearchRequest): Promise<SearchResponse> {
  return axios.post(STATIC_YOUTUBE_REQUEST_URL, {
    'query': searchRequest.query,
    ...STATIC_YOUTUBE_REQUEST_BODY_PART,
  }).then((response) => {
    const { itemSectionRenderer } = response.data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0] ??
    {};
    const { continuationItemRenderer } = response.data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[1] ??
    {};
    const continuationToken = continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;

    let totalElements: number | undefined;
    try {
      const estimatedResults = parseInt(response.data?.estimatedResults, 10);
      if (isFinite(estimatedResults)) {
        totalElements = estimatedResults;
      }
    } catch (e) {}

    return {
      results: map(itemSectionRenderer?.contents, (answer) => ({
        title: answer?.videoRenderer?.title?.runs?.[0].text,
        img: answer?.videoRenderer?.thumbnail?.thumbnails?.[0]?.url,
        link: `https://www.youtube.com/watch?v=${answer?.videoRenderer?.videoId}`,
        publishedDateText: answer?.videoRenderer?.publishedTimeText?.simpleText ?? '',
        viewCountText: answer?.videoRenderer?.shortViewCountText?.simpleText ?? '',
        lengthText: answer?.videoRenderer?.lengthText?.simpleText ?? '',
      })).filter(answer => !isEmpty(answer.title)),
      totalElements,
      continuationToken,
    };
  });
}
