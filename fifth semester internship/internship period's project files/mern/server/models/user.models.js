import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const user = mongoose.model("user",userSchema);

export default user;

