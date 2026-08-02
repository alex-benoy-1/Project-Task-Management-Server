import { ZodError } from "zod";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            })
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: error.issues
                })
            }
            next(error);
        }
    }
}

export default validate;