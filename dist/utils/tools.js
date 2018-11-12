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
})(OpenSourceLicenseType || (OpenSourceLicenseType = {}));
function getScaffoldPath(scaffoldType, filePath = '') {
    return path.join(__dirname, `../../scaffold/${scaffoldType.FrameworkType}/${scaffoldType.Language}`, filePath);
}
exports.getScaffoldPath = getScaffoldPath;
function getDestProjectPath(projectName, filePath = '') {
    return path.join(config_1.default.cwd, projectName, filePath);
}
exports.getDestProjectPath = getDestProjectPath;
