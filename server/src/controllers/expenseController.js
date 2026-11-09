import { Expense } from "../models/expenseModel.js";
import { monthRange, paginationParams } from "../utils/expenseQuery.js";

export async function getAllExpenses(req, res, next) {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields", "month"];
  excludedFields.forEach((item) => delete queryObj[item]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const filters = JSON.parse(queryStr);
  filters.user = req.user._id;

  if (req.query.month !== undefined) {
    filters.date = monthRange(req.query.month);
  }

  const { page: requestPage, limit } = paginationParams(req.query);
  const totalExpenses = await Expense.countDocuments(filters);
  const totalPages = Math.ceil(totalExpenses / limit);
  const page = Math.min(requestPage, Math.max(1, totalPages));

  let query = Expense.find(filters);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(`${sortBy} _id`);
  } else {
    query = query.sort(req.query.month ? "-date -_id" : "-createdAt -_id");
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  const skip = (page - 1) * limit;
  query = query.skip((page - 1) * limit).limit(limit);

  const expenses = await query;

  res.status(200).json({
    status: "Success",
    results: expenses.length,
    totalResults: totalExpenses,
    page,
    limit,
    totalPages,
    data: expenses,
  });
}

export const createExpense = async (req, res, next) => {
  const newExpense = await Expense.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json({
    status: "Success",
    data: newExpense,
  });
};

export async function deleteExpense(req, res) {
  const expense = await Expense.findByIdAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!expense) {
    error.statusCode = 404;
    throw new Error("Expense with that ID is not found");
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
}

export async function updateExpense(req, res) {
  const id = req.params.id;

  const expense = await Expense.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!expense) {
    error.statusCode = 404;
    throw new Error("Expense with that ID is not found");
  }

  res.status(200).json({
    status: "Success",
    data: {
      expense,
    },
  });
}

export async function getExpense(req, res) {
  const id = req.params.id;
  const expense = await Expense.findById(id);

  if (!expense) {
    error.statusCode = 404;
    throw new Error("Expense with that ID is not found");
  }

  res.status(200).json({
    status: "Success",
    data: {
      expense,
    },
  });
}

export async function getUserStats(req, res) {
  const today = new Date();

  const startDate = new Date(today.getFullYear(), today.getMonth() - 4, 1);

  const stats = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: startDate,
          $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
        },
      },
    },

    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalAmount: {
          $sum: "$amount",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },

    {
      $project: {
        _id: 0,
        year: "$_id.year",
        monthNumber: "$_id.month",
        totalAmount: 1,
      },
    },
  ]);

  const months = [];

  for (let i = 4; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const year = date.getFullYear();
    const monthNumber = date.getMonth() + 1;

    const existingMonth = stats.find(
      (stat) => stat.year === year && stat.monthNumber === monthNumber,
    );

    months.push({
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      totalAmount: existingMonth?.totalAmount ?? 0,
    });
  }

  const totalByCategory = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: new Date(today.getFullYear(), today.getMonth(), 1),
          $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmountByCategory: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalAmountByCategory: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: {
      previousMonths: months,
      totalsCategory: totalByCategory,
    },
  });
}
