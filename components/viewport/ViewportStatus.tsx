import React from 'react';

import Loading from 'components/icons/LoadingIcon';
import Success from 'components/icons/SuccessIcon';
import Failure from 'components/icons/FailureIcon';

type ViewportStatusProps = { empty?: boolean; loading?: boolean; error?: boolean };

export default function ViewportStatus({
    empty = false,
    loading = false,
    error = false
}: ViewportStatusProps): React.ReactElement {
    const icon = empty ? null : loading ? <Loading /> : error ? <Failure /> : <Success />;

    return <aside className="flex flex-center w-1/3 text-center text-background-lighter textured">{icon}</aside>;
}
