import mongoose from "mongoose";
import 'dotenv/config'


// Don't write any special symbols in your password in mongoDB Atlas for creating your database
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connected"));
}