import { Income } from "../models/incomeModel.js";
import { getCurrentMonthAndYear } from "../utils/monthAndYear.js";

export const createIncome = async (req, res, next) => {
  const { amount } = req.body;

  const { month, year } = getCurrentMonthAndYear();

  const income = await Income.findOneAndUpdate(
    {
      user: req.user._id,
      month,
      year,
    },
    {
      amount,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );

  res.status(201).json({
    status: "Success",
    data: income,
  });
};

export const getCurrentIncome = async (req, res, next) => {
  const { month, year } = getCurrentMonthAndYear();

  const income = await Income.findOne({
    user: req.user._id,
    month,
    year,
  });

  res.status(200).json({
    status: "Success",
    data: {
      income,
    },
  });
};
