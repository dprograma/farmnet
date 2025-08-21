'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiUser,
  FiMessageCircle,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^(\+234|234|0)[7-9][0-1][0-9]{8}$/, 'Please enter a valid Nigerian phone number')
    .required('Phone number is required'),
  userType: Yup.string()
    .oneOf(['farmer', 'buyer', 'partner', 'other'], 'Please select a valid user type')
    .required('Please select your user type'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(20, 'Message must be at least 20 characters')
    .required('Message is required')
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Our Office',
      details: [
        'NO 8, Watchtower Road',
        'Off Ifatedo Elemoro Street',
        'Opposite Assembly Hall',
        'Bogije Ibeju-Lekki, Lagos, Nigeria'
      ]
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: [
        'Main Line: +234 (0) 123 456 7890',
        'Farmers Support: +234 (0) 123 456 7891',
        'Buyers Hotline: +234 (0) 123 456 7892',
        'Technical Support: +234 (0) 123 456 7893',
        'Emergency Line: +234 (0) 123 456 7894'
      ]
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: [
        'info@farmnetafrica.com',
        'support@farmnetafrica.com'
      ]
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 4:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  const userTypes = [
    { value: 'farmer', label: 'Farmer', icon: FiUser },
    { value: 'buyer', label: 'Buyer', icon: FiTrendingUp },
    { value: 'partner', label: 'Partner/NGO', icon: FiUsers },
    { value: 'other', label: 'Other', icon: FiMessageCircle }
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="primary" size="lg" className="mb-6">
                Get in Touch
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold font-bold text-gray-900 mb-6"
            >
              We're Here to{' '}
              <span className="text-green-600">Help You</span> Grow
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Have questions about our services? Want to join our platform? We'd love to hear from you and help you take the next step in your agricultural journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">Send us a Message</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiSend className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 mb-8">
                        Thank you for reaching out to us. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <Formik
                      initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        userType: '',
                        subject: '',
                        message: ''
                      }}
                      validationSchema={contactSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                        <Form className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field name="name">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Full Name"
                                  icon={FiUser}
                                  error={touched.name && errors.name}
                                  required
                                />
                              )}
                            </Field>

                            <Field name="email">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Email Address"
                                  type="email"
                                  icon={FiMail}
                                  error={touched.email && errors.email}
                                  required
                                />
                              )}
                            </Field>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field name="phone">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Phone Number"
                                  icon={FiPhone}
                                  placeholder="+234 123 456 7890"
                                  error={touched.phone && errors.phone}
                                  required
                                />
                              )}
                            </Field>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                I am a <span className="text-error">*</span>
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {userTypes.map((type) => (
                                  <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setFieldValue('userType', type.value)}
                                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                                      values.userType === type.value
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                  >
                                    <type.icon className="w-4 h-4 mx-auto mb-1" />
                                    {type.label}
                                  </button>
                                ))}
                              </div>
                              {touched.userType && errors.userType && (
                                <p className="mt-1 text-sm text-error">{errors.userType}</p>
                              )}
                            </div>
                          </div>

                          <Field name="subject">
                            {({ field }) => (
                              <Input
                                {...field}
                                label="Subject"
                                icon={FiMessageCircle}
                                error={touched.subject && errors.subject}
                                required
                              />
                            )}
                          </Field>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Message <span className="text-error">*</span>
                            </label>
                            <Field
                              as="textarea"
                              name="message"
                              rows={6}
                              className={`input resize-none ${
                                touched.message && errors.message ? 'input-error' : ''
                              }`}
                              placeholder="Tell us how we can help you..."
                            />
                            {touched.message && errors.message && (
                              <p className="mt-1 text-sm text-error">{errors.message}</p>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              loading={isSubmitting}
                              disabled={isSubmitting}
                              size="lg"
                              className="min-w-[150px]"
                            >
                              <FiSend className="mr-2 w-4 h-4" />
                              Send Message
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-bold text-gray-900 mb-6">
              Looking for Quick Answers?
            </h2>
            <p className="text-gray-600 mb-8">
              Check out our frequently asked questions or explore our services to learn more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="outline" size="lg">
                View FAQ
              </Button>
              <Button size="lg">
                Explore Services
              </Button>
            </div>
            
            {/* Privacy and Legal Links */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-4">
                By contacting us, you acknowledge that you have read and understood our:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/privacy" className="text-green-600 hover:text-green-700 hover:underline">
                  Privacy Policy
                </a>
                <span className="text-gray-300">•</span>
                <a href="/terms" className="text-green-600 hover:text-green-700 hover:underline">
                  Terms of Service
                </a>
                <span className="text-gray-300">•</span>
                <a href="/cookies" className="text-green-600 hover:text-green-700 hover:underline">
                  Cookie Policy
                </a>
                <span className="text-gray-300">•</span>
                <a href="/data-protection" className="text-green-600 hover:text-green-700 hover:underline">
                  Data Protection
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}