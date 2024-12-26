const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    res.json({message:"Welcome to Job-Portal API !!"});
})


app.listen(PORT,()=>{
    console.log(`Connected to ${PORT}`);
})