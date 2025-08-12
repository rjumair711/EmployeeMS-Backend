import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Check if all fields are present
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Old password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Password Change Error:", error);
    return res.status(500).json({ success: false, error: "Server error while changing password" });
  }
};
