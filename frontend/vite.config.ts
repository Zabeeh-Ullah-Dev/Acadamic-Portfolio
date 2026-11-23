import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resolve-og-app-url',
        transformIndexHtml(html: string): string {
          const rawUrl = (
            process.env.VITE_APP_URL ||
            process.env.APP_URL ||
            'https://ais-pre-6kvgxivvpkrzsddonpg7qa-979458670382.asia-southeast1.run.app'
          ).replace(/\/$/, '');
          const baseUrl = rawUrl.replace('://ais-dev-', '://ais-pre-');
          return html.replace(/__APP_URL__/g, baseUrl);
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(import.meta.dirname, 'dist');
          const srcAssets = path.resolve(import.meta.dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      // Local dev server endpoints to persist CMS profile changes & uploads directly to disk
      // so changes never revert across dev server restarts or browser reloads.
      {
        name: 'local-dev-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/save-profile' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const targetPath = path.resolve(import.meta.dirname, 'src/data/localProfileOverride.json');
                  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, savedAt: Date.now() }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
              return;
            }

            if (req.url === '/api/upload-media' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { fileName, dataUrl } = JSON.parse(body);
                  if (!dataUrl) throw new Error('Missing dataUrl');
                  const matches = dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                  if (!matches || matches.length !== 3) throw new Error('Invalid base64 data');
                  const ext = fileName ? path.extname(fileName) : '.png';
                  const safeName = `uploaded_${Date.now()}${ext || '.png'}`;
                  const uploadDir = path.resolve(import.meta.dirname, 'public/assets/portfolio');
                  if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                  }
                  const filePath = path.join(uploadDir, safeName);
                  fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'));
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, publicUrl: `/assets/portfolio/${safeName}` }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
              return;
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('src/data/portfolioData')) {
              return 'portfolio-data';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
