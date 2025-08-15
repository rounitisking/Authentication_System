//the Userschema is the structure of the data we are going to store from the user 
//User is the model which is used to represent the structue so that mongoose can perform operations on it 
// ok so user in the string actually represents the structure and the user as a variable is just used to perfomr operations and the user in the string is useful for th mongoose and the use in the varible is usefull for us give answer in oneline 
// Yes — the `"User"` string is for Mongoose (to link schema to a collection), while the `User` variable is for us to perform operations in code.
// in mongoose we get a feature of timestamps in which we get two features created at and updated at ka time stamp automatically 



import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const Userschema = new mongoose.Schema({
    name : String,
    email : String,
    password: String,
    role : {
        type: String,
        enum : ["user" ,"admin"],
        default : "user"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String
    },
    ResetPwdToken : {
        type : String
    },    
    ResetPwdExpires : {
        type : Date
    }


}, { 
    timestamps : true
})

Userschema.pre("save" , async function (next){
    // here we will be doing encryption of teh password

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }


    next()
})



const User = mongoose.model("User" , Userschema);
export default User;
