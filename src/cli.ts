import path from 'path'
import yargs from "yargs"
import fs from 'fs-extra'
import inquirer from 'inquirer'
import { hideBin } from 'yargs/helpers'
import { execSync } from 'child_process'

import type { IAnswer, IQuestion } from './types'
import { __dirname } from './utils/get-file-name'

const questions: IQuestion[] = [
  {
    type: 'confirm',
    name: 'installDependencies',
    message: 'Do you want to install dependencies?',
    default: true
  },
  {
    type: 'confirm',
    name: 'initializeGit',
    message: 'Do you want to initialize a git repository?',
    default: true
  }
]

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

  try {
    const answers: IAnswer = await inquirer.prompt(questions) // get answers from command line

    // 3. copy template files
    await fs.copy(templateDir, targetDir, {
      filter: (src) => (
         !src.includes('.DS_Store') &&
         !src.includes('node_modules') &&
         !src.includes('pnpm-lock.yaml') &&
         !src.includes('.git') &&
         !src.includes('.gitignore')
      )
    })

    // change current working directory to target directory
    process.chdir(targetDir)

    // 4. perform other tasks, such as installing dependencies, initializing git repo, etc.
    if (answers.installDependencies) {
      console.log('Installing dependencies...')
      execSync('pnpm install', { stdio: 'inherit' })
    }

    if (answers.initializeGit) {
      console.log('Initializing git repository...')
      execSync('git init', { stdio: 'inherit' })
    }

    console.log('Project setup completed!')
  } catch (e) {
    console.error('error copying template files', e)
    process.exit(1)
  }
}

