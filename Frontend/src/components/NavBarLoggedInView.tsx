import { User } from "../models/user";
import * as UserApi from "../api/user_api";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogOutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogOutSuccessful,
}: NavBarLoggedInViewProps) => {
  const logOut = async () => {
    try {
      await UserApi.logOut();
      onLogOutSuccessful();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar.Text className="me-2">Signed is as: {user.username}</Navbar.Text>
      <Button onClick={logOut}>Log Out</Button>
    </>
  );
};

export default NavBarLoggedInView;
