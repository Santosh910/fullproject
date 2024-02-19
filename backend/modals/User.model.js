import mongoose, { Schema } from "mongoose";
import validator from "validator";

const user = new Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
       lname:{
        type:String,
        required:true,
        trim:true
       },
       email:{
        type:String,
        required:true,
        unique:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw Error("not valid email")
            }
         }
       },
       mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
       },
       gender:{
        type:String,
        required:true
       },
       status:{
        type:String,
        required:true
       },
       profile:{
        type:String,
        required:true
       },
       location:{
        type:String,
        required:true
       },
       datecreated:Date,
       dateUpdated:Date
})

export default mongoose.model("User",user)