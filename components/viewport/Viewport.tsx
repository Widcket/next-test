import React from 'react';

export default function Viewport({ children }: React.PropsWithChildren<{}>): React.ReactElement {
    return <section className="row-span-2 col-span-9">{children}</section>;
}
