import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export async function signup(req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
}
