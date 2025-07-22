import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  genre: String,
  price: Number,
  coverImage: String,
  bookpdf:String,
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
