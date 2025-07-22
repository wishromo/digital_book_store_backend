// import express from 'express';
// import {
//   getBooks,
//   getBook,
//   addBook,
//   updateBook,
//   deleteBook,
// } from '../controllers/booksController.js';
// import { verifyToken } from '../middleware/authMiddleware.js';
// import { isAdmin, isUserOrMember } from '../middleware/roleMiddleware.js';
// import multer from 'multer';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// router.get('/',getBooks);
// router.get('/:id', verifyToken, isUserOrMember, getBook);
// router.post('/', verifyToken, isAdmin, upload.single('coverImage'), addBook);
// router.put('/:id', verifyToken, isAdmin, upload.single('coverImage'), updateBook);
// router.delete('/:id', verifyToken, isAdmin, deleteBook);

// export default router;



import express from 'express';
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  getBookPdf,
} from '../controllers/booksController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin, isUserOrMember } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // ✅ Import your custom multer

const router = express.Router();

// 👇 Add this upload.fields instead of upload.single
const multiUpload = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "bookpdf", maxCount: 1 },
]);

router.get('/', getBooks);
router.get('/:id', verifyToken, isUserOrMember, getBook);
router.post('/', verifyToken, isAdmin, multiUpload, addBook); // ✅ updated
router.put('/:id', verifyToken, isAdmin, multiUpload, updateBook); // ✅ updated
router.delete('/:id', verifyToken, isAdmin, deleteBook);
router.get('/:id/pdf', verifyToken, isUserOrMember, getBookPdf); // <--- ADD THIS LINE

export default router;
