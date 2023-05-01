import mongoose from "mongoose";

export interface HeadquarterInput {
    name: string;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    location:{
        city: string;
        address: string;
        zipcode: string;
    };
    active: boolean;
}

export interface UserDocument  extends HeadquarterInput, mongoose.Document {
    createAt: Date;
    updateAt: Date;
}

const headquarterSchema = new mongoose.Schema({
        name: {type: String, required: true, unique: true},
        contact: {
            name: {type: String, required: true},
            phone: {type: String, required: true},
            email: {type: String, required: true},
        },
        location:{
            city: {type: String, required: true},
            address: {type: String, required: true},
            zipcode: {type: String, required: true}
        },
        active: {type: Boolean, required: true, default: true}
    }, {
        timestamps: true,
    }
)

const HeadquarterModel =  mongoose.model<UserDocument> ("headquarters", headquarterSchema);

export default HeadquarterModel;