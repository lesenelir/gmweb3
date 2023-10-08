import autoExternal from "rollup-plugin-auto-external"
import typescript from '@rollup/plugin-typescript'

export default {
  input: "src/cli.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  external: ['yargs/helpers'], // specify yargs/helpers as external dependency
  plugins: [autoExternal(), typescript({exclude: ['templates/**']})]
}
