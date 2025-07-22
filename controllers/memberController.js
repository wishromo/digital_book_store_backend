// import User from "../model/User.js";

// // Get all members (admin)
// export const getMembers = async (req, res) => {
//   const members = await User.find({ role: { $ne: "admin" } }).select("-password -refreshToken");
//   res.json(members);
// };

// // Get one member by ID
// export const getMember = async (req, res) => {
//   const member = await User.findById(req.params.id).select("-password -refreshToken");
//   if (!member) return res.status(404).json({ message: "Member not found" });
//   res.json(member);
// };

// // Promote user to member
// export const promoteToMember = async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   user.role = "member";
//   if (req.file?.filename) {
//     user.profileImage = req.file.filename;
//   }

//   await user.save();
//   res.json({ message: "User promoted to member", user });
// };

// // Update member details
// export const updateMember = async (req, res) => {
//   const updates = { ...req.body };
//   if (req.file?.filename) updates.profileImage = req.file.filename;

//   const updated = await User.findByIdAndUpdate(req.params.id, updates, {
//     new: true,
//   }).select("-password -refreshToken");
//   res.json(updated);
// };

// // Delete member (admin only)
// export const deleteMember = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Member deleted" });
// };



import User from "../model/User.js";
import fs from "fs";
import path from "path";

// Get all members (admin)
export const getMembers = async (req, res) => {
  try {
    console.log("get all members")
    const members = await User.find({ role: { $ne: "admin" } }).select("-password -refreshToken");
    res.json({ members }); // ✅ wrapped in object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one member by ID
export const getMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select("-password -refreshToken");
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Promote user to member
export const promoteToMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "member";

    if (req.file?.filename) {
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.json({ message: "User promoted to member", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update member details
export const updateMember = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file?.filename) updates.profileImage = req.file.filename;

    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password -refreshToken");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete member (admin only)
export const deleteMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    // Auto-delete profile image
    if (member.profileImage) {
      const imagePath = path.join("uploads", member.profileImage);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await member.deleteOne();
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
