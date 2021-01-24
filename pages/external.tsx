import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import ViewportHeader from '../components/viewport/ViewportHeader';
import ViewportStatus from '../components/viewport/ViewportStatus';

type Cat = {
    url: string;
    width: number;
    height: number;
};

type ExternalState = {
    cat?: Cat;
    error: boolean;
    isLoading: boolean;
};

export default withPageAuthRequired(function External(): React.ReactElement {
    const initialState: ExternalState = { cat: undefined, error: false, isLoading: true };
    const [state, setState] = useState<ExternalState>(initialState);

    useEffect(() => {
        let isMounted = true;

        if (state.cat) return;
        setState(previous => ({ ...previous, error: false, isLoading: true }));

        (async () => {
            console.info('Fetching thecatapi.com API key from /api/api-key');

            try {
                const apiKeyResponse = await fetch('/api/api-key');
                const apiKeyJson = await apiKeyResponse.json();

                console.info('Fetching a cat from api.thecatapi.com');

                const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif&limit=1', {
                    headers: { 'x-api-key': apiKeyJson.apiKey }
                });
                const catJson = await catResponse.json();

                if (isMounted) {
                    setState({ cat: catJson[0], error: !catResponse.ok, isLoading: false });
                }
            } catch (error) {
                console.error(error);
                if (isMounted) setState(previous => ({ ...previous, error: !!error, isLoading: false }));
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [state.cat]);

    const { cat, error, isLoading } = state;

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title="External API Call (frontend)" />
            <div className="flex flex-grow">
                <ViewportStatus loading={isLoading} error={error} />
                <section className="flex flex-grow flex-col flex-center w-2/3 text-center">
                    {cat ? (
                        <Image src={cat.url} alt="Cute cat GIF" width={cat.width} height={cat.height} priority={true} />
                    ) : null}
                </section>
            </div>
        </div>
    );
});
