import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0';

type ProfileProps = { user?: UserProfile & { user_metadata?: { status: string } } };

export default function Profile({ user }: ProfileProps): React.ReactElement {
    const status = user?.user_metadata?.status;

    return (
        <section className="flex flex-grow flex-col flex-center w-2/3 text-center">
            <div className="flex flex-center rounded-full overflow-hidden">
                {user ? (
                    <Image src={user.picture} alt="User" width={80} height={80} priority={true} unoptimized={true} />
                ) : null}
            </div>
            <div className="flex flex-col flex-center text-center text-foreground">
                <h2 className="mt-4 font-medium text-lg">{user.name}</h2>
                <div className="w-12 h-1 mt-2 mb-4 rounded gradient"></div>
                {status && <p className="text-base">{status}</p>}
                <p className="text-base">{user.email}</p>
            </div>
        </section>
    );
}
