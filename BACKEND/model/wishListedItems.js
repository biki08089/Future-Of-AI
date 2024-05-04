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
    itemsLikedfromCreatorPage:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"likes",
    }],
    itemsReadfromCreatorPage:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"read",
    }],
});

module.exports=mongoose.model("ItemsWishListed",wishlistedItemsSchema);