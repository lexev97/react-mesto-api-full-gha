const { FORBIDDEN } = require('./statusCodes');

module.exports = class RestrictedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = FORBIDDEN;
  }
};
