import React from 'react';
import Head from 'next/head';

export default function Layout({ children }: React.PropsWithChildren<{}>): React.ReactElement {
    return (
        <>
            <Head>
                <title>Beta Test</title>
            </Head>
            <main>
                <div className="grid grid-rows-3 grid-cols-12 w-screen h-screen text-foreground font-inter">
                    {children}
                </div>
            </main>
        </>
    );
}
