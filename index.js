// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { connectDB } from './config/db.js';
// import adminRoutes from './routes/adminRotes.js'
// import authRoutes from './routes/authRoutes.js';
// import bookRoutes from './routes/booksRoutes.js';
// import membrRoutes from './routes/membrRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.use(cors({ origin: ['https://digital-book-store-fronend.vercel.app','http://localhost:5173'], methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));

// app.use('/api/auth', authRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/members', membrRoutes);
// // server.js or app.js

//  app.use('/api/admin', adminRoutes);
// export default app;
// //start the server only if not testing
// if (process.env.NODE_ENV !== "test") {
//   app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 4000}`);
//   });
// }
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { connectDB } from './config/db.js'; // Assuming this connects to your real DB
// import adminRoutes from './routes/adminRotes.js';
// import authRoutes from './routes/authRoutes.js';
// import bookRoutes from './routes/booksRoutes.js';
// import membrRoutes from './routes/membrRoutes.js';

// dotenv.config();

// // CONDITIONAL DATABASE CONNECTION:
// // Connect to the real database ONLY if not in a test environment
// if (process.env.NODE_ENV !== "test") {
//   connectDB();
// }

// const app = express();



// // Middleware setup
// app.use(express.json()); // This line appears twice, one is enough.
// app.use(cors({ origin: ['https://digital-book-store-fronend.vercel.app','http://localhost:5173'], methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));

// // Route setup
// app.use('/api/auth', authRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/members', membrRoutes);
// app.use('/api/admin', adminRoutes);

// // Export the app instance for testing frameworks like Supertest
// export default app;

// // Start the server ONLY if not in a test environment
// if (process.env.NODE_ENV !== "test") {
//   app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 5000}`); // Corrected port in console log
//   });
// }



import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js'; 

// Import your route files
import adminRoutes from './routes/adminRotes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/booksRoutes.js';
import membrRoutes from './routes/membrRoutes.js';

dotenv.config();

// Connect to MongoDB (skip in test env)
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();

// ---------------------
// Middleware
// ---------------------
app.use(express.json());
app.use(cors({
  origin: [
    'https://digital-book-store-fronend.vercel.app', 
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// ---------------------
// API Routes
// ---------------------
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', membrRoutes);
app.use('/api/admin', adminRoutes);

// Health check route (useful for Railway)
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// ---------------------
// Start the server
// ---------------------
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Export for testing (if needed)
export default app;
