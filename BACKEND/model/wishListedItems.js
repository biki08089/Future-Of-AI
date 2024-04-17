const mongoose=require("mongoose");

const wishlistedItemsSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"wishList",
    }],
});

module.exports=mongoose.model("ItemsWishListed",wishlistedItemsSchema);