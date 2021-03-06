const utils = require('util');
const crypto = require('crypto');
const pbkdf2 = utils.promisify(crypto.pbkdf2);

const OPTIONS = {
  iterations: 27500,
  keylen: 64,
  digest: 'sha256',
};

const hashPassword = async (password) => {
  const { iterations, keylen, digest } = OPTIONS;
  const salt = crypto.randomBytes(16);

  try {
    const saltBuffer = Buffer.from(salt, 'base64');
    const hashBuffer = await pbkdf2(
      String(password),
      saltBuffer,
      iterations,
      keylen,
      digest
    );

    const hashValue = hashBuffer.toString('base64');
    const saltValue = saltBuffer.toString('base64');

    return { hash: hashValue, salt: saltValue };
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { hashPassword };
