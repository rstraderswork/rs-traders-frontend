import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import useAuthStore from '../../store/authStore'
import ProductManagement from './ProductManagement'
import CategoryManagement from './CategoryManagement'

export default function AdminDashboard() {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('visits') // 'visits', 'products', 'categories'
  const logout = useAuthStore(state => state.logout)

  useEffect(() => {
    console.log('AdminDashboard mounted, fetching visits...')
    fetchVisits()
  }, [])

  const fetchVisits = async () => {
    try {
      console.log('Fetching visits from API...')
      const { data } = await api.get('/visits')
      console.log('Visits fetched:', data)
      setVisits(data || [])
    } catch (err) {
      console.error('Error fetching visits:', err.message || err)
      setVisits([])
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (id) => {
    try {
      await api.put(`/visits/${id}/accept`, {
        confirmedDate: new Date().toISOString().split('T')[0],
        confirmedTime: 'morning'
      })
      fetchVisits()
    } catch (err) {
      console.error('Error accepting visit:', err)
    }
  }

  const handleReject = async (id) => {
    try {
      await api.put(`/visits/${id}/reject`, { reason: 'Declined' })
      fetchVisits()
    } catch (err) {
      console.error('Error rejecting visit:', err)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const stats = [
    { label: 'Pending', count: visits.filter(v => v.status === 'pending').length, color: 'bg-yellow-500', icon: '⏳' },
    { label: 'Confirmed', count: visits.filter(v => v.status === 'confirmed').length, color: 'bg-green-500', icon: '✓' },
    { label: 'Rejected', count: visits.filter(v => v.status === 'rejected').length, color: 'bg-red-500', icon: '✗' },
    { label: 'Total', count: visits.length, color: 'bg-blue-500', icon: '📊' }
  ]

  const filteredVisits = filter === 'all' 
    ? visits 
    : visits.filter(v => v.status === filter)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
              RS TRADERS
            </Link>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <button
            onClick={() => {
              logout()
              window.location.href = '/admin/login'
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('visits')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm transition ${
                activeTab === 'visits'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Visit Bookings
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm transition ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📦 Products
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 px-2 border-b-2 font-semibold text-sm transition ${
                activeTab === 'categories'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🏷️ Categories
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        
        {/* VISITS TAB */}
        {activeTab === 'visits' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-gray-200 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                      <p className="text-4xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                    <div className={`${stat.color} text-white rounded-full p-4 text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visit Requests Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <h2 className="text-2xl font-bold">Visit Requests</h2>
                <p className="text-blue-100 text-sm mt-1">Manage booking requests from schools</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b border-gray-200 px-6 pt-4">
                {['all', 'pending', 'confirmed', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`pb-3 px-4 font-medium text-sm transition border-b-2 capitalize ${
                      filter === status
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {status === 'all' ? 'All Requests' : status}
                  </button>
                ))}
                <span className="ml-auto pt-1 text-sm text-gray-500">
                  {filteredVisits.length} {filteredVisits.length === 1 ? 'request' : 'requests'}
                </span>
              </div>

              {/* Content */}
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 text-lg">⏳ Loading requests...</p>
                  </div>
                ) : filteredVisits.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 text-lg">📭 No {filter !== 'all' ? filter : ''} requests yet</p>
                  </div>
                ) : (
                  filteredVisits.map(visit => (
                    <div key={visit.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{visit.school_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(visit.status)}`}>
                              {visit.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Contact Person</p>
                              <p className="text-sm text-gray-900 font-medium">{visit.contact_person || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Phone</p>
                              <a href={`tel:${visit.phone}`} className="text-sm text-blue-600 hover:underline font-medium">
                                {visit.phone}
                              </a>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Email</p>
                              <a href={`mailto:${visit.email}`} className="text-sm text-blue-600 hover:underline font-medium truncate">
                                {visit.email}
                              </a>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Preferred Date</p>
                              <p className="text-sm text-gray-900 font-medium">{visit.preferred_date || 'N/A'}</p>
                            </div>
                          </div>

                          {visit.interested_products && (
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Interested Products:</p>
                              <div className="flex flex-wrap gap-2">
                                {visit.interested_products.map((product, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                    {product}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        {visit.status === 'pending' && (
                          <div className="flex gap-2 ml-4 flex-shrink-0">
                            <button
                              onClick={() => handleAccept(visit.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center gap-2"
                            >
                              ✓ Accept
                            </button>
                            <button
                              onClick={() => handleReject(visit.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm flex items-center gap-2"
                            >
                              ✗ Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <ProductManagement />
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <CategoryManagement />
        )}

      </div>
    </div>
  )
}
