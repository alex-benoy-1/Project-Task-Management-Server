import { z } from "zod";

const newCommentSchema = z.object ({
    body: z.object ({
        content: z 
            .string()
            .min(2)
            .max(200)
    }).strict(),
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const updateCommentSchema = z.object ({
    body: z.object ({
        content: z 
            .string()
            .min(2)
            .max(200)
    }).strict(),
    params: z.object ({
        commentId: z.uuid()
    }).strict()
})

const deleteCommentSchema = z.object ({
    params: z.object ({
        commentId: z.uuid()
    }).strict()
})

const getAllCommentsSchema = z.object ({
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const getCommentSchema =  z.object ({
    params: z.object ({
        commentId: z.uuid()
    }).strict()
})

export {
    newCommentSchema,
    updateCommentSchema,
    deleteCommentSchema,
    getAllCommentsSchema,
    getCommentSchema
}