import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SystemDesignToolkit',
      fileName: (format) => `toolkit.${format}.js`,
      formats: ['es', 'umd'] // ES modules first for better tree-shaking
    },
    rollupOptions: {
      // Don't externalize anything for standalone web component usage
      // This ensures the toolkit works independently in AlpineJS projects
      external: [],
      output: [
        {
          format: 'es',
          entryFileNames: 'toolkit.es.js',
          assetFileNames: 'assets/[name].[ext]'
        },
        {
          format: 'umd',
          name: 'SystemDesignToolkit',
          entryFileNames: 'toolkit.umd.js',
          assetFileNames: 'assets/[name].[ext]',
          // For UMD builds, make React available globally if needed
          globals: {},
          // Ensure proper exports
          exports: 'named',
          // Add banner to indicate this includes web components
          banner: '/* Axero Design System Toolkit - Includes Web Components for AlpineJS */'
        }
      ]
    },
    outDir: 'dist',
    emptyOutDir: true, // Clean dist folder on each build
    target: 'es2015', // Support for custom elements
    minify: 'esbuild',
    sourcemap: true, // Include sourcemaps for debugging
    cssCodeSplit: false // Bundle all CSS into a single file
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});
