import express from "express"
import { upload } from "../middlewares/multer.js"
import { uploadAndCompress } from "../controllers/image.controller.js"

const router = express.Router()

router.post(
  "/upload",
  upload.single("image"), // 👈 multer used here
  uploadAndCompress
)

export default router
