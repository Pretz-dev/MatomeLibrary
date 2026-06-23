/* Matome Library Service Worker
   - HTML（ナビゲーション）はネット優先 → 常に最新版を表示。オフライン時のみキャッシュにフォールバック
   - その他の静的アセットはキャッシュ優先（取得できたら裏で更新） */
const CACHE = "matome-viewer-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method!=="GET") return;

  const isHTML = req.mode==="navigate" ||
    (req.headers.get("accept")||"").includes("text/html") ||
    /\/(index\.html)?(\?.*)?$/.test(new URL(req.url).pathname);

  if(isHTML){
    // ネット優先：最新の index.html を取りに行き、成功したらキャッシュ更新
    e.respondWith(
      fetch(req).then(res=>{
        if(res && res.status===200){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); }
        return res;
      }).catch(()=> caches.match(req).then(c=> c || caches.match("./index.html")))
    );
    return;
  }

  // 静的アセット：キャッシュ優先 + 裏で更新
  e.respondWith(
    caches.match(req).then(cached=>{
      const net = fetch(req).then(res=>{
        if(res && res.status===200 && res.type==="basic"){
          const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req, copy));
        }
        return res;
      }).catch(()=>cached);
      return cached || net;
    })
  );
});
