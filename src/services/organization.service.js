import OrganizationModel from "../models/organization.model.js";
import OrgMemberModel from "../models/orgMember.model.js";
import generateSlug from "../utils/slug.js";
import pgdb from "../configs/db.config.js";
import logger from "../utils/logger.js";


const createOrganization = async (name, userId) => {

    const client = await pgdb.connect();
    try {
        await client.query("BEGIN");

        const slug = generateSlug(name);
        const organization = await OrganizationModel.createOrganization(
            name, slug, userId, "team", client);
        const member = await OrgMemberModel.createOrgMember(
            organization.id, userId, "admin", client);

        await client.query("COMMIT");

        logger.info(
            {
                userId,
                organizationId: organization.id,
                organizationName: organization,name
            },
            "Organization created successfully"
        )
        return {
            organization: {
                id: organization.id,
                name: organization.name,
                slug: organization.slug,
                type: organization.type,
                createdBy: member.user_id,
                role: member.role
            }
        }

    } catch(err) {
        await client.query("ROLLBACK");
        logger.error(
            {
                userId,
                organizationName: name,
                err
            },
            "Failed to create organization"
        );
        throw err;
    } finally {
        client.release();
    }
}

const getOrganizationByUser = async (userId) => {
    const organizations = await OrganizationModel.getOrganizationsByUser(userId);
    logger.info(
        {
            userId,
        },
        "Retrived organizations of user"
    );
    
    if(organizations.length === 0) {
        return {
            organizations: [],
            count: 0
        };
    } else {
        return {
            organizations,
            count: organizations.length
        };
    }
}

const getOrgByOrgId = async (orgId) => {
    const organization = await OrganizationModel.getOrgByOrgId(orgId);

    if(!organization) {
        logger.warn({ 
                orgId,
            }, "Failed to retrieve organization"
        );

        throw new Error("No organization found");
    }
    logger.info({ 
            orgId,
        }, "Organization details retrived"
    );

    return organization;
}

const deleteOrganization = async (orgId) => {
    const organization = await OrganizationModel.deleleOrganization(orgId);

    if(!organization) {
        logger.warn({ 
                orgId,
            }, "Organization deletion failed"
        );
        throw new Error("No organization found");
    }
    logger.info({ 
            orgId,
        }, "Organization deleted successfully"
    );

    return organization;
}

const updateOwner = async (orgId, memberId) => {
    const organization = await OrganizationModel.updateOwner(orgId, memberId);
    if(!organization) {
        logger.warn({ 
                orgId,
            }, "Organization owner change failed"
        );
        throw new Error("Ownership not changed");
    }
    logger.info({ 
            orgId,
            newOwner: memberId
        }, "Organization owner changed"
    );
    return organization;
}

export default { 
    createOrganization, 
    getOrganizationByUser, 
    getOrgByOrgId, 
    deleteOrganization,
    updateOwner
};