// here i am verifying the user
// middle ware is always used in the routes
//use try catcch  as we don't know whether cookie is present or not 
// here the cookie token is decrypted using jwt
//one we get the token from the cookies the jwt verfy on two basis - 
//1. that the otken is created using the secret key 
// 2.. the token is not expired 
// if the verification is successful then jwt returns the payload means all the details if it is expired it throws an error



//taken oken from the cookie
//check the token that it is a token or not 
// take data from the token and verify it 

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


 const verify = async(req, res ,next)=>{
          //res and req fucntions 
    function errorResponse(err){
    return res.status(400).json({
        message : err
    })
    }

    function successResponse(success){
    return res.status(200).json({
        message : success
    })  
    }

    try {
        console.log(req.cookies)
        const token = req.cookies?.token  // yaha pr ? ka matlab yeh hai ki agar cookkie ho tho send kro varna second line mai ye matlab hai agar cookie hai tho thik varna blank 
         // or it can be written as const token = req.cookies.token || ""

        console.log("token found : " , token ? "yes" : "no")


        if(!token){
            return errorResponse("authentication failed")
        }
        else{
           try {
            const verified =  jwt.verify(token , process.env.JWT_SECRET)
             console.log("decoded data : " , verified)
 
            if(verified){
             
             req.user  = verified  // yaha pr hamne req object mai token ko daal diya hai, in this we have created a field
            }
           } catch (error) {
            console.log("error occured in cces the token by jwt in middleware file")
           }
        }


    } catch (error) {
        
    }
    


    next()
}


export default verify