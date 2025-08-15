// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import{fileURLToPath} from "node:url";
import Sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const names = [
  '/',
  '/about',
  '/services',
  '/quote',
]
const dynamicRoutes = names.map(name => `/${name}`)
export default defineConfig({
  plugins: [react(),
    Sitemap({ hostname: 'https://barberpressure.com/',dynamicRoutes
      
     }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
});
