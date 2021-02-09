import { ServerResponse } from 'http';
import type { NextApiResponse } from 'next';

export default (res: NextApiResponse | ServerResponse): NextApiResponse => {
    const logs = (console as any).history.map(item => ({
        type: item.type,
        message: Object.values(item.arguments)
    }));
    const encodedLogs = Buffer.from(JSON.stringify(logs), 'utf8').toString('base64');

    (console as any).history = [];
    res.setHeader('Next-Server-Logs', encodedLogs);

    return res as NextApiResponse;
};
