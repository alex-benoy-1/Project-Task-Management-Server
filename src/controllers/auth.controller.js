import AuthService from "../services/auth.service.js";


const register = async (req, res) => {
    try {
        const {fName, lName, email, password} = req.validatedData.body;
        const result = await AuthService.register(
            fName, lName, email, password
        );

        res.status(200).json(result)

    } catch(err) {
        res.status(400).json({message: err.message});

    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.validatedData.body;
        const result = await AuthService.login(
            email, password
        );
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const verify = (req, res) => {
    res.status(200).json({
        valid: true,
        user: req.user
    });
}

export default { register, login, verify};