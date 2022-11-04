const crypto = require('crypto');

module.exports = function generateToken() {
  return crypto.randomBytes(8).toString('hex');
};