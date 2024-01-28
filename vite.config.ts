import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/dist/",
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
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "./index.html"),
                gallery: path.resolve(__dirname, "./gallery.html"),
                history: path.resolve(__dirname, "./history.html"),
                team: path.resolve(__dirname, "./team.html"),
                sponsors: path.resolve(__dirname, "./sponsors.html"),
            },
        },
    },
    assetsInclude: ['**/*.mov'],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
