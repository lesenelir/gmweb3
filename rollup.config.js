import typescript from '@rollup/plugin-typescript'
import autoExternal from "rollup-plugin-auto-external"
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  plugins: [autoExternal(), typescript({exclude: ['templates/**']}), nodeResolve()]
}
