import { DB_NAME } from "../constants.js";
import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected! DB_HOST: ${connectionInstance.connection.host}`);


    } catch (error) {
        console.error("MongoDB connection failed ", error);
        process.exit(1);

    }
}

export default connectToDB;