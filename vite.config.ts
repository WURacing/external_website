import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        eslint(),
        (async () => {
            const { imagetools } = await import("vite-imagetools");
            return imagetools();
        })(),
    ],
    build: {
        outDir: "../../public/dist",
        emptyOutDir: true,
        manifest: true,
    },
    assetsInclude: ['**/*.mov'],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
