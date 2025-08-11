import React from 'react';
import { ArrowRight, Star, Clock, Shield, Truck } from 'lucide-react';

interface HomePageProps {
  onViewChange: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewChange }) => {
  const features = [
    {
      icon: Clock,
      title: 'Flexible Duration',
      description: 'Rent by hour, day, week, or month with custom pricing',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple payment gateways with secure transactions',
    },
    {
      icon: Truck,
      title: 'Pickup & Delivery',
      description: 'Scheduled pickup and return with tracking',
    },
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      count: 45,
    },
    {
      name: 'Furniture',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      count: 32,
    },
    {
      name: 'Tools',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
      count: 28,
    },
    {
      name: 'Vehicles',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      count: 15,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Rent Everything
              <span className="block text-blue-200">You Need</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              From electronics to furniture, tools to vehicles - discover thousands of products 
              available for rent with flexible durations and instant booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onViewChange('products')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center group"
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
          <button
            onClick={() => onViewChange('products')}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onViewChange('products')}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Products Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">5K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-200 mb-4">
                "Amazing service! The booking process was so easy and the pickup was right on time. 
                Will definitely use again."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold">JD</span>
                </div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-gray-400">Verified Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;