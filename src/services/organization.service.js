import OrganizationModel from "../models/organization.model.js";
import generateSlug from "../utils/slug.js";

const createOrganization = async (name, userId) => {
    const slug = generateSlug(name);

    const {organization, membership} = await OrganizationModel.createOrganization(name, slug, userId);

    return {
        organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
            createdBy: membership.user_id
        }
    };
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