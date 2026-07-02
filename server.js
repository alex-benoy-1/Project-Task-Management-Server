import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.status(200).json({message: "App succesful"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
