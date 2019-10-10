class Reader {

  constructor(data){
    if(data.readUInt32BE(0) !== 0xADBCCBDA) throw new Error('expected magic number 0xADBCCBDA')
    this.data = data
    this.offset = data.readUInt32BE(12) + 16
  }

  version() {
    return this.data.readUInt32BE(4)
  }

  type() {
    return this.data.readUInt32BE(8)
  }

  // case 2:
  //   let id = dec.str()     // 12
  //   let isnew = dec.one()  // offset + 0
  //   let time = dec.four()  // offset + 1
  //   let snr = dec.four()   // offset + 5
  //   let dtime = dec.eight()// offset + 9
  //   let freq = dec.four()  // offset + 17
  //   let mode = dec.str()   // offset + 21
  //   let copy = dec.str()   // offset2 + 0
  //   let conf = dec.one()   // ??

  time() {
    return this.data.readUInt32BE(this.offset + 1)
  }

  freq() {
    return this.data.readUInt32BE(this.offset + 17)
  }

  copy() {
    let modelen = this.data.readUInt32BE(this.offset + 21)
    let offset2 = this.offset + 21 + 4 + modelen
    let len = this.data.readUInt32BE(offset2 + 0)
    return this.data.toString('utf8', offset2 + 4, offset2 + 4 + len)
  }

}

module.exports.Reader = Reader
