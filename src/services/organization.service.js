import OrganizationModel from "../models/organization.model.js";
import OrgMemberModel from "../models/orgMember.model.js";
import generateSlug from "../utils/slug.js";
import pgdb from "../configs/db.config.js";


const createOrganization = async (name, userId) => {

    const {organization, membership} = await OrganizationModel.createOrganization(name, slug, userId, "team");

    const client = pgdb.connect();
    try {
        await client.query("BEGIN");

        const slug = generateSlug(name);
        const organization = await OrganizationModel.createOrganization(
            client, name, slug, userId, "team");
        const member = await OrgMemberModel.createOrgMember(
            client, organization.id, userId, "admin");

        await client.query("COMMIT");

        return {
            organization: {
                id: organization.id,
                name: organization.name,
                slug: organization.slug,
                type: organization.type,
                createdBy: member.user_id
            }
        }

    } catch(err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

const getOrganizationByUser = async (userId) => {
    const organizations = await OrganizationModel.getOrganizationsByUser(userId);

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
        throw new Error("No organization found");
    }

    return organization;
}

export default { createOrganization, getOrganizationByUser, getOrgByOrgId };