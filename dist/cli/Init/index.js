"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const glob = require("glob");
const inquirer_1 = require("inquirer");
const _ = require("lodash");
const path = require("path");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const tools_1 = require("../../utils/tools");
const tools_2 = require("./../../utils/tools");
const init_command_1 = require("./init-command");
exports.default = {
    name: 'init [name]',
    alias: '',
    usage: '[name]',
    description: '创建组件',
    options: [],
    action: (proName) => __awaiter(this, void 0, void 0, function* () {
        try {
            let options = yield getOptions(proName);
            proName = proName || path.basename(options.proPath);
            const defaults = {
                proName: proName,
                title: config_1.default.title,
                description: options.title || config_1.default.title,
                gitUrl: '',
                author: '',
                useCommitlint: false,
                usePrecommit: false,
                useCommitizen: false,
                useCHANGELOG: false,
            };
            options = _.merge(defaults, options);
            const initCommand = new init_command_1.InitCommand(options);
            yield initCommand.run();
        }
        catch (error) {
            utils_1.log.error(error);
        }
    }),
};
function getOptions(proName) {
    const CREATE_QUESTIONS = [
        {
            type: 'input',
            message: '请设置项目目录',
            name: 'proPath',
            default: (answers) => {
                return utils_1.default.getDestProjectPath(proName || '');
            },
            filter: (input) => {
                return input.trim();
            },
            validate: (input, answers) => {
                if (input === '') {
                    return '请输入项目目录';
                }
                if (!path.isAbsolute(input)) {
                    return `格式不正确，请更换绝对路径`;
                }
                if (fs.existsSync(input) && glob.sync('**', { cwd: input }).length > 0) {
                    return `不是空目录，请更换`;
                }
                return true;
            },
        },
        {
            type: 'list',
            message: '请选择框架类型',
            name: 'frameworkType',
            default: tools_2.FrameworkType.React,
            choices: () => {
                return [
                    {
                        name: 'React',
                        value: tools_2.FrameworkType.React,
                    },
                ];
            },
        },
        {
            type: 'list',
            message: '请选择项目语言',
            name: 'projectLanguage',
            default: tools_2.Language.JavaScript,
            choices: () => {
                return [
                    {
                        name: 'JavaScript',
                        value: tools_2.Language.JavaScript,
                    },
                    {
                        name: 'TypeScript',
                        value: tools_2.Language.TypeScript,
                    },
                ];
            },
        },
        {
            type: 'input',
            message: '请设置项目标题',
            name: 'title',
            default: config_1.default.title,
            filter: (input) => {
                return input.trim();
            },
            validate: (input, answers) => {
                if (input === '') {
                    return '请输入标题';
                }
                return true;
            },
        },
        {
            type: 'input',
            message: '请设置项目描述',
            name: 'description',
            default: (answers) => {
                return answers.title;
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
            default: config_1.default.version,
        },
        {
            type: 'list',
            message: '请选择开源证书',
            name: 'license',
            default: tools_2.OpenSourceLicenseType.MIT,
            choices: () => {
                return [
                    {
                        name: 'MIT',
                        value: tools_2.OpenSourceLicenseType.MIT,
                    },
                    {
                        name: 'BSD',
                        value: tools_2.OpenSourceLicenseType.BSD,
                    },
                    {
                        name: 'Apache',
                        value: tools_2.OpenSourceLicenseType.Apache,
                    },
                ];
            },
        },
        {
            type: 'list',
            message: '请选择包管理工具',
            name: 'manger',
            default: tools_1.Manger.NPM,
            choices: () => {
                return [
                    {
                        name: 'npm',
                        value: tools_1.Manger.NPM,
                    },
                    {
                        name: 'yarn',
                        value: tools_1.Manger.YARN,
                    },
                ];
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
            when: (answers) => {
                return !!answers.isContinue;
            },
        },
        {
            type: 'confirm',
            message: '是否使用Commitizen规范commit message',
            name: 'useCommitizen',
            default: true,
            when: (answers) => {
                return !!answers.isContinue;
            },
        },
        {
            type: 'confirm',
            message: '是否使用Commitlint校验commit message',
            name: 'useCommitlint',
            default: true,
            when: (answers) => {
                return !!answers.isContinue;
            },
        },
        {
            type: 'confirm',
            message: '是否自动生成CHANGELOG',
            name: 'useCHANGELOG',
            default: true,
            when: (answers) => {
                return !!answers.isContinue;
            },
        },
    ];
    return inquirer_1.prompt(CREATE_QUESTIONS);
}
