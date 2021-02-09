import React, { useState, useEffect } from 'react';
import { Console, Hook, Unhook } from 'console-feed';
import { HookedConsole } from 'console-feed/lib/definitions/Console';
import { ProvideServiceWorker } from 'react-hook-use-service-worker';

import ConsoleHeader from './ConsoleHeader';
import useScroll from 'lib/useScroll';

const iframe = document.createElement('iframe');

iframe.name = 'iframe';
iframe.src = '/iframe.html';
iframe.width = '0px';
iframe.height = '0px';
iframe.style.display = 'none';
document.body.appendChild(iframe);

export default function BackendConsole(): React.ReactElement {
    const id = 'backend-console';
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        Hook((iframe.contentWindow as any).console, log => setLogs(logs => [...logs, log]), false);
        return () => Unhook((iframe.contentWindow as any).console as HookedConsole);
    }, []);
    useScroll(id);

    return (
        <section className="row-span-1 col-span-6 border-t-2 border-background-lighter">
            <ConsoleHeader title="Backend" />
            <div id={id} className="h-full overflow-y-scroll">
                <ProvideServiceWorker fileName={'/worker.js'}>
                    <Console logs={logs} variant="dark" />
                </ProvideServiceWorker>
            </div>
        </section>
    );
}
