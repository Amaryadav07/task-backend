

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBCON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
        ssl: true,
  tlsInsecure: false,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: '1'
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports=connectDB;