import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api"
})

export const uploadImage = (formData, onProgress) =>
  API.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total)
      onProgress(percent)
    }
  })
