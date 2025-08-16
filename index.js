//callback functions are also called as controlers
// req is compried of three things model + controller + routes
// cors mai origin mai maine "http://localhost:4000" ye likha tha ye tab valid hoga jab mere paas koi or service bhi hoga jo 4000 port pe req kr raha hai 
// in mongo db when we set undefined the field is erased and when we set null teh value is store so b using undefined we use less space -- important to remember

import express from "express"
import dotenv from "dotenv"
import  cors from "cors"
import ConnectDB from "./utils/db.js"
import cookieParser from "cookie-parser"

//import all routes
import router from "./routes/User.routes.js"


dotenv.config()
const port = process.env.PORT || 4000
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://127.0.0.1:3000",
    methods : ["GET", "PUT" ,"POST" , "DELETE"],
    credentials : true,
    allowedHeaders : ["Content-Type", "Authorization"]

}))


app.get("/" ,(req, res)=>{
    res.send("welcome!!!")
})


//connecting db
ConnectDB()


//user routes - yehe pr jo bhi req api/v1/users pe ayegi ya uska aage / kuch bhi lagake ayegi vo redirect ho jayegi router pe and isse ye fayeda hai ki ham baar baar har router mai ye route define nhi krna padega 

app.use("/api/v1/users", router)


app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`)
})