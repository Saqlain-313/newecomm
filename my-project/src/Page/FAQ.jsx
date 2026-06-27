import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCreditCard,
  FaMobileAlt,
  FaWallet,
  FaGift,
  FaInfoCircle,
  FaBox,
  FaClock,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FAQ Categories
  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'understanding', label: 'Understanding' },
    { id: 'ordering', label: 'Placing Order' },
    { id: 'payment', label: 'Payment' },
    { id: 'delivery', label: 'Delivery' }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'understanding',
      question: 'What is Glamorous?',
      answer: 'Glamorous brings you access to a wide range of quality products sold by trusted suppliers onboarded with us.'
    },
    {
      id: 2,
      category: 'understanding',
      question: 'What about quality of products?',
      answer: 'We have built product and supplier quality guardrails with our trusted supplier base. You can now place orders confidently with quality selection available on Glamorous.'
    },
    {
      id: 3,
      category: 'understanding',
      question: 'Do you provide product reviews?',
      answer: 'Yes, you get access to millions of customer reviews shared on Glamorous. Customer reviews help you get additional information about quality and performance of products.'
    },
    {
      id: 4,
      category: 'ordering',
      question: 'Do I have to check the availability of stock before placing an order?',
      answer: 'Our suppliers ensure that enough inventory is available for all the products that are Live on the App. If an item is marked as "Out of Stock" you won\'t be able to order it.'
    },
    {
      id: 5,
      category: 'ordering',
      question: 'What if I want to place an order but the product goes out of stock?',
      answer: 'Select the "Notify Me" option on the product listing page. This will ensure that you get notified immediately when the product is back in stock.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'How do I place an order using Cash on Delivery (COD)?',
      answer: 'Add a product to your cart, go to the Cart section, enter the address, select "Cash on Delivery" as payment mode, confirm order details and place the order. The delivery partner will collect the amount at the time of delivery.'
    },
    {
      id: 7,
      category: 'delivery',
      question: 'What is the estimated delivery time?',
      answer: 'The duration of the shipment varies for each product. The time taken to deliver to the selected pin code is displayed on the product listing page. Please check for the same before placing your order.'
    },
    {
      id: 8,
      category: 'delivery',
      question: 'Reliable Delivery - What does it mean?',
      answer: 'We ensure reliability in delivery to end customers within 7 working days with end-to-end tracking. Faster deliveries using existing shipping partners.'
    }
  ];

  // Quick stats
  const stats = [
    { label: 'Total FAQs', value: faqs.length, icon: FaQuestionCircle },
    { label: 'Categories', value: categories.length - 1, icon: FaInfoCircle },
    { label: 'Quick Support', value: '24/7', icon: FaHeadset },
    { label: 'Happy Customers', value: '10K+', icon: FaCheckCircle }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Highlight search matches
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
          <span className="text-gray-800 font-medium">FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaQuestionCircle className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Frequently Asked <span className="text-[#306D29]">Questions</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Find answers to the most common questions about Glamorous
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-br from-[#306D29] to-[#4CAF50] rounded-full">
                    <Icon className="text-white text-lg" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#306D29]">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Search & Category Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-[#306D29] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#306D29] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-[#306D29]">
                        <FaQuestionCircle className="text-sm" />
                      </span>
                      <span 
                        className="font-medium text-gray-800 text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: highlightText(faq.question) }}
                      />
                    </div>
                    <span className="flex-shrink-0 ml-4">
                      {expandedFaq === faq.id ? (
                        <FaChevronUp className="text-[#306D29]" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </span>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <p 
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightText(faq.answer) }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">No Results Found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-4 text-[#306D29] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Help Section */}
        <div className="mt-8 bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-3xl p-8 md:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Still Have Questions?</h3>
              <p className="text-sm opacity-90 mt-1">
                Our support team is here to help you 24/7
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                <FaHeadset /> Contact Support
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-lg" />
            Trusted Source
          </span>
          <span className="flex items-center gap-2">
            <FaTruck className="text-[#306D29] text-lg" />
            Fast Delivery
          </span>
          <span className="flex items-center gap-2">
            <FaShieldAlt className="text-green-500 text-lg" />
            Secure Shopping
          </span>
          <span className="flex items-center gap-2">
            <FaHeadset className="text-[#306D29] text-lg" />
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default FAQ;