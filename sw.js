// sw.js

var cacheName = 'irepfoundation_V1';
const offlineUrl = 'offline_page.html';
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
    '/pictures/board_members/none.jpg',

    '/pictures/homepage_imgs/annie-spratt-cVEOh_JJmEE.webp',    
    '/pictures/homepage_imgs/annie-spratt-cVEOh_JJmEE_full.webp', 
    '/pictures/logo/i_rep_Logo.gif',    
    '/pictures/logo/i_rep_logo.png',
    '/pictures/logo/i_rep_logo_index.png',    
    '/pictures/logo/i_rep_logo_sm.png',
    '/pictures/logo/icon_256.png',

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



/*if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
        
        //navigator.serviceWorker.ready always resolve
        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service worker successfully registered on scope', registration.scope);
        });
    }).catch(function(err) {
        // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
}
*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
    // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}



self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCache.offline)
        .then(function(cache) {
            console.info('[sw.js] cached all files');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
    
            

            /*if(response){
                return response
                        }*/


            if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
                    event.respondWith(
                      fetch(event.request.url).catch(error => {
                          // Return the offline page
                          return caches.match(offlineUrl);
                      })
                );
              }


            else{
                event.respondWith(caches.match(event.request)
                .then(function(response) {
                // clone request stream
                // as stream once consumed, can not be used again
                var reqCopy = event.request.clone();
                
                return fetch(reqCopy, {credentials: 'include'}) // reqCopy stream consumed
                .then(function(response) {
                    // bad response
                    // response.type !== 'basic' means third party origin request
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response; // response stream consumed
                    }

                    // clone response stream
                    // as stream once consumed, can not be used again
                    var resCopy = response.clone();


                    // ================== IN BACKGROUND ===================== //

                    // add response to cache and return response
                    caches.open(cacheName)
                    .then(function(cache) {
                        return cache.put(reqCopy, resCopy); // reqCopy, resCopy streams consumed
                    });

                    // ====================================================== //


                    return response; // response stream consumed
                })
            
        })
    );
};

}



self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cName) {
                    if(cName !== cacheName){
                        return caches.delete(cName);
                    }
                })
            );
        })
    );
});
