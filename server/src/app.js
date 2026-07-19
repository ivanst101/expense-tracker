import express from "express";
import cors from "cors";
import expenseRouter from "./routes/expenseRoutes.js";

const app = express();

app.set("query parser", "extended");
app.use(express.json());
app.use(cors());
app.use("/api/v1/expenses", expenseRouter);

export default app;
