const CACHE_NAME = 'drink-slide-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './next.png',
  './score.png',
  './config.png',
  './openingscreen.png',
  './playbutton.png',
  './title.png',
  './table.png',
  './s.png',
  './a.png',
  './b.png',
  './c.png',
  './d.png',
  './e.png',
  './f.png',
  './g.png',
  './h.png',
  './i.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// El audio MP3 usa range requests — dejarlo pasar al navegador directamente
self.addEventListener('fetch', event => {
  if (event.request.url.includes('.mp3')) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
