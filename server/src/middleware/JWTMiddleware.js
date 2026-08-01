import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authenticateJWT = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Token missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(403);
    throw new Error("The user belonging to the token does not exists!");
  }

  req.user = user;

  next();
};
