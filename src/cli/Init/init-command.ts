import * as glob from 'glob'
import * as memFs from 'mem-fs'
import * as editor from 'mem-fs-editor'
import utils, { exec, LogType } from '../../utils/index'
import { log } from '../../utils/log'
import { IScaffoldType } from '../../utils/tools'

export interface IOptions {
  proName: string
  proPath: string
  dest: string
  projectType: string
  scaffoldType: IScaffoldType
  title: string
}

export class InitCommand {
  constructor(public options: IOptions) {}

  async run() {
    await this.copyScaffold()

    await this.npmInstall()

    // 提示使用
    log.newline()
    log.msg(LogType.TIP, `项目创建完成`)
  }

  private async copyScaffold() {
    const { proName, proPath, scaffoldType } = this.options

    // 内存管理
    const store = memFs.create()
    const fsEditor = editor.create(store)

    // 拷贝脚手架
    fsEditor.copyTpl(utils.getScaffoldPath(scaffoldType), proPath, this.options)

    return new Promise((resolve, reject) => {
      // 保存
      fsEditor.commit(() => {
        log.newline()
        log.msg(LogType.CREATE, `项目 "${proName}" in "${proPath}"`)

        const files = glob.sync('**', {
          cwd: proPath,
        })
        files.forEach(file => log.msg(LogType.COPY, file))

        log.msg(LogType.COMPLETE, '项目已创建完成')
        resolve()
      })
    })
  }

  private async npmInstall() {
    const { proPath } = this.options
    // 执行 npm install
    log.newline()
    log.msg(LogType.RUN, '命令：npm install')
    log.msg(LogType.INFO, '安装中, 请耐心等待...')
    await exec('npm', ['install'], true, {
      cwd: proPath,
    })
  }
}
