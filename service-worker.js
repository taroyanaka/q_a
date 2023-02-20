import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// ファイルのキャッシュ
precacheAndRoute([
{ url: '/index.html', revision: '1' },
{ url: '/reset.css', revision: '1' },
{ url: '/localforage@1.10.0.js', revision: '1' },
{ url: '/ramda.@0.28.0.js', revision: '1' },
{ url: '/vue@3.2.36.global.prod.js', revision: '1' }
]);

// JSファイルのキャッシュ
registerRoute(
  /.*\.js/,
  new CacheFirst()
);

// CSSファイルのキャッシュ
registerRoute(
  /.*\.css/,
  new CacheFirst()
);
