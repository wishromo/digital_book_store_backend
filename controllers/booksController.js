// import Book from "../model/Books.js";

// // Get all books
// export const getBooks = async (req, res) => {
//   console.log("Get all books");
//   const books = await Book.find().sort({ createdAt: -1 });
//   res.json(books);
// };

// // Get one book
// export const getBook = async (req, res) => {
//   console.log("Get one book")
//   const book = await Book.findById(req.params.id);
//   if (!book) return res.status(404).json({ message: "Not found" });
//   res.json(book);
// };

// // Add book (admin only)
// export const addBook = async (req, res) => {
//   console.log("Add book")
//   console.log("Backend: req.file (Multer's file object):", req.file);
//  // <--- ADD THIS LINE
//   try {
//     const { title, author, description, genre, price } = req.body;
//     const coverImage = req.file?.filename;
//     const newBook = await Book.create({
//       title,
//       author,
//       description,
//       genre,
//       price,
//       coverImage,
//       bookpdf
//     });
//     res.status(201).json(newBook);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update book (admin only)
// export const updateBook = async (req, res) => {
//   console.log("update book")
//   try {
//     const updates = { ...req.body };
//     if (req.file?.filename) {
//       updates.coverImage = req.file.filename;
//     }
//     const updated = await Book.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete book (admin only)
// export const deleteBook = async (req, res) => {
//   console.log("Delte book")
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






import Book from "../model/Books.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
//get __dirname from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all books
export const getBooks = async (req, res) => {
  console.log("Get all books");
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

// Get one book
export const getBook = async (req, res) => {
  console.log("Get one book");
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  res.json(book);
};

// Add book (admin only)
export const addBook = async (req, res) => {
  console.log("Add book");
  try {
    const { title, author, description, genre, price } = req.body;
    const coverImage = req.files?.coverImage?.[0]?.filename || "";
    const bookpdf = req.files?.bookpdf?.[0]?.filename || "";

    const newBook = await Book.create({
      title,
      author,
      description,
      genre,
      price,
      coverImage,
      bookpdf
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update book (admin only)
export const updateBook = async (req, res) => {
  console.log("Update book");
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const updates = { ...req.body };

    // Replace coverImage if a new one is uploaded
    if (req.files?.coverImage?.[0]?.filename) {
      const newImage = req.files.coverImage[0].filename;
      if (book.coverImage) {
        const oldImagePath = path.join("uploads", book.coverImage);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updates.coverImage = newImage;
    }

    // Replace bookpdf if a new one is uploaded
    if (req.files?.bookpdf?.[0]?.filename) {
      const newPDF = req.files.bookpdf[0].filename;
      if (book.bookpdf) {
        const oldPDFPath = path.join("uploads", book.bookpdf);
        if (fs.existsSync(oldPDFPath)) fs.unlinkSync(oldPDFPath);
      }
      updates.bookpdf = newPDF;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete book (admin only)
export const deleteBook = async (req, res) => {
  console.log("Delete book");
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Delete cover image file
    if (book.coverImage) {
      const imagePath = path.join("uploads", book.coverImage);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    // Delete book PDF file
    if (book.bookpdf) {
      const pdfPath = path.join("uploads", book.bookpdf);
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// NEW CONTROLLER FUNCTION
export const getBookPdf = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      console.log(`Backend: PDF request - Book not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (!book.bookpdf) {
      console.log(`Backend: PDF request - No PDF file specified for book ID: ${req.params.id}`);
      return res.status(404).json({ message: 'PDF file not specified for this book.' });
    }

    // --- CORRECTED PDF PATH CONSTRUCTION ---
    const pdfPath = path.join(__dirname, '..', 'uploads', book.bookpdf); // <--- CORRECTED LINE
    console.log(`Backend: Attempting to serve PDF from: ${pdfPath}`);

    if (!fs.existsSync(pdfPath)) {
      console.log(`Backend: PDF file does NOT exist at path: ${pdfPath}`);
      return res.status(404).json({ message: 'PDF file not found on server.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(pdfPath);
    console.log(`Backend: Successfully served PDF for book ID: ${req.params.id}`);

  } catch (error) {
    console.error('Backend: Error fetching PDF:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Book ID format.' });
    }
    res.status(500).json({ message: 'Server error when fetching PDF.' });
  }
};