import express from "express";
import authRoutes from "./routes/auth.route.js";
import orgRouter from "./routes/organization.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "App succesful"});
});

app.use("/auth", authRoutes);
app.use("/org", orgRouter);

export default app;