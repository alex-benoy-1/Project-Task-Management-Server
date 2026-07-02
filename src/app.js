import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "App succesful"});
});

app.use("/getuser", authRoutes);

export default app;