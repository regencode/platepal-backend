import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/main.ts',
  outDir: 'dist',
  format: 'esm',
  target: 'node20',
  clean: true,
  sourcemap: true,
  bundle: true,

  // REQUIRED for NestJS + Prisma
  external: [
    '@nestjs/*',
    '@prisma/client',
    './generated/prisma/client'
  ]
});
