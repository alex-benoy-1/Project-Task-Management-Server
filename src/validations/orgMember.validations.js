import { z } from "zod";

const addMemberSchema = z.object ({
    body: z.object ({
        memberId: z.uuid(),
        role: z.enum(["admin", "manager", "member"])
    }).strict(),
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const deleteMemberSchema = z.object ({
    params: z.object ({
        orgId: z.uuid(),
        memberId: z.uuid()
    }).strict()
})

const changeRoleSchema = z.object ({
    body: z.object ({
        role: z.enum(["admin", "manager", "member"])
    }).strict(),
    params: z.object ({
        orgId: z.uuid(),
        memberId: z.uuid()
    }).strict()
})

export {
    addMemberSchema,
    deleteMemberSchema,
    changeRoleSchema
}