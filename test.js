const fs = require('fs')
const assert = require('assert')

const {Reader} = require('./index.js')

const t21 = new Reader(fs.readFileSync('data/type-2-1.data'))
assert(t21.version() === 2)
assert(t21.type() === 2)
assert(t21.time() === 0x042f9ff0)
assert(t21.freq() === 1502)
assert(t21.copy() === 'DL5ZBE W4BBT -20')

// files = ['type-2-0.data', 'type-2-1.data', 'type-2-2.data', 'type-2-3.data', 'type-2-4.data', 'type-2-5.data', 'type-2-6.data', 'type-2-7.data', 'type-2-8.data', 'type-2-9.data']
// expect = {}
// for (let file of files) {
//   let r = new Reader(fs.readFileSync(`data/${file}`))
//   let time = r.time()
//   let freq = r.freq()
//   let copy = r.copy()
//   expect[file] = {time,freq,copy}
// }
// console.log(expect)

expect = {
  'type-2-0.data': { time: 70260000, freq: 793, copy: '4L8A KA1BUC FN10' },
  'type-2-1.data': { time: 70230000, freq: 1502, copy: 'DL5ZBE W4BBT -20' },
  'type-2-2.data': { time: 70260000, freq: 692, copy: 'CQ KK4CQN EM74' },
  'type-2-3.data': { time: 70260000, freq: 2048, copy: '4L8A W4UCK EM74' },
  'type-2-4.data': { time: 70260000, freq: 1328, copy: 'CQ W9JA EN43' },
  'type-2-5.data': { time: 70260000, freq: 1961, copy: 'DL2JRN CU2BD -23' },
  'type-2-6.data': { time: 70260000, freq: 643, copy: 'CQ KC3SCZ FN10' },
  'type-2-7.data': { time: 70260000, freq: 1405, copy: 'EB3GIF NG3Y FM19' },
  'type-2-8.data': { time: 70260000, freq: 1690, copy: 'KW2E KD2QIK FN30' },
  'type-2-9.data': { time: 70260000, freq: 2648, copy: '4L8A KD2TT FN30' }
}

for (let file in expect) {
  let e = expect[file]
  let r = new Reader(fs.readFileSync(`data/${file}`))
  assert(e.time === r.time())
  assert(e.freq === r.freq())
  assert(e.copy === r.copy())
}



files = ['type-1-0.data', 'type-1-1.data', 'type-1-2.data', 'type-1-3.data', 'type-1-4.data', 'type-1-5.data', 'type-1-6.data', 'type-1-7.data', 'type-1-8.data', 'type-1-9.data']
for (let file of files) {
  console.log("\n", file)
  var r = new Reader(fs.readFileSync(`data/${file}`))
  var i = 0
  function buf(a,n) {
    console.log(a, r.data.slice(i,i+n))
    i += n
  }
  function bit(a) {
    return num(a,1)
  }
  function num(a,n) {
    if(n>6) {
      i += (n-6)
      n = 6
    }
    let k = r.data.readUIntBE(i,n)
    console.log(a, k)
    i += n
    return k
  }
  function str(a) {
    let k = r.data.readUIntBE(i,4)
    i += 4
    let s = r.data.toString('utf8',i,i+k)
    i += k
    console.log(a,k,s)
  }

  buf('head',8)
  num('type',4)
  str('id')
  num('freq',8)
  str('mode')
  str('dx call')
  str('report')
  str('tx mode')
  bit('tx enabled')
  bit('transmitting')
  bit('decoding')
  num('rx df',4)
  num('dx df',4)
  str('de call')
  str('de grid')
  // bit('tx watchdog')
  str('sub-mode')
  bit('fast mode')
  // num('special ops mode',1)
  console.log(r.data.slice(i))
}
