import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import connectToDatabase from '../backend/Database/DB.js';
import depRouter from './routes/department.js';
import empRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();
connectToDatabase();


app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', depRouter);
app.use('/api/employee', empRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);



app.listen(process.env.PORT, () => {
    console.log('Server is running on PORT')
})