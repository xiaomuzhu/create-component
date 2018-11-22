import config from '../config'
import { FrameworkType, Language } from '../utils/tools'
import { OpenSourceLicenseType } from './../utils/tools'

export default {
  title: config.title,
  description: config.description,
  author: config.author,
  useCommitlint: false,
  usePrecommit: false,
  useCommitizen: false,
  useCHANGELOG: false,
  frameworkType: FrameworkType.React,
  projectLanguage: Language.JavaScript,
  license: OpenSourceLicenseType.MIT,
  proVersion: '1.0.0',
  manger: 'npm',
  isContinue: false,
}
