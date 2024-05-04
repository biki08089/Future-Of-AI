const mongoose=require("mongoose");

const likesItemsSchema=new mongoose.Schema({
    id:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    tag:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    usersLiked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ItemsWishListed",
    }]
})
module.exports=mongoose.model("likes",likesItemsSchema);