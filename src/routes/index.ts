import { Express, Request, Response } from "express";
import UserController  from "../controllers/user.controller";
import validateSchema from '../middleware/validateSchema';
import verifyToken from  '../middleware/auth';
import {createUserSchema } from '../schemas/user.schema'

function  routes(app: Express) {

    app.post("/api/auth", UserController.login);

    app.get("/api/users/:id", verifyToken,  UserController.getUser);
    app.delete("/api/users/:id", verifyToken,  UserController.deleteUser);
    app.put("/api/users/:id", verifyToken, validateSchema(createUserSchema),  UserController.updateUserHandler);
    app.post("/api/users",  validateSchema(createUserSchema), UserController.createUserHandler);

    app.get("/api/headquarters/:id",verifyToken, HeadquarterController.getHeadquarter);
    app.delete("/api/headquarters/:id", verifyToken,  HeadquarterController.deleteHeadquarter);
    app.put("/api/headquarters/:id", verifyToken, validateSchema(createHeadquarterSchema),  HeadquarterController.updateHeadquarterHandler);
    app.post("/api/headquarters",  validateSchema(createHeadquarterSchema), HeadquarterController.createHeadquarterHandler);
}

export default routes;