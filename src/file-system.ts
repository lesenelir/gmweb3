import fs from 'fs-extra'

export function copyTemplateFiles(
  templateDir: string,
  targetDir: string,
  filterFunc: (src: string) => boolean
) {
  return fs.copy(templateDir, targetDir, { filter: filterFunc })
}

