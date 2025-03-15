import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOption?: RegisterOptions;
  error?: FieldError;
  //helps in passing any other props
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOption,
  error,
  ...props
}: TextInputFieldProps) => {
  // controlId -> helps in connecting the label with input field
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOption)}
        isInvalid={!!error}
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputField;
