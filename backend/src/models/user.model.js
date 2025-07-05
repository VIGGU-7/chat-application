import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    profilePic:{
        default:"",
        type:String
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)