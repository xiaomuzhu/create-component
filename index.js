#!/usr/bin/env node
'use strict';

const compatRequire = require('node-compat-require');
compatRequire('./dist/bin/index.js', { node: '>= 8' });
