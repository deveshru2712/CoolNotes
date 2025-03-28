import { ConflictError, UnauthorizedError } from "../errors/http_error";
import { Note } from "../models/notes";

// request info -> is the url
// init -> is used for method

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    }
    throw Error(
      `Request failed with status code: ${response.status} message: ${errorMessage} `
    );
  }
};

// when the function is async and it returns something then it is already wrapped in  the promise

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetchData("/api/notes", {
    method: "GET",
  });
  return response.json();
};

export interface NoteInput {
  title: string;
  text?: string;
}

export const createNotes = async (note: NoteInput): Promise<Note> => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (
  noteId: string,
  note: NoteInput
): Promise<Note> => {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (noteId: string) => {
  await fetchData(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
};
