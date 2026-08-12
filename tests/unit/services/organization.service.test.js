import { jest, describe, beforeEach } from "@jest/globals";
import generateToken from "../../../src/utils/jwt.js";

jest.unstable_mockModule(
    "../../../src/models/organization.model.js",
    () => ({
        default: {
            createOrganization: jest.fn(), 
            getOrganizationsByUser: jest.fn(),
            getOrgByOrgId: jest.fn(),
            deleleOrganization: jest.fn(),
            getOrgByOwnerId : jest.fn(),
            updateOwner: jest.fn() 
        }
    })
)

jest.unstable_mockModule(
    "../../../src/models/orgMember.model.js",
    () => ({
        default: {
            createOrgMember: jest.fn(), 
            membershipStatus: jest.fn(), 
            removeMemberById: jest.fn(), 
            getAllMembers: jest.fn(), 
            changeRole: jest.fn() 
        }
    })
)

jest.unstable_mockModule(
    "../../../src/configs/db.config.js",
    () => ({
        default: {
            connect: jest.fn()
        }
    })
)

const { default: OrganizationModel } =
    await import("../../../src/models/organization.model.js")

const { default: OrgMemberModel } = 
    await import("../../../src/models/orgMember.model.js")

const { default: pgdb } = 
    await import("../../../src/configs/db.config.js")


const { default: OrganizationService } = 
    await import("../../../src/services/organization.service.js")

const mockOrganization = {
    id: "org-123",
    name: "New Company",
    slug: "Company-uuid",
    type: "team",
    owner_id: "user-123",
    created_at: new Date("2026-08-10T10:00:00Z"),
    updated_at: new Date("2026-08-10T10:00:00Z")
}

const mockMember = {
    id: "member-123",
    organization_id: "org-123",
    user_id: "user-123",
    role: "admin",
    joined_at: new Date("2026-08-10T10:00:00Z")
}

const mockToken = "mock-jwt-token";

//Test Suite
describe("Organization service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("createOrganization", () => {
        test("Should succesfully register an organization", async () => {

            const mockClient = {
                query: jest.fn(),
                release: jest.fn()
            }

            pgdb.connect.mockResolvedValue(mockClient);
            OrganizationModel.createOrganization.mockResolvedValue(mockOrganization);
            OrgMemberModel.createOrgMember.mockResolvedValue(mockMember);

            const result = await OrganizationService.createOrganization(
                "New company", "user-123"
            )

            expect(result).toEqual({
                organization: {
                    id: "org-123",
                    name: "New Company",
                    slug: "Company-uuid",
                    type: "team",
                    createdBy: "user-123",
                    role: "admin"
                }
            })

            expect(OrganizationModel.createOrganization)
                .toHaveBeenCalledWith("New company", "new-company", "user-123", "team", mockClient)
            
            expect(OrgMemberModel.createOrgMember)
                .toHaveBeenCalledWith("org-123", "user-123", "admin", mockClient)

        })
    })

    describe("getOrganizationByUser", () => {
        test("Should succesfully retun all organization user is part of", async () => {

            const mockOrganizations = [
                {
                    id: "org-123",
                    name: "New Company",
                    slug: "Company-uuid",
                    joinedAt: new Date("2026-08-10T10:00:00Z"),
                    role: "admin"
                },
                {
                    id: "org-456",
                    name: "Another Company",
                    slug: "another-company",
                    joinedAt: new Date("2026-08-10T10:00:00Z"),
                    role: "member"
                }
            ]

            OrganizationModel.getOrganizationsByUser.mockResolvedValue(mockOrganizations);

            const result = await OrganizationService.getOrganizationByUser(
                "user-123"
            )

            expect(result).toEqual({ 
                organizations: mockOrganizations,
                count: 2
            })

            expect(OrganizationModel.getOrganizationsByUser)
                .toHaveBeenCalledWith("user-123")
        })

        test("Should return empty organization when user not part of any organization", async () => {

            OrganizationModel.getOrganizationsByUser.mockResolvedValue([]);

            const result = await OrganizationService.getOrganizationByUser(
                "user-123"
            )

            expect(result).toEqual({
                organizations: [],
                count: 0
            })

            expect(OrganizationModel.getOrganizationsByUser)
                .toHaveBeenCalledWith("user-123")
        })
    })
})