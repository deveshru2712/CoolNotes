import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import UserModel from "../models/user.model";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Please provide all fields");
    }

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      throw createHttpError(409, "Username is already taken");
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      throw createHttpError(409, "Email is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
