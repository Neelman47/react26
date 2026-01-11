import multer from "multer"
import path from "path"
import fs from "fs"

// ensure upload folders exist
const originalDir = "uploads/original"
if (!fs.existsSync(originalDir)) {
  fs.mkdirSync(originalDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, originalDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false)
    }
    cb(null, true)
  }
})
