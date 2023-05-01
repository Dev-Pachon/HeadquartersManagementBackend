import HeadquarterModel, {HeadquarterInput} from "../models/headquarter.model";
import UserModel from "../models/user.model";

export interface headquarterOptions {
    _id?: string
    name?: string
    "contact.name"?: string
    "contact.phone"?: string
    "contact.email"?: string
    "location.city"?: string
    "location.address"?: string
    "location.zipcode"?: string
    active: true
}

class HeadquarterService {
    async createHeadquarter (input: HeadquarterInput) {
        try {
            return await HeadquarterModel.create(input);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateHeadquarter(id: string, input: HeadquarterInput) {
        try {
            return await HeadquarterModel.findOneAndUpdate({_id: id}, input, {
                new: true,
            });
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findHeadquarterById(id: string) {
        try {
            return await HeadquarterModel.findOne({_id: id, active: true});
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findHeadquarterWithOptions(options: headquarterOptions) {
        try {
            return await HeadquarterModel.find(options, {password: 0});
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async deleteHeadquarter(id: string) {
        try {
            const headquarterUsers = await UserModel.exists({headquarter: id, active:true});
            if (headquarterUsers !== null) {
                throw new Error("Headquarter has users");
            }
            return await HeadquarterModel.findOneAndUpdate({_id: id, active:true}, {active: false}, {
                new: true,
            });
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new HeadquarterService();