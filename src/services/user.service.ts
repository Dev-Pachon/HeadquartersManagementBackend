import UserModel, {UserInput} from "../models/user.model";
import bcrypt from "bcrypt";

export interface userOptions {
    id?: string
    email?: string
    firstname?: string
    lastname?: string
    headquarter?: string
    active: boolean
}

class UserService {
    async createUser(input: UserInput) {
        try {
            input.password = await bcrypt.hash(input.password, 10);
            return await UserModel.create(input);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateUser(id: string, input: UserInput) {
        try {
            return await UserModel.findOneAndUpdate({_id: id}, input, {
                new: true,
            });
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findUserByEmail(emailStr: string) {
        try {
            return await UserModel.findOne({email: emailStr, active: true}, {password: 0})
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findUserById(id: string) {
        try {
            return await UserModel.findOne({_id: id, active: true});
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async findUsersWithOptions(options: userOptions) {
        try {
            return await UserModel.find(options, {password: 0});
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async deleteUser(id: string) {
        try {
            return await UserModel.findOneAndUpdate({_id: id, active: true}, {active: false}, {
                new: true,
            });
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new UserService();