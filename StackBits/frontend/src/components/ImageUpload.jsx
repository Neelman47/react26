import { useState, useEffect } from "react"
import { uploadImage } from "../api/imageApi"

export default function ImageUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [quality, setQuality] = useState(70)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

  const validateFile = (file) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif"
    ]

    const allowedExtensions = ["heic", "heif"]

    const fileExt = file.name.split(".").pop().toLowerCase()

    // MIME type OR extension check (iPhone sometimes sends empty/odd MIME)
    const isValidType =
      file.type.startsWith("image/") ||
      allowedMimeTypes.includes(file.type) ||
      allowedExtensions.includes(fileExt)

    if (!isValidType) {
      setError("Only image files (JPG, PNG, WEBP, HEIC) are allowed")
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Maximum allowed file size is 50 MB")
      return false
    }

    return true
  }

  // 📁 handle file select
  const handleFile = (file) => {
    setError("")
    setResult(null)

    if (!validateFile(file)) return

    setFile(file)
    setPreview(URL.createObjectURL(file)) // 👈 preview before upload
  }

  // 📦 drag & drop
  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 1) {
      setError("Only single file allowed")
      return
    }

    handleFile(e.dataTransfer.files[0])
  }

  // 🚀 upload image
  const handleUpload = async () => {
    if (!file) return setError("Please select an image")

    const formData = new FormData()
    formData.append("image", file)
    formData.append("quality", quality)

    try {
      setProgress(0)
      const res = await uploadImage(formData, setProgress)
      setResult(res.data)
    } catch (err) {
      setError("Upload failed")
    }
  }

  {file && (
    <small className="text-muted d-block mt-2">
      Format: {file.name.split(".").pop().toUpperCase()} | Size:{" "}
      {(file.size / (1024 * 1024)).toFixed(2)} MB
    </small>
  )}

  // ⬇️ force download (same tab)
  const handleDownload = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/${result.compressedImage}`
    )
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "compressed-image"
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  // 🧼 cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="card shadow-sm p-4">
      <small className="text-muted">iPhone images preview not available (like heic)</small>

      {/* Drag & Drop */}
      <div
        className="border border-2 border-dashed rounded p-4 text-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          className="form-control mb-2"
          accept="image/*,.heic,.heif"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <small className="text-muted">Drag & drop supported</small>
      </div>

      {/* Preview before upload */}
      {preview && !result && (
        <div className="text-center mt-3">
          <h6>Original Preview</h6>
          <img
            src={preview}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "250px" }}
          />
        </div>
      )}

      {/* Quality slider */}
      <label className="form-label mt-3">
        Compression Quality: <b>{quality}</b>
      </label>
      <input
        type="range"
        className="form-range"
        min="10"
        max="90"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      />

      {/* Error */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Upload button */}
      <button
        className="btn btn-primary w-100 mt-3"
        onClick={handleUpload}
      >
        Upload & Compress
      </button>

      {/* Progress bar */}
      {progress > 0 && (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Comparison after upload */}
      {result && (
        <div className="mt-4">
          <h5 className="text-center mb-3">Comparison</h5>

          <div className="row text-center">
            <div className="col-md-6">
              <h6>Original</h6>
              <img
                src={preview}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px" }}
              />
              <p className="mt-2">
                {(result.originalSize / 1024).toFixed(2)} KB
              </p>
            </div>

            <div className="col-md-6">
              <h6>Compressed</h6>
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${result.compressedImage}`}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px" }}
              />
              <p className="mt-2">
                {(result.compressedSize / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          {/* Download */}
          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleDownload}
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  )
}
