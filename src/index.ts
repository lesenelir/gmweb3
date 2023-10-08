import path from 'path'
import fs from 'fs-extra'

import type { IAnswer } from './types'
import { __dirname } from './utils/get-file-name'
import { inputParser } from './input-parser'
import { askQuestions } from './inquiry-terminal'
import { questions } from './prompts/data'
import { copyTemplateFiles } from './file-system'
import { setupProject } from './setup-project'

export async function cli(args: string[]) {
  // 1. parse input <app-name> argument
  const appName = await inputParser(args)

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
    const answers: IAnswer = await askQuestions(questions)

    const myFilterFunction = (src: string) => {
      return !src.includes('.DS_Store') &&
      !src.includes('node_modules') &&
      !src.includes('pnpm-lock.yaml') &&
      !src.includes('.git') &&
      !src.includes('.gitignore')
    }

    // 3. copy template files
    await copyTemplateFiles(templateDir, targetDir, myFilterFunction)

    // change current working directory to target directory
    process.chdir(targetDir)

    // 4. perform other tasks, such as installing dependencies, initializing git repo, etc.
    if (answers.installDependencies) {
      setupProject('pnpm install')
    }

    if (answers.initializeGit) {
      setupProject('git init')
    }

    console.log('Project setup completed!')
  } catch (e) {
    console.error('error copying template files', e)
    process.exit(1)
  }

}
