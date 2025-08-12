'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiEye, FiEyeOff, FiArrowLeft, FiUser, FiTrendingUp } from 'react-icons/fi';
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
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on user type
      if (values.userType === 'farmer') {
        window.location.href = '/dashboard/farmer';
      } else {
        window.location.href = '/dashboard/buyer';
      }
    } catch (error) {
      setFieldError('email', 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold font-bold text-green-600">
                Farmnet
              </span>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Sign in to your account to continue
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
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          I am a <span className="text-error">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFieldValue('userType', 'farmer')}
                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                              values.userType === 'farmer'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <FiUser className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-medium">Farmer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFieldValue('userType', 'buyer')}
                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                              values.userType === 'buyer'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <FiTrendingUp className="w-6 h-6 mx-auto mb-2" />
                            <span className="font-medium">Buyer</span>
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
                          <div className="relative">
                            <Input
                              {...field}
                              label="Password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              error={touched.password && errors.password}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <FiEyeOff className="w-5 h-5" />
                              ) : (
                                <FiEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        )}
                      </Field>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Remember me
                          </span>
                        </label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full"
                        size="lg"
                      >
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      href="/auth/register"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center mb-2">
                    <strong>Demo Credentials:</strong>
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Farmer:</strong> farmer@demo.com / password123</p>
                    <p><strong>Buyer:</strong> buyer@demo.com / password123</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}