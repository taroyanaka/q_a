importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

// ファイルのキャッシュ
workbox.precaching.precacheAndRoute([
// precacheAndRoute([
{ url: '/index.html', revision: '1' },
{ url: '/reset.css', revision: '1' },
{ url: '/localforage@1.10.0.js', revision: '1' },
{ url: '/ramda.@0.28.0.js', revision: '1' },
{ url: '/vue@3.2.36.global.prod.js', revision: '1' }
]);

// JSファイルのキャッシュ
workbox.routing.registerRoute(
  /.*\.js/,
  new CacheFirst()
);

// CSSファイルのキャッシュ
workbox.routing.registerRoute(
  /.*\.css/,
  new CacheFirst()
);
