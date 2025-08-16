'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiUsers, 
  FiMapPin,
  FiCamera,
  FiCalendar,
  FiStar,
  FiShield,
  FiTruck,
  FiBarChart
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SellProducePage = () => {
  const [activeTab, setActiveTab] = useState('marketplace');

  const marketPrices = [
    { crop: 'Maize', price: '₦45/kg', change: '+5.2%', trend: 'up' },
    { crop: 'Beans', price: '₦120/kg', change: '+2.8%', trend: 'up' },
    { crop: 'Tomatoes', price: '₦80/kg', change: '-1.5%', trend: 'down' },
    { crop: 'Onions', price: '₦60/kg', change: '+8.1%', trend: 'up' },
    { crop: 'Potatoes', price: '₦35/kg', change: '+3.4%', trend: 'up' },
    { crop: 'Cabbage', price: '₦25/kg', change: '-0.8%', trend: 'down' }
  ];

  const sellingSteps = [
    {
      step: 1,
      title: 'List Your Produce',
      description: 'Upload photos and details of your harvest',
      icon: FiCamera,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      step: 2,
      title: 'Get Matched',
      description: 'Our AI matches you with interested buyers',
      icon: FiUsers,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      step: 3,
      title: 'Negotiate Price',
      description: 'Get the best price through our platform',
      icon: FiDollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      step: 4,
      title: 'Secure Payment',
      description: 'Get paid instantly upon delivery confirmation',
      icon: FiShield,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Jane Wanjiku',
      location: 'Kiambu County',
      crop: 'Tomatoes',
      image: '/api/placeholder/64/64',
      testimonial: 'I sold my tomatoes for 30% higher than the local market price. Farmnet connected me directly with buyers in Nairobi.',
      earnings: '₦145,000',
      rating: 5
    },
    {
      name: 'Peter Mutua',
      location: 'Machakos County',
      crop: 'Maize',
      image: '/api/placeholder/64/64',
      testimonial: 'The platform helped me bypass middlemen and sell directly to a milling company. Payment was instant!',
      earnings: '₦89,500',
      rating: 5
    },
    {
      name: 'Mary Akinyi',
      location: 'Kisumu County',
      crop: 'French Beans',
      image: '/api/placeholder/64/64',
      testimonial: 'Export opportunities opened up through Farmnet. I now supply French beans to international buyers.',
      earnings: '₦230,000',
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: FiTrendingUp,
      title: 'Higher Prices',
      description: 'Earn 20-40% more by selling directly to buyers',
      stat: '35% average increase'
    },
    {
      icon: FiUsers,
      title: 'Direct Buyers',
      description: 'Connect with processors, exporters, and retailers',
      stat: '500+ verified buyers'
    },
    {
      icon: FiTruck,
      title: 'Logistics Support',
      description: 'We help coordinate pickup and delivery',
      stat: '98% delivery success'
    },
    {
      icon: FiShield,
      title: 'Secure Payments',
      description: 'Guaranteed payments through our escrow system',
      stat: '100% payment security'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Sell Your Produce at Better Prices
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-green-100 mb-8"
              >
                Connect directly with buyers, skip the middlemen, and maximize your profits with our smart marketplace platform.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" variant="secondary">
                  List Your Produce
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  View Market Prices
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Market Prices</h3>
                <div className="space-y-3">
                  {marketPrices.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{item.crop}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{item.price}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          item.trend === 'up' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Sell Through Farmnet?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of farmers who have increased their income by selling smart
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
                <p className="text-gray-600 mb-2">
                  {benefit.description}
                </p>
                <p className="text-sm font-medium text-green-600">
                  {benefit.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Simple steps to start selling your produce
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute top-8 left-16 w-full h-0.5 bg-gray-200 hidden lg:block">
                    {index < sellingSteps.length - 1 && (
                      <div className="absolute top-0 left-0 w-full h-full bg-green-600 transform scale-x-0 origin-left"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Prices */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Live Market Prices
            </h2>
            <p className="text-gray-600">
              Stay informed with real-time pricing data
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketPrices.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.crop}</h3>
                      <p className="text-2xl font-bold text-green-600 mt-1">{item.price}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.trend === 'up' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">
                View All Market Prices
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600">
              Real farmers sharing their success with Farmnet
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Earnings from {testimonial.crop}</span>
                    <span className="text-lg font-bold text-green-600">{testimonial.earnings}</span>
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
              Ready to Start Selling?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who have transformed their income through our platform. List your first produce today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                List Your Produce Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellProducePage;