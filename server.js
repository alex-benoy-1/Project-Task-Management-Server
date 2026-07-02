import dotenv from "dotenv";
import app from "./src/app.js"

dotenv.config();

const PORT = process.env.PORT;

// app.get("/", (req, res) => {
//     res.status(200).json({message: "App succesful"});
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
