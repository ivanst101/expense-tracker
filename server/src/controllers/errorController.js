export const globalErrorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.status = "fail";
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    err.statusCode = 400;
    err.status = "fail";
    err.message = `Duplicate fields value ${err.errmsg.match(/(["'])(\\?.)*?\1/)[0]}, please use another value!`;
  }

  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
