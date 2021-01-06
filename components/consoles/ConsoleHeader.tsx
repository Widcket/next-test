import React from 'react';

type ConsoleHeaderProps = { title: string };

export default function ConsoleHeader({ title }: ConsoleHeaderProps): React.ReactElement {
    const classes = 'absolute top-0 right-0 px-2 py-1 z-10 bg-background textured h2';

    return (
        <header className="relative">
            <h2 className={classes}>{title}</h2>
        </header>
    );
}
