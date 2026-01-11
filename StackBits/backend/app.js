import express from "express"
import cors from "cors"
import imageRoutes from "./routes/image.routes.js"
import path from "path"

const app = express()

// ✅ allow everything
app.use(cors())

app.use(express.json())
app.use("/uploads", express.static(path.resolve("uploads")))

// routes
app.use("/api/images", imageRoutes)

export default app
