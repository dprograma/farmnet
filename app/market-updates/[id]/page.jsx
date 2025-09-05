'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiEye,
  FiShare2,
  FiArrowLeft,
  FiImage,
  FiVideo,
  FiCalendar,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
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

export default function MarketUpdateDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [update, setUpdate] = useState(null);
  const [relatedUpdates, setRelatedUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUpdateDetails();
    }
  }, [id]);

  const fetchUpdateDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/market-updates/${id}`);
      const result = await response.json();

      if (result.success) {
        setUpdate(result.data.update);
        setRelatedUpdates(result.data.relatedUpdates || []);
        
        // Increment view count
        await fetch(`/api/market-updates/${id}`, {
          method: 'PUT'
        });
      } else {
        setError(result.error || 'Failed to fetch update details');
      }
    } catch (error) {
      console.error('Error fetching update details:', error);
      setError('Failed to load update details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getPriceIcon = (price) => {
    const trend = Math.random();
    if (trend > 0.6) return <FiTrendingUp className="w-5 h-5 text-green-500" />;
    if (trend < 0.4) return <FiTrendingDown className="w-5 h-5 text-red-500" />;
    return <FiMinus className="w-5 h-5 text-neutral-500" />;
  };

  const nextImage = () => {
    if (update?.images && update.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % update.images.length);
    }
  };

  const prevImage = () => {
    if (update?.images && update.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + update.images.length) % update.images.length);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: update.title,
          text: update.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
            <div className="h-64 bg-neutral-200 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !update) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiImage className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              {error || 'Market Update Not Found'}
            </h1>
            <p className="text-neutral-600 mb-8">
              The market update you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/market-updates')}>
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Market Updates
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => router.push('/market-updates')}
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Updates
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="space-y-6"
            >
              {/* Media Section */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {update.type === 'VIDEO' ? (
                    <div 
                      className="relative w-full h-80 bg-neutral-900 cursor-pointer group"
                      onClick={() => setShowVideoModal(true)}
                    >
                      <img
                        src={update.videoThumbnail || '/api/placeholder/800/450'}
                        alt={update.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/800/450';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FiPlay className="w-8 h-8 text-primary-600 ml-1" />
                        </div>
                      </div>
                      {update.videoDuration && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded">
                          <FiClock className="w-4 h-4 inline mr-2" />
                          {Math.floor(update.videoDuration / 60)}:{(update.videoDuration % 60).toString().padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-80">
                      <img
                        src={update.images?.[currentImageIndex] || '/api/placeholder/800/450'}
                        alt={update.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setShowImageModal(true)}
                        onError={(e) => {
                          e.target.src = '/api/placeholder/800/450';
                        }}
                      />
                      
                      {update.images && update.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <FiChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <FiChevronRight className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                            {currentImageIndex + 1} / {update.images.length}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Content Section */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <Badge variant="primary" className="mb-4">
                        {update.commodity}
                      </Badge>
                      <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                        {update.title}
                      </h1>
                    </div>
                    <button
                      onClick={handleShare}
                      className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                    >
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-neutral-700 text-lg leading-relaxed mb-8">
                    {update.description}
                  </p>

                  {/* Price Info */}
                  {update.price && (
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                      <div className="flex items-center space-x-3">
                        {getPriceIcon(update.price)}
                        <div>
                          <div className="text-2xl font-bold text-neutral-900">
                            ₦{update.price.toLocaleString()}
                          </div>
                          <div className="text-neutral-600">
                            {update.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center space-x-3 text-neutral-600">
                      <FiMapPin className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div>{update.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-neutral-600">
                      <FiUser className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-medium">Submitted by</div>
                        <div>{update.submittedBy}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-neutral-600">
                      <FiCalendar className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-medium">Submitted</div>
                        <div>{formatTimeAgo(update.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-neutral-600">
                      <FiEye className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-medium">Views</div>
                        <div>{update.viewCount + 1}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {relatedUpdates.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">
                    More {update.commodity} Updates
                  </h3>
                  <div className="space-y-4">
                    {relatedUpdates.map((relatedUpdate) => (
                      <div
                        key={relatedUpdate.id}
                        className="cursor-pointer group"
                        onClick={() => router.push(`/market-updates/${relatedUpdate.id}`)}
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img
                              src={
                                relatedUpdate.type === 'VIDEO' 
                                  ? relatedUpdate.videoThumbnail || '/api/placeholder/80/80'
                                  : relatedUpdate.images?.[0] || '/api/placeholder/80/80'
                              }
                              alt={relatedUpdate.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/80/80';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                              {relatedUpdate.title}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1">
                              {relatedUpdate.location}
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">
                              {formatTimeAgo(relatedUpdate.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && update.images && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={update.images[currentImageIndex]}
              alt={update.title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = '/api/placeholder/800/600';
              }}
            />
            {update.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && update.videoUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <video
              controls
              autoPlay
              className="max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error('Video failed to load:', update.videoUrl);
                // Show error message
                e.target.style.display = 'none';
                const errorDiv = e.target.parentElement.querySelector('.video-error');
                if (errorDiv) errorDiv.style.display = 'block';
              }}
              onLoadStart={() => {
                // Ensure error div is hidden when video starts loading
                const errorDiv = document.querySelector('.video-error');
                if (errorDiv) errorDiv.style.display = 'none';
              }}
            >
              <source src={update.videoUrl.replace(/ /g, '%20')} type="video/mp4" />
              <source src={update.videoUrl.replace('.mp4', '.webm').replace(/ /g, '%20')} type="video/webm" />
              <source src={update.videoUrl.replace('.mp4', '.mov').replace(/ /g, '%20')} type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Error Message */}
            <div 
              className="video-error bg-neutral-800 text-white p-8 rounded-xl text-center" 
              style={{ display: 'none' }}
            >
              <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Video Not Available</h3>
              <p className="text-neutral-300 mb-4">
                The video file could not be loaded or is no longer available.
              </p>
              <Button 
                size="sm" 
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </Button>
            </div>
            
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}