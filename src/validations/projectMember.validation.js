import { z } from "zod";

const addProjectMemberSchema = z.object ({
    body: z.object ({
        memberId: z.uuid(),
        role: z.enum(["owner", "lead", "member", "viewer"])
    }).strict(),
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

const removeProjectMemberSchema = z.object ({
    params: z.object ({
        projectId: z.uuid(),
        memberId: z.uuid()
    }).strict()
})

const changeProjectRoleSchema = z.object ({
    body: z.object ({
        role: z.enum(["owner", "lead", "member", "viewer"])
    }).strict(),
    params: z.object ({
        projectId: z.uuid(),
        memberId: z.uuid()
    }).strict()
})

const getProjectMemberSchema = z.object ({
    params: z.object ({
        projectId: z.uuid(),
        memberId: z.uuid()
    }).strict()
})

const getAllProjectMembersSchema = z.object ({
    params: z.object ({
        projectId: z.uuid()
    }).strict()
})

export {
    addProjectMemberSchema,
    removeProjectMemberSchema,
    changeProjectRoleSchema,
    getAllProjectMembersSchema,
    getProjectMemberSchema
}