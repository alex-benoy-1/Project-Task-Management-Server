import AuthController from "../controllers/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/email", AuthController.getUser);

export default authRouter;