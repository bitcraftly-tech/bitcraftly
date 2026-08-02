import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    name: 'unit',
    environment: 'happy-dom',
    globals: false,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'tests/**'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: [
        'src/lib/cn.ts',
        'src/features/pricing/calculator/pricing-calculator.engine.ts',
        'src/features/admin/admin.routes.ts',
        'src/features/admin/admin.nav.ts',
        'src/features/blog/blog.utils.ts',
        'src/features/lead-funnel/contact-form.schema.ts',
        'src/features/admin/components/AdminStatusBadge.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
});
