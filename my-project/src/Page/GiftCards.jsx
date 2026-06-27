import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  FaGift,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaCreditCard,
  FaMobileAlt,
  FaCheck,
  FaHeart,
  FaStar,
  FaShareAlt,
  FaDownload,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPrint,
  FaArrowRight,
  FaInfoCircle,
  FaLock,
  FaThumbsUp,
  FaRegClock
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isDeliveredNow, setIsDeliveredNow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  // Gift card designs
  const designs = useMemo(() => [
    {
      id: 0,
      name: 'Classic Gold',
      gradient: 'from-yellow-400 to-amber-600',
      icon: '✨',
      pattern: 'dots'
    },
    {
      id: 1,
      name: 'Elegant Green',
      gradient: 'from-green-400 to-emerald-700',
      icon: '🌿',
      pattern: 'stripes'
    },
    {
      id: 2,
      name: 'Modern Black',
      gradient: 'from-gray-600 to-gray-900',
      icon: '⭐',
      pattern: 'circles'
    },
    {
      id: 3,
      name: 'Rose Gold',
      gradient: 'from-rose-300 to-rose-600',
      icon: '🌸',
      pattern: 'hearts'
    },
    {
      id: 4,
      name: 'Ocean Blue',
      gradient: 'from-blue-400 to-cyan-700',
      icon: '🌊',
      pattern: 'waves'
    },
    {
      id: 5,
      name: 'Purple Haze',
      gradient: 'from-purple-400 to-indigo-700',
      icon: '💜',
      pattern: 'stars'
    }
  ], []);

  // Amount options
  const amountOptions = useMemo(() => [
    25, 50, 75, 100, 150, 200, 250, 500
  ], []);

  // Custom amount
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);

  // Gift card features
  const features = [
    { icon: FaRegClock, text: 'Instant Delivery' },
    { icon: FaLock, text: 'Secure Payment' },
    { icon: FaThumbsUp, text: '100% Satisfaction' },
    { icon: FaStar, text: 'No Expiration' }
  ];

  // Gift card benefits
  const benefits = [
    'Perfect for any occasion',
    'Choose from multiple designs',
    'Add a personal message',
    'Schedule delivery',
    'Redeemable on all products',
    'No hidden fees'
  ];

  const handlePurchase = useCallback(async () => {
    if (!recipientName || !recipientEmail || !senderName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPurchased(true);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [recipientName, recipientEmail, senderName]);

  const handleShare = useCallback((platform) => {
    const message = `I just bought a gift card from our store! 🎁`;
    const url = window.location.href;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      instagram: 'instagram://'
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  }, []);

  useEffect(() =>{
    window.scrollTo(0,0);
  }, []);

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#FBF5DD] via-[#f5f0d6] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaGift className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Gift Cards
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Give the gift of style. Perfect for any occasion, our gift cards are the ideal present for fashion lovers.
          </p>
        </div>

        {/* Success State */}
        {isPurchased ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-scale-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-5xl text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Gift Card Purchased! 🎉
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Your gift card has been sent to {recipientEmail}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#306D29] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <FaDownload /> Download Receipt
              </button>
              <button className="border-2 border-[#306D29] text-[#306D29] px-6 py-3 rounded-xl font-semibold hover:bg-[#306D29] hover:text-white transition-all flex items-center gap-2">
                <FaPrint /> Print
              </button>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => handleShare('whatsapp')} className="p-3 bg-green-500 text-white rounded-full hover:scale-110 transition-transform">
                <FaWhatsapp className="w-6 h-6" />
              </button>
              <button onClick={() => handleShare('facebook')} className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">
                <FaFacebook className="w-6 h-6" />
              </button>
              <button onClick={() => handleShare('twitter')} className="p-3 bg-sky-500 text-white rounded-full hover:scale-110 transition-transform">
                <FaTwitter className="w-6 h-6" />
              </button>
              <button onClick={() => handleShare('instagram')} className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:scale-110 transition-transform">
                <FaInstagram className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            
            {/* Left Section - Gift Card Preview & Design */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Gift Card Preview */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaGift className="text-[#306D29]" />
                  Your Gift Card
                </h2>
                
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${designs[selectedDesign].gradient} p-8 min-h-[280px] md:min-h-[320px]`}>
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute inset-0 ${designs[selectedDesign].pattern === 'dots' ? 'bg-dots' : 
                      designs[selectedDesign].pattern === 'stripes' ? 'bg-stripes' :
                      designs[selectedDesign].pattern === 'circles' ? 'bg-circles' :
                      designs[selectedDesign].pattern === 'hearts' ? 'bg-hearts' :
                      designs[selectedDesign].pattern === 'waves' ? 'bg-waves' : 'bg-stars'}`} />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 text-4xl opacity-20">
                    {designs[selectedDesign].icon}
                  </div>
                  <div className="absolute bottom-4 left-4 text-6xl opacity-10">
                    {designs[selectedDesign].icon}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <FaGift className="w-4 h-4" />
                        <span>Gift Card</span>
                      </div>
                      <div className="text-white text-5xl md:text-6xl font-bold mt-2">
                        ₹{selectedAmount}
                      </div>
                      {selectedDesign === 1 && (
                        <div className="mt-2 text-white/90 text-sm">
                          <MdVerified className="inline mr-1" /> Premium Gift Card
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      {recipientName && (
                        <div className="text-white text-lg font-semibold">
                          To: {recipientName}
                        </div>
                      )}
                      {senderName && (
                        <div className="text-white/80 text-sm">
                          From: {senderName}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-2 text-white/70 text-xs">
                        <FaLock className="w-3 h-3" />
                        <span>Secure • No Expiry</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="absolute bottom-4 right-4 text-white/30 text-xs font-mono">
                    GC-{Date.now().toString(36).toUpperCase()}
                  </div>
                </div>

                {/* Design Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Design
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {designs.map((design) => (
                      <button
                        key={design.id}
                        onClick={() => setSelectedDesign(design.id)}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${design.gradient} ${
                          selectedDesign === design.id 
                            ? 'ring-4 ring-[#306D29] ring-offset-2 scale-110' 
                            : 'hover:scale-105'
                        } transition-all duration-300 flex items-center justify-center text-white text-xl`}
                        title={design.name}
                      >
                        {design.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-[#306D29]" />
                  Select Amount
                </h3>
                
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-3">
                  {amountOptions.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setShowCustomAmount(false);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedAmount === amount && !showCustomAmount
                          ? 'bg-[#306D29] text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowCustomAmount(!showCustomAmount)}
                    className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 col-span-1 ${
                      showCustomAmount
                        ? 'bg-[#306D29] text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {showCustomAmount && (
                  <div className="mt-4 animate-slide-down">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(parseInt(e.target.value) || 0);
                        }}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 border-2 border-[#306D29] rounded-xl outline-none focus:ring-2 focus:ring-green-100"
                        min="1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Recipient Details */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-[#306D29]" />
                  Recipient Details
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Recipient Name *"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Recipient Email *"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Personal Message (Optional)"
                      rows="3"
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-[#306D29]" />
                  Delivery & Payment
                </h3>

                {/* Delivery Option */}
                <div className="mb-4">
                  <div className="flex gap-4 mb-3">
                    <button
                      onClick={() => setIsDeliveredNow(true)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        isDeliveredNow
                          ? 'bg-[#306D29] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Send Now
                    </button>
                    <button
                      onClick={() => setIsDeliveredNow(false)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        !isDeliveredNow
                          ? 'bg-[#306D29] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {!isDeliveredNow && (
                    <div className="animate-slide-down">
                      <input
                        type="datetime-local"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'card', icon: FaCreditCard, label: 'Credit/Debit Card' },
                      { id: 'upi', icon: FaMobileAlt, label: 'UPI Payment' }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                            selectedPayment === method.id
                              ? 'border-[#306D29] bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={selectedPayment === method.id ? 'text-[#306D29]' : 'text-gray-400'} />
                          <span className="font-medium">{method.label}</span>
                          {selectedPayment === method.id && (
                            <FaCheck className="ml-auto text-[#306D29]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon className="text-[#306D29] w-4 h-4" />
                        <span>{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-[#306D29] to-[#1a7a1b] text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Buy Gift Card
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/90 transition-all hover:shadow-lg hover:-translate-y-1">
              <FaCheck className="text-[#306D29] mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <FaLock className="text-green-600" /> Secure Payment
          </span>
          <span className="flex items-center gap-2">
            <FaThumbsUp className="text-green-600" /> 100% Satisfaction
          </span>
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-400" /> 4.9/5 Rating
          </span>
          <span className="flex items-center gap-2">
            <FaRegClock className="text-green-600" /> Instant Delivery
          </span>
        </div>
      </div>

      {/* Custom Styles for Patterns */}
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .bg-dots {
          background-image: radial-gradient(circle, white 2px, transparent 2px);
          background-size: 20px 20px;
        }
        .bg-stripes {
          background-image: repeating-linear-gradient(45deg, white 0px, white 2px, transparent 2px, transparent 10px);
        }
        .bg-circles {
          background-image: radial-gradient(circle, white 4px, transparent 4px);
          background-size: 30px 30px;
        }
        .bg-hearts {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
          background-size: 30px 30px;
          opacity: 0.2;
        }
        .bg-waves {
          background-image: repeating-linear-gradient(90deg, white 0px, white 2px, transparent 2px, transparent 15px);
          background-size: 20px 20px;
        }
        .bg-stars {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
          background-size: 25px 25px;
          opacity: 0.15;
        }
      `}</style>
    </div>
  );
};

export default GiftCards;