import Attendance from "../models/attendModel.js";
import Employee from "../models/empModel.js"


const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0]; //"yyyy-mm-dd"

    const employees = await Employee.find({});
    const existing = await Attendance.find({ date });
    const existingIds = new Set(existing.map(a => a.employeeId.toString()));

    const newRecords = employees
      .filter(emp => !existingIds.has(emp._id.toString()))
      .map(emp => ({
        date,
        employeeId: emp._id,
        status: null
      }));

    if (newRecords.length > 0) {
      await Attendance.insertMany(newRecords);
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;