import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'
cloudinary.config({
cloud_name:process.env.cloudName,
api_key:process.env.cloudinaryApiKey,
api_secret:process.env.cloudinaryApiSecret
})
export default cloudinary