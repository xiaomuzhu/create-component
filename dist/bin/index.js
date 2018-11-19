#!/usr/bin/env node
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
const program = require("commander");
const index_1 = require("../index");
program
    .version('0.0.1')
    .option('-v', '--version', () => {
    console.log('0.0.1');
})
    .usage('<command> [options]');
index_1.default.forEach(command => {
    const cmd = program.command(command.name);
    if (command.alias) {
        cmd.alias(command.alias);
    }
    if (command.usage) {
        cmd.usage(command.usage);
    }
    if (command.description) {
        cmd.description(command.description);
    }
    if (command.options && command.options.length) {
        const options = command.options;
        options.forEach((option) => {
            cmd.option(option[0], option[1]);
        });
    }
    if (command.action) {
        cmd.action((...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield command.action.apply(command, args);
            }
            catch (err) {
                console.error(err);
            }
        }));
    }
});
if (process.argv.length === 2) {
    program.outputHelp();
}
program.parse(process.argv);
