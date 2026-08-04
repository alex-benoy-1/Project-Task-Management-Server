import { z } from "zod";

const createOrganizationSchema = z.object ({
    body: z.object ({
        name: z
            .string()
            .trim()
            .min(2, "Organization name must be atleast 2 character long")
            .max(100, "Organization name can't be more than 100 character long")
    }).strict()
})

const getOrgByOrgIdSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const deleteOrganizationSchema = z.object ({
    params: z.object ({
        orgId: z.uuid()
    }).strict()
})

const updateOwnerSchema = z.object ({
    body: z.object ({
        memberId: z.uuid()
    }).strict(),
    params: z.object({
        orgId: z.uuid()
    }).strict()
})

export {
    createOrganizationSchema,
    getOrgByOrgIdSchema,
    deleteOrganizationSchema,
    updateOwnerSchema
}