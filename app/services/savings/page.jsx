'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSave, 
  FiTrendingUp, 
  FiUsers, 
  FiCalendar,
  FiDollarSign,
  FiTarget,
  FiShield,
  FiCheck,
  FiStar,
  FiGift,
  FiAward,
  FiClock
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SavingsScheme = () => {
  const [selectedScheme, setSelectedScheme] = useState('harvest');

  const savingsSchemes = [
    {
      id: 'harvest',
      name: 'Harvest Savings Plan',
      description: 'Save a portion of your harvest income for the next planting season',
      icon: FiSave,
      interestRate: '12% p.a.',
      minAmount: '₦5,000',
      features: [
        'Seasonal saving cycles',
        'Automatic deductions',
        'Bonus interest for target achievement',
        'Easy withdrawals during planting'
      ],
      benefits: [
        'Build planting capital',
        'Reduce dependency on loans',
        'Earn competitive interest',
        'Financial discipline'
      ]
    },
    {
      id: 'group',
      name: 'Group Savings Scheme',
      description: 'Community-based savings with your fellow farmers',
      icon: FiUsers,
      interestRate: '10% p.a.',
      minAmount: '₦2,000',
      features: [
        'Group savings circles',
        'Peer support and accountability',
        'Rotating credit system',
        'Group investment opportunities'
      ],
      benefits: [
        'Social support network',
        'Shared financial goals',
        'Group investment power',
        'Financial literacy training'
      ]
    },
    {
      id: 'goal',
      name: 'Goal-Based Savings',
      description: 'Save for specific agricultural goals and equipment',
      icon: FiTarget,
      interestRate: '15% p.a.',
      minAmount: '₦1,000',
      features: [
        'Customizable saving goals',
        'Progress tracking',
        'Milestone rewards',
        'Goal achievement bonuses'
      ],
      benefits: [
        'Focused saving approach',
        'Higher interest rates',
        'Achievement rewards',
        'Financial goal clarity'
      ]
    },
    {
      id: 'youth',
      name: 'Youth Agri-Savers',
      description: 'Special savings program for young farmers under 35',
      icon: FiStar,
      interestRate: '18% p.a.',
      minAmount: '₦500',
      features: [
        'Lower minimum amounts',
        'Youth-focused benefits',
        'Mentorship programs',
        'Start-up funding access'
      ],
      benefits: [
        'Encourage youth in agriculture',
        'Build financial foundation',
        'Access to opportunities',
        'Future farming leaders'
      ]
    }
  ];

  const savingsCalculator = {
    monthlyAmount: 10000,
    duration: 12,
    interestRate: 12
  };

  const calculateSavings = (monthly, months, rate) => {
    const monthlyRate = rate / 100 / 12;
    const futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
    return Math.round(futureValue);
  };

  const benefits = [
    {
      icon: FiTrendingUp,
      title: 'High Interest Rates',
      description: 'Earn competitive returns on your savings',
      stat: 'Up to 18% p.a.'
    },
    {
      icon: FiShield,
      title: 'KDIC Insured',
      description: 'Your savings are protected and guaranteed',
      stat: '100% secure'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Terms',
      description: 'Choose saving periods that match your cycles',
      stat: '3-60 months'
    },
    {
      icon: FiGift,
      title: 'Bonus Rewards',
      description: 'Earn extra rewards for achieving targets',
      stat: 'Up to 5% bonus'
    }
  ];

  const successStories = [
    {
      name: 'Peter Kamau',
      location: 'Meru County',
      scheme: 'Harvest Savings Plan',
      image: '/api/placeholder/64/64',
      saved: '₦180,000',
      achievement: 'Bought greenhouse equipment',
      testimonial: 'The harvest savings plan helped me save systematically. I now have my own greenhouse and earn 3x more.',
      timeframe: '18 months'
    },
    {
      name: 'Mary Wanjiku',
      location: 'Nyeri County',
      scheme: 'Group Savings Scheme',
      image: '/api/placeholder/64/64',
      saved: '₦95,000',
      achievement: 'Group bought a tractor',
      testimonial: 'Saving as a group gave us the power to buy equipment we could never afford individually.',
      timeframe: '24 months'
    },
    {
      name: 'John Ochieng',
      location: 'Kisumu County',
      scheme: 'Youth Agri-Savers',
      image: '/api/placeholder/64/64',
      saved: '₦65,000',
      achievement: 'Started fish farming',
      testimonial: 'The youth program gave me the foundation to start my fish farming venture at 28.',
      timeframe: '12 months'
    }
  ];

  const totalSavings = calculateSavings(
    savingsCalculator.monthlyAmount, 
    savingsCalculator.duration, 
    savingsCalculator.interestRate
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Agricultural Savings Schemes
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-green-100 mb-8"
              >
                Build your agricultural future with our specialized savings schemes designed for farmers. Earn high returns while preparing for your next farming season.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" variant="secondary">
                  Join Savings Scheme
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  Calculate Savings
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Savings: ₦{savingsCalculator.monthlyAmount.toLocaleString()}
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duration</span>
                      <p className="font-semibold">{savingsCalculator.duration} months</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest Rate</span>
                      <p className="font-semibold">{savingsCalculator.interestRate}% p.a.</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Savings After 12 Months</p>
                      <p className="text-2xl font-bold text-green-600">₦{totalSavings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                                                  Interest Earned: ₦{(totalSavings - (savingsCalculator.monthlyAmount * savingsCalculator.duration)).toLocaleString()}
                      </p>
                    </div>
                  </div>
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
              Why Save With Our Schemes?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specially designed savings programs that understand the unique needs of farmers
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

      {/* Savings Schemes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Savings Scheme
            </h2>
            <p className="text-gray-600">
              Different schemes designed for different farming needs and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {savingsSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedScheme === scheme.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedScheme(scheme.id)}
              >
                <Card className={`p-6 h-full border-2 ${
                  selectedScheme === scheme.id 
                    ? 'border-green-500 shadow-lg' 
                    : 'border-gray-200 hover:border-green-200'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <scheme.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {scheme.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {scheme.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Interest Rate:</span>
                          <p className="font-semibold text-green-600">{scheme.interestRate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Minimum Amount:</span>
                          <p className="font-semibold">{scheme.minAmount}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-gray-900">Key Features:</h4>
                        {scheme.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-medium text-gray-900">Benefits:</h4>
                        {scheme.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <FiStar className="w-4 h-4 text-yellow-500 mr-2" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={selectedScheme === scheme.id ? 'primary' : 'outline'}
                      >
                        {selectedScheme === scheme.id ? 'Selected' : 'Join Scheme'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
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
              See how our savings schemes have helped farmers achieve their goals
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
                      <p className="text-sm text-green-600">{story.scheme}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Saved</span>
                      <span className="font-semibold text-green-600">{story.saved}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Achievement</span>
                      <span className="font-semibold">{story.achievement}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Timeframe</span>
                      <span className="font-medium">{story.timeframe}</span>
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
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Savings Journey Today
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are building their financial future through our specialized savings schemes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Join Savings Scheme
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Calculate Your Savings
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SavingsScheme;