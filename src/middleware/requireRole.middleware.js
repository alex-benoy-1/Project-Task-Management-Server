const requireRole = (...roles) => async (req, res, next) => {
    try {
        if(!req.membership) {
            return res.status(403).json({message: "Not a member of the organization"});
        }

        if(!roles.includes(req.membership.role)) {
            return res.status(403).json({message: "No authorization"});
        } 
        next();
    } catch(err) {
        next(err);
    }
}

export default requireRole;