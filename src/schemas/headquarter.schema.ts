import {boolean, object, string, TypeOf} from "zod";

export const createHeadquarterSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    contact: object({
        name: string({
            required_error: "Contact name is required",
        }),
        phone: string({
            required_error: "Contact phone is required",
        }),
        email: string({
            required_error: "Contact email is required",
        }).email("Not a valid email address")
    }),
    location: object({
        city: string({
            required_error: "Location city is required",
        }),
        address: string({
            required_error: "Location address is required",
        }),
        zipcode: string({
            required_error: "Location zipcode is required",
        })
    }),
    active: boolean().optional()
}).strict()

export const updateHeadquarterSchema = object({
    contact: object({
        name: string({
            required_error: "Name is required",
        }),
        phone: string({
            required_error: "Phone is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email address")
    }),
    location: object({
        city: string({
            required_error: "city is required",
        }),
        address: string({
            required_error: "address is required",
        }),
        zipcode: string({
            required_error: "zipcode is required",
        })
    }),
    name: string({
        required_error: "Name is required",
    })
}).strict()
