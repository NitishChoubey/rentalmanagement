import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Calendar, MapPin, Package } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const orders = [
    {
      id: 'RNT-2024-156',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      product: {
        name: 'MacBook Pro 16" M1',
        image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg',
        category: 'Electronics'
      },
      rental: {
        startDate: '2024-01-15',
        endDate: '2024-01-22',
        duration: '7 days',
        pickupLocation: 'Downtown Store',
        returnLocation: 'Downtown Store'
      },
      pricing: {
        rate: 80,
        rateType: 'daily',
        totalAmount: 560,
        deposit: 100,
        paidAmount: 560
      },
      status: 'Active',
      createdAt: '2024-01-14',
      paymentStatus: 'Paid'
    },
    {
      id: 'RNT-2024-157',
      customer: {
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 234-5678'
      },
      product: {
        name: 'Professional DSLR Camera',
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
        category: 'Electronics'
      },
      rental: {
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        duration: '5 days',
        pickupLocation: 'Midtown Hub',
        returnLocation: 'Midtown Hub'
      },
      pricing: {
        rate: 65,
        rateType: 'daily',
        totalAmount: 325,
        deposit: 50,
        paidAmount: 325
      },
      status: 'Reserved',
      createdAt: '2024-01-18',
      paymentStatus: 'Paid'
    },
    {
      id: 'RNT-2024-158',
      customer: {
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        phone: '+1 (555) 345-6789'
      },
      product: {
        name: 'Power Drill Set',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
        category: 'Tools'
      },
      rental: {
        startDate: '2024-01-10',
        endDate: '2024-01-15',
        duration: '5 days',
        pickupLocation: 'Downtown Store',
        returnLocation: 'Downtown Store'
      },
      pricing: {
        rate: 30,
        rateType: 'daily',
        totalAmount: 150,
        deposit: 25,
        paidAmount: 150
      },
      status: 'Overdue',
      createdAt: '2024-01-09',
      paymentStatus: 'Paid'
    },
    {
      id: 'RNT-2024-159',
      customer: {
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        phone: '+1 (555) 456-7890'
      },
      product: {
        name: 'Electric Bike',
        image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
        category: 'Vehicles'
      },
      rental: {
        startDate: '2024-01-05',
        endDate: '2024-01-10',
        duration: '5 days',
        pickupLocation: 'Beach Area',
        returnLocation: 'Beach Area'
      },
      pricing: {
        rate: 45,
        rateType: 'daily',
        totalAmount: 225,
        deposit: 50,
        paidAmount: 225
      },
      status: 'Completed',
      createdAt: '2024-01-04',
      paymentStatus: 'Paid'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Reserved': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all rental orders</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            New Order
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, customers, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reserved">Reserved</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Active Rentals</h3>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Overdue Returns</h3>
          <p className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === 'Overdue').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${orders.reduce((total, order) => total + order.pricing.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Orders ({filteredOrders.length})
            </h3>
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Order Details</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Product</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Rental Period</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">Created: {order.createdAt}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.email}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{order.product.name}</p>
                        <p className="text-sm text-gray-600">{order.product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {order.rental.startDate} - {order.rental.endDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="h-4 w-4 mr-1" />
                        {order.rental.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.rental.pickupLocation}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">${order.pricing.totalAmount}</p>
                      <p className="text-sm text-gray-600">
                        ${order.pricing.rate}/{order.pricing.rateType}
                      </p>
                      <p className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {filteredOrders.length} of {orders.length} results
            </p>
            <div className="flex space-x-1">
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;