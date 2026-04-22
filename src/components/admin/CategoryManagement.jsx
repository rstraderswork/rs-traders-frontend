import { useState, useEffect } from 'react'
import api from '../../utils/api'
import CategoryForm from './CategoryForm'
import CategoryTable from './CategoryTable'

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/categories')
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      alert('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (categoryData) => {
    try {
      const { data } = await api.post('/categories', categoryData)
      setCategories([...categories, data])
      setShowForm(false)
      setSuccessMessage('✅ Category added successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error adding category:', error)
      alert('❌ Failed to add category')
    }
  }

  const handleUpdateCategory = async (categoryData) => {
    try {
      const { data } = await api.put(`/categories/${editingCategory.id}`, categoryData)
      setCategories(categories.map(c => c.id === editingCategory.id ? data : c))
      setEditingCategory(null)
      setShowForm(false)
      setSuccessMessage('✅ Category updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating category:', error)
      alert('❌ Failed to update category')
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure? Products in this category will need reassignment.')) return

    try {
      await api.delete(`/categories/${categoryId}`)
      setCategories(categories.filter(c => c.id !== categoryId))
      setSuccessMessage('✅ Category deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('❌ Failed to delete category')
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  return (
    <div className="category-management">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🏷️ Manage Categories</h2>
            <p className="text-sm text-gray-600 mt-1">Total Categories: <span className="font-bold text-blue-600">{categories.length}</span></p>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
            onClick={() => {
              setEditingCategory(null)
              setShowForm(true)
            }}
          >
            ➕ Add New Category
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
          onCancel={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}

      {/* CATEGORIES TABLE */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">⏳ Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">📭 No categories found.</p>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create your first category!
            </button>
          )}
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteCategory}
        />
      )}
    </div>
  )
}
