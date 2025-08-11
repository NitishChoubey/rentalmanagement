import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/customer/HomePage';
import ProductsPage from './components/customer/ProductsPage';
import BookingsPage from './components/customer/BookingsPage';
import ProfilePage from './components/customer/ProfilePage';
import AdminDashboard from './components/admin/AdminDashboard';
import OrdersPage from './components/admin/OrdersPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');
  const [customerBookings, setCustomerBookings] = useState<any[]>([]);

  const handleAddBooking = (booking: any) => {
    setCustomerBookings(prev => [...prev, booking]);
  };

  const renderCurrentView = () => {
    if (userRole === 'customer') {
      switch (currentView) {
        case 'home':
          return <HomePage onViewChange={setCurrentView} />;
        case 'products':
          return <ProductsPage onViewChange={setCurrentView} onAddBooking={handleAddBooking} />;
        case 'bookings':
          return <BookingsPage bookings={customerBookings} />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <HomePage onViewChange={setCurrentView} />;
      }
    } else {
      switch (currentView) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'products':
          return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <p>Product management interface would go here.</p>
          </div>;
        case 'orders':
          return <OrdersPage />;
        case 'customers':
          return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <p>Customer management interface would go here.</p>
          </div>;
        case 'reports':
          return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <p>Reports and analytics interface would go here.</p>
          </div>;
        case 'settings':
          return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">System Settings</h2>
            <p>Settings interface would go here.</p>
          </div>;
        default:
          return <AdminDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
          <div className="text-xs text-gray-600 mb-2 px-2">Switch View:</div>
          <div className="flex gap-1">
            <button
              onClick={() => {
                setUserRole('customer');
                setCurrentView('home');
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                userRole === 'customer'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setCurrentView('dashboard');
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                userRole === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      <Layout 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userRole={userRole}
      >
        {renderCurrentView()}
      </Layout>
    </div>
  );
}

export default App;