import multer from "multer";
import Employee from "../models/empModel.js"
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import path from 'path';
import depModel from "../models/depModel.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

export const upload = multer({storage: storage});

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "User already registered in employees" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : ""
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary
    });

    await newEmployee.save();

    res.status(201).json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', { password: 0 })
      .populate('department');
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Get Employees Error:", error); // This will print the actual error in your terminal
    return res.status(500).json({ success: false, error: error.message || "Get Employees Server Error" });
  }
};

export const viewEmployees = async (req, res) => {
  const { id } = req.params;

  try {
    let employee = await Employee.findById(id)
      .populate("userId", "-password") // "-" means exclude
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", "-password")
        .populate("department");
    }

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });

  } catch (error) {
    console.error("Get Employee Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Get Employee Server Error",
    });
  }
};


export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    await user.save();

    // Update employee fields
    employee.maritalStatus = maritalStatus;
    employee.designation = designation;
    employee.department = department;
    employee.salary = salary;
    await employee.save();

    // Re-fetch fully populated employee
    const updated = await Employee.findById(id)
      .populate('userId', { password: 0 })
      .populate('department');

    return res.status(200).json({ success: true, employee: updated });

  } catch (error) {
    console.error("Edit Employee Error:", error);
    return res.status(500).json({ success: false, error: error.message || "Edit Employee Server Error" });
  }
};


export const fetchEmpByDepId = async (req, res) => {
   const {id} = req.params;
  try {
    const employee = await Employee.find({department: id})
      .populate('userId', { password: 0 })
      .populate('department');
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Get Employee Error:", error); // This will print the actual error in your terminal
    return res.status(500).json({ success: false, error: error.message || "Get Employee by Dep Server Error" });
  }

}