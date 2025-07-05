import mongoose from 'mongoose'
import 'dotenv/config'
export const connectDB=async()=>{
    try {
        const response=await mongoose.connect(process.env.mongo_url)
        console.log("DB connected succesfully",response.connection.host)
    } catch (error) {
        console.log("Error occured while connecting to database")
        process.exit(1)
    }
}