import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaWallet,
  FaGift,
  FaUniversity,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaInfoCircle,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaPrint,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";
import { MdVerified, MdSecurity } from "react-icons/md";

const Payment = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Payment sections
  const sections = [
    { id: 'methods', title: 'Payment Methods', icon: FaCreditCard },
    { id: 'cod', title: 'Cash on Delivery', icon: FaMoneyBillWave },
    { id: 'cards', title: 'Credit/Debit Cards', icon: FaCcVisa },
    { id: 'security', title: 'Security', icon: FaShieldAlt },
    { id: '3dsecure', title: '3D Secure', icon: FaLock }
  ];

  // Payment methods
  const paymentMethods = [
    { id: 1, icon: FaCcVisa, name: 'VISA', color: 'from-blue-600 to-blue-800' },
    { id: 2, icon: FaCcMastercard, name: 'MasterCard', color: 'from-orange-500 to-red-600' },
    { id: 3, icon: FaCcAmex, name: 'American Express', color: 'from-blue-400 to-blue-600' },
    { id: 4, icon: FaCcDiscover, name: 'Discover', color: 'from-orange-400 to-orange-600' },
    { id: 5, icon: FaMobileAlt, name: 'UPI', color: 'from-green-400 to-green-600' },
    { id: 6, icon: FaWallet, name: 'Wallet', color: 'from-purple-400 to-purple-600' },
    { id: 7, icon: FaUniversity, name: 'Net Banking', color: 'from-blue-500 to-indigo-600' },
    { id: 8, icon: FaMoneyBillWave, name: 'Cash on Delivery', color: 'from-green-500 to-emerald-600' },
    { id: 9, icon: FaGift, name: 'Gift Cards', color: 'from-pink-400 to-rose-500' }
  ];

  // Security features
  const securityFeatures = [
    {
      icon: FaLock,
      title: '256-bit Encryption',
      description: 'Your card information is protected with the highest level of encryption'
    },
    {
      icon: FaShieldAlt,
      title: 'Fraud Detection',
      description: 'Continuous monitoring for suspicious activities and transactions'
    },
    {
      icon: FaCheckCircle,
      title: 'Trusted Gateways',
      description: 'Payments processed through secure and trusted payment gateways'
    },
    {
      icon: MdSecurity,
      title: '3D Secure',
      description: 'Additional layer of security through identity verification'
    }
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-[#306D29] transition-colors">
            <FaHome className="text-xs" />
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">Payment</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaCreditCard className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Payment <span className="text-[#306D29]">Options</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Secure and convenient payment options for a seamless shopping experience
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCreditCard className="text-blue-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">9+</p>
            <p className="text-xs text-gray-500">Payment Methods</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaShieldAlt className="text-green-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">256-bit</p>
            <p className="text-xs text-gray-500">Encryption</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaCheckCircle className="text-purple-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">100%</p>
            <p className="text-xs text-gray-500">Secure Transactions</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaMoneyBillWave className="text-orange-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">₹50,000</p>
            <p className="text-xs text-gray-500">Max COD Limit</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  expandedSection === section.id
                    ? 'bg-[#306D29] text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="text-sm" />
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          
          {/* Payment Methods Grid */}
          <div className="mb-8" id="methods">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`bg-gradient-to-r ${method.color} rounded-xl p-3 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer text-center`}
                  >
                    <Icon className="text-2xl mx-auto mb-1" />
                    <span className="text-xs font-medium block">{method.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: highlightText(
                'You may use Internet Banking, Gift Card, Cash on Delivery and Wallet to make your purchase. Glamorous also accepts payments made using Visa, MasterCard, Maestro and American Express credit/debit cards in India and 21 other countries.'
              ) }} />
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200 mt-3">
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'There are NO hidden charges when you make a purchase on Glamorous. The prices listed for all the items are final and all-inclusive. The price you see on the product page is exactly what you pay.'
                ) }} />
              </div>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div className="mb-8" id="cod">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Cash on Delivery</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'If you are not comfortable making an online payment on Glamorous, you can opt for the Cash on Delivery (C-o-D) payment method instead. With C-o-D you can pay in cash at the time of actual delivery of the product at your doorstep, without requiring you to make any advance payment online.'
                ) }} />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Max Order Value
                  </h4>
                  <p className="text-sm text-gray-600">₹50,000</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" /> Payment Method
                  </h4>
                  <p className="text-sm text-gray-600">Cash only. Indian Rupees accepted.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Credit/Debit Cards */}
          <div className="mb-8" id="cards">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaCcVisa className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Credit / Debit Cards</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800">Credit Cards</h4>
                <p className="text-sm text-purple-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'We accept payments made using Visa, MasterCard and American Express credit cards. To pay using your credit card at checkout, you will need your card number, expiry date, three-digit CVV number (found on the backside of your card).'
                ) }} />
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-800">Debit Cards</h4>
                <p className="text-sm text-indigo-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'We accept payments made using Visa, MasterCard and Maestro debit cards. To pay using your debit card at checkout, you will need your card number, expiry date (optional for Maestro cards), three-digit CVV number (optional for Maestro cards).'
                ) }} />
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Internationally issued credit/debit cards cannot be used for Wallet and Gift Card payments/top-ups.'
                ) }} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-8" id="security">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaShieldAlt className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Payment Security</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#306D29]/10 rounded-lg">
                        <Icon className="text-[#306D29] text-xl" />
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

            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-red-800" dangerouslySetInnerHTML={{ __html: highlightText(
                'Your online transaction on Glamorous is secure with the highest levels of transaction security currently available on the Internet. Glamorous uses 256-bit encryption technology to protect your card information while securely transmitting it to the respective banks for payment processing.'
              ) }} />
            </div>
          </div>

          {/* 3D Secure */}
          <div className="mb-8" id="3dsecure">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <FaLock className="text-cyan-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">3D Secure Password</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                <p className="text-sm text-cyan-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'The 3D Secure password is implemented by VISA and MasterCard in partnership with card issuing banks under the "Verified by VISA" and "Mastercard SecureCode" services, respectively.'
                ) }} />
                <p className="text-sm text-cyan-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'The 3D Secure password adds an additional layer of security through identity verification for your online credit/debit card transactions. This password, which is created by you, is known only to you. This ensures that only you can use your card for online purchases.'
                ) }} />
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold">Need Help with Payment?</h4>
                  <p className="text-sm opacity-90 mt-1">
                    Our support team is here to assist you with any payment-related questions
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to='/contact' className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <FaHeadset /> Contact Support
                  </Link>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-lg" />
            Secure Payments
          </span>
          <span className="flex items-center gap-2">
            <FaLock className="text-[#306D29] text-lg" />
            256-bit Encryption
          </span>
          <span className="flex items-center gap-2">
            <FaShieldAlt className="text-green-500 text-lg" />
            Fraud Protection
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-[#306D29] text-lg" />
            Trusted Gateway
          </span>
        </div>
      </div>
    </div>
  );
};

export default Payment;