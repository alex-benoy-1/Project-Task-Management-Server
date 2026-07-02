import AuthService from "../services/auth.service.js";

const getUser = async (req, res) => {
    try {
        const {email} = req.body;
        const result = await AuthService.checkUser(email);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default {getUser};