import { z } from "zod";

const newInvitationSchema = z.object ({
    body: z.object ({
        email: z.email(),
        role: z.enum(["admin", "manager", "member"])
    }).strict(),
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const deleteInvitationSchema = z.object ({
    params: z.object ({
        invId: z.uuid(),
        orgId: z.uuid()
    }).strict()
})

const acceptInvitationSchema = z.object ({
    params: z.object ({
        token: z.uuid()
    }).strict()
})

const allInvitationSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const getInvitationSchema = z.object ({
    params: z.object ({
        token: z.uuid()
    }).strict()
})

export {
    newInvitationSchema,
    deleteInvitationSchema,
    acceptInvitationSchema,
    getInvitationSchema,
    allInvitationSchema
}