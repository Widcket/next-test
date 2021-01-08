import React from 'react';

const LoadingIcon = (): React.ReactElement => (
    <figure className="w-1/2" title="Loading">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z">
                <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="0.6s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    </figure>
);

export default React.memo(LoadingIcon);
