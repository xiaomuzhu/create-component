"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const os = require("os");
const path = require("path");
function getGitConfigPath() {
    let configPath = path.join(os.homedir(), '.gitconfig');
    if (!fs_extra_1.pathExistsSync(configPath)) {
        configPath = path.join(os.homedir(), '.config/git/config');
    }
    return fs_extra_1.pathExistsSync(configPath) ? configPath : null;
}
exports.getGitConfigPath = getGitConfigPath;
