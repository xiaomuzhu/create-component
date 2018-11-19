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
const glob = require("glob");
const _ = require("lodash");
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const shell = require("shelljs");
const index_1 = require("../../utils/index");
const log_1 = require("../../utils/log");
class InitCommand {
    constructor(options) {
        this.options = options;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.copyScaffold();
            yield this.npmInstall();
            log_1.log.newline();
            log_1.log.msg(index_1.LogType.TIP, `项目创建完成`);
        });
    }
    copyScaffold() {
        return __awaiter(this, void 0, void 0, function* () {
            const { proName, proPath, projectLanguage, frameworkType, usePrecommit } = this.options;
            const extraOptions = {
                year: index_1.default.getYear(),
            };
            const allOptions = _.merge(this.options, extraOptions);
            const scaffoldType = {
                FrameworkType: frameworkType,
                Language: projectLanguage,
            };
            const store = memFs.create();
            const fsEditor = editor.create(store);
            const globOptions = {
                globOptions: {
                    dot: true,
                },
            };
            fsEditor.copyTpl(index_1.default.getScaffoldPath(scaffoldType), proPath, allOptions, {}, globOptions);
            fsEditor.copyTpl(index_1.default.getLicensePath(this.options.license), proPath, allOptions);
            if (this.options.useCommitlint) {
                fsEditor.copyTpl(index_1.default.getCommitLintPackagePath(), proPath, {}, {}, globOptions);
            }
            return new Promise((resolve, reject) => {
                fsEditor.commit(() => {
                    log_1.log.newline();
                    log_1.log.msg(index_1.LogType.CREATE, `项目 "${proName}" in "${proPath}"`);
                    const files = glob.sync('**', {
                        cwd: proPath,
                        dot: true,
                    });
                    files.forEach(file => log_1.log.msg(index_1.LogType.COPY, file));
                    if (usePrecommit) {
                        this.gitInit();
                    }
                    log_1.log.msg(index_1.LogType.COMPLETE, '项目已创建完成');
                    resolve();
                });
            });
        });
    }
    npmInstall() {
        return __awaiter(this, void 0, void 0, function* () {
            const { proPath } = this.options;
            log_1.log.newline();
            log_1.log.msg(index_1.LogType.RUN, '命令：npm install');
            log_1.log.msg(index_1.LogType.INFO, '安装中, 请耐心等待...');
            yield index_1.exec('npm', ['install'], true, {
                cwd: proPath,
            });
        });
    }
    gitInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const { proPath } = this.options;
            if (!shell.which('git')) {
                shell.echo('Sorry, this script requires git');
                shell.exit(1);
            }
            yield index_1.exec('git', ['init'], true, {
                cwd: proPath
            });
        });
    }
}
exports.InitCommand = InitCommand;
