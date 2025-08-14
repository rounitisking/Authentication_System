import express from "express"
import dotenv from "dotenv"
import  cors from "cors"
import ConnectDB from "./utils/db.js"
dotenv.config()
const port = process.env.PORT || 4000
const app = express()
app.use(express.urlencoded())
app.use(express.json)
app.use(cors({
    origin : ["http://127.0.0.1:3000" , "http://localhost:4000"],
    methods : ["GET", "PUT" ,"POST" , "DELETE"],
    Credential : true,
    Headers : ["Content-Type", "Autherization"]

}))


app.get("/" ,(req, res)=>{
    res.send("welcome!!!")
})


//connecting db
ConnectDB()

app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`)
})