const AdminModel = require("../Models/AdminModel");
const UserModel= require("../Models/UserModel");
const TaskModel=require("../Models/TaskModel")
const userPassword= require("../Middlewares/randomPassword");
var nodemailer = require('nodemailer');

const adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    // Check if admin is not found
    if (!admin) {
      return res.status(401).send({ msg: "Invalid admin email" });
    }

    // Check if password is incorrect
    if (admin.password !== password) {
      return res.status(401).send({ msg: "Invalid password" });
    }

    // Successful login
    res.status(200).send({
      msg: "Login successful",
      admin
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).send({ msg: "Server error during login" });
  }
};


const createUser = async (req, res) => {
  const { name, email, designation } = req.body;
  const UserPass = userPassword(); 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amarnath2893@gmail.com',
      pass: 'cnbm gcvt vwix plrp' 
    }
  });

  var mailOptions = {
    from: 'amarnath2893@gmail.com',
    to: email,
    subject: '🎉 Welcome to the Team!',
    text: `
Hi ${name},

Welcome aboard! 🎉 We're excited to have you join our team as a ${designation}.

Here are your login credentials:

----------------------------------------
🔑 Email     : ${email}
🔐 Password  : ${UserPass}
----------------------------------------

👉 Please make sure to change your password after your first login for security reasons.

If you have any questions or face any issues, feel free to reach out to the admin.

Best regards,  
Admin Team
`
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log("Email Error:", error);
      return res.status(500).send({ msg: "Email sending failed", error });
    } else {
      try {
        const newUser = await UserModel.create({
          name,
          email,
          designation,
          password: UserPass 
        });

        console.log('Email sent: ' + info.response);
        res.status(201).send({ msg: "User created & email sent", user: newUser });
      } catch (err) {
        console.log("DB Error:", err);
        res.status(500).send({ msg: "User creation failed", error: err });
      }
    }
  });
};


const showuserData=async(req,res)=>{
const User=await UserModel.find();
res.send(User)

}

const assignTask=async(req,res)=>{

  const {title,description,deadline,Userid}=req.body;
  try {
    
    const Task=await TaskModel.create({
      title,
      description,
      deadline,
      userid:Userid
    })
    res.status(201).send({msg:"User Task Assign Successfully"})
  } catch (error) {
    console.log(error)
  }


}

const taskDetail=async(req, res)=>{
  try {
     const Task= await TaskModel.find().populate("userid");
     res.status(200).send(Task);
  } catch (error) {
    console.log(error);
  }
}

const changeTaskStatus=async(req, res)=>{
    const {id} = req.query;
    console.log(req.query);
    try {
         const Task = await TaskModel.findByIdAndUpdate(id, {
          taskstatus:false
         })
         res.status(201).send("Succesfully updated!!!");
    } catch (error) {
       console.log(error);
    }
}

const deleteTask=async(req, res)=>{
  const{id}=req.query;
  try {
    const task=await TaskModel.findByIdAndDelete(id)
    res.status(201).send("Record Deleted Successfully")
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  adminlogin,
   createUser,
   showuserData,
   assignTask,
   taskDetail,
   changeTaskStatus,
   deleteTask
};
