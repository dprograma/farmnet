'use client';
import { motion } from 'framer-motion';
import { FiShield, FiEye, FiDatabase, FiMail, FiPhone } from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function PrivacyPolicy() {
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
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              This Privacy Policy explains how Farmnet Technologies & Agro Services Limited collects, uses, and protects your information.
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
            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiEye className="w-6 h-6 mr-3 text-primary-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-6">
                <li>Name, email address, phone number, and physical address</li>
                <li>Government-issued identification for verification purposes</li>
                <li>Banking and financial information for transactions</li>
                <li>Agricultural data including farm location, crop types, and production volumes</li>
                <li>Transaction history and payment information</li>
              </ul>

              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-neutral-600 space-y-2">
                <li>Device information and IP addresses</li>
                <li>Usage patterns and platform interactions</li>
                <li>Location data when using mobile applications</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiDatabase className="w-6 h-6 mr-3 text-primary-600" />
                How We Use Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Core Services</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Facilitate agricultural input financing</li>
                    <li>Connect farmers with verified buyers</li>
                    <li>Process payments and transactions</li>
                    <li>Provide storage and logistics services</li>
                    <li>Offer quality control and verification</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Platform Improvement</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Analyze usage patterns to improve services</li>
                    <li>Personalize user experience</li>
                    <li>Prevent fraud and ensure security</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Communicate updates and important information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Information Sharing and Disclosure</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">With Your Consent</h3>
                  <p className="text-neutral-600">
                    We share your information with third parties only when you explicitly consent, such as connecting you with buyers or service providers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Service Providers</h3>
                  <p className="text-neutral-600">
                    We work with trusted partners for payment processing, logistics, quality control, and technology services. These partners are bound by strict confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Legal Requirements</h3>
                  <p className="text-neutral-600">
                    We may disclose information when required by law, regulation, or to protect the rights and safety of our users and platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Security</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Technical Safeguards</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Regular security audits and assessments</li>
                    <li>Multi-factor authentication options</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Administrative Controls</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Limited access to personal information</li>
                    <li>Regular employee training on data protection</li>
                    <li>Incident response procedures</li>
                    <li>Data retention and deletion policies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your Rights</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">Access and Portability</h4>
                    <p className="text-neutral-600">Request access to your personal information and receive a copy in a portable format.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">Correction and Update</h4>
                    <p className="text-neutral-600">Update or correct any inaccurate or incomplete personal information.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">Deletion</h4>
                    <p className="text-neutral-600">Request deletion of your personal information, subject to legal and business requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800">Withdrawal of Consent</h4>
                    <p className="text-neutral-600">Withdraw consent for data processing where consent is the legal basis.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h2>
              <p className="text-neutral-600 mb-6">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-neutral-800">Email</p>
                    <p className="text-neutral-600">privacy@farmnetafrica.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-neutral-800">Phone</p>
                    <p className="text-neutral-600">+234 (0) 123 456 7890</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600">
                  <strong>Mailing Address:</strong><br />
                  Farmnet Technologies & Agro Services Limited<br />
                  NO 8, Watchtower Road, Off Ifatedo Elemoro Street<br />
                  Opposite Assembly Hall, Bogije Ibeju-Lekki<br />
                  Lagos, Nigeria
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