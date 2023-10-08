import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: "src/cli.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  context: 'global',
  moduleContext: 'global',
  plugins: [resolve(), commonjs(), typescript({exclude: ['templates/**']})]
}
