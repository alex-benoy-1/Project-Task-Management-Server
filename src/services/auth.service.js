import UserModel from "../models/user.model.js";

const register = async (fName, lName, email, password) => {
    const userExists = await UserModel.findUserByEmail(email);
    if(userExists){
        throw new Error("An Account with this email already exists");
    }

    const user = await UserModel.createUser(fName, lName, email, password);
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
    if(password === user.password_hash) {
        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                created_at: user.created_at
            }
        }
    } else {
        throw new Error("Invalid credentials");
    }

}

export default { register, login }