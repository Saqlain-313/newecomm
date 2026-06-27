import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaLock,
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaMobileAlt,
  FaWallet,
  FaUniversity,
  FaMoneyBillWave,
  FaGift,
  FaClock,
  FaCheckCircle,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaGlobe,
  FaServer,
  FaDatabase,
  FaUserShield,
  FaKey,
  FaLockOpen,
  FaShieldVirus,
  FaPrint,
  FaDownload,
  FaQuestionCircle,
  FaArrowRight
} from "react-icons/fa";
import { MdVerified, MdSecurity, MdPayment } from "react-icons/md";

const Security = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Payment methods data
  const paymentMethods = [
    { id: 1, icon: FaCcVisa, name: 'VISA', color: 'from-blue-600 to-blue-800' },
    { id: 2, icon: FaCcMastercard, name: 'MasterCard', color: 'from-orange-500 to-red-600' },
    { id: 3, icon: FaCcAmex, name: 'American Express', color: 'from-blue-400 to-blue-600' },
    { id: 4, icon: FaCcDiscover, name: 'Discover', color: 'from-orange-400 to-orange-600' },
    { id: 5, icon: FaMobileAlt, name: 'UPI', color: 'from-green-400 to-green-600' },
    { id: 6, icon: FaWallet, name: 'Wallet', color: 'from-purple-400 to-purple-600' },
    { id: 7, icon: FaUniversity, name: 'Net Banking', color: 'from-blue-500 to-indigo-600' },
    { id: 8, icon: FaMoneyBillWave, name: 'Cash on Delivery', color: 'from-green-500 to-emerald-600' },
    { id: 9, icon: FaGift, name: 'E-Gift Vouchers', color: 'from-pink-400 to-rose-500' },
  ];

  // Security features
  const securityFeatures = [
    {
      icon: FaLock,
      title: 'Secure Payments',
      description: 'All transactions are encrypted with 256-bit SSL security',
      color: 'text-green-600'
    },
    {
      icon: FaUserShield,
      title: 'Data Protection',
      description: 'Your personal information is kept safe and private',
      color: 'text-blue-600'
    },
    {
      icon: FaShieldVirus,
      title: 'Fraud Protection',
      description: 'Advanced fraud detection and prevention systems',
      color: 'text-purple-600'
    },
    {
      icon: FaKey,
      title: 'Secure Login',
      description: 'Two-factor authentication for account security',
      color: 'text-orange-600'
    }
  ];

  // International cards accepted
  const internationalCards = [
    'Australia', 'Austria', 'Belgium', 'Canada', 'Cyprus', 'Denmark',
    'Finland', 'France', 'Germany', 'Ireland', 'Italy', 'Luxembourg',
    'Netherlands', 'New Zealand', 'Norway', 'Portugal', 'Singapore',
    'Spain', 'Sweden', 'UK', 'US'
  ];

  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaCheckCircle key={i} className={`${i < count ? 'text-green-500' : 'text-gray-300'} text-sm`} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaShieldAlt className="text-4xl text-[#306D29]" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                Security & Privacy
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Your security and privacy are our top priorities. Learn about how we protect your information.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaLock className="text-green-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">256-bit</p>
            <p className="text-xs text-gray-500">SSL Encryption</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCheckCircle className="text-blue-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">100%</p>
            <p className="text-xs text-gray-500">Secure Payments</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaShieldVirus className="text-purple-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">24/7</p>
            <p className="text-xs text-gray-500">Fraud Monitoring</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaClock className="text-orange-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">Real-time</p>
            <p className="text-xs text-gray-500">Transaction Alerts</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-1 mb-8">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'security', label: 'Security', icon: FaShieldAlt },
              { id: 'payments', label: 'Payments', icon: MdPayment },
              { id: 'privacy', label: 'Privacy', icon: FaLock }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaShieldAlt className="text-[#306D29]" />
                Security Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {securityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon className={`${feature.color} text-xl`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <MdSecurity className="text-green-600 text-3xl flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 text-lg">Is making online payment secure on Glamorous?</h4>
                    <p className="text-green-700 mt-2">
                      Yes, making online payment is secure on Glamorous. All transactions are protected with industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MdPayment className="text-[#306D29]" />
                Payment Methods
              </h2>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`bg-gradient-to-r ${method.color} rounded-xl p-3 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="text-xl" />
                        <span className="text-sm font-medium">{method.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Information */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Does Glamorous store my credit/debit card information?</h4>
                    <p className="text-blue-700 mt-1 text-sm">
                      No. Glamorous only stores the last 4 digits of your card number for the purpose of card identification.
                    </p>
                  </div>
                </div>
              </div>

              {/* International Cards */}
              <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-purple-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-800">International Cards Accepted</h4>
                    <p className="text-purple-700 mt-1 text-sm">
                      We accept VISA, MasterCard, Maestro, American Express credit/debit cards issued by banks in India and in the following countries:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {internationalCards.map((country) => (
                        <span key={country} className="bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-purple-700 border border-purple-200">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Payment Options */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-3">
                  <FaMobileAlt className="text-amber-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Other Payment Options</h4>
                    <p className="text-amber-700 mt-1 text-sm">
                      Apart from Credit and Debit Cards, we accept payments via Internet Banking (covering 44 banks), 
                      Cash on Delivery, Equated Monthly Installments (EMI), E-Gift Vouchers, Flipkart Pay Later, 
                      UPI, Wallet, and Paytm Postpaid.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaLock className="text-[#306D29]" />
                Privacy Policy
              </h2>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
                <div className="flex items-start gap-4">
                  <FaDatabase className="text-blue-500 text-3xl flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 text-lg">Your Privacy Matters</h4>
                    <p className="text-blue-700 mt-2">
                      Flipkart.com respects your privacy and is committed to protecting it. 
                      We use your information to provide and improve our services.
                    </p>
                    <Link to='/privacypolicy'>
                      <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                        Read Full Privacy Policy
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Privacy Highlights */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Data Protection</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your personal information is encrypted and stored securely. We never share your data without consent.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaUserShield className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Your Rights</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    You have the right to access, modify, or delete your personal information at any time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl p-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Need Help?</h4>
                    <p className="text-sm opacity-90">Our support team is here to assist you</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm">
                    <FaEnvelope /> Email Support
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm">
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <Link to='/contact' className="flex items-center gap-2 px-4 py-2 bg-white text-[#306D29] rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                    Contact Us <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
          <div className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <MdSecurity className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">Secure Transactions</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">Verified by Visa</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            * All information is encrypted and secure. Your privacy is our priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;