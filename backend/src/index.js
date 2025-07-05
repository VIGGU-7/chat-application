import express from 'express'
import authRoutes from './routes/auth.routes.js'
import { connectDB } from './lib/dbconnect.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.routes.js'
import cors from 'cors'
import { app,server} from './lib/socket.js'
import 'dotenv/config'

const PORT=process.env.PORT || 8080;
//middlewares
app.use(cors({
    origin: process.env.clientUrl,
    credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//routes
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)









connectDB().then(()=>{
    server.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})
}
)
