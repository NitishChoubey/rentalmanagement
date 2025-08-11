import React, { useState } from 'react';
import { Search, Filter, Star, Calendar, MapPin, Heart, Eye } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

interface ProductsPageProps {
  onViewChange: (view: string) => void;
  onAddBooking?: (booking: any) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onViewChange, onAddBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const categories = [
    'All Categories',
    'Electronics',
    'Furniture',
    'Tools',
    'Vehicles',
    'Appliances',
    'Sports',
  ];

  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16" M1',
      category: 'Electronics',
      images: [
        'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg',
        'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        'https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg'
      ],
      rating: 4.8,
      reviews: 124,
      hourlyRate: 15,
      dailyRate: 80,
      weeklyRate: 450,
      monthlyRate: 1600,
      availability: 'Available',
      location: 'Downtown',
      description: 'Professional-grade MacBook Pro with M1 chip, perfect for creative work, development, and business presentations. Includes original charger and protective case.',
      features: [
        'M1 Pro chip with 10-core CPU',
        '16GB unified memory',
        '512GB SSD storage',
        '16-inch Liquid Retina XDR display',
        'Original charger included',
        'Protective case included'
      ],
      specifications: {
        'Processor': 'Apple M1 Pro 10-core',
        'Memory': '16GB unified memory',
        'Storage': '512GB SSD',
        'Display': '16-inch Liquid Retina XDR',
        'Graphics': '16-core GPU',
        'Battery': 'Up to 21 hours',
        'Weight': '4.7 pounds'
      },
      policies: {
        cancellation: 'Free cancellation up to 24 hours before pickup. 50% refund for cancellations within 24 hours.',
        damage: 'Security deposit of $200 required. Damage costs will be deducted from deposit.',
        lateFee: '$10 per hour for late returns. Maximum late fee of $100 per day.'
      }
    },
    {
      id: 2,
      name: 'Professional DSLR Camera',
      category: 'Electronics',
      images: [
        'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
        'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg'
      ],
      rating: 4.9,
      reviews: 89,
      hourlyRate: 12,
      dailyRate: 65,
      weeklyRate: 350,
      monthlyRate: 1200,
      availability: 'Available',
      location: 'Midtown',
      description: 'High-end DSLR camera perfect for professional photography, events, and creative projects. Comes with multiple lenses and accessories.',
      features: [
        '24.2MP full-frame sensor',
        'Multiple lens options',
        'Professional flash included',
        'Memory cards provided',
        'Carrying case included',
        'Battery charger included'
      ],
      specifications: {
        'Sensor': '24.2MP Full Frame CMOS',
        'ISO Range': '100-32000',
        'Video': '4K UHD recording',
        'Autofocus': '61-point AF system',
        'Display': '3.2-inch LCD touchscreen',
        'Battery': 'LP-E6NH rechargeable',
        'Weight': '1.76 pounds'
      },
      policies: {
        cancellation: 'Free cancellation up to 12 hours before pickup. No refund for same-day cancellations.',
        damage: 'Security deposit of $300 required. Professional equipment requires careful handling.',
        lateFee: '$15 per hour for late returns. Equipment must be returned in original condition.'
      }
    },
    {
      id: 3,
      name: 'Modern Office Chair',
      category: 'Furniture',
      images: [
        'https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg'
      ],
      rating: 4.7,
      reviews: 67,
      hourlyRate: 5,
      dailyRate: 25,
      weeklyRate: 120,
      monthlyRate: 400,
      availability: 'Available',
      location: 'Uptown',
      description: 'Ergonomic office chair with lumbar support, perfect for home offices, events, or temporary workspaces.',
      features: [
        'Ergonomic lumbar support',
        'Adjustable height',
        'Breathable mesh back',
        'Padded armrests',
        'Smooth rolling casters',
        'Professional appearance'
      ],
      specifications: {
        'Material': 'Mesh back, fabric seat',
        'Height Range': '17-21 inches',
        'Weight Capacity': '300 lbs',
        'Armrests': 'Adjustable',
        'Base': '5-star nylon base',
        'Warranty': 'Manufacturer warranty',
        'Assembly': 'Pre-assembled'
      },
      policies: {
        cancellation: 'Free cancellation up to 6 hours before pickup.',
        damage: 'Security deposit of $50 required. Normal wear accepted.',
        lateFee: '$5 per hour for late returns.'
      }
    },
    {
      id: 4,
      name: 'Power Drill Set',
      category: 'Tools',
      images: [
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg'
      ],
      rating: 4.6,
      reviews: 45,
      hourlyRate: 8,
      dailyRate: 30,
      weeklyRate: 150,
      monthlyRate: 500,
      availability: 'Low Stock',
      location: 'Downtown',
      description: 'Professional power drill set with various bits and accessories. Perfect for home improvement projects and construction work.',
      features: [
        'Cordless power drill',
        'Complete bit set included',
        'Extra battery pack',
        'Carrying case',
        'LED work light',
        'Variable speed control'
      ],
      specifications: {
        'Voltage': '20V MAX',
        'Chuck Size': '1/2 inch',
        'Torque': '300 in-lbs',
        'Speed': '0-450/1500 RPM',
        'Battery': 'Lithium-ion',
        'Runtime': 'Up to 4 hours',
        'Weight': '3.4 pounds'
      },
      policies: {
        cancellation: 'Free cancellation up to 4 hours before pickup.',
        damage: 'Security deposit of $75 required. Tools must be returned clean.',
        lateFee: '$8 per hour for late returns.'
      }
    },
    {
      id: 5,
      name: 'Electric Bike',
      category: 'Vehicles',
      images: [
        'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg'
      ],
      rating: 4.8,
      reviews: 156,
      hourlyRate: 10,
      dailyRate: 45,
      weeklyRate: 250,
      monthlyRate: 800,
      availability: 'Available',
      location: 'Beach Area',
      description: 'High-quality electric bike perfect for city commuting, leisure rides, and eco-friendly transportation.',
      features: [
        'Electric motor assistance',
        'Long-lasting battery',
        'Comfortable seat',
        'LED lights included',
        'Phone mount',
        'Helmet provided'
      ],
      specifications: {
        'Motor': '250W brushless',
        'Battery': '36V 10Ah lithium',
        'Range': 'Up to 40 miles',
        'Max Speed': '20 mph',
        'Frame': 'Aluminum alloy',
        'Brakes': 'Disc brakes',
        'Weight': '55 pounds'
      },
      policies: {
        cancellation: 'Free cancellation up to 2 hours before pickup.',
        damage: 'Security deposit of $150 required. Valid driver license required.',
        lateFee: '$12 per hour for late returns.'
      }
    },
    {
      id: 6,
      name: 'Gaming Console',
      category: 'Electronics',
      images: [
        'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg'
      ],
      rating: 4.9,
      reviews: 203,
      hourlyRate: 6,
      dailyRate: 35,
      weeklyRate: 180,
      monthlyRate: 600,
      availability: 'Available',
      location: 'Gaming District',
      description: 'Latest gaming console with popular games and accessories. Perfect for parties, events, or personal entertainment.',
      features: [
        'Latest generation console',
        '4K gaming capability',
        'Multiple controllers',
        'Popular games included',
        'HDMI cable provided',
        'Online gaming access'
      ],
      specifications: {
        'Resolution': '4K UHD',
        'Storage': '1TB SSD',
        'RAM': '16GB GDDR6',
        'CPU': 'Custom 8-core AMD',
        'GPU': 'Custom RDNA 2',
        'Connectivity': 'Wi-Fi 6, Bluetooth',
        'Ports': 'HDMI 2.1, USB 3.1'
      },
      policies: {
        cancellation: 'Free cancellation up to 4 hours before pickup.',
        damage: 'Security deposit of $100 required. Age verification required.',
        lateFee: '$8 per hour for late returns.'
      }
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleBookNow = (product: any, bookingDetails: any) => {
    const booking = {
      id: `RNT-${Date.now()}`,
      product: product.name,
      image: product.images[0],
      ...bookingDetails,
      status: 'Reserved',
      createdAt: new Date().toISOString().split('T')[0],
      pickupLocation: product.location,
      returnLocation: product.location,
    };
    
    if (onAddBooking) {
      onAddBooking(booking);
    }
    
    // Show success message or redirect
    alert('Booking created successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Products</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="tools">Tools</option>
            <option value="vehicles">Vehicles</option>
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">$100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="all">All Items</option>
                  <option value="available">Available Now</option>
                  <option value="upcoming">Available Soon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="all">All Locations</option>
                  <option value="downtown">Downtown</option>
                  <option value="midtown">Midtown</option>
                  <option value="uptown">Uptown</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Sort by Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
          <option>Rating</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 group">
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
              <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                product.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.availability}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hourly:</span>
                  <span className="font-semibold">${product.hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Daily:</span>
                  <span className="font-semibold">${product.dailyRate}/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weekly:</span>
                  <span className="font-semibold">${product.weeklyRate}/week</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleProductClick(product)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Rent Now
                </button>
                <button 
                  onClick={() => handleProductClick(product)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Load More Products
        </button>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onBookNow={handleBookNow}
      />
    </div>
  );
};

export default ProductsPage;