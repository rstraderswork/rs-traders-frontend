import { useEffect, useState } from 'react'
import useProductStore from '../../store/productStore'
import api from '../../utils/api'
import ProductCard from '../common/ProductCard'

export default function ProductShowcase() {
  const { products, loading, error, fetchProducts } = useProductStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    console.log('ProductShowcase mounted, fetching products and categories...')
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const { data } = await api.get('/categories')
      const categoryNames = data.map(cat => cat.name)
      setCategories(['All', ...categoryNames])
    } catch (err) {
      console.error('Error fetching categories:', err)
      setCategories(['All'])
    } finally {
      setLoadingCategories(false)
    }
  }

  const filtered = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-10">
        {loadingCategories ? (
          <p className="text-sm text-gray-600">Loading categories...</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition transform hover:scale-105 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
          </>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">📦</div>
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">Error: {error}</p>
            <button
              onClick={() => fetchProducts()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 font-medium">No products found in this category</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}