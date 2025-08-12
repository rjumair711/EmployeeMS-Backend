import express from 'express'
import authMiddleware from '../middleware/authmiddleware.js' 
import { addLeave, getLeave, getLeaveDetail, getLeaves, updateLeave } from '../controllers/leaveController.js';

const router = express.Router();


router.post('/add-leave', authMiddleware, addLeave);
router.get('/:id', authMiddleware, getLeave);
router.put('/:id', authMiddleware, updateLeave);
router.get('/detail/:id', authMiddleware, getLeaveDetail);
router.get('/', authMiddleware, getLeaves);


export default router;