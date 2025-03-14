import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";

const App = () => {
  // this tell tsc that i will be of Note type in future
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });

        //parse the json body out
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      {notes.map((item) => (
        <Note note={item} key={item._id} />
      ))}
    </div>
  );
};

export default App;
