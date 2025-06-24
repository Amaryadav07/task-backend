

const express =require('express');
const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Port = process.env.PORT || 8000;
const mongoose = require('mongoose');
require('dotenv').config();
const Dbcon= require("./Config/dbconn");
const taskRoute=require("./Routes/TaskRoute")
const userRoute=require("./Routes/userRoute")



mongoose.connect(process.env.DBCON).then(()=>{
  console.log("DB Connected Successfully");
})

app.use(cors());  

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/admin',taskRoute)
app.use('/user',userRoute)



app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
