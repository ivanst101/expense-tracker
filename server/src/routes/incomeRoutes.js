import express from "express";
import { authenticateJWT } from "../middleware/JWTMiddleware.js";
import {
  createIncome,
  getCurrentIncome,
} from "../controllers/incomeController.js";

const incomeRouter = express.Router();

incomeRouter.post("/", authenticateJWT, createIncome);
incomeRouter.get("/current", authenticateJWT, getCurrentIncome);

export default incomeRouter;
