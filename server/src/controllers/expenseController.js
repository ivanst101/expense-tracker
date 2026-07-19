import { Expense } from "../models/expenseModel.js";

export async function getAllExpenses(req, res) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((item) => delete queryObj[item]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Expense.find(JSON.parse(queryStr));

    const expenses = await query;

    res.status(200).json({
      status: "Success",
      results: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent",
    });
  }
}

export async function createExpense(req, res) {
  try {
    const data = req.body;
    const newExpense = await Expense.create(data);
    res.status(201).json({
      status: "Success",
      data: { newExpense },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent",
    });
  }
}

export async function deleteExpense(req, res) {
  try {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id);

    res.status(204).json({
      message: "Success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent",
    });
  }
}

export async function updateExpense(req, res) {
  try {
    const id = req.params.id;

    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    res.status(200).json({
      message: "Success",
      data: {
        expense,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent",
    });
  }
}

export async function getExpense(req, res) {
  try {
    const id = req.params.id;
    const expense = await Expense.findById(id);

    res.status(200).json({
      message: "Success",
      data: {
        expense,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent",
    });
  }
}
