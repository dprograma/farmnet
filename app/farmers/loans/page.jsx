'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, 
  FiCalendar, 
  FiShield, 
  FiTrendingUp,
  FiClock,
  FiCheck,
  FiUser,
  FiFileText,
  FiCreditCard,
  FiBarChart,
  FiMapPin
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GetFinancingPage = () => {
  const [selectedLoanType, setSelectedLoanType] = useState('seasonal');
  const [loanAmount, setLoanAmount] = useState(50000);

  const loanTypes = [
    {
      id: 'seasonal',
      name: 'Seasonal Loans',
      description: 'Perfect for seed, fertilizer, and labor costs',
      rate: '12% p.a.',
      term: '3-9 months',
      amount: '₦10,000 - 500,000',
      features: ['No collateral required', 'Quick approval', 'Flexible repayment']
    },
    {
      id: 'equipment',
      name: 'Equipment Financing',
      description: 'Finance tractors, irrigation systems, and tools',
      rate: '15% p.a.',
      term: '12-36 months',
      amount: '₦50,000 - 2,000,000',
      features: ['Equipment as collateral', 'Extended terms', 'Maintenance support']
    },
    {
      id: 'expansion',
      name: 'Farm Expansion',
      description: 'Grow your operations with long-term capital',
      rate: '18% p.a.',
      term: '12-60 months',
      amount: '₦100,000 - 5,000,000',
      features: ['Business plan support', 'Mentorship program', 'Growth tracking']
    }
  ];

  const requirements = [
    {
      icon: FiUser,
      title: 'Identity Documents',
      description: 'National ID, KRA PIN, and farming certificate'
    },
    {
      icon: FiMapPin,
      title: 'Farm Details',
      description: 'Land ownership or lease agreements, farm location'
    },
    {
      icon: FiFileText,
      title: 'Financial Records',
      description: 'Bank statements, previous harvest records'
    },
    {
      icon: FiCreditCard,
      title: 'Credit History',
      description: 'CRB check (we help with credit repair if needed)'
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Complete our simple 5-minute application form',
      time: '5 minutes'
    },
    {
      step: 2,
      title: 'Document Upload',
      description: 'Upload required documents through our secure portal',
      time: '10 minutes'
    },
    {
      step: 3,
      title: 'Credit Assessment',
      description: 'Our AI evaluates your application and creditworthiness',
      time: '24 hours'
    },
    {
      step: 4,
      title: 'Approval & Disbursement',
      description: 'Get approved and receive funds in your account',
      time: '24-48 hours'
    }
  ];

  const benefits = [
    {
      icon: FiClock,
      title: 'Fast Approval',
      description: 'Get approved within 24-48 hours',
      stat: '48hr average'
    },
    {
      icon: FiShield,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges',
      stat: '100% transparent'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Terms',
      description: 'Repayment schedules that match harvest cycles',
      stat: 'Custom schedules'
    },
    {
      icon: FiTrendingUp,
      title: 'Build Credit',
      description: 'Improve your credit score with timely repayments',
      stat: '95% improvement'
    }
  ];

  const successStories = [
    {
      name: 'Joseph Kiprotich',
      location: 'Nakuru County',
      loanAmount: '₦150,000',
      purpose: 'Greenhouse construction',
      image: '/api/placeholder/64/64',
      result: 'Increased income by 300% in one year',
      crop: 'Tomatoes & Capsicum'
    },
    {
      name: 'Grace Wanjiru',
      location: 'Murang\'a County',
      loanAmount: '₦75,000',
      purpose: 'Coffee processing equipment',
      image: '/api/placeholder/64/64',
      result: 'Direct export to international buyers',
      crop: 'Coffee'
    },
    {
      name: 'Daniel Ochieng',
      location: 'Kisii County',
      loanAmount: '₦200,000',
      purpose: 'Dairy cow purchase',
      image: '/api/placeholder/64/64',
      result: 'Monthly income of ₦45,000',
      crop: 'Dairy farming'
    }
  ];

  const calculateEMI = (amount, rate, months) => {
    const monthlyRate = rate / 100 / 12;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const selectedLoan = loanTypes.find(loan => loan.id === selectedLoanType);
  const estimatedEMI = calculateEMI(loanAmount, 12, 6); // 12% for 6 months

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Get Financing for Your Farm
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-blue-100 mb-8"
              >
                Access affordable credit to grow your farming operations. From seasonal loans to equipment financing, we've got you covered.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" variant="secondary">
                  Apply for Loan
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Calculate EMI
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ₦{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate</span>
                      <p className="font-semibold">12% p.a.</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Term</span>
                      <p className="font-semibold">6 months</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Estimated Monthly EMI</p>
                      <p className="text-2xl font-bold text-blue-600">₦{estimatedEMI.toLocaleString()}</p>
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
              Why Choose Our Financing?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed specifically for farmers, by people who understand agriculture
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
                <p className="text-gray-600 mb-2">
                  {benefit.description}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {benefit.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Loan Type
            </h2>
            <p className="text-gray-600">
              We offer different financing options for different farming needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedLoanType === loan.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedLoanType(loan.id)}
              >
                <Card className={`p-6 h-full border-2 ${
                  selectedLoanType === loan.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{loan.name}</h3>
                  <p className="text-gray-600 mb-4">{loan.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Interest Rate</span>
                      <span className="font-semibold text-blue-600">{loan.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Repayment Term</span>
                      <span className="font-semibold">{loan.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Loan Amount</span>
                      <span className="font-semibold">{loan.amount}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {loan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={selectedLoanType === loan.id ? 'primary' : 'outline'}
                  >
                    {selectedLoanType === loan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-gray-600">
              Get approved in as little as 24 hours
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200">
                      <div className="h-full bg-blue-600 w-0"></div>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {step.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Need
            </h2>
            <p className="text-gray-600">
              Simple requirements to get started
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {req.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {req.description}
                </p>
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
              See how our financing has helped farmers grow
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
                      <p className="text-sm text-blue-600">{story.crop}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Loan Amount</span>
                      <span className="font-semibold text-blue-600">{story.loanAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Purpose</span>
                      <span className="font-medium">{story.purpose}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-green-600 font-semibold text-center">
                      {story.result}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Farm?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who have accessed affordable financing through our platform. Apply today and get approved within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply for Loan Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Speak to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetFinancingPage;