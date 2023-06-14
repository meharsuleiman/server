export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

export const asyncError = (fn) => (req, res, next) => fn(req, res, next).catch(next)