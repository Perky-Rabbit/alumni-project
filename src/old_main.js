import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Cookies from 'js-cookie';
import * as serviceWorker from '/src/service-worker.js';
// import  Abcd  from './service-worker.js';
// vue sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// progressbar
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

// notification toastr
import Notifications from '@kyvg/vue3-notification'

// social sharing
import VueSocialSharing from 'vue-social-sharing'

// meta add in head
import { createHead } from '@vueuse/head'
const head = createHead()

// Messaging
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const token = Cookies.get('alumniLoggedInTokenCookie');
const authEndpointBaseUrl = store.state.backendUrl

// with pusher credential
// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: '94fc42daa3f883fa52e4',
//   cluster: 'ap2',
//   wsHost: window.location.hostname,
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true
// });

if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => {
    navigator.serviceWorker.register(serviceWorker)
        .then(registration => {
          console.log('Service worker registered: ', registration)
        })
        .catch(registrationError => {
          console.log('Service worker registration failed: ', registrationError)
        })
  // })
}

// without pusher credential
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'local',
  cluster: 'mt1',
  wsHost: window.location.hostname,
  authEndpoint: `${authEndpointBaseUrl}/broadcasting/auth`,
  encrypted: true,
  forceTLS: false,
  wsPort: 6001,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  auth: {
    headers: {
      authorization: `Bearer ${token}`,
    }
  }
})

// createApp(App)
//   .use(router)
//   .use(store)
//   .use(VueSweetalert2)
//   .use(VueProgressBar, options)
//   .use(Notifications)
//   .use(VueSocialSharing)
//   .mount("#app");

const app = createApp(App)

// global function start for site setting
import axios from 'axios';
let backendUrl = store.state.backendUrl;
app.config.globalProperties.$setting = function(key) {
  // return axios.get(`${backendUrl}/setting/${key}`)
  // .then((response) => {
  //   return response.data.message;
  // })
  // .catch(error => false);

  return axios.get(`${backendUrl}/setting/fetch`, {params: { keysArray: key }})
  .then((response) => {return response.data})
  .catch(error => false);
}
// global function end for site setting

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.use(VueProgressBar, options)
app.use(Notifications)
app.use(VueSocialSharing)
app.use(head)
app.mount("#app");
