import AuthService from "../services/auth.service.js";


const register = async (req, res) => {
    try {
        const {fName, lName, email, password} = req.body;
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
        const {email, password} = req.body;
        console.log(email, password);
        const result = await AuthService.login(
            email, password
        );
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default { register, login};