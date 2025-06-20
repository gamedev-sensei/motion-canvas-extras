import { defineConfig } from "tsup";

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    esbuildOptions(options) {
        options.alias = { "@gamedev-sensei/in-motion-editor": "./src" }
    }
});