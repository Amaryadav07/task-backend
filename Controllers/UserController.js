
const UserModel=require("../Models/UserModel")
const TaskModel=require("../Models/TaskModel")


const loginCheck=async(req,res)=>{

const { name, password }=req.body
try {
    
const User=await UserModel.findOne({name:name});
if(!User)
{
  res.status(400).send({msg:"Invalid Usename"})
}

if (User.password!=password) {
  res.status(400).send({msg:"Invalid Password"})
}

res.status(201).send({msg:"Login Successfully",User})
} catch (error) {
  console.log(error)
}
}

const myTaskList=async(req,res)=>{

 const { id } = req.query;
  console.log(id);
   try {
        const Task= await TaskModel.find({userid:id});
        console.log(Task);
        res.status(200).send(Task);
   } catch (error) {
     console.log(error);
   }


}

const taskComplete=async(req, res)=>{
  const {id}= req.query;

  try {
         const Task= await TaskModel.findByIdAndUpdate(id, {taskstatus:true});
         res.status(201).send({Task:Task, msg:"Succesfully Updated"});
  } catch (error) {
     console.log(error);
  }
}

const resetPassword = async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).send({ msg: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ msg: "Password Reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};


module.exports={
  loginCheck,
  myTaskList,
  taskComplete,
  resetPassword
}