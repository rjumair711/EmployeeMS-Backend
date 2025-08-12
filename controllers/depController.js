import depModel from "../models/depModel.js";

// Add Department
export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new depModel({ dep_name, description });
    await newDepartment.save();
    return res.status(200).json({ success: true, department: newDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Add Department Server Error" });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await depModel.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Departments Server Error" });
  }
};

// Get a single department by ID
export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await depModel.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Department Server Error" });
  }
};

// Edit a department
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const department = await depModel.findByIdAndUpdate(
      {_id: id},
      { dep_name, description },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Edit Department Server Error" });
  }
};

export const deleteDepartment = async(req, res) => {
try {
    const { id } = req.params;
   
    const department = await depModel.findById({_id: id});
    
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    
    await department.deleteOne();

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Delete Department Server Error" });
  }  
}
