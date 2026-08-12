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

    describe("getOrgByOrgId", () => {
        test("Should return organization matchinh organization ID", async () => {

            OrganizationModel.getOrgByOrgId.mockResolvedValue(mockOrganization)

            const result = await OrganizationService.getOrgByOrgId("org-123")

            expect(result).toEqual(mockOrganization)

            expect(OrganizationModel.getOrgByOrgId)
                .toHaveBeenCalledWith("org-123")
        })

        test("Should throw error when no organization is found", async () => {

            OrganizationModel.getOrgByOrgId.mockResolvedValue(null)

            await expect (
                OrganizationService.getOrgByOrgId("org-123")
            ).rejects.toThrow("No organization found")
            

            expect(OrganizationModel.getOrgByOrgId)
                .toHaveBeenCalledWith("org-123")
        })
    })

    describe("deleteOrganization", () => {
        test("Should delete organization successfully", async () => {
            
            OrganizationModel.deleleOrganization.mockResolvedValue(mockOrganization)

            const result = await OrganizationService.deleteOrganization("org-123")

            expect(result).toEqual(mockOrganization)

            expect(OrganizationModel.deleleOrganization)
                .toHaveBeenCalledWith("org-123")
        })

        test("Should throw error when deleteion unsuccesfull", async () => {
            
            OrganizationModel.deleleOrganization.mockResolvedValue(null)

            await expect (
                OrganizationService.deleteOrganization("org-123")
            ).rejects.toThrow("No organization found")

            expect(OrganizationModel.deleleOrganization)
                .toHaveBeenCalledWith("org-123")
        })
    })

    describe("updateOwner", () => {
        test("Should update organization successfully", async () => {

            const mockOrg = {
                id: "org-123",
                name: "New Company",
                slug: "Company-uuid",
                type: "team",
                owner_id: "member-123",
                created_at: new Date("2026-08-10T10:00:00Z"),
                updated_at: new Date("2026-08-10T10:00:00Z")
            }
            
            OrganizationModel.updateOwner.mockResolvedValue(mockOrg)

            const result = await OrganizationService.updateOwner("org-123", "member-123")

            expect(result).toEqual(mockOrg)

            expect(OrganizationModel.updateOwner)
                .toHaveBeenCalledWith("org-123", "member-123")
        })

        test("Should throw error when updation unsuccesfull", async () => {
            
            OrganizationModel.updateOwner.mockResolvedValue(null)

            await expect (
                OrganizationService.updateOwner("org-123", "member-123")
            ).rejects.toThrow("Ownership not changed")

            expect(OrganizationModel.updateOwner)
                .toHaveBeenCalledWith("org-123", "member-123")
        })
    })
})