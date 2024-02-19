import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './routes/auth.routes.js'
import cors from 'cors'

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use("/uploads",express.static("./uploads"));

app.use(router);

app.get("/",(req,res)=>{
    res.status(201).json("server start")
})

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))

app.listen(8000,()=>console.log("app is running on port 8000"))