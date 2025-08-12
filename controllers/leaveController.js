import Employee from '../models/empModel.js';
import Leave from '../models/leaveModel.js'


export const addLeave = async(req, res) => {
    try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const employee = await Employee.findOne({userId});
 
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: 'New Leave created successfully.',
      data: newLeave,
    });
  } catch (error) {
   console.error('Add leave error:', error); // <-- already present, but ensure you check terminal/logs
  return res.status(500).json({ error: error.message || 'Internal server error.' });
  }

} 

export const getLeave = async(req, res) => {
  try {
    const {id} = req.params;
    
    let leaves = await Leave.find({employeeId: id})
  
    if(!leaves || leaves.length === 0) {
     const employee = await Employee.findOne({userId: id});
     leaves = await Leave.find({employeeId: employee._id})
    }
    return res.status(200).json({success: true, leaves});
  
  } catch(error) {
    console.error('Get leaves error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
 
  }
}

export const getLeaves = async(req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [{
        path: 'department', 
        select: 'dep_name'
      },
      {
        path: 'userId', 
        select: 'name'
      },
    ]
    })

    return res.status(200).json({success: true, leaves});
  } catch(error) {
    console.error('Get leave error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error.' }); // Add error.message
  }
}


export const getLeaveDetail = async(req, res) => {
 try {
    const {id} = req.params;
    const leave = await Leave.findById({_id: id}).populate({
      path: "employeeId",
      populate: [{
        path: 'department', 
        select: 'dep_name'
      },
      {
        path: 'userId', 
        select: 'name profileImage'
      },
    ]
    })

    return res.status(200).json({success: true, leave});
  } catch(error) {
    console.error('Get leave detail error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error.' }); // Add error.message
  }

}


export const updateLeave = async(req, res) => {
  try {
    const {id} = req.params;
    const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
  if(!leave) {
    return res.status(404).json({ success: false, error: 'Leave not founded.' }); // Add error.message     
  }
    return res.status(200).json({ success: true });        

  } catch (error) {
    console.error('update leave error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error.' }); // Add error.message    
  }
}