import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte(), dts({ tsconfigPath: "./tsconfig.app.json", rollupTypes: true})],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "AnkiUtils",
            fileName: "ankiutils",
        },
    },
});
