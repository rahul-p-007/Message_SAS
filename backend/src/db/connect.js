import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName :"MessageApp"
        })
        console.log(`Database is connected successfully 🚀🚀`)
    } catch (error) {
        throw new Error("Error will connecting the database")
    }
} 
export default connectDb