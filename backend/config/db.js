import mongoose from "mongoose";

const connectDb = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("db error: MONGODB_URL is not set in .env");
        return;
    }

    try {
        // console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL
        );
        console.log("db connected");
    } catch (error) {
        console.log(process.env.MONGO_URI)
        // console.error("db error:", error.message);
        // console.error("FULL ERROR:", error);
    }
};

export default connectDb;