import AuthController from "../controllers/auth.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/verify", authMiddleware, AuthController.verify)

export default authRouter;