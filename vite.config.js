import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        productListing: resolve(__dirname, 'src/product_listing/index.html'),
      },
    },
  },
  // This will ensure that the base path for your assets is correct
  base: './',
  
  // Optional server configuration for better local development experience
  server: {
    historyApiFallback: true, // Helps with development routing issues
  },
});
