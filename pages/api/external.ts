require('console.history');
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import withLogs from '../../utils/withLogs';

type Data = {
    cat: string;
};

export default withApiAuthRequired(async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.info('Running protected API route "external"');

    try {
        console.info('Fetching a cat from api.thecatapi.com');

        const response = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif&limit=1', {
            headers: { 'x-api-key': process.env.CATS_API_KEY }
        });
        const json = await response.json();

        withLogs(res)
            .status(response.status || 200)
            .json(json[0]);
    } catch (error) {
        console.error(error);
        withLogs(res)
            .status(error.status || 500)
            .json({
                code: error.code,
                error: error.message
            });
    }
});
