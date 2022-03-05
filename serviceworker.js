const cacheName = 'v2';
const cacheAssets = [
    './home.html',
    './indexdb.js'
]

// Install event
self.addEventListener('install', (e) => {
    console.log('Service worker installed')
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Serive Worker: Caching files')
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting())
    )
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
if(!navigator.onLine) {
    self.addEventListener('fetch', (e) => {
        console.log('Service worker: fetching')
        e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
    })
}
