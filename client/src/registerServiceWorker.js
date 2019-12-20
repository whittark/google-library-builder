// In researching for this project, I found that many React projects on Git use a service worker, so I learned a little about it and added one that I found.

// Service worker is a web API that helps cache assets and other files so that when the user is offline or on slow network, they can still see results on the screen. 

// In brief, it acts as a cache to ensure app performance regardless of external factors. See https://gist.github.com/camwhite/2f33f7c33e2495b01614f209399703ee for additional details.

// Here's what's used to create that 'catastrophe' cache. :-)  WT

//"If it's the local host (T/F)..."
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] then internet protocol v6 is the localhost address.
    window.location.hostname === "[::1]" ||
    // and 127.0.0.1/8 is the localhost for internet protocol v4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// If Service Worker is supported by the broser used
export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Then the URL constructor is available and can create a URL object for caching.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    // An event listener checks to see if a service worker exists.
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Checks for a valid service worker ...
        checkValidServiceWorker(swUrl);
      } else {
        // Or register a service worker if there is none.
        registerValidSW(swUrl);
      }
    });
  }
}

// Function to register a valid service worker if one is needed
function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        // Install the worker
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Once the service worker is registered, old content is purged and
              // new content is added to the cache.
              // A message is logged to prompt the user to refresh
              // if needed.
              console.log("Refresh to view updated content.");
            } else {
              // When content has been cached, a message 
              // logs indicating that the content has been stored
              // for offline use or for windows of poor network performance.
              console.log("Content is cached for offline use.");
            }
          }
        };
      };
    })
    // If service worker fails to register
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

// Function to check for service worker if a page can't be reloaded.
function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      // Verifies that service worker exists and that the JS file retrieved is valid.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // No service worker found or an app other than JS is found. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker is found and the cached content can be used.
        registerValidSW(swUrl);
      }
    })
    // If there is no internet connection, a message logs indicating that the
    // app is running in offline mode
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

// The service worker finishes its operations, sends a 'promise,'
// and deactivates (unregisters)
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

// Neat! More about service worker unregistering: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/unregister
