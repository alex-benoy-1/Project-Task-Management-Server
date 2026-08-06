import { z } from "zod";

const newTaskSchema = z.object ({
    body: z.object ({
        title: z
            .string()
            .min(2)
            .max(100),
        description: z
            .string()
            .min(2)
            .max(200),
        status: z.enum(["todo", "in_progress", "review", "done"]),
        priority: z.enum(["low", "medium", "high", "critical"]),
        createdBy: z.uuid(),
        dueDate: z
            .coerce.date()
    }).strict(),
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

const deleteTaskSchema = z.object ({
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const updateTaskSchema = z.object ({
    body: z.object ({
        title: z
            .string()
            .min(2)
            .max(100).optional(),
        description: z
            .string()
            .min(2)
            .max(200).optional(),
        status: z.enum(["todo", "in_progress", "review", "done"]).optional(),
        priority: z.enum(["low", "medium", "high", "critical"]).optional(),
        createdBy: z.uuid().optional(),
        dueDate: z
            .coerce.date().optional()
    }).strict(),
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const updateTaskStatusSchema = z.object ({
    body: z.object ({
        status: z.enum(["todo", "in_progress", "review", "done"])
    }),
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const getTaskSchema = z.object ({
    params: z.object ({
        taskId: z.uuid()
    }).strict()
})

const getAllTasksSchema = z.object ({
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

export {
    newTaskSchema,
    deleteTaskSchema,
    updateTaskSchema,
    updateTaskStatusSchema,
    getAllTasksSchema,
    getTaskSchema
}