import * as _ from 'lodash'
import * as path from 'path'
import config from '../config'

/**
 * 脚手架语言类型
 *
 * @export
 * @enum {string}
 */
export enum Language {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
}

/**
 * 框架模板类型
 *
 * @export
 * @enum {string}
 */
export enum FrameworkType {
  React = 'React',
  Vue = 'Vue',
  Angular = 'Angular',
}

/**
 * 开源协议类型
 *
 * @export
 * @enum {string}
 */
export enum OpenSourceLicenseType {
  BSD = 'BSD',
  MIT = 'MIT',
  Apache = 'Apache',
}

/**
 * 包管理类型
 *
 * @export
 * @enum {string}
 */
export enum Manger {
  NPM = 'npm',
  YARN = 'yarn',
}

export interface IScaffoldType {
  FrameworkType: FrameworkType
  Language: Language
  // OpenSourceLicenseType: OpenSourceLicenseType
}

/**
 * 获取脚手架模板的路径
 *
 * @param {ScaffoldType} scaffoldType Scaffold类型
 * @param {string} [filePath=''] 文件地址
 * @returns
 */
export function getScaffoldPath(scaffoldType: IScaffoldType, filePath: string = '') {
  return path.join(
    __dirname,
    `../../scaffold/${scaffoldType.FrameworkType}/${scaffoldType.Language}`,
    filePath,
  )
}

export function getDestProjectPath(projectName: string, filePath: string = '') {
  return path.join(config.cwd, projectName, filePath)
}

export function getLicensePath(licenseType: string) {
  return path.join(__dirname, `../../scaffold/common/LICENSE/${licenseType}`)
}

export function getReadmePath() {
  return path.join(__dirname, '../../scaffold/common/readme')
}

export function getCommitLintPackagePath() {
  return path.join(__dirname, `../../scaffold/common/commitlint`)
}

export function getYear() {
  return new Date().getFullYear()
}

function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

export function cleanArgs(cmd: any) {
  const args = {}
  cmd.options.forEach((o: any) => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
