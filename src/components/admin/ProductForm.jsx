import { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'

export default function ProductForm({ categories, product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    fabric_type: '',
    size_range: '',
    image_url: '',
    is_featured: false
  })

  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-600">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {product ? '✏️ Edit Product' : '➕ Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., School Shirt Blue"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Fabric and Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fabric Type
            </label>
            <input
              type="text"
              name="fabric_type"
              value={formData.fabric_type}
              onChange={handleChange}
              placeholder="e.g., 100% Cotton"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Size Range
            </label>
            <input
              type="text"
              name="size_range"
              value={formData.size_range}
              onChange={handleChange}
              placeholder="e.g., XXS-XXL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Image
          </label>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={formData.image_url}
            uploading={uploading}
            setUploading={setUploading}
          />
          {formData.image_url && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <img 
                src={formData.image_url} 
                alt="Preview" 
                className="max-w-xs h-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
          <input
            type="checkbox"
            id="is_featured"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
            ⭐ Featured Product (Show on homepage)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            {product ? '💾 Update Product' : '➕ Add Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center justify-center gap-2"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
