import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      '@errors': path.resolve(__dirname, './src/errors'),
      '@serverEntities': path.resolve(__dirname, './src/server/entities'),
      '@serverProviders': path.resolve(__dirname, './src/server/providers'),
      '@serverUseCases': path.resolve(__dirname, './src/server/services'),
    },
  },
});
