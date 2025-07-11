import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB Connected! DB_HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }

}

export default connectToDB;