import path from 'node:path'
import yargs from "yargs"
import fs from 'fs-extra'
import { hideBin } from 'yargs/helpers'

import { __dirname } from './utils/get-file-name'

// main entry point for the CLI
export async function cli(args: string[]) {
  // 1. parse input <app-name> argument
  const argv = await yargs(hideBin(args)).argv
  const appName = argv._[0] as string

  if (!appName) {
    console.error('please provide an app name, e.g. `npx @lesenelir/gmweb3 my-app`')
    process.exit(1)
  }

  // 2. create project directory
  const templateDir = path.join(__dirname, '../templates') // templates directory
  const targetDir = path.join(process.cwd(), appName)      // target directory

  if (fs.existsSync(targetDir)) {
    console.error(`directory ${appName} already exists`)
    process.exit(1)
  }

  console.log(templateDir)
  console.log(targetDir)

  // 3. copy template files
  try {
    await fs.copy(templateDir, targetDir)

    // 4. optional: perform other tasks, such as installing dependencies, initializing git repo, etc.
  } catch (e) {
    console.error('error copying template files', e)
    process.exit(1)
  }
}

