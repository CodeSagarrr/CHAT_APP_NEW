import mongoose from "mongoose";


const RegisterSchema = mongoose.Schema({
    firstname : {
        type : String,
        require:true
    },
    lastname : {
        type : String,
        require:true
    },
    email : {
        type : String,
        require:true
    },
    password : {
        type : String,
        require:true
    },
    profilepic : {
        type : String,
        default:'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png'
    },
    bio : {
        type : String,
    },
},{timestamps:true})

export const RegisterModel = mongoose.model('RegisterModel', RegisterSchema)