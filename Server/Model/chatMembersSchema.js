import mongoose from "mongoose";


const memberSchema = mongoose.Schema({
    members : {
        type : Array,
    }
},{timestamps:true})


export const memberModel = mongoose.model('memberModel' , memberSchema)