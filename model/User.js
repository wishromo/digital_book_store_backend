import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'member', 'admin'], default: 'user' },
  profileImage: { type: String },
  refreshToken: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
