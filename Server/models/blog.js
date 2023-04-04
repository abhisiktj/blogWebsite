const mongoose =require('mongoose');


const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide title"]
    },
    author:{
        type:String,
        required:[true,"Please provide author"]
    },
    description:{
        type:String,
        required:[true,"please provide description"]
    },
    carousel:{
        type:
        [{
           type:String
        }]
    },
    thumbnail:{
        type:String
    }
})

module.exports=mongoose.model('Blog',blogSchema);
