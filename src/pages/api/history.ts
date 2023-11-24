import { getQueryParam } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getHistory, putHistory, removeHistory } from '@/service/history';
import { getSessionId } from '@/service/session';
import isEmpty from 'lodash/isEmpty';

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<string[] | void>,
) {
  const userSessionId: string = getSessionId(req);

  switch (req.method) {
    case 'GET': {
      const history = isEmpty(userSessionId)
        ? []
        : getHistory(userSessionId);

      res.status(200).json(history);
      break;
    }
    case 'PUT': {
      const query = getQueryParam(req?.query?.['query']);
      putHistory(userSessionId, query);

      res.status(200).send(undefined);
      break;
    }
    case 'DELETE': {
      const query = getQueryParam(req?.query?.['query']);
      removeHistory(userSessionId, query);

      res.status(200).send(undefined);
      break;
    }
    default: {
      res.status(405).send(undefined);
    }
  }
}
