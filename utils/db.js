import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default function ConnectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log(err)
        console.log("error occured while conneecting to the db")
    })
}