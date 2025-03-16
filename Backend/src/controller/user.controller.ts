import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import UserModel from "../models/user.model";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    const user = await UserModel.findById(authenticatedUserId).select("+email");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, "Please provide all fields");
    }

    const user = await UserModel.findOne({ username }).select(
      "+password +email"
    );

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logOut: RequestHandler = (req, res, next) => {
  // this does not returns promise
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
