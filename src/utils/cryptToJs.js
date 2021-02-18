import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';

// 随机生产key
function randomKey(length) {
  let str = Math.random().toString(36).substr(2);

  if (str.length >= length) {
    return str.substr(0, length);
  }
  str += randomKey(length - str.length);
  return str;
}

// aes对称加密1
export const encrypt = (value) => {
  const key = CryptoJS.enc.Utf8.parse(randomKey(16)); // 加密秘钥 16位
  const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 加密矢量

  let encrypted = '';

  let data = '';

  if (typeof(value) === 'string') {
    data = CryptoJS.enc.Utf8.parse(value);

    encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  } else if (typeof(value) === 'object') { // 对象格式的转成json字符串
    data = CryptoJS.enc.Utf8.parse(JSON.stringify(value));

    encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  return encrypted.ciphertext.toString();
};

// aes对称加密2
export const encryption = (data) => {
  let strList = [];

  for (const i in data) {
    strList.push(i + '=' + data[i]);
  }
  strList.sort(); // 数组排序
  strList = strList.join('&'); // 数组变字符串
  const endData = strList + '&sign=' + CryptoJS.MD5(strList + 'ADfj3kcadc2349akvm1CPFFCD84f')
    .toString(); // MD5加密

  const key = CryptoJS.enc.Utf8.parse('0880076B18D7EE81'); // 加密秘钥

  const iv = CryptoJS.enc.Utf8.parse('CB3EC842D7C69578'); //  矢量

  const encryptResult = CryptoJS.AES.encrypt(endData, key, { //  AES加密
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 // 后台用的是pad.Pkcs5,前台对应为Pkcs7
  });

  return encodeURIComponent(CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)); // Base64加密再 encode;
};

// 解密
export const decryption = (data) => {
  const key = CryptoJS.enc.Utf8.parse('0880076B18D7EE81'); // 加密秘钥

  const iv = CryptoJS.enc.Utf8.parse('CB3EC842D7C69578'); //  矢量

  const baseResult = CryptoJS.enc.Base64.parse(data); // Base64解密

  const ciphertext = CryptoJS.enc.Base64.stringify(baseResult); // Base64解密

  const decryptResult = CryptoJS.AES.decrypt(ciphertext, key, { //  AES解密
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // 第一种
  const resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();

  return JSON.parse(resData);
  // 第二种
  // return CryptoJS.enc.Utf8.stringify(decryptResult)
};

// rea 非对称加密
// 需要借助一个公钥publicKey对随机key进行非对称加密，resKey 为加密后的key
const encryptor = new JSEncrypt();
const pubulicKey = ''; // 后端给的公钥

encryptor.setPublicKey(pubulicKey); // 设置公钥
export const rsaKey = encryptor.encrypt(randomKey(16));

// rsa非对称解密
const decrypt = new JSEncrypt();
const privateKey = ''; // 后端提供解密私钥

decrypt.setPrivateKey(privateKey);
export const derptKey = value => {
  return decrypt.decrypt(value);
};

// 编码
// eslint-disable-next-line camelcase
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// 解码
// eslint-disable-next-line camelcase
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export default {
  encrypt,
  encryption,
  decryption,
  rsaKey,
  derptKey,
  utf8_to_b64,
  b64_to_utf8
};
