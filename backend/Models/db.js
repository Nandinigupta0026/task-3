const mongoose = require('mongoose');
require('dotenv').config(); 
const mongo_url =process.env.MONGO_URL;

mongoose.connect(mongo_url);

const db =mongoose.connection;

db.on('connected',()=>{
    console.log("mongoose connected...");
});


db.on('disconnected',()=>{
    console.log("mongoose disconnected...");
});


db.on('error',(error)=>{
    console.error("error occur:" ,error);
});

module.exports=db;