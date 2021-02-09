require('console.history');
import React, { FormEvent, useState, useCallback } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import csrf from 'lib/csrf';
import withLogs from 'lib/withLogs';
import runMiddleware from 'lib/runMiddleware';
import ViewportHeader from 'components/viewport/ViewportHeader';
import ViewportStatus from 'components/viewport/ViewportStatus';

type CSRFState = {
    wasSubmitted: boolean;
    isLoading: boolean;
    error: boolean;
};

export default withPageAuthRequired(function CSRF({ csrfToken }): React.ReactElement {
    const initialState: CSRFState = { error: false, isLoading: false, wasSubmitted: false };
    const [state, setState] = useState<CSRFState>(initialState);
    const { checkSession } = useUser();

    const submit = useCallback(() => {
        return async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setState(previous => ({ ...previous, error: false, isLoading: true, wasSubmitted: true }));

            try {
                const target = event.target as typeof event.target & { status: { value: string } };
                const status = target.status.value;

                const response = await fetch('/api/status', {
                    method: 'POST',
                    headers: { 'x-csrf-token': csrfToken },
                    body: JSON.stringify({ status })
                });
                const json = await response.json();

                if (!response.ok) throw new Error(json.message);
                (event.target as HTMLFormElement).reset();
                await checkSession();
                setState(previous => ({ ...previous, error: false, isLoading: false }));

                console.info(`Successfully updated the status to "${status}"`);
            } catch (error) {
                console.error(error);
                setState(previous => ({ ...previous, error: true, isLoading: false }));
            }
        };
    }, [csrfToken]);

    const { wasSubmitted, isLoading, error } = state;
    const inputClasses =
        'py-4 bg-background border-bottom text-foreground-darker placeholder-foreground-darkest hover:border-b-2 focus:border-b-2 hover:-mb-px focus:-mb-px';

    return (
        <div className="flex flex-col h-full">
            <ViewportHeader title="CSRF Protection" />
            <div className="flex flex-grow">
                <ViewportStatus empty={!wasSubmitted} loading={isLoading} error={error} />
                <form onSubmit={submit()} className="flex flex-center flex-grow">
                    <div className="flex flex-col justify-between w-3/4 h-32">
                        <input
                            type="text"
                            placeholder="Update your status"
                            id="status"
                            className={inputClasses}
                            autoComplete="off"
                            maxLength={140}
                            required
                        />
                        <button
                            type="submit"
                            className="h-10 w-32 font-medium text-sm rounded-3xl gradient select-none"
                            disabled={isLoading}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        console.info('Running getServerSideProps from "CSRF" page');

        const { req, res } = context;

        await runMiddleware(req, res, csrf);
        withLogs(res);

        return { props: { csrfToken: (req as any).csrfToken() } };
    }
});
