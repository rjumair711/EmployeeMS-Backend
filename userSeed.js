import User from "./models/userModel.js";
import bcrypt from 'bcrypt';
import connectToDatabase from "./Database/DB.js";

const userRegister = async () => {
    try {
       await connectToDatabase();
       const hashPassword = await bcrypt.hash("admin", 10)
       const newUser = new User({
          name: "Admin",
          email: "admin@gmail.com",
          password: hashPassword,
          role: 'admin'
   })
    await newUser.save();

    } catch(error) {
     console.log(error);
    }
}

userRegister();