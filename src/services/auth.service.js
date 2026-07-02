import UserModel from "../models/user.model.js";

const checkUser = async (email) => {
    const retrieveUser = await UserModel.findUserByEmail(email);

    if(!retrieveUser) {
        throw new Error("No such user");
    }

    return {
        user: {
            id: retrieveUser.id,
            name: retrieveUser.first_name,
            email: retrieveUser.email
        }
    }

}

export default { checkUser }