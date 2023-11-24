import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { SearchResponse } from '@/types/SearchResponse';
import { STATIC_YOUTUBE_REQUEST_BODY_PART, STATIC_YOUTUBE_REQUEST_URL } from '@/constants';
import { getQueryParam } from '@/utils';
import isEmpty from 'lodash/isEmpty';
import isFinite from 'lodash/isFinite';
import map from 'lodash/map';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>,
) {
  switch (req.method) {
    case 'GET': {
      const continuationToken = getQueryParam(req?.query?.['continuationToken']);
      const searchResponse: SearchResponse = await axios.post(STATIC_YOUTUBE_REQUEST_URL, {
        'continuation': continuationToken,
        ...STATIC_YOUTUBE_REQUEST_BODY_PART,
      }).then((response) => {
        const { itemSectionRenderer } = response?.data?.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems?.[0]
        ?? {};
        const { continuationItemRenderer } = response?.data?.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems?.[1]
        ?? {};
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

      res.status(200).json(searchResponse);
      break;
    }
    default: {
      res.status(405).send({
        results: [],
      });
    }
  }
}
