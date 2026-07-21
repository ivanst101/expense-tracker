import express from "express";
import cors from "cors";
import expenseRouter from "./routes/expenseRoutes.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

app.set("query parser", "extended");
app.use(express.json());
app.use(cors());
app.use("/api/v1/expenses", expenseRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

app.use(globalErrorHandler);

export default app;
