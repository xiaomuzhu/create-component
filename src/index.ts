#!/usr/bin/env node

import * as chalk from 'chalk'
import * as commander from 'commander'
import * as inquirer from 'inquirer'

commander
  .command('module')
  .alias('m')
  .description('创建新模块')
  .option('-a, --name [moduleName]', '模块名称')
  .action(() => {
    console.log('hello world1')
  })

commander.parse(process.argv)
