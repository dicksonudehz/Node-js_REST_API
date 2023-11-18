import express from "express";
import { changePassword, forgetPassword, logOut, login, register, sendMail, getAUser} from "../controller/userController.js";


const router = express.Router()

router.post('/send-email', sendMail)

//register

router.post('/register', register)

// get a single user
router.get('/getAUser', getAUser)


//login
router.post('/login', login)


//forget password
router.post('/forget-password', forgetPassword)


//change password
router.post('/change-password', changePassword)


//logout 
router.post('/logout', logOut)









export default router