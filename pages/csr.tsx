import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import ViewportHeader from '../components/viewport/ViewportHeader';
import ViewportStatus from '../components/viewport/ViewportStatus';
import Profile from '../components/Profile';

export default withPageAuthRequired(function CSR(): React.ReactElement {
    console.info('Rendering client-side protected page');

    const { user, loading } = useUser();

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title="Profile" />
            <div className="flex flex-grow">
                <ViewportStatus loading={loading} />
                {user && <Profile user={user} />}
            </div>
        </div>
    );
});
