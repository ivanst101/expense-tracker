const mongoose = require("mongoose");
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);

async function connectDB() {
  try {
    const db = await mongoose.connect(databaseUrl);
    console.log("Database connected successfuly!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = connectDB;
