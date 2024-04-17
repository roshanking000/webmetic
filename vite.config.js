import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), sentryVitePlugin({
        org: "webmetic",
        project: "react"
    })],

    server: {
        port: 7777,
    },

    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },

    build: {
        sourcemap: true
    }
});