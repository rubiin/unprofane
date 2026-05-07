import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: [
    'esm',
    'cjs'
  ],
  dts: true,
  clean: true,
  minify: true,
  exports: true,
  copy: [
    {
      from: "src/data/*.json", to: "dist/data"
    }
  ]
})
