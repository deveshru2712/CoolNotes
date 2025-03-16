import { useEffect, useState } from "react";

import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";

import * as UserApi from "./api/user_api";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./Pages/NotesPage";
import PrivacyPage from "./Pages/PrivacyPage";
import NotFound from "./Pages/NotFound";
import styles from "./styles/app.module.css";

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
      <Container className={`${styles.pageContainer}`}>
        <Routes>
          <Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />

          <Route path="/privacy" element={<PrivacyPage />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessfully={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}

      {showLogInModal && (
        <LoginModel
          onDismiss={() => setShowLogInModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
