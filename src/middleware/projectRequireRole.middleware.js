const projectRequireRole = (...roles) => async (req, res, next) => {
    try {
        if(!req.member) {
            return res.status(403).json({message: "Not a member of the organization"});
        }

        if(!roles.includes(req.member.role)) {
            return res.status(403).json({message: "No authorization"});
        } 
        next();
    } catch(err) {
        next(err);
    }
}

export default projectRequireRole;