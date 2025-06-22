

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title:  String,
  description:  String,
  deadline: Number,
  userid:{type:mongoose.Types.ObjectId, ref:"user"},
  taskstatus: { type: Boolean, default: false }
    
   
  
});

module.exports = mongoose.model("task", TaskSchema);