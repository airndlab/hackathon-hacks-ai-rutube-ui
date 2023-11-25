import axios from 'axios';
import { SearchRequest } from '@/types/SearchRequest';
import { SearchResponse } from '@/types/SearchResponse';
import { SearchResult } from '@/types/SearchResult';
import { FoundChannel } from '@/types/FoundChannel';
import { STATIC_YOUTUBE_REQUEST_BODY_PART, STATIC_YOUTUBE_REQUEST_URL } from '@/constants';
import startsWith from 'lodash/startsWith';
import isFinite from 'lodash/isFinite';
import forEach from 'lodash/forEach';

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

    const videos: SearchResult[] = [];
    const channels: FoundChannel[] = [];

    forEach(itemSectionRenderer?.contents, (answer) => {
      if (answer?.videoRenderer?.title) {
        videos.push({
          title: answer?.videoRenderer?.title?.runs?.[0].text,
          img: answer?.videoRenderer?.thumbnail?.thumbnails?.[0]?.url,
          link: `https://www.youtube.com/watch?v=${answer?.videoRenderer?.videoId}`,
          publishedDateText: answer?.videoRenderer?.publishedTimeText?.simpleText ?? '',
          viewCountText: answer?.videoRenderer?.shortViewCountText?.simpleText ?? '',
          lengthText: answer?.videoRenderer?.lengthText?.simpleText ?? '',
        });
      }
      if (answer?.channelRenderer?.title) {
        const thumbnail = answer?.channelRenderer?.thumbnail?.thumbnails?.[0]?.url;

        channels.push({
          title: answer?.channelRenderer?.title?.simpleText,
          type: 'Тип канала',
          img: startsWith(thumbnail, 'http') ? thumbnail : `https:${thumbnail}`,
          link: `https://www.youtube.com${answer?.channelRenderer?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl}`,
          canonicalBaseUrl: answer?.channelRenderer?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
        });
      }
    });

    return {
      channels,
      results: videos,
      totalElements,
      continuationToken,
    };
  });
}
