import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$45,234',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Active Rentals',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Total Customers',
      value: '2,847',
      change: '+15.3%',
      changeType: 'increase',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Pending Returns',
      value: '23',
      change: '-5.1%',
      changeType: 'decrease',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentOrders = [
    {
      id: 'RNT-2024-156',
      customer: 'Sarah Johnson',
      product: 'MacBook Pro 16"',
      amount: '$560',
      status: 'Active',
      dueDate: '2024-01-22',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'RNT-2024-157',
      customer: 'Mike Chen',
      product: 'DSLR Camera',
      amount: '$325',
      status: 'Reserved',
      dueDate: '2024-01-25',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'RNT-2024-158',
      customer: 'Emma Davis',
      product: 'Power Drill Set',
      amount: '$150',
      status: 'Overdue',
      dueDate: '2024-01-18',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'RNT-2024-159',
      customer: 'James Wilson',
      product: 'Electric Bike',
      amount: '$225',
      status: 'Completed',
      dueDate: '2024-01-20',
      statusColor: 'bg-gray-100 text-gray-800'
    }
  ];

  const alerts = [
    {
      type: 'overdue',
      message: '3 rentals are overdue',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      type: 'lowstock',
      message: '5 products are low in stock',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      type: 'maintenance',
      message: '2 products need maintenance',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your rental business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue Chart</p>
              <p className="text-sm text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Rented Products</h3>
          <div className="space-y-4">
            {[
              { name: 'MacBook Pro 16"', rentals: 45, revenue: '$3,600' },
              { name: 'DSLR Camera', rentals: 38, revenue: '$2,470' },
              { name: 'Electric Bike', rentals: 32, revenue: '$1,440' },
              { name: 'Power Drill Set', rentals: 28, revenue: '$840' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.rentals} rentals</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(product.rentals / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Order ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Product</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{order.product}</td>
                    <td className="py-3 px-2 text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">{order.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Alerts & Notifications</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
                  <div className={`p-2 rounded-lg ${alert.bgColor} flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${alert.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">{alert.message}</p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">
                System Status: All services operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;