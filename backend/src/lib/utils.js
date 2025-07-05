import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const genToken=async(userId,res)=>{
const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d"
})

res.cookie("token",token,{
    maxAge:7*24*60*60*1000,
})

return true;

}