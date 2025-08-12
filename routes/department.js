import express from 'express';
import authMiddleware from '../middleware/authmiddleware.js';
import  { addDepartment, deleteDepartment, editDepartment, getDepartment, getDepartments }  from '../controllers/depController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments);
router.post('/add', authMiddleware, addDepartment);
router.get('/:id', authMiddleware, getDepartment);
router.put('/:id', authMiddleware, editDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);


export default router;

