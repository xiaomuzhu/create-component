"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_default_params_1 = require("./utils/get-default-params");
const config = {
    title: 'create-component',
    description: 'a component',
    cwd: process.cwd(),
    author: get_default_params_1.getUser().name,
    gitUrl: `https://github.com/${get_default_params_1.getUser().name}`,
    src: 'src',
    dest: 'dist',
    version: '1.0.0',
    packages: 'packages',
    log: {
        verbose: true,
        time: true,
        level: 0,
    },
};
exports.default = config;
