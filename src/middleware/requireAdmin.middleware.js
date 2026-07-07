const requireAdmin = async (req, res, next) => {
    try {
        if(!req.membership) {
            return res.status(403).json({message: "Not a member of the organization"});
        }

        if(req.membership.role !== "admin") {
            return res.status(403).json({message: "Admin status required"});
        } 
        next();
    } catch(err) {
        next(err);
    }
}

export default requireAdmin;