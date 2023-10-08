import inquirer from 'inquirer'

import type { IQuestion, IAnswer } from './types'

export function askQuestions(questions: IQuestion[]): Promise<IAnswer> {
  return inquirer.prompt(questions)
}
