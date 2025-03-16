import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../api/user_api";
import * as UserApi from "../api/user_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.module.css";

interface LoginModelProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModel = ({ onDismiss, onLoginSuccessful }: LoginModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const user = await UserApi.logIn(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="username"
              label="username"
              type="text"
              placeholder="Username"
              register={register}
              registerOption={{ required: "Required" }}
              error={errors.username}
            />

            <TextInputField
              name="password"
              label="password"
              type="password"
              placeholder="Password"
              register={register}
              registerOption={{ required: "Required" }}
              error={errors.password}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className={stylesUtils.width100}
            >
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModel;
