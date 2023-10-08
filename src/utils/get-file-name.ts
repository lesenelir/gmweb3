import path from 'path'
import { fileURLToPath } from 'url'

// __filename and __dirname equivalent in ESM
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
