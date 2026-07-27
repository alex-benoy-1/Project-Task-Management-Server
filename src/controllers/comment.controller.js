import CommentService from "../services/comment.service.js";

const newComment = async (req, res) => {
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const {content} = req.body;

        const result = await CommentService.newComment(taskId, userId, content);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getAllComments = async (req, res) => {
    try {
        const {taskId} = req.params;

        const result = await CommentService.getAllComments(taskId);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getComment = async (req, res) => {
    try {
        const {commentId} = req.params;

        const result = await CommentService.getComment(commentId);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;

        const result = await CommentService.deleteComment(commentId);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const updateContent = async (req, res) => {
    try {
        const {commentId} = req.params;
        const {content} = req.body;

        const result = await CommentService.updateContent(commentId, content);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default {
    newComment,
    getAllComments,
    getComment,
    deleteComment,
    updateContent
};