import React from 'react';

type ConsoleHeaderProps = { title: string };

export default function ConsoleHeader({ title }: ConsoleHeaderProps): React.ReactElement {
    const classes =
        'absolute top-0 right-0 px-2 py-1 z-10 bg-background textured text-xs text-foreground-darkest font-medium tracking-widest uppercase select-none';

    return (
        <header className="relative">
            <div className={classes}>
                <h3>{title}</h3>
            </div>
        </header>
    );
}
