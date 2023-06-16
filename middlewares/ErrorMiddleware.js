export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  if (req.originalUrl.includes('/api/v1/user') && err.code === 11000) {
    err.message = 'Email already exists';
    err.code = 409;
  }

  if (
    req.originalUrl.includes('/api/v1/user') === false &&
    err.code === 11000
  ) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.code = 409;
  }

  console.log(err);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
