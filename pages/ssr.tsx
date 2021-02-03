require('console.history');
import React from 'react';
import { NextApiResponse } from 'next';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';

import ViewportHeader from 'components/viewport/ViewportHeader';
import ViewportStatus from 'components/viewport/ViewportStatus';
import Profile from 'components/Profile';
import withLogs from 'utils/withLogs';

type SSRProps = { user?: UserProfile };

export default function SSR({ user }: SSRProps): React.ReactElement {
    console.info('Rendering server-side protected page');

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title="Profile" />
            <div className="flex flex-grow">
                <ViewportStatus />
                <Profile user={user} />
            </div>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        console.info('Running getServerSideProps');

        withLogs(ctx.res as NextApiResponse);
        return { props: {} };
    }
});
