import express from "express";
import { login, signup, logout, me } from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/JWTMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/me", authenticateJWT, me);

export default userRouter;
