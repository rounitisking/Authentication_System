//we get data from the userby two ways url or the body
// before writing any controller and specially touching adatabasea basic theory is that database is in other continent so we have to wait (use async await) and use try catch while working with the database 
//we use return stament inshile sending req so that the execution o fthe function stops if error occured
// there is a crypto module in the ndde js which help to generate jibrish code
// after manupulating with the db always we save the data with await name_of_user.save
// agar mai value ko rq.body se extract karunga tho mujhe key or value dono mil jata hai but vahi agar mai value ko params se extract karunga tho mujhe bas value milta hai 
//bcryptjs is used to store the password in teh form of hash so that it is secure by using a module bcrypt and jab bhi ham password mai kuch bhi operation perorm karenge tho usse encrypt karenge
//node js give us hooks - means pre save    save     post save activities matlab save se pehle ya baad mai kuch activity karenge called as hooks so ham pwd ko hooks mai encrypt karenge and web hooks bhi aise hote hai ki events se pehle kuch kaam
// hooks have next() which tells that the operations have been over 
//
//we store the session token in different places depending n the client like on laptop we store it on cookies 





// steps in authentication system :
//1. get data
//2. validate data
//3. check it exsist or not
//4. create a user in database
//create a  verification token - 6 digit random 
//save one in database and send ooken to user in email 
//send success to user

import User from "../model/User.model.js"
import nodemailer from "nodemailer"
import crypto, { hash } from "crypto"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()


const registerUser = async (req, res)=>{
    
    
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





    const {name , email , password} = req.body

    if(!name || !email || !password){
        return errorResponse("all fields are rquired")
    }
    // else{
    // successResponse("data received")
    // }


    //validation of the data - validating paasword --(password should have 6 character and a speciial character) and email --(email should have a special character)
    
    //validation of the password
    const password_length = password.length 
    const array_symbol = ["@" , "$" , "#" ," %" , "&"]
    let passwordCharTrue = false

    if(password_length >= 6){
        for(let i =0 ; i < array_symbol.length ; i++){
           for(let j =0 ; j < password.length ; j++ ){
            if(array_symbol[i] == password[j]){
                passwordCharTrue = true
            }
           }
        }

        if(!passwordCharTrue){
            return errorResponse("no special character in password")
        }
    }
    else{
       return  errorResponse("password is less or not equal to 6 character")
    }


    
    //validation of email
    let emailCharTrue = false
    for(let i =0 ; i < array_symbol.length ; i++){
           for(let j =0 ; j < email.length ; j++ ){
            if(array_symbol[i] == email[j]){
                emailCharTrue = true
            }
           }
        }
        
    if(!emailCharTrue){
       return  errorResponse("@ is missing in email")
        
    }


    //checking of the data if it exsist or not 
    try {
        const exsistingUser = await User.findOne({email}) //it will find the user

        if(exsistingUser){
           return errorResponse("exsisting User registration is not required")

        }
        // else{
        //     successResponse("exsistingUser not found do registration")
        // }


        const user = await User.create({ name , email , password})
        if(!user){
            errorResponse("error occured while registring the user")
        }
        else{
            
            //generating a random token
            let token = crypto.randomBytes(32).toString("hex")
            user.verificationToken = token
            await user.save()

            
 
            //sending an email
            const transporter = nodemailer.createTransport({
                 host: process.env.HOST,
                 port: process.env.PORT_EMAIL,
                 secure: false, // true for 465, false for other ports
                 auth: {
                 user: process.env.USER,
                 pass: process.env.PWD,
                  },
            });

            const mailOption = {
             from: process.env.SENDER_EMAIL,
             to: user.email,
             subject: "Hello ✔",
             text: `click on the following link to verify http://1270.0.1:3000/api/v1/users/verificationToken/${token}`,
            //  html: "<b>Hello world?</b>", // HTML body
            }    
            
            // const info = await transporter.sendMail(mailOption); 
            
            
            successResponse("email is sent")
        }
        
        
        
    } catch (error) {
        console.log(`error found ${error}`)
    }

    


}



// writing  controller for the verfication of the user by just clicking the link 
const verifyUser = async (req, res)=>{
    //get token from teh url
    //verify the token 
    //if found the user isverfied = true
    //delete the token from the db


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

    const {token} = req.params
    const user = await User.findOne({verificationToken : token})
    console.log(user)
    if(!user){
        errorResponse("some error occured while verifying the user")
    }
    else{
        user.isVerified = true
        user.verificationToken = undefined
        await user.save()
        successResponse("user is verified")
        
    
    }
}



const loginUser = async (req,res)=>{

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


        const {email , password} = req.body
        
        if(!email || !password){
            return errorResponse("all fields are required")
        }
        
        try{
            const user = await User.findOne({email})
            if(!user){
            return errorResponse("email or pwd not found")
             }
        else{
            // hash the password we get from the user 
            const pwdCheck = await bcrypt.compare(password , user.password) //it return true or false value 
            if(pwdCheck){
                if(user.isVerified == true){

                    const token = jwt.sign({id : user._id}, "shhhhh",{ // here shhhhh is a key 
                        expiresIn : "24h"
                    })
                    
                    //storing the session token in the cookies
                    const cookieOption = {
                        httpOnly : true,
                        secure : true,
                        maxAge : 20*60*600*1000
                    }
                    res.cookie("token" , token , ) // the third parameter in this is cookie options 


                    successResponse("login successfull")
                    
                }else{
                   return errorResponse("login failed as you are not verified")
                }
            }
            else{
                return errorResponse("wrong password try again")
            }
        
        }
        }

        catch(err){
            console.log(`error occured in login ${err}`)
        }
}

export {registerUser , verifyUser , loginUser}