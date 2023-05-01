import mongoose, { mongo } from "mongoose";

async function  connect(){
    const dbUri: string = process.env.DBURI || "";

    try {
        await mongoose.connect(dbUri);
        console.log("connected")
    }catch (e: any){
        console.log("could not connect to db")
        console.error(e)

        process.exit(1);
    }
}

export default connect;