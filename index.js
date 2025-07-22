import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRotes.js'
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/booksRoutes.js';
import membrRoutes from './routes/membrRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', membrRoutes);
// server.js or app.js

 app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
