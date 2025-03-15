import { User } from "../models/user";
import { fetchData } from "./notes_api";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
};

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const logIn = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const logOut = async () => {
  await fetchData("/api/users/logout", { method: "POST" });
};
