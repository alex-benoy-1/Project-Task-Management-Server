import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const register = async (fName, lName, email, password) => {
    const userExists = await UserModel.findUserByEmail(email);
    if(userExists){
        throw new Error("An Account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password,10);

    const user = await UserModel.createUser(fName, lName, email, passwordHash);
    return {
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_at: user.created_at
        }
    }
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

    return {
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_at: user.created_at
        }
    }

}

export default { register, login }