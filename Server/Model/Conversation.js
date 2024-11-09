import mongoose  from "mongoose";


const chatSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    message : {
        type :String,
        required : true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
} , {timestamps:true})


export const chatModel = mongoose.model('chatModel', chatSchema)