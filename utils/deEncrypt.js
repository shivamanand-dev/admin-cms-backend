var CryptoJS = require("crypto-js");

const { SECRET_KEY_CRYPTO_JS } = process.env;

const deEncrypt = (data) => {
  var bytes = CryptoJS.AES.decrypt(data, SECRET_KEY_CRYPTO_JS);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const deEncryptAll = (data) => {
  const encryptedData = Object.entries(data);
  const deEncryptedData = encryptedData.map((e) => {
    const arr = e;
    const value = deEncrypt(arr.pop());
    arr.push(value);
    return arr;
  });

  return Object.fromEntries(deEncryptedData);
};

module.exports = { deEncryptAll, deEncrypt };
