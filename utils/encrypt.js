const CryptoJS = require("crypto-js");

const secretKey = "thisIsLegendaryApp";

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const encryptAll = (data) => {
  const entries = Object.entries(data);

  const encryptedData = entries.map((e) => {
    let arr = e;
    const value = encrypt(arr.pop());

    arr.push(value);
    return arr;
  });

  return Object.fromEntries(encryptedData);
};

module.exports = { encryptAll, encrypt };
