"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const config_1 = require("../config");
var Language;
(function (Language) {
    Language["TypeScript"] = "TypeScript";
    Language["JavaScript"] = "JavaScript";
})(Language = exports.Language || (exports.Language = {}));
var FrameworkType;
(function (FrameworkType) {
    FrameworkType["React"] = "React";
    FrameworkType["Vue"] = "Vue";
    FrameworkType["Angular"] = "Angular";
})(FrameworkType = exports.FrameworkType || (exports.FrameworkType = {}));
var OpenSourceLicenseType;
(function (OpenSourceLicenseType) {
    OpenSourceLicenseType["BSD"] = "BSD";
    OpenSourceLicenseType["MIT"] = "MIT";
    OpenSourceLicenseType["Apache"] = "Apache";
})(OpenSourceLicenseType = exports.OpenSourceLicenseType || (exports.OpenSourceLicenseType = {}));
var Manger;
(function (Manger) {
    Manger["NPM"] = "npm";
    Manger["YARN"] = "yarn";
})(Manger = exports.Manger || (exports.Manger = {}));
function getScaffoldPath(scaffoldType, filePath = '') {
    return path.join(__dirname, `../../scaffold/${scaffoldType.FrameworkType}/${scaffoldType.Language}`, filePath);
}
exports.getScaffoldPath = getScaffoldPath;
function getDestProjectPath(projectName, filePath = '') {
    return path.join(config_1.default.cwd, projectName, filePath);
}
exports.getDestProjectPath = getDestProjectPath;
function getCommonPath(folder, file = '') {
    return path.join(__dirname, `../../scaffold/common/${folder}/${file}`);
}
exports.getCommonPath = getCommonPath;
function getYear() {
    return new Date().getFullYear();
}
exports.getYear = getYear;
function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach((o) => {
        const key = camelize(o.long.replace(/^--/, ''));
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}
exports.cleanArgs = cleanArgs;
