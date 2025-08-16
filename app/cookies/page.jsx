'use client';
import { motion } from 'framer-motion';
import { FiSettings, FiEye, FiBarChart, FiShield, FiMail, FiPhone } from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function CookiePolicy() {
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
              <FiSettings className="w-4 h-4 mr-2" />
              Cookie Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              This Cookie Policy explains how Farmnet uses cookies and similar technologies to enhance your experience on our platform.
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">What Are Cookies?</h2>
              <p className="text-neutral-600 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences, authenticate your identity, and provide you with a personalized experience.
              </p>
              <p className="text-neutral-600">
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <FiEye className="w-6 h-6 mr-3 text-primary-600" />
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-primary-500 pl-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Essential Cookies</h3>
                  <p className="text-neutral-600 mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Authentication and security cookies</li>
                    <li>Shopping cart and transaction session management</li>
                    <li>Load balancing and performance optimization</li>
                    <li>CSRF protection and form security</li>
                  </ul>
                </div>

                <div className="border-l-4 border-emerald-500 pl-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Functional Cookies</h3>
                  <p className="text-neutral-600 mb-3">
                    These cookies enhance functionality and personalization but are not essential for basic operation.
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Language and region preferences</li>
                    <li>User interface customization settings</li>
                    <li>Recently viewed products and searches</li>
                    <li>Accessibility preferences</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Analytics Cookies</h3>
                  <p className="text-neutral-600 mb-3">
                    These cookies help us understand how users interact with our platform to improve our services.
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Google Analytics for website usage statistics</li>
                    <li>User journey tracking and conversion analysis</li>
                    <li>Error monitoring and performance metrics</li>
                    <li>A/B testing and feature optimization</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Marketing Cookies</h3>
                  <p className="text-neutral-600 mb-3">
                    These cookies enable targeted advertising and marketing communications.
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Social media integration and sharing</li>
                    <li>Targeted advertising based on interests</li>
                    <li>Email marketing campaign tracking</li>
                    <li>Remarketing and conversion tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiBarChart className="w-6 h-6 mr-3 text-primary-600" />
                Third-Party Cookies
              </h2>
              
              <div className="space-y-6">
                <p className="text-neutral-600">
                  We work with trusted third-party services that may place cookies on your device. These include:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Analytics Services</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
                      <li><strong>Mixpanel:</strong> Advanced user engagement tracking</li>
                      <li><strong>Hotjar:</strong> User session recording and heatmaps</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Integration Services</h3>
                    <ul className="list-disc list-inside text-neutral-600 space-y-2">
                      <li><strong>Payment Processors:</strong> Secure transaction processing</li>
                      <li><strong>Social Media:</strong> Facebook, Twitter, LinkedIn integration</li>
                      <li><strong>Support Chat:</strong> Customer service and helpdesk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <FiShield className="w-6 h-6 mr-3 text-primary-600" />
                Managing Your Cookie Preferences
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Browser Settings</h3>
                  <p className="text-neutral-600 mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Block all cookies or only third-party cookies</li>
                    <li>Delete existing cookies from your device</li>
                    <li>Set your browser to notify you when cookies are being sent</li>
                    <li>Configure cookie preferences for specific websites</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-neutral-800 mb-3">Cookie Management by Browser</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-neutral-700 mb-2">Desktop Browsers:</p>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>Chrome: Settings → Privacy and security → Cookies</li>
                        <li>Firefox: Settings → Privacy & Security</li>
                        <li>Safari: Preferences → Privacy</li>
                        <li>Edge: Settings → Site permissions → Cookies</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-700 mb-2">Mobile Browsers:</p>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>Safari (iOS): Settings → Safari → Block Cookies</li>
                        <li>Chrome (Android): Settings → Site settings → Cookies</li>
                        <li>Samsung Internet: Settings → Privacy → Block Cookies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Opt-Out Options</h3>
                  <p className="text-neutral-600 mb-3">
                    You can opt out of specific tracking services:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
                    <li><strong>Facebook Pixel:</strong> Adjust your Facebook ad preferences</li>
                    <li><strong>Marketing Emails:</strong> Unsubscribe links in our communications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Impact of Disabling Cookies</h2>
              
              <div className="space-y-4">
                <p className="text-neutral-600">
                  While you have the right to disable cookies, doing so may affect your experience on our platform:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <h4 className="font-semibold text-neutral-800 mb-2">Essential Features Affected:</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1 text-sm">
                      <li>Unable to maintain login sessions</li>
                      <li>Shopping cart functionality may not work</li>
                      <li>Preference settings won't be saved</li>
                      <li>Security features may be compromised</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <h4 className="font-semibold text-neutral-800 mb-2">Enhanced Features Affected:</h4>
                    <ul className="list-disc list-inside text-neutral-600 space-y-1 text-sm">
                      <li>Personalized content recommendations</li>
                      <li>Targeted support and assistance</li>
                      <li>Improved website performance</li>
                      <li>Relevant marketing communications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Retention and Security</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Cookie Retention Periods</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-neutral-700 font-medium">Session Cookies</span>
                      <span className="text-neutral-600">Deleted when browser closes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-neutral-700 font-medium">Functional Cookies</span>
                      <span className="text-neutral-600">1-12 months</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-neutral-700 font-medium">Analytics Cookies</span>
                      <span className="text-neutral-600">2 years</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-neutral-700 font-medium">Marketing Cookies</span>
                      <span className="text-neutral-600">6-24 months</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Security Measures</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>All cookies are transmitted over secure HTTPS connections</li>
                    <li>Sensitive data is encrypted before storage in cookies</li>
                    <li>Regular security audits of cookie implementations</li>
                    <li>Compliance with international security standards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-primary-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Updates to This Policy</h2>
              <p className="text-neutral-600">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of material changes via email or prominent notice on our website at least 30 days before the changes take effect.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h2>
              <p className="text-neutral-600 mb-6">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
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
                  <strong>Data Protection Officer:</strong><br />
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