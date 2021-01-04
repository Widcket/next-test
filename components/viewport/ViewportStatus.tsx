import React from 'react';

import Loading from '../icons/LoadingIcon';
import Success from '../icons/SuccessIcon';
import Failure from '../icons/FailureIcon';

type ViewportStatusProps = { status?: number; error?: Error; loading?: boolean };

export default function ViewportStatus({
    status = 200,
    error = null,
    loading = false
}: ViewportStatusProps): React.ReactElement {
    const icon = error || status > 400 ? <Failure /> : loading || !status ? <Loading /> : <Success />;

    return (
        <aside className="flex justify-center items-center w-1/3 text-center text-background-lighter textured">
            {icon}
        </aside>
    );
}
