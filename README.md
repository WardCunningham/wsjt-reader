# WSJT Reader
Decode UDP datagrams from WSJT-X

`npm install wsjt-reader`

## Create Reader

```javascript
const {Reader} = require('wsjt-reader')
const msg = new Reader(buffer)
```

## msg.version()
Return protocol version, expect 2.

## msg.type()
Return type of msg, 2 for decode.

## msg.time()
Return decode time in milliseconds since epoch.
