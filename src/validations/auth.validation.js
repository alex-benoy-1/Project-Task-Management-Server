import {z} from "zod";

const registerSchema = z.object ({
    body: z.object({
        fName: z
            .string()
            .min(2)
            .max(50),
        lName: z 
            .string()
            .min(2)
            .max(50),
        email: z
            .string()
            .email(),
        password: z 
            .string()
            .min(8, "Passsword must be at least 8 characters long")
            .regex(/[A-Z]/, "Must contain uppercase")
            .regex(/[a-z]/, "Must contain lowercase")
            .regex(/[0-9]/, "Must contain number")
    }).strict()
})

const loginSchema = z.object ({
    body: z.object({
        email: z
            .email()
            .string(),
        password: z
            .string()
            .min(8, "Passsword must be at least 8 characters long")
            .regex(/[A-Z]/, "Must contain uppercase")
            .regex(/[a-z]/, "Must contain lowercase")
            .regex(/[0-9]/, "Must contain number")
    }).strict()
})

export {
    registerSchema,
    loginSchema
};