import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes.routes";

const app = express();

app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
  next(Error("Endpoint not found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  if (error instanceof Error) {
    errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

export default app;
