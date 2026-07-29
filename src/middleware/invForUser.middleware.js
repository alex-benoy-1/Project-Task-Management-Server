import InvitationModel from "../models/invitation.model.js";

const invForUser = async (req, res, next) => {
    try {
            const email = req.user.email;
            const {token} = req.params;
    
            const invitation = await InvitationModel.getInvitation(token);
    
            if(!invitation) {
                return res.status(403).json({message: "Not a valid invitation"});
            }
            if(invitation.email !== email) {
                return res.status(403).json({message: "Not valid user"});
            }
            next();
        } catch (err) {
            next(err);
        }
}

export default invForUser;