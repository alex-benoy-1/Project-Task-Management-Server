import { beforeEach, jest, describe } from "@jest/globals";

// Mock userModel
jest.unstable_mockModule(
    "../../../src/models/user.model.js",
    () => ({
        default: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn()
        }
    })
)

// Mock organizationModel
jest.unstable_mockModule(
    "../../../src/models/organization.model.js",
    () => ({
        default: {
            createOrganization: jest.fn()
        }
    })
)

// Mock orgMemberModel
jest.unstable_mockModule(
    "../../../src/models/orgMember.model.js",
    () => ({
        default: {
            createOrgMember: jest.fn()
        }
    })
)

// Mock PostgreSQL
jest.unstable_mockModule(
    "../../../src/configs/db.config.js",
    () => ({
        default: {
            connect: jest.fn()
        }
    })
)

// Mock bcrypt
jest.unstable_mockModule(
    "bcrypt",
    () => ({
        default: {
            hash: jest.fn(),
            compare: jest.fn()
        }
    })
)

// Mock JWT
jest.unstable_mockModule(
    "../../../src/utils/jwt.js",
    () => ({
        default: jest.fn()
    })
)

// Mock crypto
jest.unstable_mockModule(
    "crypto",
    () => ({
        default: {
            randomUUID: jest.fn()
        }
    })
)

// Importing mocked dependencies
const { default: UserModel } =
    await import("../../../src/models/user.model.js")

const { default: OrganizationModel } =
    await import("../../../src/models/organization.model.js")

const { default: OrgMemberModel } =
    await import("../../../src/models/orgMember.model.js")

const { default: pgdb } =
    await import("../../../src/configs/db.config.js")

const { default: bcrypt } =
    await import("bcrypt")

const { default: generateToken } =
    await import("../../../src/utils/jwt.js")

const { default: crypto } =
    await import("crypto")

// import service 
const { default: AuthService } = 
    await import("../../../src/services/auth.service.js")



// Test data 
const mockUser = {
    id: "user-123",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password_hash: "hashed-password",
    is_active: true,
    created_at: new Date("2026-08-10T10:00:00Z"),
    updated_at: new Date("2026-08-10T10:00:00Z")
}

const mockOrganization = {
    id: "org-123",
    name: "John's Workspace",
    slug: "workspace-uuid",
    type: "personal",
    owner_id: "user-123",
    created_at: new Date("2026-08-10T10:00:00Z"),
    updated_at: new Date("2026-08-10T10:00:00Z")
}

// const mockMember = {
//     id: "member-123",
//     organization_id: "org-123",
//     user_id: "user-123",
//     role: "admin",
//     joined_at: new Date("2026-08-10T10:00:00Z")
// }

const mockMember = { user_id: "user-123" } 

const mockToken = "mock-jwt-token";

