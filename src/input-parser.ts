import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// return appName
export async function inputParser(args: string[]) {
  // 1. parse input <app-name> argument
  const argv = await yargs(hideBin(args)).argv
  return argv._[0] as string
}
