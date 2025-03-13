import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("boom!");
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await NoteModel.findById(noteId);

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNotes: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const newNote = await NoteModel.create({ title, text });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
