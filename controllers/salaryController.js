import Salary from "../models/salaryModel.js";
import Employee from "../models/empModel.js";


export const addSalary = async (req, res) => {
  try {
    const { employeeId, payDate, salary, allowances, deductions } = req.body;

    if (!employeeId || !salary || !allowances || !deductions || !payDate) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }


    const totalSalary = parseInt(salary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      salary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(201).json({
      success: true,
      message: 'Salary record created successfully.',
      data: newSalary,
    });
  } catch (error) {
      console.error('Add salary error:', error);   // keep this
  console.error('Details:', error.message);    // add this
    return res.status(500).json({ error: error.message });
  }
};

export const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // First attempt to get salary by employeeId directly
    let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

    // If no salary, try to find by user's Employee record
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });

      // ❗ Safeguard against employee not being found
      if (!employee) {
        return res.status(200).json({
          success: true,
          message: 'No salary record or employee found.',
          salary: [],
        });
      }

      salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
    }

    return res.status(200).json({
      success: true,
      message: 'Salary records fetched successfully.',
      salary,
    });
  } catch (error) {
    console.error('Get salary error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};



