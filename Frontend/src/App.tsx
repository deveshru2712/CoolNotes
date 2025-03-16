import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import styles from "./styles/NotePage.module.css";
import { User } from "./models/user";

import * as UserApi from "./api/user_api";
import NotesPagedLoggedInView from "./components/NotesPagedLoggedInView";
import NotesPagedLogOutView from "./components/NotesPagedLogOutView";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await UserApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLogInClicked={() => setShowLogInModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={`${styles.notePage}`}>
        <>
          {loggedInUser ? <NotesPagedLoggedInView /> : <NotesPagedLogOutView />}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal onDismiss={() => {}} onSignUpSuccessfully={() => {}} />
      )}

      {showLogInModal && (
        <LoginModel onDismiss={() => {}} onLoginSuccessful={() => {}} />
      )}
    </div>
  );
};

export default App;
