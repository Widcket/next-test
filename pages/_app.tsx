import React from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/globals.css';
import Layout from 'components/Layout';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewport/Viewport';

const BackendConsole = dynamic(() => import('../components/consoles/BackendConsole'), { ssr: false });
const FrontendConsole = dynamic(() => import('../components/consoles/FrontendConsole'), { ssr: false });

export default function App({ Component, pageProps }: AppProps): React.ReactElement<AppProps> {
    const { user } = pageProps;

    return (
        <UserProvider user={user}>
            <Layout>
                <Sidebar />
                <Viewport>
                    <Component {...pageProps} />
                </Viewport>
                <BackendConsole />
                <FrontendConsole />
            </Layout>
        </UserProvider>
    );
}
