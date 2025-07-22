// backend/middleware/profileImageUpload.js (This would be a NEW file)

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import fs to ensure directory exists

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed MIME types for profile images (ONLY IMAGES)
const allowedProfileImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Storage configuration for profile images
const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define a specific subfolder for profile images
    const uploadPath = path.join(__dirname, '..', 'uploads', 'profile_images');

    // Create the 'profile_images' directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // You might want a different naming convention for profile images,
    // e.g., using the user ID if available, or just a timestamp.
    // For registration, req.user might not be set yet, so timestamp is safer.
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `profile-${Date.now()}-${name}${ext}`); // Example: profile-timestamp-filename.ext
  },
});

// File filter specific for profile images (only images)
const profileImageFileFilter = (req, file, cb) => {
  if (allowedProfileImageMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, WEBP) are allowed for profile pictures!"), false);
  }
};

// Multer instance for profile image uploads
const profileImageUpload = multer({
  storage: profileImageStorage,
  fileFilter: profileImageFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // Example: 2MB limit for profile pictures
  },
});

export default profileImageUpload;