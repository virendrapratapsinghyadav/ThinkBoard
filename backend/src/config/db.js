import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODBURL}`)
    } catch (error) {
        console.log("mongodb connection error", error);
        process.exit(1)
    }
}