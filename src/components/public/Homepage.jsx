import { Link } from 'react-router-dom'

export default function Homepage() {
  const products = [
    { icon: '👕', name: 'School Shirts', desc: 'Premium cotton shirts' },
    { icon: '🏃', name: 'Track Suits', desc: 'Comfortable track suits' },
    { icon: '🧦', name: 'Socks', desc: 'Quality socks' },
    { icon: '⚫', name: 'Belts', desc: 'Durable belts' },
  ]

  const features = [
    { icon: '✓', title: 'Quality Assured', desc: 'Durable fabrics & perfect fits' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Custom tailoring available' },
    { icon: '📞', title: 'Direct Contact', desc: 'Personal support from Rajesh' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-24 px-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">Welcome to RS Traders</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Premium School Uniforms</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">Quality uniforms for schools across J&K. Get free samples delivered right to your school!</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/products" className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition font-bold text-lg shadow-xl">
              🛍️ Browse Products
            </Link>
            <Link to="/booking" className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-bold text-lg backdrop-blur">
              📅 Schedule Visit
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Free Samples</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span>Same-Day Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-lg text-gray-600">Wide variety of uniforms and accessories for schools</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.name} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition transform hover:scale-105">
                <div className="text-6xl mb-4">{product.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RS Traders?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">Schedule a free sample visit with Rajesh today!</p>
          <Link to="/booking" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition font-bold text-lg">
            Book a Visit Now
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <p className="text-gray-600">Schools Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="hidden md:block">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}