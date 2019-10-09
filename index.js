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

  time() {
    return this.data.readUInt32BE(this.offset + 1)
  }

}

module.exports.Reader = Reader