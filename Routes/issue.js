import express from "express"
import { createIssue, getIssue, getIssueId } from "../controller/issueController.js"
import { protect, user } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/create', protect, user,  createIssue)

router.get('/getAllIssues', getIssue)
router.get('/get-issues/:id', getIssueId)

export default router