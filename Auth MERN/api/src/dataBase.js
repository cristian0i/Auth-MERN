import { connect } from "mongoose";
import { config } from "dotenv";
config();

const connetDB = async () => {
    try {
        connect(process.env.MONGO_KEY);
        console.log("mongodb is connected");
    } catch (error) {
        console.error(error);
    }
}

export default connetDB;