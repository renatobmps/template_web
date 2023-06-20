/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [require('@vitejs/plugin-react')()],
  test: {
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    setupFiles: ['./setupTests.ts'],
  },
  resolve: {
    alias: {
      '@errors': path.resolve(__dirname, './src/errors'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@serverEntities': path.resolve(__dirname, './src/server/entities'),
      '@serverProviders': path.resolve(__dirname, './src/server/providers'),
      '@serverUseCases': path.resolve(__dirname, './src/server/services'),
      '@UIPages': path.resolve(__dirname, './src/UI/pages'),
      '@UIShared': path.resolve(__dirname, './src/UI/shared'),
    },
  },
});
