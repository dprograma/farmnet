'use client';
import { motion } from 'framer-motion';
import { FiFileText, FiUsers, FiDollarSign, FiTruck, FiShield, FiMail, FiPhone } from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function TermsOfService() {
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
              <FiFileText className="w-4 h-4 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These Terms of Service govern your use of Farmnet's agricultural fintech platform and services.
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Agreement to Terms</h2>
              <p className="text-neutral-600 mb-4">
                By accessing and using Farmnet Technologies & Agro Services Limited's platform and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <p className="text-neutral-600">
                If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiUsers className="w-6 h-6 mr-3 text-primary-600" />
                User Accounts and Eligibility
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Eligibility Requirements</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>You must be at least 18 years old or have legal capacity to enter contracts</li>
                    <li>You must be a resident of Nigeria or authorized to do business in Nigeria</li>
                    <li>You must provide accurate and complete information during registration</li>
                    <li>You must not have been previously suspended or banned from our platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Account Responsibilities</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access to your account</li>
                    <li>Ensure all information provided is accurate and up-to-date</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiDollarSign className="w-6 h-6 mr-3 text-primary-600" />
                Financial Services
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Input Financing</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Financing is subject to eligibility criteria and credit assessment</li>
                    <li>Repayment terms are clearly outlined in individual financing agreements</li>
                    <li>Interest rates and fees are disclosed upfront and governed by Nigerian law</li>
                    <li>Default on payments may result in account suspension and legal action</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Payment Processing</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>All payments are processed through secure, authorized payment partners</li>
                    <li>Transaction fees may apply and will be clearly disclosed</li>
                    <li>Refunds are processed according to our refund policy</li>
                    <li>Payment disputes must be reported within 30 days of transaction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiTruck className="w-6 h-6 mr-3 text-primary-600" />
                Platform Services
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Marketplace Services</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>We facilitate connections between farmers and buyers</li>
                    <li>All transactions are between users; we are not a party to sales</li>
                    <li>Quality disputes are resolved through our mediation process</li>
                    <li>Platform fees may apply to successful transactions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Storage and Logistics</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Storage services are provided by approved third-party partners</li>
                    <li>Insurance coverage is available for stored products</li>
                    <li>Transportation is arranged through verified logistics providers</li>
                    <li>Service availability may vary by location</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">User Conduct and Prohibited Activities</h2>
              
              <div className="space-y-4">
                <p className="text-neutral-600">Users must not engage in any of the following activities:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Fraudulent Activities</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1 text-sm">
                      <li>Providing false or misleading information</li>
                      <li>Misrepresenting product quality or quantity</li>
                      <li>Creating multiple accounts to circumvent restrictions</li>
                      <li>Engaging in money laundering or illegal financing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-2">Platform Misuse</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1 text-sm">
                      <li>Attempting to disrupt or compromise platform security</li>
                      <li>Using automated tools without authorization</li>
                      <li>Violating intellectual property rights</li>
                      <li>Harassing or threatening other users</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiShield className="w-6 h-6 mr-3 text-primary-600" />
                Liability and Disclaimers
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Service Availability</h3>
                  <p className="text-neutral-600">
                    While we strive to maintain continuous service availability, we do not guarantee uninterrupted access to our platform. Scheduled maintenance and technical issues may temporarily affect service availability.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Limitation of Liability</h3>
                  <p className="text-neutral-600">
                    Farmnet's liability is limited to the maximum extent permitted by Nigerian law. We are not liable for indirect, incidental, or consequential damages arising from your use of our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Third-Party Services</h3>
                  <p className="text-neutral-600">
                    Our platform integrates with third-party services for payments, logistics, and storage. We are not responsible for the actions or failures of these third-party providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Termination</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Termination by User</h3>
                  <p className="text-neutral-600">
                    You may terminate your account at any time by contacting our support team. Outstanding obligations must be fulfilled before account closure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Termination by Farmnet</h3>
                  <p className="text-neutral-600">
                    We may suspend or terminate your account immediately if you violate these terms, engage in fraudulent activities, or for any reason that protects our platform and other users.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Governing Law and Dispute Resolution</h2>
              
              <div className="space-y-4">
                <p className="text-neutral-600">
                  These Terms of Service are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or your use of our services will be resolved through:
                </p>
                
                <ol className="list-decimal list-inside text-neutral-600 space-y-2">
                  <li>Good faith negotiation between the parties</li>
                  <li>Mediation through a mutually agreed mediator</li>
                  <li>Arbitration under the rules of the Lagos Court of Arbitration</li>
                  <li>If necessary, litigation in the courts of Lagos State, Nigeria</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Changes to Terms</h2>
              <p className="text-neutral-600">
                We reserve the right to modify these Terms of Service at any time. Material changes will be communicated to users via email or platform notifications at least 30 days before the changes take effect. Continued use of our services after changes constitute acceptance of the modified terms.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Information</h2>
              <p className="text-neutral-600 mb-6">
                For questions about these Terms of Service or any legal matters, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-neutral-800">Email</p>
                    <p className="text-neutral-600">legal@farmnetafrica.com</p>
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
                  <strong>Legal Address:</strong><br />
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