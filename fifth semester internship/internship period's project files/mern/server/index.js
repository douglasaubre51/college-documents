import express, { json } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";

const app= express();
const port = 3000;

dotenv.config()
app.use(cookieParser())



let string = "mongodb+srv://shotta:mtitsr123@cluster0.hmbtav1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"; 
mongoose.connect(string)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("mongodb connectionerror :",err);
})

app.use(express.json());

app.use(authRoutes);
app.use(adminRoutes);

app.listen(port,(req,res)=>{
    console.log(`server is running on port http://localhost:${port}`);
})