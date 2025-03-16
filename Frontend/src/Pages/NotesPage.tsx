import { Container } from "react-bootstrap";
import NotesPagedLoggedInView from "../components/NotesPagedLoggedInView";
import NotesPagedLogOutView from "../components/NotesPagedLogOutView";
import styles from "../styles/NotePage.module.css";
import { User } from "../models/user";

interface NotesPageProp {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProp) => {
  return (
    <>
      <Container className={`${styles.notePage}`}>
        <>
          {loggedInUser ? <NotesPagedLoggedInView /> : <NotesPagedLogOutView />}
        </>
      </Container>
    </>
  );
};

export default NotesPage;
