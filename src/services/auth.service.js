import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";

const register = async (fName, lName, email, password) => {
    const userExists = await UserModel.findUserByEmail(email);
    if(userExists){
        throw new Error("An Account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password,10);

    const user = await UserModel.createUser(fName, lName, email, passwordHash);

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            fName: user.first_name,
            lName: user.last_name,
            email: user.email,
            createdAt: user.created_at
        },
        token
    };
}

const login = async (email, password) => {
    const user = await UserModel.findUserByEmail(email);
    if(!user) {
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if(!passwordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            fName: user.first_name,
            lName: user.last_name,
            email: user.email,
            createdAt: user.created_at
        },
        token
    };

}

export default { register, login }