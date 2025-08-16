'use client';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiFileText, FiUsers, FiGlobe, FiMail, FiPhone } from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function DataProtection() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge variant="primary" className="mb-4">
              <FiShield className="w-4 h-4 mr-2" />
              Data Protection Compliance
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Nigeria Data Protection Compliance
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our commitment to protecting your personal data in accordance with the Nigeria Data Protection Commission (NDPC) regulations and the Nigeria Data Protection Act 2023.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiGlobe className="w-6 h-6 mr-3 text-green-600" />
                Compliance with Nigerian Law
              </h2>
              <p className="text-neutral-600 mb-4">
                Farmnet Technologies & Agro Services Limited is fully committed to complying with the Nigeria Data Protection Act 2023 and regulations established by the Nigeria Data Protection Commission (NDPC).
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-neutral-700 font-medium">
                  🇳🇬 <strong>Registration Status:</strong> We are registered with the NDPC as a data controller and processor operating within the Federal Republic of Nigeria.
                </p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <FiLock className="w-6 h-6 mr-3 text-primary-600" />
                Data Protection Principles
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Lawfulness</h4>
                      <p className="text-neutral-600 text-sm">Personal data is processed lawfully, fairly, and transparently</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Purpose Limitation</h4>
                      <p className="text-neutral-600 text-sm">Data collected for specific, legitimate purposes only</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Data Minimization</h4>
                      <p className="text-neutral-600 text-sm">Only necessary data is collected and processed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Accuracy</h4>
                      <p className="text-neutral-600 text-sm">Data is accurate, complete, and up-to-date</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Storage Limitation</h4>
                      <p className="text-neutral-600 text-sm">Data retained only as long as necessary</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Security</h4>
                      <p className="text-neutral-600 text-sm">Appropriate technical and organizational measures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">7</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Accountability</h4>
                      <p className="text-neutral-600 text-sm">Demonstrable compliance with data protection principles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiUsers className="w-6 h-6 mr-3 text-primary-600" />
                Your Rights Under Nigerian Law
              </h2>
              
              <div className="space-y-6">
                <p className="text-neutral-600">
                  As a data subject under the Nigeria Data Protection Act 2023, you have the following rights:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Fundamental Rights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right to Information</h4>
                          <p className="text-sm text-neutral-600">Clear information about how your data is processed</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right of Access</h4>
                          <p className="text-sm text-neutral-600">Request copies of your personal data</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right to Rectification</h4>
                          <p className="text-sm text-neutral-600">Correct inaccurate or incomplete data</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Control Rights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right to Erasure</h4>
                          <p className="text-sm text-neutral-600">Request deletion of your personal data</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right to Object</h4>
                          <p className="text-sm text-neutral-600">Object to certain types of data processing</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-neutral-700">Right to Data Portability</h4>
                          <p className="text-sm text-neutral-600">Receive data in a structured, machine-readable format</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Legal Basis for Processing</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-600">
                  We process your personal data based on the following legal bases as recognized under Nigerian law:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Consent</h3>
                    <p className="text-neutral-600 mb-2">
                      When you explicitly agree to the processing of your personal data for specific purposes.
                    </p>
                    <p className="text-sm text-neutral-500">
                      <strong>Examples:</strong> Marketing communications, optional data analytics, social media integration
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Contract Performance</h3>
                    <p className="text-neutral-600 mb-2">
                      Processing necessary for the performance of a contract or to take steps prior to entering into a contract.
                    </p>
                    <p className="text-sm text-neutral-500">
                      <strong>Examples:</strong> Account creation, payment processing, service delivery, customer support
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Legal Obligation</h3>
                    <p className="text-neutral-600 mb-2">
                      Processing required to comply with legal obligations under Nigerian or international law.
                    </p>
                    <p className="text-sm text-neutral-500">
                      <strong>Examples:</strong> KYC verification, anti-money laundering compliance, tax reporting, regulatory filings
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Legitimate Interest</h3>
                    <p className="text-neutral-600 mb-2">
                      Processing necessary for legitimate interests pursued by Farmnet or third parties, provided such interests are not overridden by your rights.
                    </p>
                    <p className="text-sm text-neutral-500">
                      <strong>Examples:</strong> Fraud prevention, platform security, business analytics, improvement of services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cross-Border Data Transfers</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-600">
                  When we transfer your personal data outside Nigeria, we ensure adequate protection through:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Adequacy Decisions</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li>Transfers to countries with NDPC adequacy decisions</li>
                      <li>Recognition of equivalent data protection standards</li>
                      <li>Ongoing monitoring of destination country laws</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Appropriate Safeguards</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li>Standard contractual clauses approved by NDPC</li>
                      <li>Binding corporate rules for multinational transfers</li>
                      <li>International certification schemes and codes of conduct</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    <strong>Current International Partners:</strong> Our technology infrastructure and payment processors are located in the United States and European Union, which have appropriate data protection frameworks in place.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiFileText className="w-6 h-6 mr-3 text-primary-600" />
                Data Protection Impact Assessments
              </h2>
              
              <div className="space-y-4">
                <p className="text-neutral-600">
                  We conduct Data Protection Impact Assessments (DPIAs) for high-risk processing activities, including:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">High-Risk Processing</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li>Systematic monitoring of farmers and buyers</li>
                      <li>Large-scale processing of financial data</li>
                      <li>Automated decision-making for credit scoring</li>
                      <li>Processing of location and agricultural data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Assessment Process</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li>Systematic identification of risks to rights and freedoms</li>
                      <li>Assessment of necessity and proportionality</li>
                      <li>Implementation of risk mitigation measures</li>
                      <li>Consultation with NDPC when required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Breach Response</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-600">
                  In the event of a personal data breach, we follow NDPC requirements:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">72h</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">NDPC Notification</h4>
                      <p className="text-neutral-600">Report data breaches to the NDPC within 72 hours of becoming aware, unless unlikely to result in risk to rights and freedoms.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Individual Notification</h4>
                      <p className="text-neutral-600">Notify affected data subjects without undue delay when the breach is likely to result in high risk to their rights and freedoms.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">📝</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Documentation</h4>
                      <p className="text-neutral-600">Maintain detailed records of all data breaches, including facts, effects, and remedial actions taken.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Our Data Protection Officer</h2>
              <p className="text-neutral-600 mb-6">
                For data protection matters or to exercise your rights under the Nigeria Data Protection Act 2023:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-neutral-800">Data Protection Officer</p>
                    <p className="text-neutral-600">dpo@farmnetafrica.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-neutral-800">Direct Line</p>
                    <p className="text-neutral-600">+234 (0) 123 456 7891</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600">
                  <strong>Supervisory Authority:</strong><br />
                  Nigeria Data Protection Commission (NDPC)<br />
                  <a href="https://ndpc.gov.ng" className="text-primary-600 hover:underline">https://ndpc.gov.ng</a><br />
                  Email: info@ndpc.gov.ng | Phone: +234 (0) 9 461 9368
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-neutral-600">
                  <strong>NDPC Registration:</strong> Farmnet Technologies & Agro Services Limited is registered with the Nigeria Data Protection Commission under registration number [NDPC-REG-001234] as required by Section 28 of the Nigeria Data Protection Act 2023.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}