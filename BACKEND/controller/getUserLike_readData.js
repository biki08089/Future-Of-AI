
const read=require("../model/read");
const like=require("../model/likes");
const userSchema=require("../model/userSchema");
 
 
 const getUserLike_readData=async(req,res)=>{
    try {
        const {id,email}=req.body;

        const findUser=await userSchema.findOne({email});
        if(!findUser){
            return res.status(401).json({
                success:false,
                massage:"Couldn't found via email the user"
            })
        }
    
        const getUserLike=await like.findOne({id});
        // if(!getUserLike){
        //     res.status(200).json({
        //         success:false,
        //         massage:"Data couldn't be found"
        //     })
        // }
        const getUserRead=await read.findOne({id});
        // if(!getUserRead){
        //     res.status(200).json({
        //         success:false,
        //         massage:"Data couldn't be found"
        //     })
        // }

      return res.status(200).json({
        success:true,
        user:findUser,
        likeData:getUserLike,
        readData:getUserRead,
        massage:"Successfully data fetched"
      })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            massage:"Operation Failed"
        })
    }
 }

 module.exports=getUserLike_readData;