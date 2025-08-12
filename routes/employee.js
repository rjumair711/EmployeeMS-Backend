import express from 'express'
import authMiddleware from '../middleware/authmiddleware.js' 
import { addEmployee, editEmployee, fetchEmpByDepId, getEmployees, upload, viewEmployees } from '../controllers/empController.js';

const router = express.Router();


router.post('/add', authMiddleware, upload.single('profileImage'), addEmployee);
router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, viewEmployees);
router.put('/:id', authMiddleware, editEmployee);
router.get('/department/:id', authMiddleware, fetchEmpByDepId);


export default router;