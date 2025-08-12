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

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://employee-ms-frontend-lyart.vercel.app",
    credentials: true
}));
app.use(express.json());

connectToDatabase();

app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/department', depRouter);
app.use('/api/employee', empRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

// **Remove app.listen**
// Vercel runs your app as serverless function

export default app;
