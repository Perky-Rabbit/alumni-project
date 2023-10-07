import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';

export const render = async (url) => {
  const { app, router, head } = createApp();

  const ctx = {};
  const html = await renderToString(app, ctx);

  // console.log(ctx, html);

  return [html, head];
};







// import { basename } from "node:path";
// import { renderToString } from "vue/server-renderer";
// import { createApp } from "./main";
// import { renderHeadToString, useHead } from "@vueuse/head"
// import axios from 'axios';

// export async function render(url, manifest) {
//   const { app, router, head } = createApp();

//   console.log(url);

//   // Fetch SEO data
//   // let seoData;
//   if (url !== '/service-worker.js' && url !=='/favicon.ico' && url !== '/customSw.js') { 
//     try {
//       const apiBaseUrl = 'https://ccc-server.ewubd.edu';
//       const response = await axios.get(`${apiBaseUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } });
  
//       if (response.data.data != null) {
//         // seoData = response.data.data;
//         useHead({
//           title: response.data.data.title,
//           meta: [
//             { name: 'keywords', content: response.data.data.keywords },
//             { name: 'description', content: response.data.data.description },
//           ],
//         });
//       } else {
//         // seoData = {
//         //   title: 'Alumni | EWU',
//         //   keywords: 'alumni-ewu',
//         //   description: 'alumni-ewu',
//         // };

//         useHead({
//           title: 'Alumni | EWU',
//           meta: [
//             { name: 'keywords', content: 'alumni-ewu' },
//             { name: 'description', content: 'alumni-ewu' },
//           ],
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching SEO data:', error);
//     }
//   }

//   // Set SEO data in the head
//   // useHead({
//   //   title: seoData.title,
//   //   meta: [
//   //     { name: 'keywords', content: seoData.keywords },
//   //     { name: 'description', content: seoData.description },
//   //   ],
//   // });

//   await router.push(url);
//   await router.isReady();

//   const ctx = {};
//   const html = await renderToString(app, ctx);
    
//   const { headTags, htmlAttrs, bodyAttrs, bodyTags } = await renderHeadToString(head)

//   const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
//   // return [html, headTags, seoData, preloadLinks];
//   return [html, headTags, preloadLinks];
// }

// function renderPreloadLinks(modules, manifest) {
//   let links = "";
//   const seen = new Set();
//   modules.forEach((id) => {
//     const files = manifest[id];
//     if (files) {
//       files.forEach((file) => {
//         if (!seen.has(file)) {
//           seen.add(file);
//           const filename = basename(file);
//           if (manifest[filename]) {
//             for (const depFile of manifest[filename]) {
//               links += renderPreloadLink(depFile);
//               seen.add(depFile);
//             }
//           }
//           links += renderPreloadLink(file);
//         }
//       });
//     }
//   });
//   return links;
// }

// function renderPreloadLink(file) {
//   if (file.endsWith(".js")) {
//     return `<link rel="modulepreload" crossorigin href="${file}">`;
//   } else if (file.endsWith(".css")) {
//     return `<link rel="stylesheet" href="${file}">`;
//   } else if (file.endsWith(".woff")) {
//     return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
//   } else if (file.endsWith(".woff2")) {
//     return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
//   } else if (file.endsWith(".gif")) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
//   } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
//   } else if (file.endsWith(".png")) {
//     return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
//   } else {
//     return "";
//   }
// }