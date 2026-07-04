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

export default { createOrganization };