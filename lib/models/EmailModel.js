import mongoose  from "mongoose";

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true 
    },
})