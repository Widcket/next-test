import React, { useState, useEffect } from 'react';
import { Console, Hook, Unhook } from 'console-feed';
import { HookedConsole } from 'console-feed/lib/definitions/Console';

import ConsoleHeader from './ConsoleHeader';
import useScroll from 'utils/useScroll';

export default function FrontendConsole(): React.ReactElement {
    const [logs, setLogs] = useState([]);
    const id = 'frontend-console';

    useEffect(() => {
        Hook(window.console, log => setLogs(logs => [...logs, log]), false);
        return () => Unhook(window.console as HookedConsole);
    }, []);
    useScroll(id);

    return (
        <section className="row-span-1 col-span-6 border-t-2 border-l border-background-lighter">
            <ConsoleHeader title="Frontend" />
            <div id={id} className="h-full overflow-y-scroll">
                <Console logs={logs} variant="dark" />
            </div>
        </section>
    );
}
