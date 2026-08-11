import request from "supertest";

import app from "../../src/app.js";
import pgdb from "../../src/configs/db.config.js";


describe("Auth Integration Tests", () => {

    //Clean test data

    afterEach(async () => {

        await pgdb.query(`
            DELETE FROM organizations
            WHERE owner_id IN (
                SELECT id
                FROM users
                WHERE email LIKE 'test-%@example.com'
            )
        `);

        await pgdb.query(`
            DELETE FROM users
            WHERE email LIKE 'test-%@example.com'
        `);

    });


    //Close database connection

    afterAll(async () => {

        await pgdb.end();

    });


    //Register

    describe("POST /auth/register", () => {

        test("should register a new user successfully", async () => {

            const response = await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-register@example.com",
                    password: "Password123"
                });


            expect(response.statusCode)
                .toBe(200);


            expect(response.body)
                .toHaveProperty("user");


            expect(response.body.user)
                .toEqual(
                    expect.objectContaining({
                        fName: "John",
                        lName: "Doe",
                        email: "test-register@example.com"
                    })
                );


            expect(response.body)
                .toHaveProperty("workspace");


            expect(response.body.workspace)
                .toEqual(
                    expect.objectContaining({
                        name: "John's Workspace",
                        type: "personal"
                    })
                );


            expect(response.body)
                .toHaveProperty("token");


            expect(typeof response.body.token)
                .toBe("string");


            //Verify databse entry

            const userResult = await pgdb.query(
                `
                SELECT *
                FROM users
                WHERE email = $1
                `,
                ["test-register@example.com"]
            );


            expect(userResult.rows)
                .toHaveLength(1);


            const user = userResult.rows[0];


            expect(user.first_name)
                .toBe("John");


            expect(user.last_name)
                .toBe("Doe");


            expect(user.password_hash)
                .not.toBe("Password123");


            //Verify organization creation

            const organizationResult = await pgdb.query(
                `
                SELECT *
                FROM organizations
                WHERE owner_id = $1
                `,
                [user.id]
            );


            expect(organizationResult.rows)
                .toHaveLength(1);


            const organization =
                organizationResult.rows[0];


            expect(organization.name)
                .toBe("John's Workspace");


            expect(organization.type)
                .toBe("personal");


            //Verify organization member creation

            const memberResult = await pgdb.query(
                `
                SELECT *
                FROM organization_members
                WHERE organization_id = $1
                AND user_id = $2
                `,
                [
                    organization.id,
                    user.id
                ]
            );


            expect(memberResult.rows)
                .toHaveLength(1);


            expect(memberResult.rows[0].role)
                .toBe("admin");

        });


        test("should reject duplicate email", async () => {


            const firstResponse = await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-duplicate@example.com",
                    password: "Password123"
                });


            expect(firstResponse.statusCode)
                .toBe(200);


            const secondResponse = await request(app)
                .post("/auth/register")
                .send({
                    fName: "Jane",
                    lName: "Doe",
                    email: "test-duplicate@example.com",
                    password: "Password123"
                });


            expect(secondResponse.statusCode)
                .toBe(400);


            expect(secondResponse.body.message)
                .toBe(
                    "An Account with this email already exists"
                );

        });


        test("should reject invalid registration data", async () => {

            const response = await request(app)
                .post("/auth/register")
                .send({
                    fName: "J",
                    lName: "D",
                    email: "not-an-email",
                    password: "weak"
                });


            expect(response.statusCode)
                .not.toBe(200);

        });


        test("should reject extra fields", async () => {

            const response = await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-extra@example.com",
                    password: "Password123",
                    extraField: "not allowed"
                });


            expect(response.statusCode)
                .not.toBe(200);

        });

    });


    //Login

    describe("POST /auth/login", () => {

        test("should login successfully", async () => {

            //Create user

            const registerResponse = await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-login@example.com",
                    password: "Password123"
                });


            expect(registerResponse.statusCode)
                .toBe(200);


            //Correct login

            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: "test-login@example.com",
                    password: "Password123"
                });


            expect(response.statusCode)
                .toBe(200);


            expect(response.body)
                .toHaveProperty("user");


            expect(response.body)
                .toHaveProperty("token");


            expect(response.body.user)
                .toEqual(
                    expect.objectContaining({
                        fName: "John",
                        lName: "Doe",
                        email: "test-login@example.com"
                    })
                );


            expect(typeof response.body.token)
                .toBe("string");

        });


        test("should reject unknown email", async () => {

            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: "test-not-found@example.com",
                    password: "Password123"
                });


            expect(response.statusCode)
                .toBe(400);


            expect(response.body.message)
                .toBe("Invalid credentials");

        });


        test("should reject incorrect password", async () => {

            await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-wrong-password@example.com",
                    password: "Password123"
                });


            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: "test-wrong-password@example.com",
                    password: "WrongPassword123"
                });


            expect(response.statusCode)
                .toBe(400);


            expect(response.body.message)
                .toBe("Invalid credentials");

        });


        test("should reject invalid login data", async () => {

            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: "not-an-email",
                    password: "weak"
                });


            expect(response.statusCode)
                .not.toBe(200);

        });

    });


    //JWT Verification

    describe("GET /auth/verify", () => {

        test("should verify a valid JWT", async () => {

            //Register user and return JWT

            const registerResponse = await request(app)
                .post("/auth/register")
                .send({
                    fName: "John",
                    lName: "Doe",
                    email: "test-verify@example.com",
                    password: "Password123"
                });


            expect(registerResponse.statusCode)
                .toBe(200);


            const token =
                registerResponse.body.token;


            //Return JWT

            const response = await request(app)
                .get("/auth/verify")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );


            expect(response.statusCode)
                .toBe(200);


            expect(response.body.valid)
                .toBe(true);


            expect(response.body.user)
                .toEqual(
                    expect.objectContaining({
                        id: registerResponse.body.user.id,
                        email: "test-verify@example.com",
                        fName: "John",
                        lName: "Doe"
                    })
                );

        });


        test("should reject request without token", async () => {

            const response = await request(app)
                .get("/auth/verify");


            expect(response.statusCode)
                .toBe(401);


            expect(response.body)
                .toEqual({
                    message: "No token provided"
                });

        });


        test("should reject invalid JWT", async () => {

            const response = await request(app)
                .get("/auth/verify")
                .set(
                    "Authorization",
                    "Bearer invalid-token"
                );


            expect(response.statusCode)
                .toBe(401);


            expect(response.body)
                .toEqual({
                    message: "Invalid token"
                });

        });


        test("should reject malformed authorization header", async () => {

            const response = await request(app)
                .get("/auth/verify")
                .set(
                    "Authorization",
                    "invalid-header"
                );


            expect(response.statusCode)
                .toBe(401);

        });

    });

});
