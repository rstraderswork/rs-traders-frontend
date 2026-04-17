import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
              RS TRADERS
            </Link>
            <p className="text-sm text-gray-400">Premium uniforms for schools across J&K</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/booking" className="hover:text-white transition">Booking</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition">Admin</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">School Shirts</a></li>
              <li><a href="#" className="hover:text-white transition">Track Suits</a></li>
              <li><a href="#" className="hover:text-white transition">Socks & Belts</a></li>
              <li><a href="#" className="hover:text-white transition">ID Cards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <p className="text-sm mb-2">📧 rstraderswork@gmail.com</p>
            <p className="text-sm mb-2">📞 +91-9906353768</p>
            <a 
              href="https://wa.me/919906353768" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 RS TRADERS | Serving Schools in J&K</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}