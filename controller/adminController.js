import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt"
import randomstring from "randomstring";
import generateToken from "../utils/generateToken.js";


//admin register

const registerAdmin = async(req, res) =>{
    try{
        const {name, email, password} = req.body
        const adminExist = await Admin.findOne({email: email})
        if(adminExist){
            res.status(400).json({message: 'Admin already exist'})
        }else{
            const newAdmin = await new Admin({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            })
            const saveAdmin = await newAdmin.save();
            if(saveAdmin){
                res.json({message: ' registration successful', saveAdmin})
            }else{
                res.status(400).json({message:"registration failed"})
            }
        }
    }catch(err){
        throw new Error(err)
    }
}

//admin login

const loginAdmin = async(req, res) => {
    try{
        const {email, password} = req.body
        const admin = await Admin.findOne({email: email})
        if(admin){
            const isMatch = bcrypt.compareSync(password, admin.password)
            if(isMatch){
                const token = generateToken(admin._id)
                res.json({message: 'login successful', token, admin})
            }else{
                res.status(400).json({message: 'wrong admin name or password'})
            }
        }else{
            res.status(400).json({message: ' Admin not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}

//forget password
const adminForgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        const otp2 = randomstring.generate({
          length: 6,
          charset: "numeric",
        });
        // admin.otp = otp;
        await Admin.findByIdAndUpdate(
          admin._id,
          { otp: otp2 },
          { new: true, useFindAndModify: false }
        );
        res.json({ message: "otp sent to your mail", otp2, admin });
      } else {
        res.status(400).json({ message: "Sorry, admin doesn't exist" });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

const adminChangePassword =  async(req, res) =>{
    try{
        const {otp, password} = req.body
        const admin = await Admin.findOne({otp: otp})
        if(admin){
            const otp2 = randomstring.generate({
                length: 6,
                charset: 'numeric'
              });
            const newPass = await bcrypt.hash(password, 10)
            const updatePass = await Admin.findByIdAndUpdate(admin._id, {password: newPass, otp: otp2}, {new: true, useFindAndModify: false})

            if(updatePass){
                res.json({message: "password Updated Successfully"})
            }else{
                res.json({message: "unable to update password"})
            }
        }else{
            res.json({message: "admin not found"})
        }
    }catch(err){
        throw new Error(err)
    }
}

//logout

const adminLogOut = async(req, res) =>{
    try{
        req.header.authorization = null;

            res.json({message: " logout successful"})
     
    }catch(err){
        throw new Error(err)
    }
}
export{registerAdmin, loginAdmin, adminForgetPassword, adminChangePassword, adminLogOut }

