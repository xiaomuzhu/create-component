import * as execa from 'execa'
import * as fs from 'fs-extra'
import * as jetpack from 'fs-jetpack'
import 'jest'
import * as path from 'path'

const cwd = process.cwd()
const TEST_DIR = 'testTemplateDir'
const tempDir = path.join(process.cwd(), TEST_DIR)

beforeEach(() => {
  fs.ensureDir(tempDir)
  process.chdir(tempDir)
})

test('spins up a min app and performs various checks', async () => {
  await execa.shell(`node ${cwd}/index.js init ${TEST_DIR} -d -n`)

  process.chdir(TEST_DIR)

  const pkg = JSON.parse(jetpack.read('./package.json')!)

  expect(pkg.name).toBe(TEST_DIR)

  expect(pkg.version).toBe('1.0.0')

  expect(pkg.husky).toBeUndefined()

  const path = jetpack.exists('./.commitlintrc.js')

  expect(path).toBeFalsy()
})

test('spins up a max app and performs various checks', async () => {
  await execa.shell(`node ${cwd}/index.js init ${TEST_DIR} -f -n`)

  process.chdir(TEST_DIR)

  const pkg = JSON.parse(jetpack.read('./package.json')!)

  expect(pkg.name).toBe(TEST_DIR)

  expect(pkg.version).toBe('1.0.0')

  expect(pkg.husky).toBeDefined()

  const path = jetpack.exists('./.commitlintrc.js')

  expect(path).toBeTruthy()
})
