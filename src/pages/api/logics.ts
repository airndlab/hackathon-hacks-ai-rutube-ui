// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const logicServiceUrl = process.env.PY_FASTAPI_SERVICE_URL;

type Data = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  fetch(logicServiceUrl + '/api/logics')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<Data>
      })
      .then(json => {
          res.status(200).json({ result: json.result })
      })
      .catch(error => {
          res.status(503).json({ result: 'logic-service has error: ' + error });
      })
}
