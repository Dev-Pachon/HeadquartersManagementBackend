import { Express, Request, Response } from "express";
import UserController  from "../controllers/user.controller";
import HeadquarterController from "../controllers/headquarter.controller";
import AuthController from "../controllers/auth.controller";
import validateSchema from '../middlewares/validateSchema';
import verifyToken from  '../middlewares/auth';
import {createUserSchema, updateUserSchema} from '../schemas/user.schema'
import {createHeadquarterSchema, updateHeadquarterSchema} from "../schemas/headquarter.schema";


function  routes(app: Express) {

    app.post("/api/auth", AuthController.login);

    app.get("/api/users/:id", verifyToken,  UserController.getUser);
    app.get("/api/users", verifyToken,  UserController.getUsers);
    app.delete("/api/users/:id", verifyToken,  UserController.deleteUser);
    app.put("/api/users/:id", verifyToken, validateSchema(updateUserSchema),  UserController.updateUserHandler);
    app.post("/api/users",  validateSchema(createUserSchema), UserController.createUserHandler);

    app.get("/api/headquarters/:id",verifyToken, HeadquarterController.getHeadquarter);
    app.get("/api/headquarters", HeadquarterController.getHeadquarters);
    app.delete("/api/headquarters/:id", verifyToken,  HeadquarterController.deleteHeadquarter);
    app.put("/api/headquarters/:id", verifyToken, validateSchema(updateHeadquarterSchema),  HeadquarterController.updateHeadquarterHandler);
    app.post("/api/headquarters",  verifyToken,validateSchema(createHeadquarterSchema), HeadquarterController.createHeadquarterHandler);
}

export default routes;