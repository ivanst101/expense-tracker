import mongoose from "mongoose";

async function connectDB() {
  try {
    const databaseUrl = process.env.DATABASE_URL.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD,
    );

    await mongoose.connect(databaseUrl);

    console.log("Database connected successfuly!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
