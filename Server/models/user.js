
const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
        // unique:true
    },
    password:{
        type:String
    }
})

module.exports=mongoose.model('User',UserSchema);