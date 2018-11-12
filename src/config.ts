const config = {
  title: 'create-component',
  projectType: '',
  cwd: process.cwd(),
  src: 'src',
  dest: 'dist',
  pages: '{{src}}/pages',
  packages: 'packages', // wxc组件项目目录
  log: {
    verbose: true, // 显示详细信息
    time: true, // 显示时间
    level: 0, // 日志级别
  },
}

export default config
