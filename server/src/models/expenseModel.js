import mongoose, { Mongoose } from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Expense must have a title"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Expense must have a amount property"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Expense must have a category"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    trim: true,
  },
});

export const Expense = mongoose.model("Expense", expenseSchema);
