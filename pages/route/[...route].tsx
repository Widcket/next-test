import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { JsonView } from 'json-view-for-react';

import ViewportHeader from 'components/viewport/ViewportHeader';
import ViewportStatus from 'components/viewport/ViewportStatus';

type RouteState = {
    isLoading: boolean;
    status: number;
    response?: any;
    error: boolean;
};

export default function Route(): React.ReactElement {
    const [state, setState] = useState<RouteState>({ isLoading: true, status: 0, response: undefined, error: false });
    const router = useRouter();
    const { route } = router.query as { route: string[] };
    const routePath = route ? `/api/${route.join('/')}` : undefined;

    useEffect(() => {
        let isMounted = true;

        if (!routePath) {
            console.error('No route path: router.query has no "route" property');
            return;
        }

        setState(previous => ({ ...previous, isLoading: true, error: false }));

        (async function () {
            console.info(`Fetching ${routePath}`);

            try {
                const response = await fetch(routePath);

                if (isMounted) {
                    setState({
                        isLoading: false,
                        status: response.status,
                        response: await response.json(),
                        error: !response.ok
                    });
                }
            } catch (error) {
                console.error(error);
                if (isMounted) setState(previous => ({ ...previous, isLoading: false, error: !!error }));
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [routePath]);

    const padding = 'px-8 py-4';
    const titleClasses = `${padding} border-bottom h2`;
    const { isLoading, status, response, error } = state;

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title={routePath} />
            <div className="flex flex-grow overflow-hidden">
                <ViewportStatus loading={isLoading} error={error} />
                {response ? (
                    <section className="flex flex-grow flex-col items-left justify-start w-2/3 overflow-y-scroll">
                        <div>
                            <h2 className={titleClasses}>Status</h2>
                            <div className={`${padding} text-2xl text-foreground-darker`}>{status}</div>
                        </div>
                        <div>
                            <h2 className={titleClasses}>Data</h2>
                            <div className={`${padding} text-sm`}>
                                <JsonView obj={response} cssPrefix="json" showLineNumbers />
                            </div>
                        </div>
                    </section>
                ) : null}
            </div>
        </div>
    );
}
