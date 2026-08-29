import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from "../controllers/expenseController.js";

import { authenticateJWT } from "../middleware/JWTMiddleware.js";

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(authenticateJWT, getAllExpenses)
  .post(authenticateJWT, createExpense);

expenseRouter
  .route("/:id")
  .get(authenticateJWT, getExpense)
  .patch(authenticateJWT, updateExpense)
  .delete(authenticateJWT, deleteExpense);

export default expenseRouter;
