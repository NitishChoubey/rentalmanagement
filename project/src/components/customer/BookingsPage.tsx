import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Package, ChevronRight, Star, MessageCircle, Download, Phone, Mail, CreditCard } from 'lucide-react';

interface BookingsPageProps {
  bookings?: any[];
}

const BookingsPage: React.FC<BookingsPageProps> = ({ bookings: externalBookings = [] }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const defaultBookings = {
    current: [
      {
        id: 'RNT-2024-001',
        product: 'MacBook Pro 16" M1',
        image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg',
        startDate: '2024-01-15',
        endDate: '2024-01-22',
        duration: '7 days',
        totalCost: 560,
        status: 'Active',
        pickupLocation: 'Downtown Store',
        returnLocation: 'Downtown Store',
        nextAction: 'Return due in 2 days',
        actionType: 'warning'
      },
      {
        id: 'RNT-2024-002',
        product: 'Professional DSLR Camera',
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        duration: '5 days',
        totalCost: 325,
        status: 'Reserved',
        pickupLocation: 'Midtown Hub',
        returnLocation: 'Midtown Hub',
        nextAction: 'Pickup scheduled tomorrow',
        actionType: 'info'
      }
    ],
    past: [
      {
        id: 'RNT-2024-003',
        product: 'Power Drill Set',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
        startDate: '2023-12-10',
        endDate: '2023-12-15',
        duration: '5 days',
        totalCost: 150,
        status: 'Completed',
        pickupLocation: 'Downtown Store',
        returnLocation: 'Downtown Store',
        rating: 5,
        review: 'Great tool, worked perfectly for my home project!'
      },
      {
        id: 'RNT-2024-004',
        product: 'Electric Bike',
        image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
        startDate: '2023-11-25',
        endDate: '2023-11-30',
        duration: '5 days',
        totalCost: 225,
        status: 'Completed',
        pickupLocation: 'Beach Area',
        returnLocation: 'Beach Area',
        rating: 4,
        review: 'Good bike, battery lasted well throughout the rental period.'
      }
    ]
  };

  // Merge external bookings with default ones
  const allBookings = {
    current: [...defaultBookings.current, ...externalBookings.filter((b: any) => b.status === 'Reserved' || b.status === 'Active')],
    past: [...defaultBookings.past, ...externalBookings.filter((b: any) => b.status === 'Completed')]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Reserved': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
      case 'success': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const ExtendRentalModal = () => {
    const [extendDays, setExtendDays] = useState(1);
    const [extendRate] = useState(selectedBooking?.dailyRate || 50);

    if (!showExtendModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Extend Rental</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extend by (days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={extendDays}
                onChange={(e) => setExtendDays(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Additional Cost:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${extendRate * extendDays}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExtendModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Rental extended successfully!');
                  setShowExtendModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Extension
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReviewModal = () => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');

    if (!showReviewModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-8 w-8 ${
                      star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  >
                    <Star className="h-full w-full" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Review submitted successfully!');
                  setShowReviewModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Track and manage your rental bookings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('current')}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'current'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Current Bookings ({allBookings.current.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Past Bookings ({allBookings.past.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'current' && (
            <div className="space-y-6">
              {allBookings.current.map((booking, index) => (
                <div key={booking.id || index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <img
                      src={booking.image}
                      alt={booking.product}
                      className="w-full lg:w-32 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.product}</h3>
                          <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div>{booking.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Dates</div>
                            <div>{booking.startDate} to {booking.endDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div>{booking.pickupLocation}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Total Cost</div>
                            <div className="text-lg font-semibold text-gray-900">${booking.totalCost}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                        <p className={`text-sm font-medium ${getActionColor(booking.actionType || 'info')} mb-2 sm:mb-0`}>
                          {booking.nextAction || 'Ready for pickup'}
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowExtendModal(true);
                            }}
                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                          >
                            Extend Rental
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedBooking(booking);
                              // Show booking details modal
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                          >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-6">
              {allBookings.past.map((booking, index) => (
                <div key={booking.id || index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <img
                      src={booking.image}
                      alt={booking.product}
                      className="w-full lg:w-32 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.product}</h3>
                          <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div>{booking.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Dates</div>
                            <div>{booking.startDate} to {booking.endDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div>{booking.pickupLocation}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Total Cost</div>
                            <div className="text-lg font-semibold text-gray-900">${booking.totalCost}</div>
                          </div>
                        </div>
                      </div>

                      {booking.rating && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 mr-2">Your Rating:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {booking.review && (
                            <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          Rent Again
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowReviewModal(true);
                          }}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {booking.rating ? 'Update Review' : 'Leave Review'}
                        </button>
                        <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-5 w-5 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Contact Support</div>
              <div className="text-sm text-gray-600">Get help with your rentals</div>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CreditCard className="h-5 w-5 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Payment Methods</div>
              <div className="text-sm text-gray-600">Manage your payments</div>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Download Reports</div>
              <div className="text-sm text-gray-600">Export rental history</div>
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ExtendRentalModal />
      <ReviewModal />
    </div>
  );
};

export default BookingsPage;