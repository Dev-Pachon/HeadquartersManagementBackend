import {Request, Response} from "express";
import userService, {userOptions} from "../services/user.service";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";

class UserController {
    async createUserHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserByEmail(req.body.email);
            if (userExist !== null) {
                return res.status(HttpStatus.CONFLICT).send("User already exist");
            }
            const user = await userService.createUser(req.body);
            return res.status(HttpStatus.CREATED).send(user);
        } catch (e: any) {
            console.error(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async updateUserHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.params.id);
            if (userExist === null) {
                return res.status(HttpStatus.CONFLICT).send("User not exist");
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const user = await userService.updateUser(req.params.id, req.body);
            return res.status(HttpStatus.OK).send(user);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await userService.findUserById(req.params.id);
            if (user === null) {
                return res.status(HttpStatus.CONFLICT).send("user not exist");
            }
            user.password = "";
            return res.status(HttpStatus.OK).send(user);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const options: userOptions = {
                active: true,
            };

            if (req.query.id !== undefined) {
                options.id = req.query.id.toString();
            }
            if (req.query.email !== undefined) {
                options.email = req.query.email.toString();
            }
            if (req.query.firstname !== undefined) {
                options.firstname = req.query.firstname.toString();
            }
            if (req.query.lastname !== undefined) {
                options.lastname = req.query.lastname.toString();
            }
            if (req.query.headquarter !== undefined) {
                options.headquarter = req.query.headquarter.toString();
            }

            const users = await userService.findUsersWithOptions(options);
            return res.status(HttpStatus.OK).send(users);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.params.id);
            if (userExist === null) {
                return res.status(HttpStatus.CONFLICT).send("user not exist");
            }
            const user = await userService.deleteUser(req.params.id);
            return res.status(HttpStatus.OK).send(user);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }
}

export default new UserController();
