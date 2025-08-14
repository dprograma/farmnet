'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiCloud, 
  FiTrendingDown, 
  FiHeart,
  FiDollarSign,
  FiCheck,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiFileText,
  FiUsers,
  FiAlertTriangle,
  FiSun
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const InsurancePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('crop');

  const insurancePlans = [
    {
      id: 'crop',
      name: 'Crop Insurance',
      description: 'Comprehensive coverage for crop losses due to weather and pests',
      icon: FiShield,
      coverage: 'Up to 85% of production costs',
      premium: '3-8% of sum insured',
      features: [
        'Weather-related losses',
        'Pest and disease damage',
        'Fire and theft protection',
        'Market price fluctuations'
      ],
      sumInsured: 'KSh 50,000 - 5,000,000',
      claimPeriod: '30 days'
    },
    {
      id: 'livestock',
      name: 'Livestock Insurance',
      description: 'Protection for cattle, goats, sheep, and poultry',
      icon: FiHeart,
      coverage: 'Up to 100% of animal value',
      premium: '5-12% of sum insured',
      features: [
        'Disease and mortality',
        'Accident coverage',
        'Theft protection',
        'Emergency medical costs'
      ],
      sumInsured: 'KSh 10,000 - 2,000,000',
      claimPeriod: '14 days'
    },
    {
      id: 'weather',
      name: 'Weather Index Insurance',
      description: 'Parametric insurance based on weather data',
      icon: FiCloud,
      coverage: 'Automatic payouts based on weather triggers',
      premium: '2-6% of sum insured',
      features: [
        'Rainfall index coverage',
        'Temperature extremes',
        'Drought protection',
        'Quick automated payouts'
      ],
      sumInsured: 'KSh 25,000 - 1,000,000',
      claimPeriod: 'Automatic (7 days)'
    },
    {
      id: 'equipment',
      name: 'Farm Equipment Insurance',
      description: 'Coverage for tractors, machinery, and equipment',
      icon: FiFileText,
      coverage: 'Replacement value coverage',
      premium: '4-10% of equipment value',
      features: [
        'Machinery breakdown',
        'Theft and vandalism',
        'Fire and natural disasters',
        'Third-party liability'
      ],
      sumInsured: 'KSh 100,000 - 10,000,000',
      claimPeriod: '21 days'
    }
  ];

  const riskFactors = [
    {
      risk: 'Drought',
      frequency: 'Every 3-5 years',
      impact: 'High',
      coverage: 'Weather Index Insurance',
      icon: FiSun
    },
    {
      risk: 'Excessive Rainfall',
      frequency: 'Annual during rainy season',
      impact: 'Medium',
      coverage: 'Crop Insurance',
      icon: FiCloud
    },
    {
      risk: 'Pest & Disease',
      frequency: 'Seasonal',
      impact: 'Medium-High',
      coverage: 'Crop Insurance',
      icon: FiAlertTriangle
    },
    {
      risk: 'Market Price Drop',
      frequency: 'Variable',
      impact: 'Medium',
      coverage: 'Revenue Protection',
      icon: FiTrendingDown
    }
  ];

  const claimsProcess = [
    {
      step: 1,
      title: 'Report Loss',
      description: 'Notify us within 72 hours of loss occurrence',
      icon: FiPhone,
      timeline: 'Within 72 hours'
    },
    {
      step: 2,
      title: 'Assessment',
      description: 'Our assessors visit to evaluate the damage',
      icon: FiMapPin,
      timeline: '5-7 days'
    },
    {
      step: 3,
      title: 'Documentation',
      description: 'Submit required documents and evidence',
      icon: FiFileText,
      timeline: '3-5 days'
    },
    {
      step: 4,
      title: 'Settlement',
      description: 'Claim amount paid to your account',
      icon: FiDollarSign,
      timeline: '7-14 days'
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: 'Financial Protection',
      description: 'Protect your investment from unforeseen losses',
      stat: 'Up to 85% coverage'
    },
    {
      icon: FiCalendar,
      title: 'Quick Claims',
      description: 'Fast claim processing and settlement',
      stat: '14-day average'
    },
    {
      icon: FiUsers,
      title: 'Expert Support',
      description: 'Dedicated agricultural insurance specialists',
      stat: '24/7 support'
    },
    {
      icon: FiDollarSign,
      title: 'Affordable Premiums',
      description: 'Competitive rates designed for farmers',
      stat: 'From 2% premium'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Agricultural Insurance Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Protect your farming investment with comprehensive insurance coverage designed specifically for Kenyan agriculture.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Get Insurance Quote
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Insurance Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Insurance Coverage Options
            </h2>
            <p className="text-gray-600">
              Choose the right protection for your agricultural operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {insurancePlans.map((plan, index) => (
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
                <Card className={`p-6 h-full border-2 ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <plan.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {plan.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Coverage:</span>
                          <p className="font-medium">{plan.coverage}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Premium:</span>
                          <p className="font-medium text-blue-600">{plan.premium}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Sum Insured:</span>
                          <p className="font-medium">{plan.sumInsured}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Claim Period:</span>
                          <p className="font-medium">{plan.claimPeriod}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-medium text-gray-900">What's Covered:</h4>
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Get Quote'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Agricultural Risks in Kenya
            </h2>
            <p className="text-gray-600">
              Understanding the risks helps you choose the right coverage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskFactors.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <risk.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {risk.risk}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <p className="font-medium">{risk.frequency}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Impact:</span>
                      <p className={`font-medium ${
                        risk.impact === 'High' ? 'text-red-600' : 
                        risk.impact === 'Medium-High' ? 'text-orange-600' : 'text-yellow-600'
                      }`}>{risk.impact}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Best Coverage:</span>
                      <p className="font-medium text-blue-600">{risk.coverage}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Claims Process
            </h2>
            <p className="text-gray-600">
              Quick and transparent claim settlement process
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {claimsProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  {index < claimsProcess.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200">
                      <div className="h-full bg-blue-600 w-0"></div>
                    </div>
                  )}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {step.timeline}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Protect Your Agricultural Investment
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't let unexpected events destroy your hard work. Get comprehensive agricultural insurance coverage today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Speak to Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InsurancePage;