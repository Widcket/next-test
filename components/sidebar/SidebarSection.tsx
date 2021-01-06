import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarSectionProps = { section: { name: string; items: { href: string; title: string }[] } };

export default function SidebarSection({ section }: SidebarSectionProps): React.ReactElement {
    const router = useRouter();
    const itemClasses = 'p-4 cursor-pointer text-base transition-colors ';
    const activeItemClasses = 'font-medium text-foreground';
    const inactiveItemClasses = 'text-foreground-darker hover:text-foreground';
    const sectionClasses = 'p-4 border-b border-background-lighter h2';

    return (
        <div>
            <h2 className={sectionClasses}>{section.name}</h2>
            <ul>
                {section.items.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <li
                            className={`${itemClasses}${
                                item.href === router.asPath ? activeItemClasses : inactiveItemClasses
                            }`}>
                            <a>{item.title}</a>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
