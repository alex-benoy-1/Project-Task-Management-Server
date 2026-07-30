import healthCheck from "../controllers/health.controller.js";
import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", healthCheck);

export default healthRouter;