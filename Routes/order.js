import express from "express"
import { allOrders, allUserOrders, createPODorder} from "../controller/orderController.js"
import { protect, user } from '../middleware/authMiddleware.js';

const router = express.Router()


router.post('/pod', protect, user, createPODorder)
router.get('/getAllOrders', protect, user, allUserOrders)
router.get('/allOrders', allOrders )

export default router