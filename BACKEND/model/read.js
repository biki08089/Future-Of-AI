const mongoose=require("mongoose");

const readsItemsSchema=new mongoose.Schema({
   
    id:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },

    usersReadPost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ItemsWishListed",
    }]
})
module.exports=mongoose.model("read",readsItemsSchema);