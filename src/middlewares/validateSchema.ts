import {Request, Response, NextFunction} from "express";
import {AnyZodObject} from "zod";
import HttpStatus from "http-status-codes";

const validate = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e: any) {
            return res.status(HttpStatus.BAD_REQUEST).send(e.errors)
        }
    }
}

export default validate;