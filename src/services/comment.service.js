import CommentModel from "../models/comment.model.js";

const newComment = async (taskId, userId, content) => {
    const comment = await CommentModel.createComment(taskId, userId, content);
    
        if(!comment) {
            throw new Error("Comment not added");
        }
    
        return comment;
}

const getAllComments = async (taskId) => {
    const comments = await CommentModel.getAllComments(taskId);

    if(!comments) {
        throw new Error("No comments found");
    }

    if(comments.length === 0) {
        return {
            comments: [],
            count: 0
        };
    } else {
        return {
            comments,
            count: comments.length
        };
    }
}

const getComment = async (commentId) => {
    const comment = await CommentModel.getComment(commentId);
    
        if(!comment) {
            throw new Error("Comment not found");
        }
    
        return comment;
}

const updateContent = async (commentId, content) => {
    const comment = await CommentModel.updateContent(commentId, content);
    
        if(!comment) {
            throw new Error("Comment not found");
        }
    
        return comment;
}

const deleteComment = async (commentId) => {
    const comment = await CommentModel.deleteComment(commentId);
    
        if(!comment) {
            throw new Error("Comment not deleted");
        }
    
        return comment;
}

export default {
    newComment,
    getAllComments,
    getComment,
    updateContent,
    deleteComment
};