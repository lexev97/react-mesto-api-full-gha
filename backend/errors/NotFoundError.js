const { NOT_FOUND } = require('./statusCodes');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND;
  }
};
