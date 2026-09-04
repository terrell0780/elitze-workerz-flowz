import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'server/**/*.test.ts', 'src/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    testTimeout: 15_000,
    coverage: {
      provider: 'v8',
      include: ['shared/**/*.ts', 'server/src/**/*.ts', 'src/lib/**/*.ts'],
      reporter: ['text', 'html'],
    },
  },
});