// Test Suite 
describe("Auth Service", () => {

    // Reset mocks for every test 
    beforeEach(() => {
        jest.clearAllMocks();
    })

    // Resgister
    describe("register", () => {
        test("Should succesfully register a user", async () => {

            //Arrange
            const mockClient = { 
                query: jest.fn(), 
                release: jest.fn() 
            }; 
            
            pgdb.connect.mockResolvedValue(mockClient); 
            UserModel.findUserByEmail.mockResolvedValue(null); 
            bcrypt.hash.mockResolvedValue("hashed-password"); 
            UserModel.createUser.mockResolvedValue(mockUser); 
            generateToken.mockReturnValue(mockToken); 
            crypto.randomUUID.mockReturnValue("workspace-uuid"); 
            OrganizationModel.createOrganization.mockResolvedValue(mockOrganization); 
            OrgMemberModel.createOrgMember.mockResolvedValue(mockMember);

            //Act
            const result = await AuthService.register( 
                "John", "Doe", "john@example.com", "password123" 
            );

            //Assert
            expect( UserModel.findUserByEmail )
                .toHaveBeenCalledWith( "john@example.com" ); 
            
            expect( bcrypt.hash )
                .toHaveBeenCalledWith( "password123", 10 ); 
                
            expect( pgdb.connect )
                .toHaveBeenCalledTimes(1); 
                
            expect( mockClient.query )
                .toHaveBeenNthCalledWith( 1, "BEGIN" ); 
                
            expect( UserModel.createUser )
                .toHaveBeenCalledWith( "John", "Doe", "john@example.com", "hashed-password", mockClient ); 
                
            expect( generateToken )
                .toHaveBeenCalledWith(mockUser); 
                
            expect( crypto.randomUUID )
                .toHaveBeenCalledTimes(1); 
                
            expect( OrganizationModel.createOrganization )
                .toHaveBeenCalledWith( "John's Workspace", "workspace-uuid", "user-123", "personal", mockClient ); 
                
            expect( OrgMemberModel.createOrgMember )
                .toHaveBeenCalledWith( "org-123", "user-123", "admin", mockClient ); 
                
            expect( mockClient.query )
                .toHaveBeenNthCalledWith( 2, "COMMIT" ); 
                
            expect( mockClient.release ).toHaveBeenCalledTimes(1);

            //Check results
            expect(result).toEqual({ 
                user: { 
                    id: "user-123", 
                    fName: "John", 
                    lName: "Doe", 
                    email: "john@example.com", 
                    createdAt: mockUser.created_at 
                }, 
                workspace: { 
                    id: "org-123", 
                    name: "John's Workspace", 
                    slug: "workspace-uuid", 
                    type: "personal", 
                    createdBy: "user-123" 
                }, 
                token: "mock-jwt-token" 
            });   
        })

        test("Should throw error when email already exists", async () => {

            //Arrange
            UserModel.findUserByEmail
                .mockResolvedValue(mockUser);

            //Act and Assert
            await expect( 
                AuthService.register( 
                    "John", "Doe", "john@example.com", "password123" 
                ) 
            ).rejects.toThrow( 
                "An Account with this email already exists" 
            );

            //Make sure nothing else happens
            expect( bcrypt.hash )
                .not.toHaveBeenCalled(); 
                
            expect( pgdb.connect )
                .not.toHaveBeenCalled(); 
                
            expect( UserModel.createUser )
                .not.toHaveBeenCalled();
        })

        test("Should rollback when registration fails", async() => {

            //Arrange
            const mockClient = { 
                query: jest.fn(), 
                release: jest.fn() 
            }; 
            
            pgdb.connect.mockResolvedValue(mockClient); 
            UserModel.findUserByEmail .mockResolvedValue(null); 
            bcrypt.hash .mockResolvedValue("hashed-password"); 
            UserModel.createUser .mockResolvedValue(mockUser); 
            generateToken .mockReturnValue(mockToken); 
            crypto.randomUUID .mockReturnValue("workspace-uuid");

            //organization creattion fails
            OrganizationModel.createOrganization
                .mockRejectedValue( new Error("Organization creation failed") );

            //Act
            await expect( 
                AuthService.register( 
                    "John", "Doe", "john@example.com", "password123" 
                ) 
            ).rejects.toThrow( "Organization creation failed" );

            //Assert rollback
            expect( mockClient.query )
                .toHaveBeenNthCalledWith( 1, "BEGIN" ); 
                
            expect( mockClient.query )
                .toHaveBeenNthCalledWith( 2, "ROLLBACK" ); 
                
            expect( mockClient.release )
                .toHaveBeenCalledTimes(1);
        })
    })

    //Login
    describe("login", () => {
        test ("Should login successfully with correct credentials", async () => {

            //Arrange
            UserModel.findUserByEmail
                .mockResolvedValue(mockUser); 
                
            bcrypt.compare
                .mockResolvedValue(true); 
            
            generateToken.mockReturnValue(mockToken);

            //Act
            const result = await AuthService.login( "john@example.com", "password123" );

            //Assert
            expect( UserModel.findUserByEmail )
                .toHaveBeenCalledWith( "john@example.com" ); 
            
            expect( bcrypt.compare )
                .toHaveBeenCalledWith( "password123", "hashed-password" ); 
                
            expect( generateToken )
                .toHaveBeenCalledWith(mockUser); 
                
            expect(result)
                .toEqual({ 
                    user: { 
                        id: "user-123", 
                        fName: "John", 
                        lName: "Doe", 
                        email: "john@example.com", 
                        createdAt: mockUser.created_at 
                    }, token: "mock-jwt-token" });
        })

        test("Should reject login if user doesn't exist", async () => {

            //Arrange
            UserModel.findUserByEmail.mockResolvedValue(null);

            //Act and Assert
            await expect( 
                AuthService.login( 
                    "john@example.com", "password123" 
                ) 
            ).rejects.toThrow( "Invalid credentials" );

            //Make sure password is not checked
            expect( bcrypt.compare )
                .not.toHaveBeenCalled(); 
                
            expect( generateToken )
                .not.toHaveBeenCalled();
        })

        test("Should reject login when password is incorrect", async() => {

            //Arrange
            UserModel.findUserByEmail
                .mockResolvedValue(mockUser); 
                
            bcrypt.compare.mockResolvedValue(false);

            //Act and Assert
            await expect( 
                AuthService.login( 
                    "john@example.com", "wrongpassword" 
                ) 
            ).rejects.toThrow( "Invalid credentials" );

            //Make sure token is not generated
            expect( generateToken ).not.toHaveBeenCalled();
        })
    })
})

