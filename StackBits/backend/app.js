import express from "express"
import cors from "cors"
import imageRoutes from "./routes/image.routes.js"
import path from "path"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/images", imageRoutes)
app.use("/uploads", express.static(path.resolve("uploads")))

export default app

