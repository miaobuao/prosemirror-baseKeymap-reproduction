import { defineConfig } from '@rsbuild/core';

export default defineConfig({
    output: {
        assetPrefix: "./",
        distPath: {
            root: "docs"
        },
        cleanDistPath: true,
    }
});
