import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '@/service/session';
import { getQueryParam } from '@/utils';
import { User } from '@/types/User';

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<boolean>,
) {
  switch (req.method) {
    case 'POST': {
      const userId = getQueryParam(req?.query?.['userId']);
      createSession(res, req, userId as User);

      res.status(200).json(true);
      break;
    }
    default: {
      res.status(405).send(false);
    }
  }
}
