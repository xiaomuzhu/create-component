import * as fs from 'fs-extra'
import * as glob from 'glob'
import { prompt, Question } from 'inquirer'
import * as _ from 'lodash'
import * as path from 'path'
import config from '../../config'
import defaultsOptions from '../../options/default'
import { fullOptions } from '../../options/default-full'
import utils, { log } from '../../utils'
import { cleanArgs, Manger } from '../../utils/tools'
import { FrameworkType, Language, OpenSourceLicenseType } from './../../utils/tools'
import { InitCommand, IOptions } from './init-command'

export interface InitCMDOptions {
  defaults: boolean
  noInstall: boolean
  full: boolean
}

export default {
  name: 'init [name]',
  alias: '',
  usage: '[name]',
  description: '创建组件',
  options: [
    ['-d, --defaults', '忽略提示符并使用默认预设选项'],
    ['-n, --noInstall', '跳过 npm install'],
    ['-f, --full', '忽略提示符并使用全部默认预设选项'],
  ],
  action: async (proName: string, cmd: InitCMDOptions) => {
    try {
      const CMDoptions = cleanArgs(cmd)
      if ((CMDoptions as InitCMDOptions).defaults) {
        const options = _.merge(
          defaultsOptions,
          {
            proName: proName,
            proPath: path.join(config.cwd, proName),
            gitUrl: `${config.gitUrl}/${proName}`,
          },
          CMDoptions as InitCMDOptions,
        )

        const initCommand = new InitCommand(options)
        await initCommand.run()
        return
      } else if ((CMDoptions as InitCMDOptions).full) {
        const options = _.merge(
          fullOptions,
          {
            proName: proName,
            proPath: path.join(config.cwd, proName),
            gitUrl: `${config.gitUrl}/${proName}`,
          },
          CMDoptions as InitCMDOptions,
        )

        const initCommand = new InitCommand(options)
        await initCommand.run()
        return
      }

      // 获取 answers
      let options = await getOptions(proName)

      // 项目名称为空，从路径里获取文件名
      proName = proName || path.basename(options.proPath)

      // 字段做容错处理
      const defaults = {
        proName: proName,
        title: config.title,
        description: options.title || config.title,
        gitUrl: `${config.gitUrl}/${proName}`,
        author: config.author,
        useCommitlint: false,
        usePrecommit: false,
        cssinjs: false,
        useCommitizen: false,
        useCHANGELOG: false,
        noInstall: false,
        defaults: false,
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
      message: '是否使用css-in-js',
      name: 'cssinjs',
      default: false,
      when: (answers: any) => {
        return !!answers.isContinue
      },
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
