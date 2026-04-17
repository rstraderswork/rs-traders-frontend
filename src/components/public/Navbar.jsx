import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            RS TRADERS
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</Link>
            <Link to="/booking" className="text-gray-700 hover:text-blue-600 font-medium transition">Booking</Link>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</a>
          </div>
          
          <div className="hidden md:flex gap-4 items-center">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              📞 Call Us
            </a>
            <Link to="/admin/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Home</Link>
            <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Products</Link>
            <Link to="/booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Booking</Link>
            <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Contact</a>
            <div className="px-4 pt-2 flex gap-2">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-700">Call Us</a>
              <Link to="/admin/login" className="flex-1 bg-gray-200 text-gray-900 px-3 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-300">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}