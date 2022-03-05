const cacheName = 'v3';


// Install event
self.addEventListener('install', (e) => {
    console.log('Service worker installed')
})

// Activate event
self.addEventListener('activate', (e) => {
    console.log('Service worker Activated')
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) return caches.delete(cache);
                })
            )
        })
    )
})


// Call fetch event

self.addEventListener('fetch', (e) => {
    console.log('Service worker: fetching')
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open a caches
            caches.open(cacheName).then(cache => {
                // Add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    )
})

