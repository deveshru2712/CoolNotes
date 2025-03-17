import { Button, Container } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLogInClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLogInClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <Container>
      <Button onClick={onSignUpClicked} className="m-2">
        Sign Up
      </Button>
      <Button onClick={onLogInClicked} className="m-2">
        Log In
      </Button>
    </Container>
  );
};

export default NavBarLoggedOutView;
