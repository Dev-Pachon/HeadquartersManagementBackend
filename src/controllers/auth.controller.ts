import {Request, Response} from "express";
import HttpStatus from "http-status-codes";
import AuthService from "../services/auth.service";

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const jwt = await AuthService.validateUser(req.body.email, req.body.password);

            if (jwt === null) {
                return res.status(HttpStatus.UNAUTHORIZED).send("Invalid credentials");
            }

            return res
                .status(HttpStatus.OK)
                .send(jwt);

        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }
}

export default new AuthController();