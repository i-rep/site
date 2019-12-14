// sw.js

var cacheName = 'irepfoundation_V1';
const offlineUrl = '/offline_page.html';
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};

var filesToCache = [
    '/index.html',
    '/blog/featured/abducted_rescued.html',
    '/blog/featured/where_is_belinda.html',

    '/css/styling.css',

    '/pictures/board_members/domtila2.webp',
    '/pictures/board_members/Gitonga.webp',
    '/pictures/board_members/GraceAmurle.webp',
    '/pictures/board_members/Jane.webp',
    '/pictures/board_members/Jonathan.webp',
    '/pictures/board_members/MaryAnn.webp',
    '/pictures/board_members/nicholas.webp',

    '/pictures/homepage_imgs/annie-spratt-cVEOh_JJmEE.webp',    
    '/pictures/homepage_imgs/annie-spratt-cVEOh_JJmEE_full.webp', 
    '/pictures/logo/i_rep_Logo.gif',    
    '/pictures/logo/i_rep_logo.png',
    '/pictures/logo/i_rep_logo_index.png',    
    '/pictures/logo/i_rep_logo_sm.png',
    '/pictures/logo/icon_256.png',
    '/pictures/logo/icon_48.png',
    '/pictures/logo/volunteers_logo.webp',

    '/pictures/misc/girl_1.webp',
    '/pictures/misc/girl_2.webp',
    '/pictures/misc/goals.webp',
    '/pictures/misc/mission.webp',
    '/pictures/misc/vision.webp',

    '/pictures/sponsors/actionaid_logo_bw.png',
    '/pictures/sponsors/global_media_camapaign_to_end_FGM_logo_bw.png',
    '/pictures/sponsors/the_ girl_generation_logo_bw.png',
    '/pictures/sponsors/Wallace_logo_bw.png',
    '/pictures/sponsors/West-Pokot-County_logo_bw.png',
    '/pictures/sponsors/world_vision_logo_bw.png',



    '/scripts/irepscripts.js',

    '/about.html',
    '/privacy_policy.html',
    '/terms.html',
    '/join.html',
    '/volunteer.html',
    '/thank-you.html',

    '/offline_page.html'


];



if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('Service worker successfully registered on scope', registration.scope);
        }).catch(function (error) {
            console.log('Service worker failed to register', error);
        });
    });
}






self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.info('[sw.js] cached all files');
            return cache.addAll(filesToCache);
        })
    );
});










self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open(cacheName);
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || offlineUrl;
    }());
  }


});





