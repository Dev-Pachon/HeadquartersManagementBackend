import mongoose from "mongoose";

export interface UserInput {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    valid_until: Date;
    headquarter: [
        mongoose.Schema.Types.ObjectId,
    ];
    active: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createAt: Date;
    updateAt: Date;
}

const userSchema = new mongoose.Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        valid_until: {type: Date, required: true, default: Date.now() + 1000 * 60 * 60 * 24 * 30 * 6},
        headquarter: [
            {type: mongoose.Schema.Types.ObjectId, ref: "headquarters"}
        ],
        active: {type: Boolean, required: true, default: true}
    }, {
        timestamps: true,
    }
)

const UserModel = mongoose.model<UserDocument>("users", userSchema);

export default UserModel;