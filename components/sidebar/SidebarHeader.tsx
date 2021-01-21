import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function SidebarHeader(): React.ReactElement {
    const { user, isLoading } = useUser();

    const dividerClasses = 'border-l border-background-lighter';
    const classes =
        'flex flex-center w-1/2 h-10 cursor-pointer font-medium text-foreground-darkest hover:text-foreground';

    return (
        <header className="flex border-b-2 border-background-lighter text-sm">
            <Link href="/">
                <p className={classes}>Home</p>
            </Link>
            {isLoading ? (
                <p className={`${classes} ${dividerClasses}`} />
            ) : (
                <Link href={`/api/auth/${user ? 'logout' : 'login'}`}>
                    <p className={`${classes} ${dividerClasses}`}>{user ? 'Logout' : 'Login'}</p>
                </Link>
            )}
        </header>
    );
}
