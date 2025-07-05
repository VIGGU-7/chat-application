import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getReciverSocketId, io } from '../lib/socket.js';

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("An error occured in getUserForSidebar controller");
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChat },
                { senderId: userToChat, receiverId: senderId },
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("An occured in get Message controller", error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;

        if (!text && !image) {
            return res.status(400).json({ message: "Message text or image is required" });
        }

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId, // <-- FIXED
            text: text,
            image: imageUrl
        });
        await newMessage.save();
        const reciverSocketId=getReciverSocketId(receiverId)
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};