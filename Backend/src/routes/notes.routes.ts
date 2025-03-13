import express from "express";
import * as NotesController from "../controller/notes.controller";

const router = express.Router();

router.get("/", NotesController.getNotes);

export default router;
