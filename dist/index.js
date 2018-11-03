#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
commander
    .command('module')
    .alias('m')
    .description('创建新模块')
    .option('-a, --name [moduleName]', '模块名称')
    .action(() => {
    console.log('hello world1');
});
commander.parse(process.argv);
