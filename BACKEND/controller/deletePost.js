const myPOST=require("../model/post");


const deletePost=async(req,res)=>{
    try {
        const{id}=req.body;
      

        //Find by id and delete the post...

        const deletePost=await myPOST.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            post:deletePost,
            massage:"Post deleted successfully."
        })
      
      

      



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            massage:"Couldn't delete post"
        })
    }
}

module.exports=deletePost;