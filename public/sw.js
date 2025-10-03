const CACHE_NAME = "notas-cache-v3"; // cambia versión para refrescar cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalación: precargar lo básico
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activación: limpiar caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch: cache-first con fallback dinámico
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // devolver desde cache si ya existe
      }

      return fetch(event.request)
        .then((res) => {
          // validar respuesta
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res;
          }

          // clonar y guardar en cache dinámico
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });

          return res;
        })
        .catch(() => {
          // fallback si no hay red y no está en cache
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
