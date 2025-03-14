import { useEffect, useState } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";

import { Note as NoteModel } from "./models/notes";

import * as NoteApi from "./api/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";
import Note from "./components/Note";

const App = () => {
  // this tell tsc that i will be of Note type in future
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setshowAddNoteDialog(true)}>Add new Note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((item) => (
          <Col key={item._id}>
            <Note note={item} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog onDismiss={() => setshowAddNoteDialog(false)} />
      )}
    </Container>
  );
};

export default App;
