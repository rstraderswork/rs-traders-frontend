import { useState } from 'react'
import axios from 'axios'

export default function ImageUpload({ onImageUpload, currentImage, uploading, setUploading }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Cloudinary configuration - make sure to add these to your .env
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const uploadImage = async (file) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('⚠️ Please upload an image file (JPG, PNG, WebP, etc.)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('⚠️ Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setUploadError('')

    try {
      // Check if Cloudinary credentials are set
      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        setUploadError('❌ Cloudinary configuration missing. Check your .env file.')
        setUploading(false)
        return
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      formData.append('folder', 'rs-traders/products')

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )

      onImageUpload(response.data.secure_url)
      setUploadError('')
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('❌ Failed to upload image. Check Cloudinary settings.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) uploadImage(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) uploadImage(file)
  }

  return (
    <div className="image-upload">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
        } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-input"
          onChange={handleFileSelect}
          accept="image/*"
          disabled={uploading}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div className="py-4">
            <p className="text-lg">⏳ Uploading image...</p>
            <p className="text-sm text-gray-600 mt-1">Please wait...</p>
          </div>
        ) : (
          <label htmlFor="image-input" className="cursor-pointer block">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-gray-900 font-semibold">Drag and drop your image here</p>
            <p className="text-gray-600 text-sm mt-1">or click to select</p>
            <p className="text-gray-500 text-xs mt-2">Max 5MB • JPG, PNG, WebP</p>
          </label>
        )}
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{uploadError}</p>
        </div>
      )}

      {/* Success Message */}
      {currentImage && !uploading && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">✅ Image uploaded successfully!</p>
        </div>
      )}
    </div>
  )
}
