import { useState } from 'react'
import api from '../../utils/api'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'morning',
    visitType: 'physical',
    interestedProducts: [],
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interestedProducts: checked
          ? [...prev.interestedProducts, value]
          : prev.interestedProducts.filter(p => p !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.schoolName) newErrors.schoolName = 'School name is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/visits/book', formData)
      setBookingId(data.bookingId)
      setSubmitted(true)
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to book visit. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto my-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-8 text-center shadow-lg">
          <div className="text-6xl mb-4 animate-bounce">✓</div>
          <h2 className="text-3xl font-bold text-green-900 mb-3">Booking Confirmed!</h2>
          <p className="text-lg text-green-700 mb-6">Your visit has been successfully scheduled.</p>
          
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <p className="text-sm text-gray-600 mb-2">Your Booking ID:</p>
            <p className="font-mono font-bold text-2xl text-blue-600 break-all">{bookingId}</p>
            <p className="text-xs text-gray-500 mt-3">Save this ID for your records</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-blue-900 mb-2">What's Next?</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Rajesh will contact you soon to confirm the details</li>
              <li>✓ Check your email for confirmation</li>
              <li>✓ Be ready with your school details during the visit</li>
            </ul>
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule a Sample Visit</h1>
          <p className="text-lg text-gray-600">Mr. Rajesh will personally visit your school with product samples</p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 font-medium">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Details Section */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏫</span>
              School Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.schoolName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter school name"
                />
                {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Principal, Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="school@example.com"
                />
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Date & Time
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products & Visit Type */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">👕</span>
              Interested Products
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Shirts', 'Track Suits', 'Socks', 'Belts', 'ID Cards', 'Aprons'].map(product => (
                <label key={product} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    name="interestedProducts"
                    value={product}
                    checked={formData.interestedProducts.includes(product)}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{product}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any specific requirements or questions?"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : '✓ Confirm Booking'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            * Required fields. Rajesh will contact you within 24 hours to confirm.
          </p>
        </form>
      </div>
    </div>
  )
}