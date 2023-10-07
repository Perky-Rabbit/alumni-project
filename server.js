import axios from 'axios';
import fs from "node:fs";
import express from 'express';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { renderHeadToString, useHead } from "@vueuse/head";

async function initServer() {
  const app = express();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    const url = req.originalUrl; // Get page url
    const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
    const __dirname = dirname(__filename); // Resolve the directory path of the current file

    // 1. Read index.html
    const templatePath = join(__dirname, 'index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // 2. Apply Vite HTML transforms.
    template = await vite.transformIndexHtml(req.originalUrl, template);

    // 3. Load the server entry file.
    // const render = (await vite.ssrLoadModule('/dist/server/entry-server.js')).render; // for production
    const render = (await vite.ssrLoadModule('/src/entry-server.js')).render;  // for local

    // 4. render the app HTML
    const [appHtml, head] = await render();

    // 5. Fetch SEO data
    if (url !== '/service-worker.js' && url !=='/favicon.ico' && url !== '/customSw.js') { 
      try {
        const apiBaseUrl = 'https://ccc-server.ewubd.edu';
        const response = await axios.get(`${apiBaseUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } });
    
        if (response.data.data != null) {
          useHead({
            title: response.data.data.title,
            meta: [
              { name: 'keywords', content: response.data.data.keywords },
              { name: 'description', content: response.data.data.description },
            ],
          });
        } else {
          useHead({
            title: 'Alumni | EWU',
            meta: [
              { name: 'keywords', content: 'alumni-ewu' },
              { name: 'description', content: 'alumni-ewu' },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    }

    const { headTags, htmlAttrs, bodyAttrs, bodyTags } = await renderHeadToString(head);

    // 6. Inject the app-rendered HTML into the template.
    const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace('<!--head-tags-->', headTags);

    // 7. Send the rendered HTML back.
    res.set({ 'Content-Type': 'text/html' }).end(html);
  });

  return app;
}

initServer().then((app) =>
  app.listen(3001, () => {
    console.log("http://localhost:3001");
  })
);








// import axios from 'axios';
// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
// import { readFileSync } from 'node:fs';
// import express from 'express';
// import { createServer } from 'vite';

// async function initServer() {
//   const app = express();

//   const vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//   });

//   app.use(vite.middlewares);
//   app.use('*', async (req, res) => {
//     const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
//     const __dirname = dirname(__filename); // Resolve the directory path of the current file

//     // 1. Read index.html
//     const templatePath = join(__dirname, 'index.html');
//     let template = readFileSync(templatePath, 'utf-8');

//     // 2. Apply Vite HTML transforms.
//     template = await vite.transformIndexHtml(req.originalUrl, template);

//     // 3. Load the server entry file. ssrLoadModule automatically transforms
//     const render = (await vite.ssrLoadModule('/dist/server/entry-server.js')).render; // for production
//     // const render = (await vite.ssrLoadModule('/src/entry-server.js')).render;  // for local

//     // 4. render the app HTML
//     const { html: appHtml } = await render();

//     // 5. Fetch SEO data based on the environment
//     const apiBaseUrl = 'https://ccc-server.ewubd.edu'; // for production
//     // const apiBaseUrl = 'http://localhost:8000';  // for local
//     const url = req.originalUrl;
//     let metaTags = '';
//     if (url != '/service-worker.js' && url != '/favicon.ico' && url != '/customSw.js') {
//       try {
//         const response = await axios.get(`${apiBaseUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } });
//         if (response.data.data != null) {
//           metaTags = `
//             <title>${response.data.data.title}</title>
//             <meta name="keywords" content="${response.data.data.keywords}">
//             <meta name="description" content="${response.data.data.description}">
//           `;
//         } else {
//           metaTags = `
//             <title>Alumni | EWU</title>
//             <meta name="keywords" content="alumni-ewu">
//             <meta name="description" content="alumni-ewu">
//           `;
//         }
//       } catch (error) {
//         console.error('Error fetching SEO data:', error);
//       }
//     }

//     // 6. Inject the app-rendered HTML into the template.
//     const html = template
//       // .replace('<title>{{ title }}</title>', `<title>Test SEO</title>`)
//       .replace('<title>{{ title }}</title>', metaTags)
//       .replace('<!--main-app-->', appHtml);

//     // 7. Send the rendered HTML back.
//     res.set({ 'Content-Type': 'text/html' }).end(html);
//   });

//   return app;
// }

// initServer().then((app) =>
//   app.listen(3001, () => {
//     console.log("http://localhost:3001");
//   })
// );