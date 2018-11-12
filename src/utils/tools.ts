import * as _ from 'lodash'
import * as path from 'path'
import config from '../config'

/**
 * 脚手架语言类型
 *
 * @export
 * @enum {number}
 */
export enum Language {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
}

/**
 * 框架模板类型
 *
 * @export
 * @enum {number}
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
 * @enum {number}
 */
enum OpenSourceLicenseType {
  BSD = 'BSD',
  MIT = 'MIT',
  Apache = 'Apache',
}

export interface IScaffoldType {
  FrameworkType: FrameworkType
  Language: Language
  OpenSourceLicenseType: OpenSourceLicenseType
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
