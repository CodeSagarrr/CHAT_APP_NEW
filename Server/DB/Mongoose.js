import mongoose from "mongoose";


export const MongoConnect = (url) =>{
    mongoose.connect(url)
    .then(()=> console.log("Mongodb Connect"))
    .catch((err)=> console.error(err));
}