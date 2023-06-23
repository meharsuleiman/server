export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  if (req.originalUrl.includes('/api/v1/user') && err.code === 11000) {
    err.message = 'Email already exists';
    err.statusCode = 409;
  }

  if (
    req.originalUrl.includes('/api/v1/user') === false &&
    err.code === 11000
  ) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.statusCode = 409;
  }

  if (err.name === 'CastError') {
    err.message = `Invalid ${err.path}`;
    err.statusCode = 400;
  }

  console.log(err);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
