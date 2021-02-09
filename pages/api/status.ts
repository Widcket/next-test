require('console.history');
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';

import csrf from 'lib/csrf';
import runMiddleware from 'lib/middleware';
import withLogs from 'lib/withLogs';

type Data = {
    status: string;
};

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.info('Running protected API route "status"');

    try {
        await runMiddleware(req, res, csrf);

        const {
            body: { status }
        } = req;

        const { user } = getSession(req, res);
        const { accessToken } = await getAccessToken(req, res);
        const endpoint = `${process.env.AUTH0_AUDIENCE}users/${user.sub}`;

        console.info(`Updating the user profile with the new status "${status}"`);

        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({ user_metadata: { status: status } })
        });
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);
        user.user_metadata = json.user_metadata; // This gets persisted by the SDK

        withLogs(res).status(200).json({
            status: json.user_metadata.status
        });
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
