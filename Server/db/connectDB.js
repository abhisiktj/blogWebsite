
const mongoose=require('mongoose');

mongoose.set('strictQuery',true);
const connectDB=(uri)=>{
    return mongoose.connect(uri);
}
module.exports=connectDB;