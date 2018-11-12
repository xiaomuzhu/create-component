"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function exec(command, args, verbose = false, options) {
    return new Promise((resolve, reject) => {
        if (verbose) {
            options = Object.assign(options, {
                stdio: 'inherit',
            });
        }
        command = /^win/.test(process.platform) ? `${command}.cmd` : command;
        const child = child_process_1.spawn(command, args, options);
        let stdout = '';
        let stderr = '';
        if (!verbose) {
            child.stdout.on('data', data => {
                stdout += data;
            });
            child.stderr.on('data', data => {
                stderr += data;
            });
        }
        child.on('error', err => {
            reject(err);
        });
        child.on('close', code => {
            resolve({
                stdout: stdout.trim(),
                stderr: stderr.trim(),
            });
        });
    });
}
exports.exec = exec;
