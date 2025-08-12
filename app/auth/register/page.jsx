'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  FiMail, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiArrowLeft,
  FiTrendingUp,
  FiTool,
  FiCheck
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^(\+234|234|0)[7-9][0-1][0-9]{8}$/, 'Please enter a valid Nigerian phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  userType: Yup.string()
    .oneOf(['farmer', 'buyer'], 'Please select your account type')
    .required('Account type is required'),
  // Conditional validation based on user type
  farmName: Yup.string().when('userType', {
    is: 'farmer',
    then: (schema) => schema.required('Farm name is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  farmLocation: Yup.string().when('userType', {
    is: 'farmer',
    then: (schema) => schema.required('Farm location is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  farmSize: Yup.number().when('userType', {
    is: 'farmer',
    then: (schema) => schema.min(0.1, 'Farm size must be greater than 0').required('Farm size is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  companyName: Yup.string().when('userType', {
    is: 'buyer',
    then: (schema) => schema.required('Company name is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  companyType: Yup.string().when('userType', {
    is: 'buyer',
    then: (schema) => schema.required('Company type is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  businessAddress: Yup.string().when('userType', {
    is: 'buyer',
    then: (schema) => schema.required('Business address is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Register() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');

  const companyTypes = [
    'FMCG Company',
    'Exporter',
    'Processor',
    'Wholesaler',
    'Retailer',
    'Other'
  ];

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or dashboard
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
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

          {/* Progress Indicator */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      s <= step
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <FiCheck className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        s < step ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Badge variant="primary">
                Step {step} of 3: {
                  step === 1 ? 'Account Type' :
                  step === 2 ? 'Basic Information' :
                  'Additional Details'
                }
              </Badge>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Create Your Account
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Join thousands of farmers and buyers on our platform
                </p>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    userType: '',
                    farmName: '',
                    farmLocation: '',
                    farmSize: '',
                    companyName: '',
                    companyType: '',
                    businessAddress: '',
                    terms: false
                  }}
                  validationSchema={registerSchema}
                  onSubmit={handleRegister}
                >
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form>
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              What type of account would you like?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setFieldValue('userType', 'farmer');
                                  setUserType('farmer');
                                }}
                                className={`p-6 border-2 rounded-xl text-center transition-all ${
                                  values.userType === 'farmer'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <FiUser className="w-8 h-8 mx-auto mb-3" />
                                <h4 className="font-semibold mb-2">Farmer</h4>
                                <p className="text-sm text-gray-600">
                                  Access inputs, financing, storage, and sell your produce
                                </p>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFieldValue('userType', 'buyer');
                                  setUserType('buyer');
                                }}
                                className={`p-6 border-2 rounded-xl text-center transition-all ${
                                  values.userType === 'buyer'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <FiTrendingUp className="w-8 h-8 mx-auto mb-3" />
                                <h4 className="font-semibold mb-2">Buyer</h4>
                                <p className="text-sm text-gray-600">
                                  Source quality produce directly from farmers
                                </p>
                              </button>
                            </div>
                            {touched.userType && errors.userType && (
                              <p className="mt-2 text-sm text-error">{errors.userType}</p>
                            )}
                          </div>
                          
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={nextStep}
                              disabled={!values.userType}
                            >
                              Continue
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field name="firstName">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="First Name"
                                  icon={FiUser}
                                  error={touched.firstName && errors.firstName}
                                  required
                                />
                              )}
                            </Field>

                            <Field name="lastName">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Last Name"
                                  icon={FiUser}
                                  error={touched.lastName && errors.lastName}
                                  required
                                />
                              )}
                            </Field>
                          </div>

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

                          <Field name="phoneNumber">
                            {({ field }) => (
                              <Input
                                {...field}
                                label="Phone Number"
                                icon={FiPhone}
                                placeholder="+234 123 456 7890"
                                error={touched.phoneNumber && errors.phoneNumber}
                                required
                              />
                            )}
                          </Field>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field name="password">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Password"
                                  type="password"
                                  error={touched.password && errors.password}
                                  helperText="Must contain uppercase, lowercase, and number"
                                  required
                                />
                              )}
                            </Field>

                            <Field name="confirmPassword">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  label="Confirm Password"
                                  type="password"
                                  error={touched.confirmPassword && errors.confirmPassword}
                                  required
                                />
                              )}
                            </Field>
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" onClick={prevStep} variant="outline">
                              Back
                            </Button>
                            <Button type="button" onClick={nextStep}>
                              Continue
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          {values.userType === 'farmer' && (
                            <>
                              <Field name="farmName">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    label="Farm Name"
                                    icon={FiMapPin}
                                    error={touched.farmName && errors.farmName}
                                    required
                                  />
                                )}
                              </Field>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field name="farmLocation">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      label="Farm Location"
                                      icon={FiMapPin}
                                      placeholder="City, State"
                                      error={touched.farmLocation && errors.farmLocation}
                                      required
                                    />
                                  )}
                                </Field>

                                <Field name="farmSize">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      label="Farm Size (Hectares)"
                                      type="number"
                                      step="0.1"
                                      min="0.1"
                                      placeholder="e.g., 2.5"
                                      error={touched.farmSize && errors.farmSize}
                                      required
                                    />
                                  )}
                                </Field>
                              </div>
                            </>
                          )}

                          {values.userType === 'buyer' && (
                            <>
                              <Field name="companyName">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    label="Company Name"
                                    icon={FiTool}
                                    error={touched.companyName && errors.companyName}
                                    required
                                  />
                                )}
                              </Field>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Company Type <span className="text-error">*</span>
                                </label>
                                <select
                                  value={values.companyType}
                                  onChange={(e) => setFieldValue('companyType', e.target.value)}
                                  className="input"
                                >
                                  <option value="">Select company type</option>
                                  {companyTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                                {touched.companyType && errors.companyType && (
                                  <p className="mt-1 text-sm text-error">{errors.companyType}</p>
                                )}
                              </div>

                              <Field name="businessAddress">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    label="Business Address"
                                    icon={FiMapPin}
                                    error={touched.businessAddress && errors.businessAddress}
                                    required
                                  />
                                )}
                              </Field>
                            </>
                          )}

                          <div className="border-t border-gray-200 pt-6">
                            <label className="flex items-start space-x-3">
                              <Field
                                type="checkbox"
                                name="terms"
                                className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                              />
                              <div className="text-sm text-gray-600">
                                I agree to Farmnet's{' '}
                                <Link href="/terms" className="text-green-600 hover:text-green-700">
                                  Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-green-600 hover:text-green-700">
                                  Privacy Policy
                                </Link>
                              </div>
                            </label>
                            {touched.terms && errors.terms && (
                              <p className="mt-2 text-sm text-error">{errors.terms}</p>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" onClick={prevStep} variant="outline">
                              Back
                            </Button>
                            <Button
                              type="submit"
                              loading={isSubmitting}
                              disabled={isSubmitting}
                            >
                              Create Account
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </Form>
                  )}
                </Formik>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link
                      href="/auth/login"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Sign in here
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