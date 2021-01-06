import React from 'react';

type ViewportHeaderProps = { title: string };

export default function ViewportHeader({ title }: ViewportHeaderProps): React.ReactElement {
    const classes =
        'flex flex-col flex-center h-10 select-none bg-gradient-to-r from-tint-violet to-tint-pink font-medium';

    return (
        <header className={classes}>
            <h1 className="text-center">{title}</h1>
        </header>
    );
}
