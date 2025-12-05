const CACHE = 'ac-transporte-v1';
const assets = [ '/', '/index.html', '/logo.png', '/avatar.png' ];
self.addEventListener('install', e=> e.waitUntil(caches.open(CACHE).then(c=>c.addAll(assets))));
self.addEventListener('fetch', e=> {
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
