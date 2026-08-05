import { z } from "zod";

const createProjectSchema = z.object ({
    body: z.object ({
        name: z
            .string()
            .min(2)
            .max(100),
        description: z
            .string()
            .min(2)
            .max(200)
    }).strict(),
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const deleteProjectSchema = z.object ({
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

const getProjectSchema = z.object ({
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

const getAllOrgProjectSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const updateProjectSchema = z.object ({
    body: z.object ({
        name: z
            .string()
            .min(2)
            .max(100),
        description: z
            .string()
            .min(2)
            .max(200)
    }).strict(),
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

export {
    createProjectSchema,
    deleteProjectSchema,
    getProjectSchema,
    getAllOrgProjectSchema,
    updateProjectSchema
}