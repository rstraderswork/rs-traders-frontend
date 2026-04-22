import { useState, useEffect } from 'react'
import api from '../../utils/api'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [successMessage, setSuccessMessage] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  // Fetch products and categories
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Add new product
  const handleAddProduct = async (productData) => {
    try {
      const { data } = await api.post('/products', productData)
      setProducts([...products, data])
      setShowForm(false)
      setSuccessMessage('✅ Product added successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error adding product:', error)
      alert('❌ Failed to add product: ' + (error.response?.data?.message || 'Server error'))
    }
  }

  // Update product
  const handleUpdateProduct = async (productData) => {
    try {
      const { data } = await api.put(`/products/${editingProduct.id}`, productData)
      setProducts(products.map(p => p.id === editingProduct.id ? data : p))
      setEditingProduct(null)
      setShowForm(false)
      setSuccessMessage('✅ Product updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('❌ Failed to update product: ' + (error.response?.data?.message || 'Server error'))
    }
  }

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await api.delete(`/products/${productId}`)
      setProducts(products.filter(p => p.id !== productId))
      setSuccessMessage('✅ Product deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('❌ Failed to delete product')
    }
  }

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category_id === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="product-management">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* HEADER WITH BUTTONS */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">📦 Manage Products</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
          >
            ➕ Add New Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <ProductForm
          categories={categories}
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      {/* PRODUCTS TABLE */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">⏳ Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">📭 No products found.</p>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create one now!
            </button>
          )}
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  )
}
