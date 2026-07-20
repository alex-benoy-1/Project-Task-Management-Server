import express from "express";
import authRoutes from "./routes/auth.route.js";
import orgRouter from "./routes/organization.routes.js";
import orgMemberRouter from "./routes/orgMember.route.js";
import projectRouter from "./routes/project.route.js";
import projectMemberRouter from "./routes/projectMember.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "App succesful"});
});

app.use("/auth", authRoutes);
app.use("/organizations", orgRouter);
app.use("/org", orgMemberRouter);
app.use("/projects", projectRouter);
app.use("/projects", projectMemberRouter);

export default app;