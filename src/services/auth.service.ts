import UserModel, {UserDocument} from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken";

class AuthService {
    async validateUser(emailStr: string, passwordStr: string) {
        try {
            const user: UserDocument | null = await UserModel.findOne({email: emailStr, active: true})

            if (
                user !== null &&
                (await bcrypt.compare(passwordStr, user.password))
            ) {
                const token = jwt.sign(
                    {user_id: user._id, email: user.email},
                    process.env.TOKENSECRET as Secret,
                    {expiresIn: "1h"}
                );

                return {email: user.email, name: user.firstname, token}
            }
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new AuthService();