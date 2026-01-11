import express from "express"
import cors from "cors"
import imageRoutes from "./routes/image.routes.js"
import path from "path"
import "dotenv/config"

const app = express()

const allowedOrigin = process.env.FRONTEND_URL

app.use(cors({
  origin: (origin, callback) => {
    // allow server-to-server & curl requests (no origin)
    if (!origin) return callback(null, true)

    if (origin === allowedOrigin) {
      return callback(null, true)
    }

    return callback(new Error("Not allowed by CORS"))
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.options("*", cors())

app.use(express.json())
app.use("/uploads", express.static(path.resolve("uploads")))

// routes
app.use("/api/images", imageRoutes)

export default app
