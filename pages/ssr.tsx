require('console.history');
import React from 'react';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';

import ViewportHeader from 'components/viewport/ViewportHeader';
import ViewportStatus from 'components/viewport/ViewportStatus';
import Profile from 'components/Profile';
import withLogs from 'lib/withLogs';

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
    async getServerSideProps(context) {
        console.info('Running getServerSideProps from "SSR" page');

        withLogs(context.res);
        return { props: {} };
    }
});
