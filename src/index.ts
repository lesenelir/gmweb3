import fs from 'node:fs'
import fse from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { red, green, bold } from 'kolorist'
import { default as prompts } from 'prompts'
import * as process from 'process'

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-")
}

// if the dir is empty or not exist
function canSafelyOverwrite(dir: string) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}

export async function init() {
  let targetDir = ''

  const defaultProjectName = 'gmweb3'

  const templateRoot = fileURLToPath(new URL('../templates', import.meta.url))

  // const CHOICES = fs.readdirSync(templateRoot) // read file to array

  let result: {
    packageName: string
    shouldOverwrite: string
  }

  try {
    result = await prompts(
      [
        {
          name: 'projectName',
          type: 'text',
          message: 'Project Name',
          initial: defaultProjectName,
          onState: (state: any) =>
            (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: "shouldOverwrite",
          type: () => (canSafelyOverwrite(targetDir) ? null : "confirm"),
          message: `${targetDir} is not empty. Remove existing files and continue?`
        },
        {
          name: "overwriteChecker",
          type: (values: any) => {
            if (values === false) {
              throw new Error(red("✖") + " Operation cancelled")
            }
            return null
          }
        },
        {
          name: "packageName",
          type: () => (isValidPackageName(targetDir) ? null : "text"),
          message: "Package name",
          initial: () => toValidPackageName(targetDir),
          validate: (dir: string) =>
            isValidPackageName(dir) || "Invalid package.json name"
        }
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled by the user")
        }
      }
    )

    const { packageName, shouldOverwrite } = result
    const root = path.resolve(targetDir)

    if (shouldOverwrite) {
      fse.emptyDirSync(root) // empty dir
    } else if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true }) // create dir
    }

    const pkg = {
      name: packageName ?? toValidPackageName(targetDir),
      version: '0.0.0',
    }

    console.log('setting up project...')

    const templateDir = path.join(templateRoot)

    // Read existing package.json from the root directory
    const packageJsonPath = path.join(root, "package.json")

    // Read new package.json from the template directory
    const newPackageJsonPath = path.join(templateDir, "package.json")
    const newPackageJson = JSON.parse(
      fs.readFileSync(newPackageJsonPath, "utf-8")
    )

    fse.copySync(templateDir, root)

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(
        {
          ...newPackageJson,
          ...pkg
        },
        null,
        2
      )
    )

    console.log(`\nDone. Now run:\n`)
    console.log(`${bold(green(`cd ${targetDir}`))}`)
    console.log(`${bold(green(`pnpm install`))}`)
    console.log(`${bold(green(`pnpm dev`))}`)
    console.log()
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
    process.exit(1)
  }
}
