export interface IQuestion {
  type: string
  name: string
  message: string
  default: boolean
}

export interface IAnswer {
  installDependencies: boolean
  initializeGit: boolean
}
