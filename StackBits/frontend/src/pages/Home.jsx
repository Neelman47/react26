import ImageUpload from "../components/ImageUpload"

export default function Home() {
  return (
    <>  
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">StackBits Coming soon</h2>
      <h2 className="text-center mb-4">Image Compression Tool</h2>
      <ImageUpload />
    </div>
    </>
  )
}
