#!/usr/bin/env node

// npx @lesenelir/gmweb3 <app-name>

import { init } from '../dist/index.js'

init(process.argv).catch((e) => {
  console.error(e)
})
