require('console.history');
import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import withLogs from 'lib/withLogs';

const handleError = (error: any, res: NextApiResponse) => {
    console.error(error);
    withLogs(res)
        .status(error.status || 400)
        .end(error.message);
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    console.info('Running handleLogin');
    const { login_hint: loginHint } = req.query as { login_hint: string };

    try {
        await handleLogin(req, withLogs(res), { authorizationParams: { login_hint: loginHint } });
    } catch (error) {
        handleError(error, res);
    }
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    console.info('Running handleLogout');

    try {
        await handleLogout(req, withLogs(res));
    } catch (error) {
        handleError(error, res);
    }
};

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
    console.info('Running handleCallback');

    try {
        await handleCallback(req, withLogs(res));
    } catch (error) {
        handleError(error, res);
    }
};

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
    console.info('Running handleProfile');

    try {
        await handleProfile(req, withLogs(res));
    } catch (error) {
        handleError(error, res);
    }
};

export default handleAuth({ login, logout, callback, profile });
