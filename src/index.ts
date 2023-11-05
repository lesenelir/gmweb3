import path from 'path'
import fse from 'fs-extra'
import inquirer from 'inquirer'
import { access } from 'fs/promises'
import { execSync } from 'child_process'
import { fileURLToPath } from 'node:url'

type TQuestion = {
  type: string
  name: string
  message: string
  default: boolean
}

type TAnswer = {
  installDependencies: boolean
  initializeGit: boolean
}

const questions: TQuestion[] = [
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

async function checkDirectoryAndExit(targetDir: string): Promise<boolean> {
  try {
    await access(targetDir)
    // targetDir exists return false to exit
    return false
  } catch (error) {
    // targetDir does not exist return true to continue
    return true
  }
}

// main entry point for the CLI
export async function init(args: string[]) {
  // 1. parse input <app-name> argument
  const appName = args[2]
  // const argv = await yargs(hideBin(args)).argv
  // const appName = argv._[0] as string

  if (!appName) {
    console.error('please provide an app name, e.g. `npx @lesenelir/gmweb3 my-app`')
    process.exit(1)
  }

  // 2. create project directory
  const templateDir = fileURLToPath(new URL('../templates', import.meta.url)) // templates directory
  const targetDir = path.join(process.cwd(), appName)      // target directory
  const flag = await checkDirectoryAndExit(targetDir)

  if (!flag) {
    console.error(`directory ${appName} already exists`)
    process.exit(1)
  }

  try {
    const answers: TAnswer = await inquirer.prompt(questions) // get answers from command line

    // 3. copy template files
    await fse.copy(templateDir, targetDir, {
      filter: (src) => (
         !src.includes('.DS_Store') &&
         !src.includes('dist') &&
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
