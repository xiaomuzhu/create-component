import * as parseGitConfig from 'parse-git-config'
import { getGitConfigPath } from './git-config-path'


export function getUser() {

  const gitConfigPath = getGitConfigPath()
  const gitConfig = parseGitConfig.sync({ path: gitConfigPath })

  return gitConfig.user
}
