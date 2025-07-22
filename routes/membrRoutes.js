import express from 'express';
import {
  getMembers,
  getMember,
  promoteToMember,
  updateMember,
  deleteMember,
} from '../controllers/memberController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import multer from 'multer';
import { promoteToAdmin } from '../controllers/adminControler.js';
const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });
 
// Admin-only
router.get('/', verifyToken, isAdmin, getMembers);
router.get('/:id', verifyToken, isAdmin, getMember);
router.put('/promote/:id', verifyToken, isAdmin, upload.single('profileImage'), promoteToMember);
router.put('/:id', verifyToken, isAdmin, upload.single('profileImage'), updateMember);
router.delete('/:id', verifyToken, isAdmin, deleteMember);
// ✅ Promote user/member to admin
router.put('/:id/promote', verifyToken, isAdmin, promoteToAdmin);
export default router;
