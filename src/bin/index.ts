#!/usr/bin/env node

import * as program from 'commander'
import * as _ from 'lodash'
// import * as Pkg from '../../package.json'
import commands from '../index'

program
  .version('0.0.1')
  .option('-v', '--version', () => {
    console.log('0.0.1')
  })
  .usage('<command> [options]')

commands.forEach(command => {
  // create command
  const cmd = program.command(command.name)

  // set alias
  if (command.alias) {
    cmd.alias(command.alias)
  }

  // set usage
  if (command.usage) {
    cmd.usage(command.usage)
  }

  // set description
  if (command.description) {
    cmd.description(command.description)
  }

  // set options
  if (command.options && command.options.length) {
    const options: string[][] = command.options
    options.forEach((option: string[]) => {
      cmd.option(option[0], option[1])
    })
  }

  // set action
  if (command.action) {
    cmd.action(async (...args) => {
      try {
        await command.action.apply(command, args)
      } catch (err) {
        console.error(err)
      }
    })
  }
})

if (process.argv.length === 2) {
  program.outputHelp()
}

program.parse(process.argv)
