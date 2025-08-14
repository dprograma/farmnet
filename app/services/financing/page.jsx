'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiCalendar, 
  FiShield,
  FiUsers,
  FiCheck,
  FiClock,
  FiBarChart,
  FiFileText,
  FiPackage,
  FiTruck,
  FiStar,
  FiPhone
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const InputFinancingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const financingPackages = [
    {
      id: 'basic',
      name: 'Basic Input Package',
      description: 'Essential inputs for smallholder farmers',
      amount: 'KSh 15,000 - 50,000',
      rate: '10% p.a.',
      term: '3-6 months',
      features: [
        'Seeds and seedlings',
        'Basic fertilizers',
        'Essential tools',
        'Pest control products'
      ],
      eligibility: 'Any registered farmer',
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard Crop Package',
      description: 'Comprehensive inputs for commercial farming',
      amount: 'KSh 50,000 - 200,000',
      rate: '12% p.a.',
      term: '6-12 months',
      features: [
        'Premium seeds',
        'Complete fertilizer program',
        'Professional tools',
        'Integrated pest management',
        'Soil testing included'
      ],
      eligibility: 'Farmers with land title',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Agri-Package',
      description: 'Advanced inputs for large-scale operations',
      amount: 'KSh 200,000 - 1,000,000',
      rate: '15% p.a.',
      term: '12-24 months',
      features: [
        'Hybrid/certified seeds',
        'Precision agriculture inputs',
        'Machinery and equipment',
        'Irrigation systems',
        'Technical advisory services',
        'Insurance coverage'
      ],
      eligibility: 'Commercial farmers',
      popular: false
    }
  ];

  const inputCategories = [
    {
      category: 'Seeds & Planting Materials',
      description: 'High-quality certified seeds and seedlings',
      icon: FiPackage,
      items: [
        'Maize hybrid seeds',
        'Vegetable seedlings',
        'Fruit tree saplings',
        'Certified potato seeds'
      ],
      financing: 'Up to 100% financing available'
    },
    {
      category: 'Fertilizers & Soil Amendments',
      description: 'Complete nutrition solutions for crops',
      icon: FiTrendingUp,
      items: [
        'NPK compound fertilizers',
        'Organic compost',
        'Lime and gypsum',
        'Micronutrient blends'
      ],
      financing: 'Seasonal payment plans'
    },
    {
      category: 'Farm Tools & Equipment',
      description: 'Modern tools to improve productivity',
      icon: FiTruck,
      items: [
        'Hand tools and implements',
        'Irrigation equipment',
        'Spraying equipment',
        'Post-harvest tools'
      ],
      financing: 'Lease-to-own options'
    },
    {
      category: 'Crop Protection',
      description: 'Integrated pest and disease management',
      icon: FiShield,
      items: [
        'Biological pesticides',
        'Fungicides',
        'Herbicides',
        'IPM solutions'
      ],
      financing: 'Pay at harvest'
    }
  ];

  const financingProcess = [
    {
      step: 1,
      title: 'Input Assessment',
      description: 'We assess your farm needs and recommend suitable inputs',
      icon: FiFileText,
      timeline: '1-2 days'
    },
    {
      step: 2,
      title: 'Financial Evaluation',
      description: 'Quick creditworthiness assessment and approval',
      icon: FiBarChart,
      timeline: '2-3 days'
    },
    {
      step: 3,
      title: 'Input Delivery',
      description: 'Inputs delivered directly to your farm',
      icon: FiTruck,
      timeline: '3-5 days'
    },
    {
      step: 4,
      title: 'Harvest Repayment',
      description: 'Flexible repayment aligned with harvest cycles',
      icon: FiCalendar,
      timeline: 'At harvest'
    }
  ];

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Affordable Rates',
      description: 'Competitive interest rates designed for farmers',
      stat: 'From 10% p.a.'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Terms',
      description: 'Repayment schedules that match crop cycles',
      stat: '3-24 months'
    },
    {
      icon: FiClock,
      title: 'Quick Approval',
      description: 'Fast processing and approval within 48 hours',
      stat: '48-hour approval'
    },
    {
      icon: FiShield,
      title: 'Input Insurance',
      description: 'Optional insurance coverage for your inputs',
      stat: '95% coverage'
    }
  ];

  const successStories = [
    {
      name: 'Peter Kimani',
      location: 'Meru County',
      image: '/api/placeholder/64/64',
      crop: 'Coffee',
      financed: 'KSh 85,000',
      result: 'Increased yield by 60%',
      testimonial: 'The input financing helped me upgrade to certified seedlings and proper fertilizers. My coffee quality improved dramatically.',
      year: '2023'
    },
    {
      name: 'Grace Wanjiru',
      location: 'Nakuru County',
      image: '/api/placeholder/64/64',
      crop: 'French Beans',
      financed: 'KSh 120,000',
      result: 'Export market access',
      testimonial: 'With quality inputs, I met export standards and now supply directly to European markets.',
      year: '2023'
    },
    {
      name: 'Joseph Ochieng',
      location: 'Kisumu County',
      image: '/api/placeholder/64/64',
      crop: 'Maize',
      financed: 'KSh 45,000',
      result: '40% higher income',
      testimonial: 'The hybrid seeds and proper fertilizers transformed my farm. I harvest three times more now.',
      year: '2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Input Financing Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8"
            >
              Access quality agricultural inputs with flexible financing options. Pay at harvest and boost your farm productivity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Apply for Input Financing
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                View Input Catalog
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Input Financing?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed specifically for farmers with flexible terms and competitive rates
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
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {benefit.description}
                </p>
                <p className="text-sm font-medium text-indigo-600">
                  {benefit.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Financing Packages
            </h2>
            <p className="text-gray-600">
              Choose the package that fits your farming needs and scale
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {financingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPackage === pkg.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <Card className={`p-6 h-full border-2 relative ${
                  selectedPackage === pkg.id 
                    ? 'border-indigo-500 shadow-lg' 
                    : 'border-gray-200 hover:border-indigo-200'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-2xl font-bold text-indigo-600 mb-1">
                      {pkg.amount}
                    </div>
                    <p className="text-sm text-gray-600">Financing available</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Interest Rate</span>
                      <span className="font-semibold text-indigo-600">{pkg.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Repayment Term</span>
                      <span className="font-semibold">{pkg.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Eligibility</span>
                      <span className="font-semibold">{pkg.eligibility}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-gray-900">Package Includes:</h4>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={selectedPackage === pkg.id ? 'primary' : 'outline'}
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Choose Package'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Input Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Finance
            </h2>
            <p className="text-gray-600">
              Comprehensive input financing across all agricultural categories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {inputCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.category}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      
                      <div className="space-y-1 mb-4">
                        {category.items.map((item, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <FiCheck className="w-3 h-3 text-green-500 mr-2" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-indigo-600">
                        {category.financing}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Input Financing Works
            </h2>
            <p className="text-gray-600">
              Simple 4-step process to get the inputs you need
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {financingProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  {index < financingProcess.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200">
                      <div className="h-full bg-indigo-600 w-0"></div>
                    </div>
                  )}
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    {step.timeline}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600">
              See how input financing has transformed farms across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.location}</p>
                      <p className="text-sm text-indigo-600">{story.crop} • {story.year}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Financing Amount</span>
                      <span className="font-semibold text-indigo-600">{story.financed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Result</span>
                      <span className="font-semibold text-green-600">{story.result}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">"{story.testimonial}"</p>
                  
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Access quality inputs with flexible financing. Apply today and start improving your farm productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply for Financing
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                <FiPhone className="w-4 h-4 mr-2" />
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InputFinancingPage;