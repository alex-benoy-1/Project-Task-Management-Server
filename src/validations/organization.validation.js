import { z } from "zod";

const createOrganizationSchema = z.object ({
    body: z.object ({
        name: z
            .string()
            .min(2, "Organization name must be atleast 2 character long")
            .max(100, "Organization name can't be more than 100 character long")
    })
})

const getOrgByOrgIdSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    })
})

const deleteOrganizationSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    })
})

const updateOwnerSchema = z.object ({
    body: z.object ({
        memberId: z.uuid()
    }),
    params: z.object({
        orgId: z.uuid()
    })
})

export {
    createOrganizationSchema,
    getOrgByOrgIdSchema,
    deleteOrganizationSchema,
    updateOwnerSchema
}