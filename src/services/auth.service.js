import UserModel from "../models/user.model.js";
import OrganizationModel from "../models/organization.model.js";
import OrgMemberModel from "../models/orgMember.model.js"
import pgdb from "../configs/db.config.js"
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";
import crypto from "crypto";
import logger from "../utils/logger.js";

const register = async (fName, lName, email, password) => {
    const userExists = await UserModel.findUserByEmail(email);
    if(userExists){
        throw new Error("An Account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password,10);

    const client = await pgdb.connect();
    try {
        await client.query("BEGIN");
        
        const user = await UserModel.createUser(fName, lName, email, passwordHash, client);
        const token = generateToken(user);
        const workspaceName = `${user.first_name}'s Workspace`;
        const slug = crypto.randomUUID();
        
        const organization = await OrganizationModel.createOrganization(
            workspaceName, slug, user.id, "personal", client);

        const member = await OrgMemberModel.createOrgMember(
            organization.id, user.id, "admin", client
        );

        await client.query("COMMIT");

        return {
            user: {
                id: user.id,
                fName: user.first_name,
                lName: user.last_name,
                email: user.email,
                createdAt: user.created_at
            },
            workspace: {
                id: organization.id,
                name: organization.name,
                slug: organization.slug,
                type: organization.type,
                createdBy: member.user_id
            }, 
            token
        };

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }

}

const login = async (email, password) => {
    
    logger.info(
        { email },
        "Login attempt"
    )

    const user = await UserModel.findUserByEmail(email);
    if(!user) {
        logger.warn(
            { email },
            "Login failed, user not found"
        )
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if(!passwordMatch) {
        logger.warn(
            { email },
            "Login failed, Incorrect password"
        )
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            fName: user.first_name,
            lName: user.last_name,
            email: user.email,
            createdAt: user.created_at
        },
        token
    };

}

export default { register, login }