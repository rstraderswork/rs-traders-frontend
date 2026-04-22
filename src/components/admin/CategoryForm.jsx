import { useState, useEffect } from 'react'

export default function CategoryForm({ category, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📦'
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (category) {
      setFormData(category)
    }
  }, [category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required'
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

  const icons = ['📦', '👕', '🏃', '🧦', '⚫', '🎒', '👞', '🧤', '🧢', '👜', '🎽', '👔']

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-600">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {category ? '✏️ Edit Category' : '➕ Add New Category'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Formal Shirts"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
            placeholder="Category description..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Icon Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category Icon
          </label>
          <div className="grid grid-cols-6 md:grid-cols-8 gap-2 mb-3">
            {icons.map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                className={`p-3 text-2xl rounded-lg border-2 transition ${
                  formData.icon === icon
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">Selected: <span className="font-bold text-2xl">{formData.icon}</span></p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            {category ? '💾 Update Category' : '➕ Add Category'}
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
