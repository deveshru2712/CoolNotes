import { Note } from "../models/notes";

// request info -> is the url
// init -> is used for method

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
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
