import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.route("/").get(getAllExpenses).post(createExpense);

expenseRouter
  .route("/:id")
  .get(getExpense)
  .patch(updateExpense)
  .delete(deleteExpense);

export default expenseRouter;
