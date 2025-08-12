import Employee from "../models/empModel.js";
import Department from "../models/depModel.js";
import Leave from "../models/leaveModel.js";

export const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSalaryResult = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
    ]);
    const totalSalary = totalSalaryResult[0]?.totalSalary || 0;

    const appliedLeaves = await Leave.distinct('employeeId');
    
    const leaveStatusAggregation = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Transform aggregation result into an object for easier lookup
    const leaveStatusCounts = leaveStatusAggregation.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const leaveSummary = {
      appliedFor: appliedLeaves.length,
      approved: leaveStatusCounts["Approved"] || 0,
      rejected: leaveStatusCounts["Rejected"] || 0,
      pending: leaveStatusCounts["Pending"] || 0,
    };

    return res.status(200).json({
      totalEmployees,
      totalDepartments,
      totalSalary,
      leaveSummary
    });
  } catch (error) {
    console.error("Error in getSummary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
