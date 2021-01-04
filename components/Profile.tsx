import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0';

type ProfileProps = { user?: UserProfile };

export default function Profile({ user }: ProfileProps): React.ReactElement {
    return (
        <section className="flex flex-grow flex-col items-center justify-center w-2/3 text-center">
            <div className="flex items-center justify-center overflow-hidden rounded-full">
                {user ? (
                    <Image
                        src={user.picture}
                        alt="User profile"
                        width={80}
                        height={80}
                        priority={true}
                        unoptimized={true}
                    />
                ) : null}
            </div>
            <div className="flex flex-col items-center text-center justify-center">
                <h2 className="mt-4 font-medium text-lg text-foreground">{user.name}</h2>
                <div className="w-12 h-1 mt-2 mb-4 rounded bg-gradient-to-r from-tint-violet to-tint-pink"></div>
                <p className="text-base">{user.email}</p>
            </div>
        </section>
    );
}
