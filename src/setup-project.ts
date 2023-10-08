import { execSync } from 'child_process'

export function setupProject(command: string) {
  if (command.includes('install')) {
    console.log('Installing dependencies...')
  }

  if (command.includes('git')) {
    console.log('Initializing git repository...')
  }

  execSync(command, { stdio: 'inherit' })
}
