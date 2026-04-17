import BookingForm from '../components/public/BookingForm'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Booking</h1>
        <BookingForm />
      </div>
    </div>
  )
}
