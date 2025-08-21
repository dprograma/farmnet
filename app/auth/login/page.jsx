'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiArrowLeft, FiUser, FiTrendingUp } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  userType: Yup.string()
    .oneOf(['farmer', 'buyer'], 'Please select your account type')
    .required('Account type is required')
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Login() {
  const { login, loading } = useAuth();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await login(values.email, values.password, values.userType);

      if (result.success) {
        // Small delay to let the success toast show before redirect
        setTimeout(() => {
          if (values.userType === 'farmer') {
            window.location.href = '/dashboard/farmer';
          } else {
            window.location.href = '/dashboard/buyer';
          }
        }, 1500);
      } else {
        setFieldError('email', result.error || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      setFieldError('email', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-secondary-200 rounded-full opacity-30 blur-2xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Back Button */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors group"
            >
              <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <img
                src="/farmnetlogo.png"
                alt="FarmNet Technologies"
                className="h-12 w-auto group-hover:scale-110 transition-transform duration-300 shadow-lg"
              />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-black font-display text-neutral-900 mb-2">
                  Welcome Back
                </CardTitle>
                <p className="text-neutral-600">
                  Sign in to your account to continue your agricultural journey
                </p>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    userType: ''
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleLogin}
                >
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6">
                      {/* User Type Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-4">
                          I am a <span className="text-error">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFieldValue('userType', 'farmer')}
                            className={`group p-5 border-2 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${values.userType === 'farmer'
                                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg shadow-primary-500/25'
                                : 'border-neutral-200 hover:border-primary-300 hover:shadow-lg'
                              }`}
                          >
                            <FiUser className={`w-7 h-7 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 ${values.userType === 'farmer' ? 'text-primary-600' : 'text-neutral-500'
                              }`} />
                            <span className="font-semibold">Farmer</span>
                            <div className="text-xs text-neutral-500 mt-1">Grow & Sell</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFieldValue('userType', 'buyer')}
                            className={`group p-5 border-2 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${values.userType === 'buyer'
                                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg shadow-primary-500/25'
                                : 'border-neutral-200 hover:border-primary-300 hover:shadow-lg'
                              }`}
                          >
                            <FiTrendingUp className={`w-7 h-7 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 ${values.userType === 'buyer' ? 'text-primary-600' : 'text-neutral-500'
                              }`} />
                            <span className="font-semibold">Buyer</span>
                            <div className="text-xs text-neutral-500 mt-1">Source & Buy</div>
                          </button>
                        </div>
                        {touched.userType && errors.userType && (
                          <p className="mt-2 text-sm text-error">{errors.userType}</p>
                        )}
                      </div>

                      <Field name="email">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Email Address"
                            type="email"
                            icon={FiMail}
                            placeholder="Enter your email"
                            error={touched.email && errors.email}
                            required
                          />
                        )}
                      </Field>

                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={touched.password && errors.password}
                            required
                          />
                        )}
                      </Field>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center group cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded-md border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 focus:ring-2"
                          />
                          <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                            Remember me
                          </span>
                        </label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full btn-primary shadow-xl hover:shadow-2xl hover:shadow-primary-500/25"
                        size="lg"
                      >
                        Sign In to Farmnet
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-8 text-center">
                  <p className="text-neutral-600">
                    Don't have an account?{' '}
                    <Link
                      href="/auth/register"
                      className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}