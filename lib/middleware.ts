import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export default function runMiddleware(
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | ServerResponse,
    middleware: (
        req: NextApiRequest | IncomingMessage,
        res: NextApiResponse | ServerResponse,
        result: any
    ) => Promise<any>
) {
    return new Promise((resolve, reject) => {
        middleware(req, res, result => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}
