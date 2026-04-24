import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.image_urls && product.image_urls.length > 0 ? product.image_urls : ['👕']
  const isPlaceholder = typeof images[currentImageIndex] !== 'string' || !images[currentImageIndex].startsWith('http')

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition transform hover:scale-105">
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-6xl group">
          {isPlaceholder ? (
            <span>👕</span>
          ) : (
            <img 
              src={images[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Image Navigation - only show if multiple images */}
          {images.length > 1 && !isPlaceholder && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ▶
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}

          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New</span>
        </div>

        <div className="p-6">
          <p className="text-xs text-blue-600 uppercase tracking-widest font-bold mb-2">
            {product.category}
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-600">Special Price</span>
          </div>

          <div className="space-y-2">
            <Link
              to="/booking"
              className="w-full py-2 px-4 text-sm border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold text-center block"
            >
              Request Sample
            </Link>
            <Link
              to="/booking"
              className="w-full py-2 px-4 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold text-center block"
            >
              Schedule Visit
            </Link>
          </div>

          <div className="mt-4 flex gap-2 text-xs text-gray-500">
            <span>✓ Free Sample</span>
            <span>✓ On Request</span>
          </div>
        </div>
      </div>
    </>
  )
}