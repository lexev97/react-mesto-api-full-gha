const { CONFLICT } = require('./statusCodes');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = CONFLICT;
  }
};
