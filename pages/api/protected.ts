require('console.history');
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

import withLogs from '../../utils/withLogs';

type Data = {
    profile: string;
};

export default withApiAuthRequired((req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.info('Running protected API route "protected"');

    const { user } = getSession(req, res);

    withLogs(res).status(200).json(user);
});
