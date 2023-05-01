import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import HttpStatus from "http-status-codes";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    let token: string = req.body.token || req.headers.authorization

    if (!token) {
        return res.status(HttpStatus.FORBIDDEN).send("Forbidden")
    }

    try {
        token = token.substring(7, token.length);
        const tokenSecret = process.env.TOKENSECRET || ""
        res.locals.user = jwt.verify(token, tokenSecret)
        next()
    } catch (e: any) {
        return res.status(HttpStatus.FORBIDDEN).send("Invalid Token");
    }
}

export default verifyToken;