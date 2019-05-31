"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseGitConfig = require("parse-git-config");
const git_config_path_1 = require("./git-config-path");
function getUser() {
    const gitConfigPath = git_config_path_1.getGitConfigPath();
    const gitConfig = parseGitConfig.sync({ path: gitConfigPath });
    return gitConfig.user;
}
exports.getUser = getUser;
