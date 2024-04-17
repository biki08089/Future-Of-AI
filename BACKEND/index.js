const express=require("express");
const app=express();
require("dotenv").config();
const dbconnect=require("./config/dataBase");
const router=require("./router/router");
const cors=require("cors");


//middleware for parsing
app.use(express.json());
app.use(cors())
app.use("/api/v1",router);
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log("Wr are running at "+PORT);
})

app.get("/",(req,res)=>{
    res.send("This is home page baby")
})


dbconnect();