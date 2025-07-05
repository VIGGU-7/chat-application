import { Server } from 'socket.io'
import http from "http"
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true
    }
})
export function getReciverSocketId(userId){
    return userSocketMap[userId]
}
//store online users
const userSocketMap=()=>{

}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id)
    const userId=socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id
    io.emit("onlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId]
    });
})

export { app, io, server }