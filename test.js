const fs = require('fs')
const assert = require('assert')

const {Reader} = require('./index.js')

const t21 = new Reader(fs.readFileSync('data/type-2-1.data'))
assert(t21.version() === 2)
assert(t21.type() === 2)
assert(t21.time() === 0x042f9ff0)