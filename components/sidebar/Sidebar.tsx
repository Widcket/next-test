import React from 'react';

import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';

export default function Sidebar(): React.ReactElement {
    const pages = [
        { href: '/ssr', title: 'Server-side Rendered Page' },
        { href: '/csr', title: 'Client-side Rendered Page' },
        { href: '/external', title: 'External API Call (frontend)' }
    ];
    const routes = [
        { href: '/route/protected', title: 'Protected API Route' },
        { href: '/route/external', title: 'External API Call (backend)' }
    ];
    const sections = [
        { name: 'pages', items: pages },
        { name: 'routes', items: routes }
    ];

    const classes = 'flex flex-col row-span-2 col-span-3 text-center border-r-2 border-background-lighter select-none';

    return (
        <nav className={classes}>
            <SidebarHeader />
            <div className="flex flex-grow flex-col overflow-y-scroll">
                {sections.map((section, index) => (
                    <SidebarSection section={section} key={index} />
                ))}
            </div>
        </nav>
    );
}
