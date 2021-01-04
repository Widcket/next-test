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

export default withPageAuthRequired(function External(): React.ReactElement {
    const [status, setStatus] = useState<number>(0);
    const [cat, setCat] = useState<Cat>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        let isMounted = true;
        if (cat) return;

        setStatus(0);
        setError(undefined);

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
                    setStatus(catResponse.status);
                    setCat(catJson[0]);
                }
            } catch (error) {
                console.error(error);
                if (isMounted) setError(error);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [cat, setStatus, setCat, setError]);

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title="External API Call (frontend)" />
            <div className="flex flex-grow">
                <ViewportStatus status={status} error={error} />
                <section className="flex flex-grow flex-col justify-center items-center w-2/3 text-center">
                    {cat ? (
                        <Image src={cat.url} alt="Cute cat GIF" width={cat.width} height={cat.height} priority={true} />
                    ) : null}
                </section>
            </div>
        </div>
    );
});
