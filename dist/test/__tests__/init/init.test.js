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
const execa = require("execa");
const fs = require("fs-extra");
const jetpack = require("fs-jetpack");
require("jest");
const path = require("path");
const cwd = process.cwd();
const TEST_DIR = 'testTemplateDir';
const tempDir = path.join(process.cwd(), TEST_DIR);
beforeEach(() => {
    fs.ensureDir(tempDir).then(() => {
        process.chdir(tempDir);
    });
});
test('spins up a min app and performs various checks', () => __awaiter(this, void 0, void 0, function* () {
    yield execa.shell(`node ${cwd}/index.js init ${TEST_DIR} -d -n`);
    const pkg = JSON.parse(jetpack.read('./package.json'));
    expect(pkg.name).toBe(TEST_DIR);
    expect(pkg.version).toBe('1.0.0');
    expect(pkg.husky).toBeUndefined();
    const path = jetpack.exists('./.commitlintrc.js');
    expect(path).toBeFalsy();
}));
test('spins up a max app and performs various checks', () => __awaiter(this, void 0, void 0, function* () {
    yield execa.shell(`node ${cwd}/index.js init ${TEST_DIR} -f -n`);
    process.chdir(TEST_DIR);
    const pkg = JSON.parse(jetpack.read('./package.json'));
    expect(pkg.name).toBe(TEST_DIR);
    expect(pkg.version).toBe('1.0.0');
    expect(pkg.husky).toBeDefined();
    const path = jetpack.exists('./.commitlintrc.js');
    expect(path).toBeTruthy();
}));
