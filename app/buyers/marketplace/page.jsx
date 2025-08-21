'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiMapPin, 
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiClock,
  FiUser,
  FiBarChart,
  FiCheck
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const BrowseProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    price: '',
    quality: '',
    availability: ''
  });

  const categories = [
    { id: 'all', name: 'All Products', count: 3200 },
    { id: 'vegetables', name: 'Vegetables', count: 850 },
    { id: 'fruits', name: 'Fruits', count: 640 },
    { id: 'grains', name: 'Grains & Cereals', count: 420 },
    { id: 'legumes', name: 'Legumes', count: 290 },
    { id: 'herbs', name: 'Herbs & Spices', count: 220 },
    { id: 'livestock', name: 'Livestock', count: 180 },
    { id: 'poultry', name: 'Poultry', count: 145 },
    { id: 'dairy', name: 'Dairy Products', count: 95 },
    { id: 'machinery', name: 'Farm Machinery', count: 120 },
    { id: 'equipment', name: 'Farm Equipment', count: 240 }
  ];

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      farmer: 'Jane Wanjiku',
      location: 'Kiambu County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦80/kg',
    originalPrice: '₦95/kg',
      quantity: '500 kg available',
      rating: 4.8,
      reviews: 24,
      category: 'vegetables',
      quality: 'Premium',
      harvestDate: '2024-01-10',
      description: 'Fresh, organic tomatoes harvested from greenhouse farms',
      certifications: ['Organic', 'GAP Certified'],
      delivery: '24-48 hours',
      minOrder: '10 kg'
    },
    {
      id: 2,
      name: 'Red Kidney Beans',
      farmer: 'Peter Mutua',
      location: 'Machakos County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦120/kg',
    originalPrice: '₦140/kg',
      quantity: '800 kg available',
      rating: 4.9,
      reviews: 18,
      category: 'legumes',
      quality: 'Premium',
      harvestDate: '2023-12-15',
      description: 'High-quality red kidney beans, properly dried and sorted',
      certifications: ['Quality Assured', 'Traceable'],
      delivery: '2-3 days',
      minOrder: '25 kg'
    },
    {
      id: 3,
      name: 'Avocados (Hass)',
      farmer: 'Mary Akinyi',
      location: 'Murang\'a County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦15/piece',
    originalPrice: '₦18/piece',
      quantity: '2000 pieces available',
      rating: 4.7,
      reviews: 31,
      category: 'fruits',
      quality: 'Export Grade',
      harvestDate: '2024-01-08',
      description: 'Premium Hass avocados, perfect for export markets',
      certifications: ['Export Grade', 'GlobalGAP'],
      delivery: '1-2 days',
      minOrder: '50 pieces'
    },
    {
      id: 4,
      name: 'White Maize',
      farmer: 'Samuel Kiprop',
      location: 'Uasin Gishu County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦45/kg',
    originalPrice: '₦52/kg',
      quantity: '2.5 tonnes available',
      rating: 4.6,
      reviews: 42,
      category: 'grains',
      quality: 'Grade 1',
      harvestDate: '2023-11-20',
      description: 'Premium white maize, properly dried and stored',
      certifications: ['Grade 1', 'Aflatoxin Free'],
      delivery: '3-5 days',
      minOrder: '100 kg'
    },
    {
      id: 5,
      name: 'French Beans',
      farmer: 'Grace Wambui',
      location: 'Nyeri County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦180/kg',
    originalPrice: '₦200/kg',
      quantity: '300 kg available',
      rating: 4.9,
      reviews: 16,
      category: 'vegetables',
      quality: 'Export Grade',
      harvestDate: '2024-01-12',
      description: 'Premium French beans for local and export markets',
      certifications: ['Export Grade', 'Pesticide Free'],
      delivery: '24 hours',
      minOrder: '20 kg'
    },
    {
      id: 6,
      name: 'Fresh Coriander',
      farmer: 'John Mwangi',
      location: 'Nakuru County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
          price: '₦25/bunch',
    originalPrice: '₦30/bunch',
      quantity: '500 bunches available',
      rating: 4.8,
      reviews: 12,
      category: 'herbs',
      quality: 'Fresh',
      harvestDate: '2024-01-14',
      description: 'Fresh coriander leaves, perfect for restaurants and hotels',
      certifications: ['Fresh Cut', 'Pesticide Free'],
      delivery: '12 hours',
      minOrder: '10 bunches'
    },
    {
      id: 7,
      name: 'Dairy Cows (Holstein)',
      farmer: 'David Kimani',
      location: 'Nyeri County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
      price: '₦180,000/head',
      originalPrice: '₦200,000/head',
      quantity: '12 cows available',
      rating: 4.9,
      reviews: 8,
      category: 'livestock',
      quality: 'Premium',
      harvestDate: '2023-06-15',
      description: 'High-quality Holstein dairy cows, vaccinated and health certified',
      certifications: ['Health Certified', 'Vaccinated', 'Pedigree'],
      delivery: '2-3 days',
      minOrder: '1 head'
    },
    {
      id: 8,
      name: 'Broiler Chickens',
      farmer: 'Sarah Njeri',
      location: 'Kiambu County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
      price: '₦2,500/bird',
      originalPrice: '₦2,800/bird',
      quantity: '200 birds available',
      rating: 4.7,
      reviews: 15,
      category: 'poultry',
      quality: 'Grade A',
      harvestDate: '2024-01-05',
      description: 'Ready-to-market broiler chickens, 6-8 weeks old',
      certifications: ['Disease Free', 'Growth Hormone Free'],
      delivery: '24 hours',
      minOrder: '10 birds'
    },
    {
      id: 9,
      name: 'Fresh Milk',
      farmer: 'Joseph Kariuki',
      location: 'Murang\'a County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
      price: '₦120/liter',
      originalPrice: '₦140/liter',
      quantity: '500 liters daily',
      rating: 4.8,
      reviews: 22,
      category: 'dairy',
      quality: 'Grade A',
      harvestDate: '2024-01-15',
      description: 'Fresh, pasteurized milk from grass-fed cows',
      certifications: ['Pasteurized', 'Organic', 'Grade A'],
      delivery: '4-6 hours',
      minOrder: '20 liters'
    },
    {
      id: 10,
      name: 'John Deere Tractor 5075E',
      farmer: 'Michael Ochieng',
      location: 'Uasin Gishu County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
      price: '₦4,200,000',
      originalPrice: '₦4,500,000',
      quantity: '1 unit available',
      rating: 4.9,
      reviews: 5,
      category: 'machinery',
      quality: 'Excellent',
      harvestDate: '2022-03-10',
      description: '75HP John Deere tractor, well maintained with service records',
      certifications: ['Service Records', 'Genuine Parts', 'Warranty'],
      delivery: '3-5 days',
      minOrder: '1 unit'
    },
    {
      id: 11,
      name: 'Irrigation System - Drip Kit',
      farmer: 'Agnes Wanjiku',
      location: 'Machakos County',
      farmerImage: '/api/placeholder/40/40',
      productImage: '/api/placeholder/300/200',
      price: '₦85,000/set',
      originalPrice: '₦95,000/set',
      quantity: '15 sets available',
      rating: 4.6,
      reviews: 12,
      category: 'equipment',
      quality: 'Premium',
      harvestDate: '2023-11-20',
      description: 'Complete drip irrigation kit for 1-acre farm, includes timers',
      certifications: ['ISO Certified', 'Water Efficient', '2-Year Warranty'],
      delivery: '2-4 days',
      minOrder: '1 set'
    }
  ];

  const marketInsights = [
    {
      title: 'Price Trends',
      data: 'Tomato prices up 15% this week',
      icon: FiBarChart,
      trend: 'up'
    },
    {
      title: 'High Demand',
      data: 'French beans in high demand',
      icon: FiTruck,
      trend: 'up'
    },
    {
      title: 'New Arrivals',
      data: '45 new products today',
      icon: FiShoppingCart,
      trend: 'neutral'
    },
    {
      title: 'Quality Score',
      data: 'Average quality: 4.8/5',
      icon: FiStar,
      trend: 'up'
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: 'Quality Guaranteed',
      description: 'All products are quality checked and certified'
    },
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Same-day delivery for most fresh produce'
    },
    {
      icon: FiUser,
      title: 'Direct from Farmers',
      description: 'Connect directly with verified farmers'
    },
    {
      icon: FiBarChart,
      title: 'Market Insights',
      description: 'Real-time pricing and market data'
    }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Browse Fresh Produce
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Discover quality agricultural products directly from verified farmers across Kenya
            </motion.p>
          </div>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, farmers, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-xl text-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <Button className="absolute right-2 top-2 bottom-2 px-6">
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <insight.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{insight.data}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Categories</h2>
              
              <div className="space-y-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Locations</option>
                    <option value="kiambu">Kiambu County</option>
                    <option value="nakuru">Nakuru County</option>
                    <option value="machakos">Machakos County</option>
                    <option value="muranga">Murang'a County</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Any Price</option>
                                <option value="0-50">₦0 - 50</option>
            <option value="50-100">₦50 - 100</option>
            <option value="100-200">₦100 - 200</option>
            <option value="200+">₦200+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality Grade</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Grades</option>
                    <option value="export">Export Grade</option>
                    <option value="premium">Premium</option>
                    <option value="grade1">Grade 1</option>
                    <option value="fresh">Fresh</option>
                  </select>
                </div>
                
                <Button className="w-full" variant="outline">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredProducts.length} Products Found
              </h2>
              <div className="flex items-center space-x-4">
                <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg">
                  <button className="p-2 hover:bg-gray-50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-50 border-l border-gray-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                          <FiHeart className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {product.quality}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 bg-white/90 text-xs font-medium rounded-full">
                          <FiClock className="w-3 h-3 inline mr-1" />
                          {product.delivery}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <div className="flex items-center">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <img
                          src={product.farmerImage}
                          alt={product.farmer}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{product.farmer}</span>
                        <FiMapPin className="w-3 h-3 ml-2 mr-1" />
                        <span>{product.location}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {product.certifications.map((cert, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                            <FiCheck className="w-3 h-3 inline mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            {product.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.originalPrice}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.quantity}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-4">
                        Min. order: {product.minOrder} • Harvested: {product.harvestDate}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <FiShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline">
                          Quick Order
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Buy Through Farmnet?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make it easy to source quality produce directly from farmers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrowseProductsPage;