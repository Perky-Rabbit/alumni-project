import { createPinia } from "pinia";
import { createSSRApp } from "vue";
import App from "./App.vue";
import axios from 'axios';
import { createRouter } from "./router/index.js";
import { useStore } from './store';
import { createHead } from "@vueuse/head";
import '@/registerServiceWorker';
import VueSocialSharing from 'vue-social-sharing';

// vue sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// notification start
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

// progressbar start
import VueProgressBar from "@aacassandra/vue3-progressbar";
const options = {
  color: "#50d38a",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

// Service Worker for PWA start
// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const serviceWorkerPath = '/service-worker.js';

//     navigator.serviceWorker
//       .register(serviceWorkerPath)
//       .then((registration) => {
//         console.log('Service worker registered:', registration);
//       })
//       .catch((error) => {
//         console.error('Service worker registration failed:', error);
//       });
//   });
// }

// add global function start
const backendUrl = import.meta.env.VITE_API_BASE_URL;
const $setting = async (key) => {
  try {
    const response = await axios.get(`${backendUrl}/setting/fetch`, {
      params: { keysArray: key },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
    return false;
  }
};

// Live chat part start
import Cookies from 'js-cookie';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

if (typeof window !== 'undefined') {
  const authEndpointBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get('alumniLoggedInTokenCookie');
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '94fc42daa3f883fa52e4',
    cluster: 'ap2',
    forceTLS: true,
    authEndpoint: `${authEndpointBaseUrl}/broadcasting/auth`,
    auth: {
      headers: {
        authorization: token ? `Bearer ${token}` : null // Enabled - If you are using Bearer for authentication
      }
    }
  });
}

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  const router = createRouter();
  app.use(router);
  const store = useStore();
  app.use(store);
  const head = createHead();
  app.use(head);
  app.use(VueSocialSharing);
  app.use(VueSweetalert2);
  app.use(Toast, toastOptions);
  app.use(VueProgressBar, options);

  // add global function to app config
  app.config.globalProperties.$setting = $setting;

  return { app, router, head };
}







// import { createPinia } from "pinia";
// import { createSSRApp } from "vue";
// import App from "./App.vue";
// import axios from 'axios';
// import { createRouter } from "./router";
// import { useStore } from './store';
// import VueSocialSharing from 'vue-social-sharing';
// import { createHead } from '@vueuse/head';
// const head = createHead();

// // notification start
// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";
// const toastOptions = {
//   position: "top-right",
//   timeout: 5000,
//   closeOnClick: true,
//   pauseOnFocusLoss: true,
//   pauseOnHover: true,
//   draggable: true,
//   draggablePercent: 0.6,
//   showCloseButtonOnHover: false,
//   hideProgressBar: false,
//   closeButton: "button",
//   icon: true,
//   rtl: false
// };
// // notification end

// // progressbar start
// import VueProgressBar from "@aacassandra/vue3-progressbar";
// const options = {
//   color: "#50d38a",
//   failedColor: "#874b4b",
//   thickness: "5px",
//   transition: {
//     speed: "0.2s",
//     opacity: "0.6s",
//     termination: 300,
//   },
//   autoRevert: true,
//   location: "top",
//   inverse: false,
// };
// // progressbar end

// // vue sweetalert2
// import VueSweetalert2 from "vue-sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

// // Service Worker for PWA start
// // old code start
// // import * as serviceWorker from '/src/service-worker.js';
// // if ('serviceWorker' in navigator) {
// //   // window.addEventListener('load', () => {
// //     navigator.serviceWorker.register(serviceWorker)
// //       .then(registration => {
// //         console.log('Service worker registered: ', registration)
// //       })
// //       .catch(registrationError => {
// //         console.log('Service worker registration failed: ', registrationError)
// //       })
// //   // })
// // }
// // old code end

// // New code start
// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const serviceWorkerPath = '/service-worker.js';

//     navigator.serviceWorker
//       .register(serviceWorkerPath)
//       .then((registration) => {
//         console.log('Service worker registered:', registration);
//       })
//       .catch((error) => {
//         console.error('Service worker registration failed:', error);
//       });
//   });
// }
// // New code start
// // Service Worker for PWA end

// // Live chat part start
// import Cookies from 'js-cookie';
// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js'

// // Laravel echo setup
// // if (typeof window !== 'undefined') {
// //   const authEndpointBaseUrl = import.meta.env.VITE_API_BASE_URL;
// //   const token = Cookies.get('alumniLoggedInTokenCookie');
// //   window.Pusher = Pusher

// //   // with pusher
// //   window.Echo = new Echo({
// //     broadcaster: 'pusher',
// //     key: '94fc42daa3f883fa52e4',
// //     cluster: 'ap2',
// //     forceTLS: true,
// //     authEndpoint: `${authEndpointBaseUrl}/broadcasting/auth`,
// //     auth: {
// //       headers: {
// //         authorization: token ? `Bearer ${token}` : null // Enabled - If you are using Bearer for authentication
// //       }
// //     }
// //   });
  
// //   // without pusher
// //   window.Echo = new Echo({
// //     broadcaster: 'pusher',
// //     key: 'local',
// //     cluster: 'mt1',
// //     wsHost: window.location.hostname,
// //     authEndpoint: `${authEndpointBaseUrl}/broadcasting/auth`,
// //     encrypted: true,
// //     forceTLS: false,
// //     wsPort: 6001,
// //     wssPort: 6001,
// //     disableStats: true,
// //     enabledTransports: ['ws', 'wss'],
// //     auth: {
// //       headers: {
// //         authorization: `Bearer ${token}`,
// //       },
// //     },
// //   });
// // }
// // Live chat part end

// export function createApp(ctx) {
//   const app = createSSRApp(App);
//   const pinia = createPinia();
//   app.use(pinia);
//   const router = createRouter();
//   app.use(router);
//   const store = useStore();
//   app.use(VueSocialSharing);
//   app.use(head);
//   app.use(VueProgressBar, options);
//   app.use(Toast, toastOptions);
//   app.use(VueSweetalert2);
  
//   // add global function start
//   let backendUrl = import.meta.env.VITE_API_BASE_URL;
//   app.config.globalProperties.$setting = function(key) {
//     return axios.get(`${backendUrl}/setting/fetch`, {params: { keysArray: key }})
//     .then((response) => {return response.data})
//     .catch(error => false);
//   }
//   // add global function end

//   // Live chat part start
//   if (typeof window !== 'undefined') {
//     const authEndpointBaseUrl = import.meta.env.VITE_API_BASE_URL;
//     const token = Cookies.get('alumniLoggedInTokenCookie');
//     window.Pusher = Pusher
//     window.Echo = new Echo({
//       broadcaster: 'pusher',
//       key: '94fc42daa3f883fa52e4',
//       cluster: 'ap2',
//       forceTLS: true,
//       authEndpoint: `${authEndpointBaseUrl}/broadcasting/auth`,
//       auth: {
//         headers: {
//           authorization: token ? `Bearer ${token}` : null // Enabled - If you are using Bearer for authentication
//         }
//       }
//     });
//   }
//   // Live chat part end

//   // Pass the ctx object as a prop to the root component
//   app.provide("ctx", ctx);

//   return { app, pinia, router, store };
// }
