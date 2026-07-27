import CommentModel from "../models/comment.model.js";

const getTaskFromComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await CommentModel.getComment(commentId);

        if (!comment) {
            return res.status(404).json({message: "comment not found"});
        }

        req.task = {
            id: comment.task_id
        };

        next();
    } catch (err) {
        next(err);
    }
}

export default getTaskFromComment;