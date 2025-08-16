'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSave, 
  FiTrendingUp, 
  FiShield, 
  FiCalendar,
  FiDollarSign,
  FiTarget,
  FiStar,
  FiCheck,
  FiClock,
  FiAward,
  FiBarChart,
  FiUsers
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SavingsAccountPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [savingsAmount, setSavingsAmount] = useState(5000);

  const savingsPlans = [
    {
      id: 'basic',
      name: 'Basic Savings',
      interestRate: '8%',
      minBalance: '₦1,000',
      monthlyFee: 'Free',
      features: [
        'Mobile banking',
        'Free deposits',
        'Quarterly interest',
        'Basic insurance cover'
      ],
      color: 'bg-green-100 border-green-500 text-green-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Savings',
      interestRate: '10%',
          minBalance: '₦5,000',
    monthlyFee: '₦50',
      features: [
        'All basic features',
        'Higher interest rates',
        'Investment opportunities',
        'Premium insurance cover',
        'Financial advisory'
      ],
      color: 'bg-blue-100 border-blue-500 text-blue-600',
      popular: true
    },
    {
      id: 'goal',
      name: 'Goal-Based Savings',
      interestRate: '12%',
          minBalance: '₦2,000',
    monthlyFee: '₦100',
      features: [
        'All premium features',
        'Automated savings',
        'Goal tracking',
        'Bonus rewards',
        'Priority support'
      ],
      color: 'bg-purple-100 border-purple-500 text-purple-600',
      popular: false
    }
  ];

  const savingsGoals = [
    {
      icon: FiSave,
      title: 'Emergency Fund',
      description: 'Build a safety net for unexpected expenses',
      targetAmount: '₦50,000',
      timeframe: '12 months',
      monthlyTarget: '₦4,167'
    },
    {
      icon: FiTrendingUp,
      title: 'Farm Expansion',
      description: 'Save for land purchase or equipment upgrade',
      targetAmount: '₦200,000',
      timeframe: '24 months',
      monthlyTarget: '₦8,333'
    },
    {
      icon: FiCalendar,
      title: 'Seasonal Buffer',
      description: 'Prepare for off-season expenses',
      targetAmount: '₦75,000',
      timeframe: '8 months',
      monthlyTarget: '₦9,375'
    },
    {
      icon: FiAward,
      title: 'Education Fund',
      description: 'Invest in your children\'s future',
      targetAmount: '₦150,000',
      timeframe: '36 months',
      monthlyTarget: '₦4,167'
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: 'KDIC Insured',
      description: 'Your savings are protected up to ₦500,000 by Nigeria Deposit Insurance Corporation',
      stat: '100% secure'
    },
    {
      icon: FiTrendingUp,
      title: 'High Interest Rates',
      description: 'Earn competitive interest rates on your savings',
      stat: 'Up to 12% p.a.'
    },
    {
      icon: FiClock,
      title: '24/7 Access',
      description: 'Access your money anytime through mobile banking',
      stat: 'Always available'
    },
    {
      icon: FiUsers,
      title: 'Financial Advisory',
      description: 'Get expert advice on growing your wealth',
      stat: 'Free consultation'
    }
  ];

  const testimonials = [
    {
      name: 'Mary Njoki',
      location: 'Nyeri County',
      image: '/api/placeholder/64/64',
      savings: '₦120,000',
      testimonial: 'I saved enough to buy a water tank and irrigation system. My farm productivity doubled!',
      timeframe: '18 months',
      rating: 5
    },
    {
      name: 'Samuel Kiprop',
      location: 'Uasin Gishu County',
      image: '/api/placeholder/64/64',
      savings: '₦85,000',
      testimonial: 'The automated savings helped me build an emergency fund without even thinking about it.',
      timeframe: '12 months',
      rating: 5
    },
    {
      name: 'Grace Wambui',
      location: 'Kiambu County',
      image: '/api/placeholder/64/64',
      savings: '₦200,000',
      testimonial: 'I used my savings to expand my greenhouse. Now I earn 3x more from my farm.',
      timeframe: '24 months',
      rating: 5
    }
  ];

  const calculateProjectedSavings = (monthly, months, rate) => {
    const monthlyRate = rate / 100 / 12;
    const futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
    return Math.round(futureValue);
  };

  const projectedSavings = calculateProjectedSavings(savingsAmount, 12, 10);

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
                Smart Savings for Smart Farmers
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-green-100 mb-8"
              >
                Build your financial future with our specialized savings accounts designed for farmers. Earn competitive interest while keeping your money secure.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" variant="secondary">
                  Open Savings Account
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
                      Monthly Savings: ₦{savingsAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="500"
                      value={savingsAmount}
                      onChange={(e) => setSavingsAmount(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate</span>
                      <p className="font-semibold">10% p.a.</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time Period</span>
                      <p className="font-semibold">12 months</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Savings After 12 Months</p>
                      <p className="text-2xl font-bold text-green-600">₦{projectedSavings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                                                  Interest Earned: ₦{(projectedSavings - (savingsAmount * 12)).toLocaleString()}
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
              Why Save With Farmnet?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our savings accounts are specifically designed for the unique needs of farmers
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

      {/* Savings Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Savings Plan
            </h2>
            <p className="text-gray-600">
              Find the perfect savings account for your financial goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {savingsPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <Card className={`p-6 h-full border-2 relative ${
                  selectedPlan === plan.id 
                    ? `${plan.color.split(' ')[1]} shadow-lg` 
                    : 'border-gray-200 hover:border-green-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {plan.interestRate}
                    </div>
                    <p className="text-sm text-gray-600">Annual Interest Rate</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Minimum Balance</span>
                      <span className="font-semibold">{plan.minBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Monthly Fee</span>
                      <span className="font-semibold">{plan.monthlyFee}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Goals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Savings Goals
            </h2>
            <p className="text-gray-600">
              Set and achieve specific financial objectives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {savingsGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <goal.icon className="w-6 h-6 text-green-600" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {goal.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target Amount</span>
                      <span className="font-semibold text-green-600">{goal.targetAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Timeframe</span>
                      <span className="font-medium">{goal.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Target</span>
                      <span className="font-medium">{goal.monthlyTarget}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    Start Saving
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Farmer Success Stories
            </h2>
            <p className="text-gray-600">
              See how our savings accounts have helped farmers achieve their goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
                      className="w-16 h-16 rounded-full mr-4"
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
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 text-sm">
                    <div>
                      <span className="text-gray-500 block">Total Saved</span>
                      <span className="font-bold text-green-600">{testimonial.savings}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Time Period</span>
                      <span className="font-medium">{testimonial.timeframe}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Smart Features for Smart Savings
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiTarget className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Automated Savings</h3>
                    <p className="text-gray-600">Set up automatic transfers to reach your goals effortlessly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiBarChart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Progress Tracking</h3>
                    <p className="text-gray-600">Monitor your savings progress with detailed analytics and reports.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiDollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bonus Rewards</h3>
                    <p className="text-gray-600">Earn extra rewards for consistent saving habits and goal achievements.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Your Savings Dashboard</h3>
                  <p className="text-green-100">Track all your savings goals in one place</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Emergency Fund</span>
                      <span className="text-sm">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Farm Expansion</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">₦85,000</div>
                      <div className="text-sm text-green-100">Total Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">10.2%</div>
                      <div className="text-sm text-green-100">Interest Earned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              Open a savings account in minutes and start earning competitive interest on your money. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Open Account Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SavingsAccountPage;