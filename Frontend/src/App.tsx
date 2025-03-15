import { useEffect, useState } from "react";

import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";

import { Note as NoteModel } from "./models/notes";

import * as NoteApi from "./api/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import Note from "./components/Note";
import SignUpModal from "./components/SignUpModal";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";

const App = () => {
  // this tell tsc that i will be of Note type in future
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  };

  const noteGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((item) => (
        <Col key={item._id}>
          <Note
            note={item}
            className={styles.note}
            onDeleteNoteClicked={deleteNote}
            // passing state setters directly as event handlers or callback props.
            onNoteClicked={setNoteToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <div>
      <NavBar
        loggedInUser={null}
        onLogInClicked={() => {}}
        onLogOutClicked={() => {}}
        onSignUpClicked={() => {}}
      />
      <Container className={`${styles.notePage}`}>
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setshowAddNoteDialog(true)}
        >
          Add new Note
        </Button>
        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && (
          <p>Something went wrong.Please refresh the page</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? noteGrid : <p>You don't have any notes yet.</p>}
          </>
        )}
        {showAddNoteDialog && (
          <AddNoteDialog
            onDismiss={() => setshowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setshowAddNoteDialog(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNoteToEdit(null);
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updatedNote._id
                    ? updatedNote
                    : existingNote
                )
              );
            }}
          />
        )}
        {false && (
          <SignUpModal onDismiss={() => {}} onSignUpSuccessfully={() => {}} />
        )}

        {false && (
          <LoginModel onDismiss={() => {}} onLoginSuccessful={() => {}} />
        )}
      </Container>
    </div>
  );
};

export default App;
