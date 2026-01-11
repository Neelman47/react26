import sharp from "sharp"
import path from "path"

export const compressImage = async (
  inputPath,
  outputPath,
  quality = 70
) => {
  await sharp(inputPath)
    .rotate() // fixes iPhone orientation
    .jpeg({ quality })
    .toFile(outputPath)
}

