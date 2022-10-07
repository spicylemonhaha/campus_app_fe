/* eslint-disable */
import CryptoJS from 'crypto-js'
const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const b64re =
  /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/

export const avatarPrefix = 'https://storage.zego.im/zim/example/web/assets/'

export const appConfig = {
  appID: 848638217, // AppID - type: number
  serverSecret: '9f200439efdc8bd41092031dff09e3ab', // ServerSecret - type: 32 byte length string
}

// only for develop test
// #ifdef H5
if (window && window.location.search) {
  const appID = Number(
    window.location.search
      .replace(/&s=\w+/, '')
      .slice(3)
      .slice(0, -1)
  )
  const serverSecret = window.location.search.slice(-33).slice(0, -1)
  Object.assign(appConfig, { appID, serverSecret })
  console.log('appConfig', JSON.stringify(appConfig))
}
// #endif

export function generateToken(userID, seconds) {
  if (!userID) throw new Error('generateToken error: params invalid.')

  var time = (Date.now() / 1000) | 0
  var body = {
    app_id: Number(appConfig.appID),
    user_id: String(userID),
    nonce: (Math.random() * 2147483647) | 0,
    ctime: time,
    expire: time + Number(seconds || 7200),
  }

  var key = CryptoJS.enc.Utf8.parse(appConfig.serverSecret)
  var iv = Math.random().toString().substring(2, 18)
  if (iv.length < 16) iv += iv.substring(0, 16 - iv.length)

  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
  }).toString()
  var ciphert = Uint8Array.from(
    Array.from(weAtob(ciphertext)).map((val) => val.charCodeAt(0))
  )
  var len_ciphert = ciphert.length

  var uint8 = new Uint8Array(8 + 2 + 16 + 2 + len_ciphert)
  // expire: 8
  uint8.set([0, 0, 0, 0])
  uint8.set(new Uint8Array(Int32Array.from([body.expire]).buffer).reverse(), 4)
  // iv length: 2
  uint8[8] = 16 >> 8
  uint8[9] = 16 - (uint8[8] << 8)
  // iv: 16
  uint8.set(Uint8Array.from(Array.from(iv).map((val) => val.charCodeAt(0))), 10)

  uint8[26] = len_ciphert >> 8
  uint8[27] = len_ciphert - (uint8[26] << 8)

  uint8.set(ciphert, 28)

  var token = `04${weBtoa(String.fromCharCode(...Array.from(uint8)))}`
  console.log('generateToken', iv.length, body, token)

  return token
}

// btoa
const weBtoa = function (string) {
  string = String(string)
  var bitmap,
    a,
    b,
    c,
    result = '',
    i = 0,
    rest = string.length % 3

  for (; i < string.length; ) {
    if (
      (a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255
    )
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      )

    bitmap = (a << 16) | (b << 8) | c
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63)
  }

  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result
}
// atob
const weAtob = function (string) {
  string = String(string).replace(/[\t\n\f\r ]+/g, '')
  if (!b64re.test(string))
    throw new TypeError(
      "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
    )
  string += '=='.slice(2 - (string.length & 3))
  var bitmap,
    result = '',
    r1,
    r2,
    i = 0
  for (; i < string.length; ) {
    bitmap =
      (b64.indexOf(string.charAt(i++)) << 18) |
      (b64.indexOf(string.charAt(i++)) << 12) |
      ((r1 = b64.indexOf(string.charAt(i++))) << 6) |
      (r2 = b64.indexOf(string.charAt(i++)))

    result +=
      r1 === 64
        ? String.fromCharCode((bitmap >> 16) & 255)
        : r2 === 64
        ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
        : String.fromCharCode(
            (bitmap >> 16) & 255,
            (bitmap >> 8) & 255,
            bitmap & 255
          )
  }
  return result
}
/* eslint-disable */
