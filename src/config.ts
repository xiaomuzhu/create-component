import { getUser } from './utils/get-default-params'

const config = {
  title: 'create-component',
  description: 'a component',
  cwd: process.cwd(),
  author: getUser().name,
  gitUrl: `https://github.com/${getUser().name}`,
  src: 'src',
  dest: 'dist',
  version: '1.0.0',
  packages: 'packages',
  log: {
    verbose: true, // 显示详细信息
    time: true, // 显示时间
    level: 0, // 日志级别
  },
}

export default config
