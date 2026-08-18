import CommentModel from "../models/comment.model.js";
import logger from "../utils/logger.js";

const newComment = async (taskId, userId, content) => {
    const comment = await CommentModel.createComment(taskId, userId, content);
    
        if(!comment) {
            logger.warn({ 
                    userId: userId,
                    taskId: taskId,
                    comment: content
                }, "Failed to add comment to task"
            );
            throw new Error("Comment not added");
        }
    
        logger.info({ 
                userId: userId,
                taskId: taskId,
                comment: content
            }, "Added comment to task"
        );
        return comment;
}

const getAllComments = async (taskId) => {
    const comments = await CommentModel.getAllComments(taskId);

    if(!comments) {
        logger.warn({ 
                taskId: taskId,
            }, "Failed to retrieve comments for task"
        );
        throw new Error("No comments found");
    }

    if(comments.length === 0) {
        return {
            comments: [],
            count: 0
        };
    } else {
        logger.info({ 
                taskId: taskId,
            }, "Retrieved comments for task"
        );
        return {
            comments,
            count: comments.length
        };
    }
}

const getComment = async (commentId) => {
    const comment = await CommentModel.getComment(commentId);
    
        if(!comment) {
            logger.warn({ 
                    comment: commentId,
                }, "Failed to retrieve comment"
            );
            throw new Error("Comment not found");
        }
    
        logger.info({ 
                comment: commentId,
            }, "Retrieved comments"
        );
        return comment;
}

const updateContent = async (commentId, content) => {
    const comment = await CommentModel.updateContent(commentId, content);
    
        if(!comment) {
            logger.warn({ 
                    comment: commentId,
                    newContent: content
                }, "Failed to update comment"
            );
            throw new Error("Comment not found");
        }
    
        logger.info({ 
                comment: commentId,
                newContent: content
            }, "Updated comment"
        );
        return comment;
}

const deleteComment = async (commentId) => {
    const comment = await CommentModel.deleteComment(commentId);
    
        if(!comment) {
            logger.warn({ 
                    comment: commentId,
                }, "Failed to delete comment"
            );
            throw new Error("Comment not deleted");
        }
    
        logger.info({ 
                comment: commentId,
            }, "Deleted comment"
        );
        return comment;
}

export default {
    newComment,
    getAllComments,
    getComment,
    updateContent,
    deleteComment
};