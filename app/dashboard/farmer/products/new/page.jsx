'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FiPackage,
  FiCamera,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTruck,
  FiShield,
  FiTag,
  FiFileText,
  FiCheck,
  FiX,
  FiUpload
} from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Badge from '../../../../components/ui/Badge';

const productSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  subcategory: Yup.string().required('Subcategory is required'),
  productName: Yup.string()
    .min(3, 'Product name must be at least 3 characters')
    .required('Product name is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  quantity: Yup.number()
    .min(1, 'Quantity must be at least 1')
    .required('Quantity is required'),
  unit: Yup.string().required('Unit is required'),
  pricePerUnit: Yup.number()
    .min(0.01, 'Price must be greater than 0')
    .required('Price per unit is required'),
  minimumOrder: Yup.number()
    .min(1, 'Minimum order must be at least 1')
    .required('Minimum order is required'),
  harvestDate: Yup.date().required('Harvest date is required'),
  availableFrom: Yup.date().required('Available from date is required'),
  availableUntil: Yup.date()
    .min(Yup.ref('availableFrom'), 'End date must be after start date')
    .required('Available until date is required'),
  location: Yup.string().required('Location is required'),
  qualityGrade: Yup.string().required('Quality grade is required'),
  certifications: Yup.array().min(1, 'At least one certification is required'),
  deliveryOptions: Yup.array().min(1, 'At least one delivery option is required'),
  storageConditions: Yup.string().required('Storage conditions are required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ListNewProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);

  const categories = {
    crops: {
      name: 'Crops & Grains',
      subcategories: ['Rice', 'Maize', 'Wheat', 'Sorghum', 'Millet', 'Cassava', 'Yam', 'Beans', 'Cowpeas']
    },
    vegetables: {
      name: 'Vegetables',
      subcategories: ['Tomatoes', 'Onions', 'Peppers', 'Okra', 'Lettuce', 'Cabbage', 'Carrots', 'Cucumber']
    },
    fruits: {
      name: 'Fruits',
      subcategories: ['Bananas', 'Oranges', 'Mangoes', 'Pineapples', 'Avocados', 'Watermelon', 'Papaya']
    },
    livestock: {
      name: 'Livestock',
      subcategories: ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Rabbits']
    },
    poultry: {
      name: 'Poultry',
      subcategories: ['Chickens', 'Ducks', 'Turkeys', 'Guinea Fowl', 'Eggs']
    },
    dairy: {
      name: 'Dairy Products',
      subcategories: ['Fresh Milk', 'Yogurt', 'Cheese', 'Butter']
    },
    herbs: {
      name: 'Herbs & Spices',
      subcategories: ['Ginger', 'Garlic', 'Coriander', 'Basil', 'Mint', 'Parsley']
    },
    machinery: {
      name: 'Farm Machinery',
      subcategories: ['Tractors', 'Harvesters', 'Plows', 'Irrigation Systems', 'Tillers']
    },
    equipment: {
      name: 'Farm Equipment',
      subcategories: ['Hand Tools', 'Seeds', 'Fertilizers', 'Pesticides', 'Storage Equipment']
    }
  };

  const units = ['kg', 'tonnes', 'bags', 'pieces', 'bunches', 'liters', 'crates', 'boxes'];
  const qualityGrades = ['Premium', 'Grade A', 'Grade B', 'Export Quality', 'Organic', 'Conventional'];
  const certifications = ['Organic', 'GAP Certified', 'Fair Trade', 'Rainforest Alliance', 'Quality Assured', 'Pesticide Free', 'Non-GMO'];
  const deliveryOptions = ['Farm Pickup', 'Local Delivery', 'Regional Shipping', 'Express Delivery'];
  const nigerianStates = [
    'Lagos State', 'Kano State', 'Kaduna State', 'Oyo State', 'Rivers State',
    'Bayelsa State', 'Katsina State', 'Cross River State', 'Abia State',
    'Adamawa State', 'Federal Capital Territory (FCT)'
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Show loading toast
      toast.info('Creating your product listing...', { autoClose: false });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dismiss loading and show success
      toast.dismiss();
      toast.success(`🎉 "${values.productName}" has been listed successfully!`);
      
      // Redirect to products page after a delay
      setTimeout(() => {
        window.location.href = '/dashboard/farmer/products';
      }, 2000);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to create product listing. Please try again.');
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <DashboardLayout userType="farmer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black font-display text-neutral-900 mb-2">
              List New Product
            </h1>
            <p className="text-neutral-600">
              Add your products to the marketplace and reach more buyers
            </p>
          </div>
          <Badge variant="info" className="mt-4 md:mt-0">
            Step {currentStep} of 4
          </Badge>
        </div>

        {/* Progress Indicator */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {['Product Info', 'Details & Pricing', 'Photos & Location', 'Review & Submit'].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      index + 1 <= currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1 < currentStep ? <FiCheck className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        index + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Formik
          initialValues={{
            category: '',
            subcategory: '',
            productName: '',
            description: '',
            quantity: '',
            unit: '',
            pricePerUnit: '',
            minimumOrder: '',
            harvestDate: '',
            availableFrom: '',
            availableUntil: '',
            location: '',
            qualityGrade: '',
            certifications: [],
            deliveryOptions: [],
            storageConditions: '',
            terms: false
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <Card>
                <CardContent className="p-6">
                  {/* Step 1: Product Information */}
                  {currentStep === 1 && (
                    <motion.div variants={fadeInUp} className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Basic Product Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={values.category}
                            onChange={(e) => {
                              setFieldValue('category', e.target.value);
                              setFieldValue('subcategory', ''); // Reset subcategory
                            }}
                            className="input"
                          >
                            <option value="">Select a category</option>
                            {Object.entries(categories).map(([key, cat]) => (
                              <option key={key} value={key}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                          {touched.category && errors.category && (
                            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subcategory <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={values.subcategory}
                            onChange={(e) => setFieldValue('subcategory', e.target.value)}
                            className="input"
                            disabled={!values.category}
                          >
                            <option value="">Select a subcategory</option>
                            {values.category && categories[values.category]?.subcategories.map((sub) => (
                              <option key={sub} value={sub}>
                                {sub}
                              </option>
                            ))}
                          </select>
                          {touched.subcategory && errors.subcategory && (
                            <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>
                          )}
                        </div>
                      </div>

                      <Field name="productName">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Product Name"
                            icon={FiPackage}
                            placeholder="e.g., Premium Basmati Rice"
                            error={touched.productName && errors.productName}
                            required
                          />
                        )}
                      </Field>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Description <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          rows={4}
                          className="input resize-none"
                          placeholder="Describe your product, its quality, farming methods, and any special features..."
                        />
                        {touched.description && errors.description && (
                          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Details & Pricing */}
                  {currentStep === 2 && (
                    <motion.div variants={fadeInUp} className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Quantity, Pricing & Quality
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Field name="quantity">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Available Quantity"
                              type="number"
                              placeholder="100"
                              error={touched.quantity && errors.quantity}
                              required
                            />
                          )}
                        </Field>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={values.unit}
                            onChange={(e) => setFieldValue('unit', e.target.value)}
                            className="input"
                          >
                            <option value="">Select unit</option>
                            {units.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                          {touched.unit && errors.unit && (
                            <p className="mt-1 text-sm text-red-500">{errors.unit}</p>
                          )}
                        </div>

                        <Field name="pricePerUnit">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Price per Unit (₦)"
                              type="number"
                              icon={FiDollarSign}
                              placeholder="150"
                              error={touched.pricePerUnit && errors.pricePerUnit}
                              required
                            />
                          )}
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field name="minimumOrder">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Minimum Order Quantity"
                              type="number"
                              placeholder="10"
                              error={touched.minimumOrder && errors.minimumOrder}
                              required
                            />
                          )}
                        </Field>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quality Grade <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={values.qualityGrade}
                            onChange={(e) => setFieldValue('qualityGrade', e.target.value)}
                            className="input"
                          >
                            <option value="">Select quality grade</option>
                            {qualityGrades.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                          {touched.qualityGrade && errors.qualityGrade && (
                            <p className="mt-1 text-sm text-red-500">{errors.qualityGrade}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Field name="harvestDate">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Harvest Date"
                              type="date"
                              icon={FiCalendar}
                              error={touched.harvestDate && errors.harvestDate}
                              required
                            />
                          )}
                        </Field>

                        <Field name="availableFrom">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Available From"
                              type="date"
                              icon={FiCalendar}
                              error={touched.availableFrom && errors.availableFrom}
                              required
                            />
                          )}
                        </Field>

                        <Field name="availableUntil">
                          {({ field }) => (
                            <Input
                              {...field}
                              label="Available Until"
                              type="date"
                              icon={FiCalendar}
                              error={touched.availableUntil && errors.availableUntil}
                              required
                            />
                          )}
                        </Field>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Photos & Location */}
                  {currentStep === 3 && (
                    <motion.div variants={fadeInUp} className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Photos, Location & Certifications
                      </h3>

                      {/* Photo Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Photos
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <div className="text-sm text-gray-600 mb-4">
                            Upload high-quality photos of your product (Max 5 photos)
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                          >
                            Choose Photos
                          </label>
                        </div>
                        
                        {selectedImages.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                            {selectedImages.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Farm Location (State) <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={values.location}
                          onChange={(e) => setFieldValue('location', e.target.value)}
                          className="input"
                        >
                          <option value="">Select your state</option>
                          {nigerianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {touched.location && errors.location && (
                          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certifications <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {certifications.map((cert) => (
                            <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={values.certifications.includes(cert)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldValue('certifications', [...values.certifications, cert]);
                                  } else {
                                    setFieldValue('certifications', values.certifications.filter(c => c !== cert));
                                  }
                                }}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="text-sm text-gray-700">{cert}</span>
                            </label>
                          ))}
                        </div>
                        {touched.certifications && errors.certifications && (
                          <p className="mt-1 text-sm text-red-500">{errors.certifications}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Options <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {deliveryOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={values.deliveryOptions.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldValue('deliveryOptions', [...values.deliveryOptions, option]);
                                  } else {
                                    setFieldValue('deliveryOptions', values.deliveryOptions.filter(o => o !== option));
                                  }
                                }}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                        {touched.deliveryOptions && errors.deliveryOptions && (
                          <p className="mt-1 text-sm text-red-500">{errors.deliveryOptions}</p>
                        )}
                      </div>

                      <Field name="storageConditions">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Storage Conditions"
                            icon={FiShield}
                            placeholder="e.g., Cool, dry place; Temperature controlled"
                            error={touched.storageConditions && errors.storageConditions}
                            required
                          />
                        )}
                      </Field>
                    </motion.div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <motion.div variants={fadeInUp} className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Review Your Product Listing
                      </h3>

                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900">Product</h4>
                            <p className="text-gray-600">{values.productName}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Category</h4>
                            <p className="text-gray-600">{values.category ? categories[values.category]?.name : ''} - {values.subcategory}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Quantity</h4>
                            <p className="text-gray-600">{values.quantity} {values.unit}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Price</h4>
                            <p className="text-gray-600">₦{values.pricePerUnit} per {values.unit}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Quality</h4>
                            <p className="text-gray-600">{values.qualityGrade}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Location</h4>
                            <p className="text-gray-600">{values.location}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {values.certifications.map((cert) => (
                              <Badge key={cert} variant="success" size="sm">{cert}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3">
                          <Field
                            type="checkbox"
                            name="terms"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <div className="text-sm text-gray-600">
                            I agree to Farmnet's{' '}
                            <a href="/terms" className="text-primary-600 hover:text-primary-700">
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                              Privacy Policy
                            </a>
                          </div>
                        </label>
                        {touched.terms && errors.terms && (
                          <p className="mt-2 text-sm text-red-500">{errors.terms}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="btn-primary"
                      >
                        List Product
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Form>
          )}
        </Formik>
      </motion.div>
    </DashboardLayout>
  );
}