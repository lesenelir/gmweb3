#!/usr/bin/env node

// npx @lesenelir/gmweb3 <app-name>
import { cli } from '../dist/index.js'
cli(process.argv).then(() => {})
