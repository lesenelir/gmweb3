import { IQuestion } from '../types'

export const questions: IQuestion[] = [
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

