import mongoose, { Schema } from "mongoose";

const salarySchema = new mongoose.Schema({
 employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
 payDate: { type: Date, required: true },
 salary: { type: Number, required: true },
 netSalary: {type: Number},
 allowances: { type: Number },
 deductions: { type: Number },
 createdAt: {type: Date, default: Date.now},
 updatedAt: {type: Date, default: Date.now}
})

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;