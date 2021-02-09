require('console.history');
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import withLogs from 'lib/withLogs';

type Data = {
    apiKey: string;
};

export default withApiAuthRequired((_req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.info('Running protected API route "api-key"');

    withLogs(res).status(200).json({
        apiKey: process.env.CATS_API_KEY
    });
});
