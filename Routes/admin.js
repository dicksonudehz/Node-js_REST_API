import express from "express"
import { adminChangePassword, adminForgetPassword, adminLogOut, loginAdmin, registerAdmin } from "../controller/adminController.js"


const router = express.Router()


router.post('/admin-register', registerAdmin)

router.post('/admin-login', loginAdmin)
router.post('/adminForget-password', adminForgetPassword)

router.post('/adminChange-password', adminChangePassword)

router.post('/adminLogout', adminLogOut)


export default router