import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useStore = defineStore({
    id: 'data',

    state: () => ({
        // define global variables
        alt: "Image",
        cccLogo: "/home/assets/images/ewu-logo-header-white.png",
        locationMap: "/home/assets/images/map.png",
        dashboardLogo: "/assets/img/ccc_logo.png",
        alumniHeaderImage: "/assets/img/p1.png",
        alumniImage: "/assets/img/p13.png",
        alumniLogo: "/assets/img/logo.svg",
        post: "/assets/img/post.jpg",
        avatar: "/assets/img/avatar.png",
        backgroud_image: "/assets/img/background-avatar.png",
        alumniFooterBg: "/home/assets/images/shape-1.png",
        members: [],
    }),
  
    getters: {
        // get state variables value
    },
    
    actions: {
        setAlumniLoggedInInfo(data) {
            if (window.location.origin.includes('ewubd.edu')){
                Cookies.set('alumniLoggedInTokenCookie', data.token, { domain: '.ewubd.edu', path: '/', expires: 1/24 }) // expires in 1 hour
                Cookies.set('authIdCookie', data.auth_id, { domain: '.ewubd.edu', path: '/', expires: 1/24 }) // expires in 1 hour
                Cookies.set('alumniIdCookie', data.alumni_id, { domain: '.ewubd.edu', path: '/', expires: 1/24 }) // expires in 1 hour
            } else{
                Cookies.set('alumniLoggedInTokenCookie', data.token) // expires in 1 hour
                Cookies.set('authIdCookie', data.auth_id) // expires in 1 hour
                Cookies.set('alumniIdCookie', data.alumni_id) // expires in 1 hour
            }
        },

        removeAlumniLoggedInInfo() {
            if (window.location.origin.includes('ewubd.edu')){
                if (Cookies.get('alumniLoggedInTokenCookie') && Cookies.get('authIdCookie')){
                    Cookies.remove('alumniLoggedInTokenCookie', { domain: '.ewubd.edu' })
                    Cookies.remove('authIdCookie', { domain: '.ewubd.edu' })
                    Cookies.remove('alumniIdCookie', { domain: '.ewubd.edu' })
                } else if (Cookies.get('jobUserLoggedInToken') && Cookies.get('authIdCookie')){
                    Cookies.remove('jobUserLoggedInToken', { domain: '.ewubd.edu' })
                    Cookies.remove('authIdCookie', { domain: '.ewubd.edu' })
                    Cookies.remove('alumniIdCookie', { domain: '.ewubd.edu' })
                }
            } else {
                if (Cookies.get('alumniLoggedInTokenCookie') && Cookies.get('authIdCookie')){
                    Cookies.remove('alumniLoggedInTokenCookie')
                    Cookies.remove('authIdCookie')
                    Cookies.remove('alumniIdCookie')
                } else if (Cookies.get('jobUserLoggedInToken') && Cookies.get('authIdCookie')){
                    Cookies.remove('jobUserLoggedInToken')
                    Cookies.remove('authIdCookie')
                    Cookies.remove('alumniIdCookie')
                }
            }
        }
    },
})

// import { createStore } from "vuex";
// import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie';
// console.log('safasdfasdfas');
// const store = createStore({
//   state: {
//     // define global variables
//     alt: "Image",
//     cccLogo: "home/assets/images/ewu-logo-header-white.png",
//     cccMap: "home/assets/images/map.png",
//     dashboardLogo: "assets/img/ccc_logo.png",
//     alumniHeaderImage: "assets/img/p1.png",
//     alumniImage: "assets/img/p13.png",
//     alumniLogo: "assets/img/logo.svg",
//     post: "assets/img/post.jpg",
//     avatar: "assets/img/avatar.png",
//     backgroud_image: "assets/img/background-avatar.png",
//     alumniFooterBg: "home/assets/images/shape-1.png",
//     members: [],

//     backendUrl: "http://localhost:8000",

//     // backendUrl: "https://ccc-server.ewubd.edu",
    
//     // backendUrl:  "http://server.fscd.xyz",

//     // backendUrl: window.location.origin.includes('fscd.xyz') ? "http://server.fscd.xyz" : "http://localhost:8000" ,
//   },

//   getters: {
//     // get state variables value
//   },

//   actions: {
//     //action to be performed
//     setAlumniLoggedInInfo(context, payload) {
//       context.commit("updateAlumniLoggedInInfo", payload);
//     },

//     removeAlumniLoggedInInfo(context) {
//       context.commit("updateAlumniLoggedInInfo", {auth_alumni_id: '', auth_user_id: '', token: ''});
//     }
//   },

//   mutations: {
//     // update state variables value
//     updateAlumniLoggedInInfo(state, data) {
//       if (data.token && data.auth_id && data.alumni_id) {
//         if (window.location.origin.includes('fscd.xyz')){
//           Cookies.set('alumniLoggedInTokenCookie', data.token, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//           Cookies.set('authIdCookie', data.auth_id, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//           Cookies.set('alumniIdCookie', data.alumni_id, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//         } else{
//           Cookies.set('alumniLoggedInTokenCookie', data.token) // expires in 1 hour
//           Cookies.set('authIdCookie', data.auth_id) // expires in 1 hour
//           Cookies.set('alumniIdCookie', data.alumni_id) // expires in 1 hour
//         }
//       }else{
//         if (window.location.origin.includes('fscd.xyz')){
//           if (Cookies.get('alumniLoggedInTokenCookie') && Cookies.get('authIdCookie')){
//             Cookies.remove('alumniLoggedInTokenCookie', { domain: '.fscd.xyz' })
//             Cookies.remove('authIdCookie', { domain: '.fscd.xyz' })
//             Cookies.remove('alumniIdCookie', { domain: '.fscd.xyz' })
//           } else if (Cookies.get('jobUserLoggedInToken') && Cookies.get('authIdCookie')){
//             Cookies.remove('jobUserLoggedInToken', { domain: '.fscd.xyz' })
//             Cookies.remove('authIdCookie', { domain: '.fscd.xyz' })
//             Cookies.remove('alumniIdCookie', { domain: '.fscd.xyz' })
//           }
//         } else {
//           if (Cookies.get('alumniLoggedInTokenCookie') && Cookies.get('authIdCookie')){
//             Cookies.remove('alumniLoggedInTokenCookie')
//             Cookies.remove('authIdCookie')
//             Cookies.remove('alumniIdCookie')
//           } else if (Cookies.get('jobUserLoggedInToken') && Cookies.get('authIdCookie')){
//             Cookies.remove('jobUserLoggedInToken')
//             Cookies.remove('authIdCookie')
//             Cookies.remove('alumniIdCookie')
//           }
//         }
//       }
//     }
//   },

//   plugins: [
//     createPersistedState({
//       storage: {
//         getItem: key => Cookies.get(key),
//         setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
//         removeItem: key => Cookies.remove(key)
//       }
//     })
//   ]
// });

// export default store;
