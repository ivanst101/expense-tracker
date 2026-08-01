import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

import expenseRouter from "./routes/expenseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.set("query parser", "extended");

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(cors());

app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

app.use(globalErrorHandler);

export default app;
