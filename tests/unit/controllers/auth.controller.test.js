import { beforeEach, jest, describe } from "@jest/globals";

jest.unstable_mockModule(
    "../../../src/services/auth.service.js",
    () => ({
        default: {
            register: jest.fn(),
            login: jest.fn()
        }
    })
)


const { default: AuthService } = await import("../../../src/services/auth.service.js")


const { default: AuthController } = await import("../../../src/controllers/auth.controller.js")


describe("Auth controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("register", () => {
        test("Should register user", async () => {

            const req = {
                validatedData: {
                    body: {
                        fName: "Luffy",
                        lName: "Monkey D",
                        email: "luffy@example.com",
                        password: "testPass1"
                    }
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }


            const mockResult = {
                user: {
                    id: "user-123",
                    fName: "Luffy",
                    lName: "Monkey D",
                    email: "luffy@example.com"
                },
                token: "mock-token"
            }


            AuthService.register.mockResolvedValue(mockResult)


            await AuthController.register(req, res)


            expect(AuthService.register).toHaveBeenCalledWith(
                "Luffy", "Monkey D", "luffy@example.com", "testPass1"
            )

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith(mockResult)
        })

        test("Should fail and return 400 as status code", async () => {

            const req = {
                validatedData: {
                    body: {
                        fName: "Luffy",
                        lName: "Monkey D",
                        email: "luffy@example.com",
                        password: "testPass1"
                    }
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            AuthService.register.mockRejectedValue(
                new Error("Email already exists")
            )

            await AuthController.register(req, res)


            expect(AuthService.register).toHaveBeenCalledWith(
                "Luffy", "Monkey D", "luffy@example.com", "testPass1"
            )

            expect(res.status).toHaveBeenCalledWith(400)

            expect(res.json).toHaveBeenCalledWith({
                message: "Email already exists"
            })
        })
    })

    describe("login", () => {

        test("Should login user and retun 200 as status code", async () => {

            const req = {
                validatedData: {
                    body: {
                        email: "luffy@example.com",
                        password: "testPass1"
                    }
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const mockResult = {
                user: {
                    id: "user-123",
                    fName: "Luffy",
                    lName: "Monkey D",
                    email: ";uffy@example.com"
                },
                tokem: "mock-token"
            }

            AuthService.login.mockResolvedValue(mockResult)

            await AuthController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith(mockResult);
        })

        test("Should reject login user and retun 400 as status code", async () => {

            const req = {
                validatedData: {
                    body: {
                        email: "luffy@example.com",
                        password: "wrongPass1"
                    }
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            AuthService.login.mockRejectedValue(
                new Error("Invalid credentials")
            )

            await AuthController.login(req, res)

            expect(res.status).toHaveBeenCalledWith(400)

            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid credentials"
            });
        })
    })

    describe("verify", () => {

        test("Should return user", async () => {

            const user = {
                id: "user-123",
                fName: "Luffy",
                lName: "Monkey D",
                email: "luffy@example.com"
            }

            const req = {user}

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await AuthController.verify(req, res)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith({
                valid: true,
                user
            });
        })
    })
})


