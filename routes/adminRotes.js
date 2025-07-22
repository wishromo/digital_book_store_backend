// routes/adminRoutes.js
import express from 'express';
import { getAdmins } from '../controllers/adminControler.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAdmins);
// routes/members.js
// router.put('/:id/promote', verifyToken, isAdmin, promoteToAdmin);
// routes/memberRoutes.js (or similar)
// router.put('/members/:id/promote', verifyToken, isAdmin, promoteMember);

export default router;
