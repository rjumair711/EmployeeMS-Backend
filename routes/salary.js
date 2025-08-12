import express from 'express'
import authMiddleware from '../middleware/authmiddleware.js' 
import { addSalary, getSalary } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add-salary', authMiddleware, addSalary);

router.get('/:id', authMiddleware, getSalary);


export default router;