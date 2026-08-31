import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  getUserStats,
} from "../controllers/expenseController.js";

import { authenticateJWT } from "../middleware/JWTMiddleware.js";

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(authenticateJWT, getAllExpenses)
  .post(authenticateJWT, createExpense);

expenseRouter.route("/dashboard").get(authenticateJWT, getUserStats);

expenseRouter
  .route("/:id")
  .get(authenticateJWT, getExpense)
  .patch(authenticateJWT, updateExpense)
  .delete(authenticateJWT, deleteExpense);

export default expenseRouter;
