import express from "express";
import * as UserController from "../controller/user.controller";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

export default router;
