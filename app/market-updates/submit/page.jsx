'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FiUpload,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiVideo,
  FiImage,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiArrowLeft,
  FiSend
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { toast } from 'react-toastify';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const validationSchema = Yup.object({
  submitterName: Yup.string().required('Name is required'),
  submitterPhone: Yup.string()
    .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  commodity: Yup.string().required('Commodity is required'),
  location: Yup.string().required('Market location is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  price: Yup.number().positive('Price must be positive'),
  unit: Yup.string().when('price', {
    is: (price) => price && price > 0,
    then: (schema) => schema.required('Unit is required when price is provided'),
    otherwise: (schema) => schema
  })
});

export default function SubmitMarketUpdate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submissionType, setSubmissionType] = useState('form'); // 'form' or 'whatsapp'
  const [categories, setCategories] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const videoInputRef = useRef();
  const imageInputRef = useRef();

  // Load categories and commodities from API
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        setLoading(true);
        
        // Fetch categories with commodities
        const response = await fetch('/api/commodities?includeCategories=true');
        const result = await response.json();
        
        if (result.success) {
          setCategories(result.data);
          
          // Create a flat list of all commodities for easy access
          const allCommodities = result.data.flatMap(category => 
            category.commodities.map(commodity => ({
              ...commodity,
              categoryName: category.name
            }))
          );
          setCommodities(allCommodities);
        } else {
          toast.error('Failed to load commodities');
        }
      } catch (error) {
        console.error('Error fetching commodities:', error);
        toast.error('Failed to load commodities');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCommodities();
  }, []);

  // Get units for selected commodity
  const getUnitsForCommodity = () => {
    if (!selectedCategory || !formik.values.commodity) return [];
    
    const category = categories.find(cat => cat.id === selectedCategory);
    const commodity = category?.commodities?.find(c => c.name === formik.values.commodity);
    
    return commodity?.units || [];
  };

  const whatsappNumber = '+2348189720720'; // Replace with actual WhatsApp number

  const formik = useFormik({
    initialValues: {
      submitterName: '',
      submitterPhone: '',
      commodity: '',
      location: '',
      description: '',
      price: '',
      unit: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        
        // Add form data
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        
        // Add uploaded files
        uploadedFiles.forEach((file, index) => {
          formData.append(`file_${index}`, file.file);
        });
        
        // Call the real API
        console.log('Submitting to API:', values, uploadedFiles);
        
        const response = await fetch('/api/market-updates', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          toast.success(result.message || 'Market update submitted successfully! We\'ll review it and publish soon.');
          
          // Reset form
          formik.resetForm();
          setUploadedFiles([]);
          
        } else {
          toast.error(result.error || 'Failed to submit update. Please try again.');
        }
        
      } catch (error) {
        toast.error('Failed to submit update. Please try again.');
      }
    }
  });

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      // Validate file size
      const maxSize = type === 'video' ? 20 * 1024 * 1024 : 5 * 1024 * 1024; // 20MB for video, 5MB for images
      if (file.size > maxSize) {
        toast.error(`File too large. ${type === 'video' ? 'Videos' : 'Images'} must be under ${type === 'video' ? '20MB' : '5MB'}`);
        return;
      }
      
      // Validate file type
      const validTypes = type === 'video' 
        ? ['video/mp4', 'video/avi', 'video/mov', 'video/wmv']
        : ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type. Please upload ${type === 'video' ? 'MP4, AVI, MOV, or WMV' : 'JPEG, PNG, JPG, or WebP'} files`);
        return;
      }
      
      // Check total image size limit (5MB total for all images)
      if (type === 'image') {
        const currentImageSize = uploadedFiles
          .filter(f => f.type === 'image')
          .reduce((sum, f) => sum + f.file.size, 0);
        
        if (currentImageSize + file.size > 5 * 1024 * 1024) {
          toast.error('Total image size cannot exceed 5MB');
          return;
        }
      }
      
      const fileData = {
        id: Date.now() + Math.random(),
        file,
        type,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file)
      };
      
      setUploadedFiles(prev => [...prev, fileData]);
    });
    
    // Reset input
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateWhatsAppMessage = () => {
    const { submitterName, commodity, location, description, price, unit } = formik.values;
    
    const message = `🌾 MARKET UPDATE SUBMISSION

