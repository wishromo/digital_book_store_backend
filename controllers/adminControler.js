// controllers/adminController.js
import User from '../model/User.js';
// get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password'); // exclude password
    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins', error: err.message });
  }
};
// // controllers/memberController.js
// export const promoteToAdmin = async (req, res) => {
//   try {
//     const member = await User.findById(req.params.id);
//     if (!member) return res.status(404).json({ message: "Member not found" });

//     member.role = "admin";
//     await member.save();

//     res.json({ message: "User promoted to admin", member });
//   } catch (err) {
//     res.status(500).json({ message: "Error promoting member" });
//   }
// };
// controllers/memberController.js (or adminController.js if reused)


export const promoteToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.status(200).json({ message: 'User promoted to admin successfully', user });
  } catch (error) {
    console.error('Error promoting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
