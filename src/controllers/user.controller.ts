import { Request, Response } from "express";
import userService from "../services/user.service";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import HttpStatus from "http-status-codes";

class UserController {
  async createUserHandler(req: Request, res: Response) {
    try {
      const userExist = await userService.findUserByEmail(req.body.email);
      if (userExist !== null) {
        return res.status(HttpStatus.CONFLICT).send("user exist");
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
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
      if (userExist == null) {
        return res.status(HttpStatus.CONFLICT).send("user not exist");
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
      const userExist = await userService.findUserById(req.params.id);
      if (userExist == null) {
        return res.status(HttpStatus.CONFLICT).send("user not exist");
      }
      userExist.password = "";
      return res.status(HttpStatus.OK).send(userExist);
    } catch (e: any) {
      console.log(e);
      return res.status(HttpStatus.CONFLICT).send(e.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userExist = await userService.findUserById(req.params.id);
      if (userExist == null) {
        return res.status(HttpStatus.CONFLICT).send("user not exist");
      }
      let user = await userService.deleteUser(req.params.id);
      return res.status(HttpStatus.OK).send(user);
    } catch (e: any) {
      console.log(e);
      return res.status(HttpStatus.CONFLICT).send(e.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user: UserDocument | null = await userService.findUserByEmail(
        req.body.email
      );
      if (
        user !== null &&
        (await bcrypt.compare(req.body.password, user.password))
      ) {
        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKENSECRET as Secret,
          { expiresIn: "2h" }
        );

        return res
          .status(HttpStatus.OK)
          .send({ email: user.email, name: user.name, token });
      }

      return res.status(HttpStatus.UNAUTHORIZED).send("Invalid credentials");
    } catch (e: any) {
      console.log(e);
      return res.status(HttpStatus.CONFLICT).send(e.message);
    }
  }
}

export default new UserController();