👤 Name: ${submitterName || '[Your Name]'}
📱 Phone: ${formik.values.submitterPhone || '[Your Phone]'}
🌱 Commodity: ${commodity || '[Commodity Name]'}
📍 Location: ${location || '[Market Location]'}
💰 Price: ${price ? `₦${price} ${unit || ''}` : '[Price and Unit]'}

📝 Description:
${description || '[Describe current market situation, price trends, quality, etc.]'}

Please attach your photos/videos to this message.

---
Sent via FarmNet Market Updates`;

    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-emerald-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Badge variant="primary" size="lg" className="mb-6 shadow-lg">
              📱 Submit Market Update
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight mb-6 font-display">
              Share Market{' '}
              <span className="text-gradient">Intelligence</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Help fellow farmers and buyers stay informed with real-time market prices and conditions.
              Submit your eyewitness reports via form or WhatsApp.
            </p>
            
            <div className="flex items-center justify-center space-x-2 mb-8">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Updates</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Submission Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* WhatsApp Submission */}
            <Card className="group card-hover interactive-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Submit via WhatsApp
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Quick and easy! Send your market updates with photos and videos directly through WhatsApp. 
                  Perfect for on-the-go submissions.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 text-green-700 mb-2">
                    <FiPhone className="w-4 h-4" />
                    <span className="font-semibold">WhatsApp Number:</span>
                  </div>
                  <p className="font-mono text-lg text-green-800">{whatsappNumber}</p>
                </div>
                
                <Button 
                  size="xl" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
                  onClick={openWhatsApp}
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  Open WhatsApp
                </Button>
                
                <p className="text-sm text-neutral-500 mt-4">
                  A pre-filled message will be created for you
                </p>
              </CardContent>
            </Card>

            {/* Form Submission */}
            <Card className="group card-hover interactive-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <FiSend className="w-8 h-8 text-primary-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Submit via Form
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Complete submission with structured data entry. Upload multiple files with validation 
                  and get instant feedback on your submission.
                </p>
                
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-primary-700">
                      <FiVideo className="w-4 h-4" />
                      <span>Video ≤20MB</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary-700">
                      <FiImage className="w-4 h-4" />
                      <span>Images ≤5MB total</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="xl" 
                  className="w-full btn-primary"
                  onClick={() => document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  Use Form
                  <FiArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
                
                <p className="text-sm text-neutral-500 mt-4">
                  Structured submission with validation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">Submit Market Update</h2>
                  <p className="text-neutral-600">
                    Fill in the details below to submit your market update. All submissions are reviewed before publishing.
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="submitterName"
                        value={formik.values.submitterName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your full name"
                        className={`input ${formik.touched.submitterName && formik.errors.submitterName ? 'input-error' : ''}`}
                      />
                      {formik.touched.submitterName && formik.errors.submitterName && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.submitterName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="submitterPhone"
                        value={formik.values.submitterPhone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="+234 XXX XXX XXXX"
                        className={`input ${formik.touched.submitterPhone && formik.errors.submitterPhone ? 'input-error' : ''}`}
                      />
                      {formik.touched.submitterPhone && formik.errors.submitterPhone && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.submitterPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Market Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          formik.setFieldValue('commodity', ''); // Reset commodity when category changes
                        }}
                        className="input"
                        disabled={loading}
                      >
                        <option value="">{loading ? 'Loading categories...' : 'Select category'}</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Commodity *
                      </label>
                      <select
                        name="commodity"
                        value={formik.values.commodity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`input ${formik.touched.commodity && formik.errors.commodity ? 'input-error' : ''}`}
                        disabled={!selectedCategory || loading}
                      >
                        <option value="">
                          {!selectedCategory 
                            ? 'Select category first' 
                            : loading 
                            ? 'Loading commodities...' 
                            : 'Select commodity'
                          }
                        </option>
                        {selectedCategory && categories
                          .find(cat => cat.id === selectedCategory)
                          ?.commodities?.map(commodity => (
                            <option key={commodity.id} value={commodity.name}>
                              {commodity.name}
                              {commodity.aliases.length > 0 && ` (${commodity.aliases.join(', ')})`}
                            </option>
                          ))
                        }
                      </select>
                      {formik.touched.commodity && formik.errors.commodity && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.commodity}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Market Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Market Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e.g., Lagos, Mile 12 Market"
                        className={`input ${formik.touched.location && formik.errors.location ? 'input-error' : ''}`}
                      />
                      {formik.touched.location && formik.errors.location && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.location}
                        </p>
                      )}
                    </div>

                    <div></div> {/* Empty div for grid alignment */}
                  </div>

                  {/* Price Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Current Price (Optional)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter price in Naira"
                        className={`input ${formik.touched.price && formik.errors.price ? 'input-error' : ''}`}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Price Unit
                      </label>
                      <select
                        name="unit"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`input ${formik.touched.unit && formik.errors.unit ? 'input-error' : ''}`}
                        disabled={!formik.values.price}
                      >
                        <option value="">Select unit</option>
                        {getUnitsForCommodity().map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                      {formik.touched.unit && formik.errors.unit && (
                        <p className="text-error text-sm mt-1 flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.unit}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Market Description *
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Describe the current market situation, price trends, quality of produce, supply levels, etc."
                      className={`input resize-none ${formik.touched.description && formik.errors.description ? 'input-error' : ''}`}
                    />
                    <div className="flex justify-between items-center mt-2">
                      {formik.touched.description && formik.errors.description ? (
                        <p className="text-error text-sm flex items-center">
                          <FiAlertCircle className="w-4 h-4 mr-1" />
                          {formik.errors.description}
                        </p>
                      ) : (
                        <p className="text-neutral-500 text-sm">
                          Minimum 20 characters required
                        </p>
                      )}
                      <span className="text-sm text-neutral-400">
                        {formik.values.description.length} characters
                      </span>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-4">
                      Photos & Videos (Optional)
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Video Upload */}
                      <div 
                        onClick={() => videoInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer group"
                      >
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, 'video')}
                          className="hidden"
                          multiple
                        />
                        <FiVideo className="w-8 h-8 text-neutral-400 group-hover:text-primary-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-neutral-600 group-hover:text-primary-600">
                          Upload Videos
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          MP4, AVI, MOV, WMV (Max 20MB each)
                        </p>
                      </div>

                      {/* Image Upload */}
                      <div 
                        onClick={() => imageInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer group"
                      >
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'image')}
                          className="hidden"
                          multiple
                        />
                        <FiImage className="w-8 h-8 text-neutral-400 group-hover:text-primary-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-neutral-600 group-hover:text-primary-600">
                          Upload Photos
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          JPEG, PNG, WebP (5MB total limit)
                        </p>
                      </div>
                    </div>

                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-neutral-700">Uploaded Files:</h4>
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {file.type === 'video' ? (
                                <FiVideo className="w-5 h-5 text-blue-500" />
                              ) : (
                                <FiImage className="w-5 h-5 text-green-500" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                                <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="p-1 text-neutral-400 hover:text-error transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-8 border-t border-neutral-200">
                    <p className="text-sm text-neutral-500">
                      All submissions are reviewed before publishing
                    </p>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="btn-primary"
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? 'Submitting...' : 'Submit Update'}
                      {!formik.isSubmitting && <FiCheck className="w-5 h-5 ml-2" />}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}