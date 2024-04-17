const mongoose=require("mongoose");

const wishlistSchema=new mongoose.Schema({
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
    }
});

module.exports=mongoose.model("wishList",wishlistSchema);