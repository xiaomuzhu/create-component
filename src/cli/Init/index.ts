import * as fs from 'fs-extra'
import * as glob from 'glob'
import { prompt, Question } from 'inquirer'
import * as _ from 'lodash'
import * as path from 'path'
import config from '../../config'
import utils, { log } from '../../utils'
import { Manger } from '../../utils/tools'
import { FrameworkType, Language, OpenSourceLicenseType } from './../../utils/tools'
import { InitCommand, IOptions } from './init-command'

export default {
  name: 'init [name]',
  alias: '',
  usage: '[name]',
  description: '创建组件',
  options: [],
  action: async (proName: string) => {
    try {
      // 获取 answers
      let options = await getOptions(proName)

      // 项目名称为空，从路径里获取文件名
      proName = proName || path.basename(options.proPath)

      // 字段做容错处理
      const defaults = {
        proName: proName,
        title: config.title,
        description: options.title || config.title,
        gitUrl: '',
        author: '',
        useCommitlint: false,
        usePrecommit: false,
        useCommitizen: false,
        useCHANGELOG: false,
      }

      options = _.merge(defaults, options)

      const initCommand = new InitCommand(options)
      await initCommand.run()
    } catch (error) {
      log.error(error)
    }
  },
}

function getOptions(proName: string): Promise<IOptions> {
  const CREATE_QUESTIONS: Question[] = [
    {
      type: 'input',
      message: '请设置项目目录',
      name: 'proPath',
      default: (answers: any) => {
        return utils.getDestProjectPath(proName || '')
      },
      filter: (input: string) => {
        return input.trim()
      },
      validate: (input: string, answers: any) => {
        if (input === '') {
          return '请输入项目目录'
        }

        if (!path.isAbsolute(input)) {
          return `格式不正确，请更换绝对路径`
        }

        if (fs.existsSync(input) && glob.sync('**', { cwd: input }).length > 0) {
          return `不是空目录，请更换`
        }
        return true
      },
    },
    {
      type: 'list',
      message: '请选择框架类型',
      name: 'frameworkType',
      default: FrameworkType.React,
      choices: () => {
        return [
          {
            name: 'React',
            value: FrameworkType.React,
          },
        ]
      },
    },
    {
      type: 'list',
      message: '请选择项目语言',
      name: 'projectLanguage',
      default: Language.JavaScript,
      choices: () => {
        return [
          {
            name: 'JavaScript',
            value: Language.JavaScript,
          },
          {
            name: 'TypeScript',
            value: Language.TypeScript,
          },
        ]
      },
    },
    {
      type: 'input',
      message: '请设置项目标题',
      name: 'title',
      default: config.title,
      filter: (input: string) => {
        return input.trim()
      },
      validate: (input: string, answers: any) => {
        if (input === '') {
          return '请输入标题'
        }
        return true
      },
    },
    {
      type: 'input',
      message: '请设置项目描述',
      name: 'description',
      default: (answers: any) => {
        return answers.title
      },
    },
    {
      type: 'input',
      message: '请设置GIT仓库地址',
      name: 'gitUrl',
    },
    {
      type: 'input',
      message: '请设置Author',
      name: 'author',
      default: process.env.USER,
    },
    {
      type: 'input',
      message: '请设置版本号',
      name: 'proVersion',
      default: config.version,
    },
    {
      type: 'list',
      message: '请选择开源证书',
      name: 'license',
      default: OpenSourceLicenseType.MIT,
      choices: () => {
        return [
          {
            name: 'MIT',
            value: OpenSourceLicenseType.MIT,
          },
          {
            name: 'BSD',
            value: OpenSourceLicenseType.BSD,
          },
          {
            name: 'Apache',
            value: OpenSourceLicenseType.Apache,
          },
        ]
      },
    },
    {
      type: 'list',
      message: '请选择包管理工具',
      name: 'manger',
      default: Manger.NPM,
      choices: () => {
        return [
          {
            name: 'npm',
            value: Manger.NPM,
          },
          {
            name: 'yarn',
            value: Manger.YARN,
          },
        ]
      },
    },
    {
      type: 'confirm',
      message: '是否继续高级设置',
      name: 'isContinue',
      default: true,
    },
    {
      type: 'confirm',
      message: '是否使用precommit对提交代码进行检测',
      name: 'usePrecommit',
      default: true,
      when: (answers: any) => {
        return !!answers.isContinue
      },
    },
    {
      type: 'confirm',
      message: '是否使用Commitizen规范commit message',
      name: 'useCommitizen',
      default: true,
      when: (answers: any) => {
        return !!answers.isContinue
      },
    },
    {
      type: 'confirm',
      message: '是否使用Commitlint校验commit message',
      name: 'useCommitlint',
      default: true,
      when: (answers: any) => {
        return !!answers.isContinue
      },
    },
    {
      type: 'confirm',
      message: '是否自动生成CHANGELOG',
      name: 'useCHANGELOG',
      default: true,
      when: (answers: any) => {
        return !!answers.isContinue
      },
    },
  ]

  return prompt(CREATE_QUESTIONS) as Promise<IOptions>
}
