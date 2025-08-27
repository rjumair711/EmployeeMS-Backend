import express from 'express';
import authMiddleware from '../middleware/authmiddleware.js';
import attendanceMiddleware from '../middleware/defaultAttendance.js';
import { attendanceReport, getAttendance, updateAttendance } from '../controllers/attendanceController.js';

const router = express.Router();


router.get("/", authMiddleware, attendanceMiddleware, getAttendance)
router.put("/update/:employeeId", attendanceMiddleware, updateAttendance)
router.get("/report", authMiddleware, attendanceReport)

export default router;