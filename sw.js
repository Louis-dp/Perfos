// Cache hors ligne. Incrémenter VERSION à chaque mise à jour de l'application.
const VERSION='perfos-cougar-22';
const ABAQUES=['h5','f7','f8','f9','o10','o11','o12','v16','c1','c2','k1','k2','k3','s2','s3','s4','s6','s7','s8a','s8b','s9','s15'];
const FILES=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png',...ABAQUES.map(k=>'./abaques/'+k+'.jpg')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))))});
