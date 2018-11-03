#!/usr/bin/env node
'use strict'

const compatRequire = require('node-compat-require')
compatRequire('./dist', { node: '>= 8' })
