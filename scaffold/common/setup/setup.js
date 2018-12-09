const shell = require('shelljs')

const isPacked = shell.test('-e', './dist/')

if (!isPacked) {
  shell.exec('npm start')
}

shell.cd('example')

const isInstall = shell.test('-e', './node_modules/')

!shell.which('yarn') && shell.exec('npm install yarn -g')

if (isInstall) {
  try {
    shell.exec('yarn start')
  } catch (e) {
    console.error(e)
  }
} else {
  shell.exec('yarn && yarn start')
}
