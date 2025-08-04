
import multer from "multer";
import path from "path";

// Storage config: save to /uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter: only image files
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
