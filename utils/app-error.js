class AppError extends Error {
  constructor(statusCode, errorMessage) {
    super(errorMessage);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
