import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { genToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"
export const login=async(req,res)=>{
const {email,password}=req.body
try {
    if(!email || !password){
        return res.status(400).json({
            message:"All the fields are required"
        })
    }
    const user=await User.findOne({email:email})
    if(!user){
         return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
       return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    genToken(user._id,res)
     return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

} catch (error) {
    console.log("error occured in login controller",error)
          return res.status(500).json({
            message:"Internal server error",
        })
}
}


export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
       if(password.length < 6){
        return res.status(400).json({
            message:"Password must be atleast 6 characters"
        })
       }
       const user=await User.findOne({email:email})
       if(user){
        return res.status(400).json({
        message:"mail already exists"
        })
    }

       const hashedPassword=await bcrypt.hash(password,10)
       const newUser=new User({
        fullName,email,password:hashedPassword
       })
       if(newUser){
        genToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
       }else{
        res.status(400).json({
            message:"Invalid user data"
        })
       }

    } catch (error) {
        console.log("error occured in signup controller")
          res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const logout=(req,res)=>{
    try{
        res.cookie("token","",{maxAge:0})
    res.status(200).json({
        message:"Logout succesfull"
    })
}catch(error){
    console.log("An error occured in logout controller")
    res.status(500).json({
        message:"Internal server error"
    })
}
}


export const updateProfile=async(req,res)=>{
    const {profilePic}=req.body
    const userId=req.user._id
try {
    if(!profilePic){
       return res.status(400).json({
            message:"Profile pic is required"
        })
    }
   const response= await cloudinary.uploader.upload(profilePic)
   const updateUser=await User.findByIdAndUpdate(userId,{
    profilePic:response.secure_url
   },{new:true})
   res.status(201).json({
    message:"Profile updates succesfully"
   })
} catch (error) {
    res.status(500).json({
        message:"Internal server error"
    })
}
}

export const checkAuth=async(req,res)=>{
    try {
    const user=req.user
    res.status(200).json(user)
    } catch (error) {
        console.log("error in check auth controller")
        res.status(500).json({
            message:"Internal server error"
        })
    }
}