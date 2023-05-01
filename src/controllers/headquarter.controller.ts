import {Request, Response} from "express";
import HttpStatus from "http-status-codes";
import HeadquarterService, {headquarterOptions} from "../services/headquarter.service";
import headquarterService from "../services/headquarter.service";

class HeadquarterController {
    async createHeadquarterHandler(req: Request, res: Response) {
        const options: headquarterOptions = {
            name: req.body.name,
            active: true,
        };
        try {
            const headquarterExist = await HeadquarterService.findHeadquarterWithOptions(options);

            if (headquarterExist.length > 0) {
                return res.status(HttpStatus.CONFLICT).send("Headquarter already exist");
            }

            const headquarter = await HeadquarterService.createHeadquarter(req.body);
            return res.status(HttpStatus.CREATED).send(headquarter);
        } catch (e: any) {
            console.error(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async updateHeadquarterHandler(req: Request, res: Response) {
        try {
            const headquarterExist = await headquarterService.findHeadquarterById(req.params.id);
            if (headquarterExist === null) {
                return res.status(HttpStatus.CONFLICT).send("Headquarter not exist");
            }

            const headquarter = await headquarterService.updateHeadquarter(req.params.id, req.body);
            return res.status(HttpStatus.OK).send(headquarter);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async getHeadquarter(req: Request, res: Response) {
        try {
            const headquarter = await HeadquarterService.findHeadquarterById(req.params.id);
            if (headquarter == null) {
                return res.status(HttpStatus.NOT_FOUND).send("Headquarter not exist");
            }

            return res.status(HttpStatus.OK).send(headquarter);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async getHeadquarters(req: Request, res: Response) {
        try {
            const options: headquarterOptions = {
                active: true,
            };

            if (req.query.id !== undefined) {
                options._id = req.query.id.toString();
            }
            if (req.query.name !== undefined) {
                options.name = req.query.name.toString();
            }
            if (req.query["contact-name"] !== undefined) {
                options["contact.name"] = req.query["contact-name"].toString();
            }
            if (req.query["contact-phone"] !== undefined) {
                options["contact.phone"] = req.query["contact-phone"].toString();
            }
            if (req.query["contact-email"] !== undefined) {
                options["contact.email"] = req.query["contact-email"].toString();
            }
            if (req.query["location-city"] !== undefined) {
                options["location.city"] = req.query["location-city"].toString();
            }
            if (req.query["location-address"] !== undefined) {
                options["location.address"] = req.query["location-address"].toString();
            }
            if (req.query["location-zipcode"] !== undefined) {
                options["location.zipcode"] = req.query["location-zipcode"].toString();
            }

            const headquarters = await HeadquarterService.findHeadquarterWithOptions(options);
            return res.status(HttpStatus.OK).send(headquarters);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }

    async deleteHeadquarter(req: Request, res: Response) {
        try {
            const headquarterExist = await HeadquarterService.findHeadquarterById(req.params.id);
            if (headquarterExist === null) {
                return res.status(HttpStatus.CONFLICT).send("Headquarter not exist");
            }
            const headquarter = await HeadquarterService.deleteHeadquarter(req.params.id);
            return res.status(HttpStatus.OK).send(headquarter);
        } catch (e: any) {
            console.log(e);
            return res.status(HttpStatus.CONFLICT).send(e.message);
        }
    }
}

export default new HeadquarterController();
