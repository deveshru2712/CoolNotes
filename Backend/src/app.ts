import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";

import env from "./utils/validateEnv";
import notesRouter from "./routes/notes.routes";
import userRouter from "./routes/user.routes";

const app = express();

// morgan is used in order to get log of every request to the server

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true, // if the user is using the application the cookie will automatically refresh
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
    }),
  })
);

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  let statusCode = 500;

  //check if it is instance of httperror
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
    res.status(statusCode).json({ error: errorMessage });
  }
});

export default app;
