


const CACHE = "hex-decoder-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./core/licenseEngine.js",
  "./core/decodeEngine.js",
  "./ui/loginPage.js",
  "./ui/mainPage.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

