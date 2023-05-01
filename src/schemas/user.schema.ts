import {object, string, array, TypeOf, date, boolean} from "zod";

export const createUserSchema = object({
    firstname: string({
        required_error: "Firstname is required",
    }),
    lastname: string({
        required_error: "Lastname is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email address"),
    password: string({
        required_error: "Password is required",
    }).min(6, "Password too short"),
    headquarter: array(string()).nonempty(),
    valid_until: string().optional(),
    active: boolean().optional()
}).strict()

export const updateUserSchema = object({
    firstname: string({
        required_error: "Firstname is required",
    }),
    lastname: string({
        required_error: "Lastname is required",
    }),
    password: string({
        required_error: "Password is required",
    }).min(6, "Password too short"),
    headquarter: array(string()).nonempty(),
    valid_until: string().optional(),
}).strict()