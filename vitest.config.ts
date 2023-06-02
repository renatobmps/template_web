import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      '@serverEntities': path.resolve(__dirname, './src/server/entities'),
      '@serverRepositories': path.resolve(
        __dirname,
        './src/server/repositories',
      ),
      '@serverUseCases': path.resolve(__dirname, './src/server/services'),
    },
  },
});
