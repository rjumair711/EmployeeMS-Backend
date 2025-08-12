import mongoose from "mongoose";
import Employee from "./empModel.js";
import Leave from "./leaveModel.js";
import Salary from "./salaryModel.js";
import User from "./userModel.js";

const depSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String},
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

depSchema.pre("deleteOne", {document: true, query: false}, async function(next) {
    try {
        const employees = await Employee.find({department: this._id})
        const empIds = employees.map(emp => emp._id);

        await Employee.deleteMany({department: this._id})
        await Leave.deleteMany({employeeId: {$in : empIds}})
        await Salary.deleteMany({employeeId: {$in : empIds}})
        await User.deleteMany({ _id: { $in: empIds }});
        
        next()
    } catch (error) {
        next(error)
    }
})

const depModel = mongoose.model("Department", depSchema);
export default depModel;