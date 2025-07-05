import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import 'dotenv/config'
export const authCheck=async(req,res,next)=>{
    const token=req.cookies.token
  try  {  if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decodedToken.userId).select("-password")
    if(!user){
          return res.status(401).json({
            message:"Unauthorized"
        })
    }
    req.user=user;
    next()
}catch(error){
    console.log("An error occued in authcheck middleware")
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}