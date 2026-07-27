import CommentModel from "../models/comment.model.js";

const commentOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {commentId} = req.params;

        const comment = await CommentModel.getComment(commentId);

        if(!comment) {
            return res.status(403).json({message: "Not comment er1"});
        }
        if (comment.user_id !== userId) {
            return res.status(403).json({
                message: "You are not authorized to modify this comment"
            });
        }
        req.comment = comment;
        next();
    } catch (err) {
        next(err);
    }
}

export default commentOwner;