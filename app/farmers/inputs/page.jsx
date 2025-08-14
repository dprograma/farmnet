'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiTruck, 
  FiDollarSign, 
  FiCalendar, 
  FiCheck, 
  FiShield,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AccessInputsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inputCategories = [
    { id: 'all', name: 'All Products', icon: FiPackage },
    { id: 'seeds', name: 'Seeds & Seedlings', icon: FiPackage },
    { id: 'fertilizers', name: 'Fertilizers', icon: FiShield },
    { id: 'tools', name: 'Farm Tools', icon: FiTruck },
    { id: 'pesticides', name: 'Pesticides', icon: FiShield }
  ];

  const featuredInputs = [
    {
      id: 1,
      name: 'Premium Maize Seeds',
      category: 'seeds',
      price: 'KSh 2,500/bag',
      originalPrice: 'KSh 3,000/bag',
      image: '/api/placeholder/300/200',
      description: 'High-yield hybrid maize seeds with drought resistance',
      features: ['90-day maturity', 'Disease resistant', 'High yield potential'],
      supplier: 'Kenya Seed Company',
      location: 'Nairobi',
      availability: 'In Stock'
    },
    {
      id: 2,
      name: 'Organic Fertilizer Blend',
      category: 'fertilizers',
      price: 'KSh 1,800/bag',
      originalPrice: 'KSh 2,200/bag',
      image: '/api/placeholder/300/200',
      description: 'Nutrient-rich organic fertilizer for sustainable farming',
      features: ['NPK 10-10-10', 'Organic certified', 'Soil enriching'],
      supplier: 'Organic Farms Ltd',
      location: 'Eldoret',
      availability: 'In Stock'
    },
    {
      id: 3,
      name: 'Solar Water Pump',
      category: 'tools',
      price: 'KSh 45,000',
      originalPrice: 'KSh 52,000',
      image: '/api/placeholder/300/200',
      description: 'Efficient solar-powered irrigation system',
      features: ['Solar powered', '2-year warranty', 'Easy installation'],
      supplier: 'Solar Tech Kenya',
      location: 'Mombasa',
      availability: 'Limited Stock'
    },
    {
      id: 4,
      name: 'Bio-Pesticide Solution',
      category: 'pesticides',
      price: 'KSh 800/liter',
      originalPrice: 'KSh 950/liter',
      image: '/api/placeholder/300/200',
      description: 'Environmentally safe pest control solution',
      features: ['Organic approved', 'Non-toxic', 'Effective control'],
      supplier: 'Green Shield Ltd',
      location: 'Kisumu',
      availability: 'In Stock'
    }
  ];

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Competitive Pricing',
      description: 'Get the best prices on quality agricultural inputs through our bulk purchasing power'
    },
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your farm location within 2-3 business days'
    },
    {
      icon: FiShield,
      title: 'Quality Guaranteed',
      description: 'All inputs are verified for quality and authenticity by our expert team'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Payment',
      description: 'Pay now or use our seasonal payment plans to match your harvest cycle'
    }
  ];

  const filteredInputs = selectedCategory === 'all' 
    ? featuredInputs 
    : featuredInputs.filter(input => input.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Access Quality Farm Inputs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-green-100 max-w-3xl mx-auto mb-8"
            >
              Get the best agricultural inputs at competitive prices with flexible payment options
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Browse Catalog
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Request Quote
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Input Platform?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect you directly with verified suppliers to get quality inputs at the best prices
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-green-600" />
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

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Find the right inputs for your farming needs
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {inputCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={input.image}
                      alt={input.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        input.availability === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {input.availability}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {input.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {input.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      <span>{input.supplier} • {input.location}</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {input.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <FiCheck className="w-3 h-3 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          {input.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {input.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="px-3">
                        <FiCalendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Our agricultural experts can help you choose the right inputs for your specific crops and soil conditions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Consult an Expert
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Request Bulk Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccessInputsPage;