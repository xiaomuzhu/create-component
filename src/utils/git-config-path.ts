import { pathExistsSync } from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

export function getGitConfigPath () {
  let configPath = path.join(os.homedir(), '.gitconfig')
  if (!pathExistsSync(configPath)) {
    configPath = path.join(os.homedir(), '.config/git/config')
  }

  return pathExistsSync(configPath) ? configPath : null
}
