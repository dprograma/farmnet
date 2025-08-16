'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiArrowLeft, FiCheck, FiSend } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail(values.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset failed:', error);
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
              href="/auth/login"
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <img 
                src="/farmnetlogo.png" 
                alt="FarmNet Technologies" 
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="text-center">
                {!emailSent ? (
                  <>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Forgot Password?
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Check Your Email
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                  </>
                )}
              </CardHeader>
              <CardContent>
                {!emailSent ? (
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form className="space-y-6">
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

                        <Button
                          type="submit"
                          loading={isSubmitting}
                          disabled={isSubmitting}
                          className="w-full"
                          size="lg"
                        >
                          <FiSend className="mr-2 w-4 h-4" />
                          Send Reset Link
                        </Button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center text-gray-600">
                      <p className="mb-4">
                        If you don't see the email in your inbox, check your spam folder.
                      </p>
                      <p className="text-sm">
                        The link will expire in 24 hours for security reasons.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => setEmailSent(false)}
                        variant="outline"
                        className="w-full"
                      >
                        Try Different Email
                      </Button>
                      <Link href="/auth/login" className="block">
                        <Button variant="ghost" className="w-full">
                          Back to Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {!emailSent && (
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Remember your password?{' '}
                      <Link
                        href="/auth/login"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}