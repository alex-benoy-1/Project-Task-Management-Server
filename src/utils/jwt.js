import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            fName: user.first_name,
            lName: user.last_name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TIMEOUT
        }
    );
}

export default generateToken;