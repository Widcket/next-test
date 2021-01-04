const broadcast = new BroadcastChannel('logs-channel');

const main = async () => {
    console.log('Service Worker is starting...');
};

const onInstall = async () => {
    self.skipWaiting();
};

const onActivate = async event => {
    event.waitUntil(handleActivation());
};

const handleActivation = async () => {
    await clients.claim();

    console.log('Service Worker activated');
};

const onFetch = async event => {
    event.respondWith(fetch(event.request).then(onRequestFulfilled, onRequestFailed).catch(onRequestFailed));
};

const onRequestFulfilled = response => {
    const encodedLogs = response.headers.get('Next-Server-Logs');

    if (encodedLogs) {
        const logs = JSON.parse(atob(encodedLogs));
        broadcast.postMessage({ type: 'LOGS', payload: logs });
    }

    return response;
};

const onRequestFailed = reason => {
    return new Response(`{ "error": "${reason}" }`, {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
};

main().catch(console.error);

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
