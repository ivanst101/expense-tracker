const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleCastErrorDB = (err) => {
  err.statusCode = 400;
  err.status = "fail";
  err.message = `Invalid ${err.path}: ${err.value}`;
  return err;
};

const handleDuplicateFieldsDB = (err) => {
  err.statusCode = 400;
  err.status = "fail";
  err.message = `Duplicate field value, please use another value!`;
  return err;
};

const handleJWTError = () => ({
  statusCode: 401,
  status: "fail",
  message: "Invalid token. Please log in again!",
});

const handleJWTExpiredError = () => ({
  statusCode: 401,
  status: "fail",
  message: "Your token has expired! Please log in again!",
});

export const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError();

    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProduction(error, res);
  }
};
