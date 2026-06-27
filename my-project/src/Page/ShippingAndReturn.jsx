import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaTruck,
  FaUndo,
  FaBox,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaShippingFast,
  FaGlobe,
  FaCalendarAlt,
  FaArrowRight,
  FaPrint,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaHeadset
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ShippingAndReturn = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'delivery', title: 'Delivery Timeline', icon: FaClock },
    { id: 'seller', title: 'Seller Shipping', icon: FaBox },
    { id: 'cod', title: 'Cash on Delivery', icon: FaTruck },
    { id: 'returns', title: 'Returns Process', icon: FaUndo },
    { id: 'status', title: 'Product Status', icon: FaInfoCircle },
    { id: 'international', title: 'International Delivery', icon: FaGlobe }
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Highlight search matches
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Orders section. You\'ll also receive tracking updates via email and SMS.'
    },
    {
      id: 2,
      question: 'What is the return policy?',
      answer: 'We offer a 30-day return policy on most items. Items must be unused, with original tags and packaging. Return shipping is free for eligible items.'
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer: 'Shipping typically takes 2-5 business days depending on your location. Express shipping options are available for faster delivery.'
    },
    {
      id: 4,
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within India only. We\'re working on expanding our international shipping options in the future.'
    }
  ];

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
          <span className="text-gray-800 font-medium">Shipping & Returns</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaShippingFast className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Shipping & <span className="text-[#306D29]">Returns</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to know about shipping, delivery, and returns.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaClock className="text-blue-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">2-5 Days</p>
            <p className="text-xs text-gray-500">Standard Delivery</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaUndo className="text-green-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">30 Days</p>
            <p className="text-xs text-gray-500">Return Policy</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaTruck className="text-purple-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">Free</p>
            <p className="text-xs text-gray-500">Return Shipping*</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaBox className="text-orange-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">24/7</p>
            <p className="text-xs text-gray-500">Tracking Available</p>
          </div>
        </div>
        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10">
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                    expandedSection === section.id
                      ? 'bg-[#306D29] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="text-xs" />
                  {section.title}
                </button>
              );
            })}
          </div>

          {/* Delivery Timeline */}
          <div className="mb-8" id="delivery">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Delivery Timeline</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'It is possible that the Seller or our delivery partners have a holiday between the day you placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some delivery partners and Sellers do not work on Sundays and this is factored in to the delivery dates.'
                ) }} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Estimated Delivery Time</h4>
                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.'
                ) }} />
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                  <FaBox className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Seller Offering</h5>
                  <p className="text-xs text-gray-600">Product availability</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                  <FaMapMarkerAlt className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Shipping Destination</h5>
                  <p className="text-xs text-gray-600">Your location</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                  <FaTruck className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Delivery Partner</h5>
                  <p className="text-xs text-gray-600">Time-to-deliver</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Shipping */}
          <div className="mb-8" id="seller">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaBox className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Seller Shipping</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800">Why does the estimated delivery time vary for each seller?</h4>
                <p className="text-sm text-purple-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'You have probably noticed varying estimated delivery times for sellers of the product you are interested in. Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination and the delivery partner\'s time-to-deliver in your location.'
                ) }} />
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Please enter your default pin code on the product page (you don\'t have to enter it every single time) to know more accurate delivery times on the product page itself.'
                ) }} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Seller does not/cannot ship to my area. Why?</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Whether the Seller ships to your location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Legal restrictions in shipping particular products to your location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>The availability of reliable delivery partners in your location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>At times Sellers prefer not to ship to certain locations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div className="mb-8" id="cod">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaTruck className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Cash on Delivery</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Availability of CoD depends on the ability of our delivery partner servicing your location to accept cash as payment at the time of delivery.'
                ) }} />
                <p className="text-sm text-green-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Our delivery partners have limits on the cash amount payable on delivery depending on the destination and your order value might have exceeded this limit. Please enter your pin code on the product page to check if CoD is available in your location.'
                ) }} />
              </div>
            </div>
          </div>

          {/* Returns Process */}
          <div className="mb-8" id="returns">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaUndo className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Returns Process</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-sm text-red-800" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Returns are easy. Contact Us to initiate a return. You will receive a call explaining the process, once you have initiated a return.'
                ) }} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Wherever possible Ekart Logistics will facilitate the pick-up of the item. In case, the pick-up cannot be arranged through Ekart, you can return the item through a third-party delivery service. Return fees are borne by the Seller.'
                ) }} />
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800" dangerouslySetInnerHTML={{ __html: highlightText(
                    'In case the product was not delivered and you received a delivery confirmation email/SMS, report the issue within 7 days from the date of delivery confirmation for the seller to investigate.'
                  ) }} />
                </div>
              </div>
            </div>
          </div>

          {/* Product Status */}
          <div className="mb-8" id="status">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaInfoCircle className="text-yellow-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Product Status Tags</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> In Stock
                </h4>
                <p className="text-sm text-green-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Sellers will mention the delivery time based on your location pincode (usually 2-3 business days, 4-5 business days or 4-6 business days in areas where standard delivery service is available).'
                ) }} />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                  <FaBox className="text-blue-600" /> Available
                </h4>
                <p className="text-sm text-blue-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'The Seller might not have the item in stock but can procure it when an order is placed for the item. The delivery time will depend on the estimated procurement time and the estimated shipping time to your location.'
                ) }} />
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" /> Preorder
                </h4>
                <p className="text-sm text-purple-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Such items are expected to be released soon and can be pre-booked for you. The item will be shipped to you on the day of its official release launch and will reach you in 2 to 6 business days.'
                ) }} />
              </div>

              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 flex items-center gap-2">
                  <FaInfoCircle className="text-red-600" /> Out of Stock
                </h4>
                <p className="text-sm text-red-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'Currently, the item is not available for sale. Use the \'Notify Me\' feature to know once it is available for purchase.'
                ) }} />
              </div>
            </div>

            <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                <FaGlobe className="text-amber-600" /> Imported
              </h4>
              <p className="text-sm text-amber-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                'Sometimes, items have to be sourced by Sellers from outside India. These items are mentioned as \'Imported\' on the product page and can take at least 10 days or more to be delivered to you.'
              ) }} />
            </div>
          </div>

          {/* International Delivery */}
          <div className="mb-8" id="international">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaGlobe className="text-indigo-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">International Delivery</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-800">Does Glamorous deliver internationally?</h4>
                <p className="text-sm text-indigo-700 mt-2" dangerouslySetInnerHTML={{ __html: highlightText(
                  'As of now, Glamorous doesn\'t deliver items internationally.'
                ) }} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: highlightText(
                  'You will be able to make your purchases on our site from anywhere in the world with credit/debit cards issued in India and 21 other countries, but please ensure the delivery address is in India.'
                ) }} />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaHeadset className="text-green-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#306D29] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleSection(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 ml-4">
                      {expandedSection === faq.id ? (
                        <FaChevronUp className="text-[#306D29]" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </span>
                  </button>
                  {expandedSection === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold">Need Help?</h4>
                <p className="text-sm opacity-90 mt-1">
                  Our support team is here to help with any questions
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <FaPhone /> Call Support
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                  <FaEnvelope /> Email Us
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                  <FaWhatsapp /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-lg" />
            Fast Delivery
          </span>
          <span className="flex items-center gap-2">
            <FaUndo className="text-[#306D29] text-lg" />
            Easy Returns
          </span>
          <span className="flex items-center gap-2">
            <FaTruck className="text-green-500 text-lg" />
            Free Shipping*
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

export default ShippingAndReturn;