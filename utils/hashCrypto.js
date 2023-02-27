const crypto = require("crypto");

const hashCrypto = (data) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
};

hashCrypto("d1d21b67e3c2da39109c0d2926d58e7d");

module.exports = hashCrypto;
