import path from "path"
import fs from "fs"
import { compressImage } from "../services/compress.service.js"

export const uploadAndCompress = async (req, res) => {
  try {
    const { quality } = req.body
    const inputPath = req.file.path

    const outputPath = path.join(
      "uploads/compressed",
      "compressed-" + req.file.filename
    )

    await compressImage(inputPath, outputPath, Number(quality))

    const originalSize = fs.statSync(inputPath).size
    const compressedSize = fs.statSync(outputPath).size

    res.json({
      message: "Image compressed successfully",
      originalSize,
      compressedSize,
      compressedImage: outputPath
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
