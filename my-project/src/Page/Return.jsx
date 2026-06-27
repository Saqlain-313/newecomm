import React, { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
  FaExchangeAlt,
  FaUndo,
  FaTimes,
  FaCheck,
  FaClock,
  FaTruck,
  FaMoneyBillWave,
  FaInfoCircle,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaPrint,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTags,
  FaGift,
  FaStore
} from "react-icons/fa";
import { MdVerified, MdSecurity } from "react-icons/md";

const Return = () => {
  const [activeSection, setActiveSection] = useState('cancellation');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      id: 1,
      question: 'How long does it take to process a return?',
      answer: 'Returns are typically processed within 3-5 business days after we receive the returned item. You will receive a confirmation email once your return is processed.'
    },
    {
      id: 2,
      question: 'Do I have to pay for return shipping?',
      answer: 'Return shipping costs vary depending on the reason for return. If the return is due to a defective product or our error, we will cover the shipping costs. For other returns, the customer is responsible for return shipping fees.'
    },
    {
      id: 3,
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, we offer exchanges for most products. You can initiate an exchange through your account dashboard. If the desired size/color is available, we will process the exchange immediately.'
    },
    {
      id: 4,
      question: 'What items are not eligible for return?',
      answer: 'Items that are not eligible for return include: perishable goods, custom or personalized items, intimate apparel, and items marked as "Final Sale" on the product page.'
    },
    {
      id: 5,
      question: 'How will I receive my refund?',
      answer: 'Refunds are issued to the original payment method used for the purchase. For cash on delivery orders, refunds are processed via bank transfer or store credit, as per your preference.'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
                Returns & Cancellation
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            We want you to love your purchase. Here's everything you need to know about returns, cancellations, and refunds.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaClock className="text-green-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">30 Days</p>
            <p className="text-xs text-gray-500">Return Window</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaTruck className="text-blue-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">Free</p>
            <p className="text-xs text-gray-500">Return Shipping*</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaMoneyBillWave className="text-purple-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">5-7 Days</p>
            <p className="text-xs text-gray-500">Refund Processing</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaExchangeAlt className="text-orange-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">Easy</p>
            <p className="text-xs text-gray-500">Exchange Process</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-1 mb-8">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'cancellation', label: 'Cancellation Policy', icon: FaTimes },
              { id: 'returns', label: 'Returns Policy', icon: FaUndo },
              { id: 'faq', label: 'FAQ', icon: FaQuestionCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
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
          
          {/* Cancellation Policy */}
          {activeSection === 'cancellation' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-full">
                  <FaTimes className="text-red-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Cancellation Policy</h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
                  <p className="text-sm font-medium text-red-800">
                    ⏰ The customer can choose to cancel an order any time before it's dispatched. 
                    The order cannot be canceled once it's out for delivery. However, the customer 
                    may choose to reject it at the doorstep.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaClock className="text-[#306D29]" />
                      Time Window
                    </h4>
                    <p className="text-sm text-gray-600">
                      The time window for cancellation varies based on different categories and 
                      the order cannot be canceled once the specified time has passed.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaMoneyBillWave className="text-[#306D29]" />
                      Cancellation Fee
                    </h4>
                    <p className="text-sm text-gray-600">
                      In some cases, the customer may not be allowed to cancel the order for free, 
                      post the specified time and a cancellation fee will be charged.
                    </p>
                  </div>
                </div>

                <p>
                  In case of any cancellation from the seller due to unforeseen circumstances, 
                  a full refund will be initiated for prepaid orders.
                </p>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Glamorous reserves the right to accept the cancellation 
                    of any order. Glamorous also reserves the right to waive off or modify the 
                    time window or cancellation fee from time to time.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 pt-4 flex items-center gap-2">
                  <FaTruck className="text-[#306D29]" />
                  Cancellation Policy - Hyperlocal
                </h3>

                <p>
                  The Orders placed by you on the Platform are non-cancellable and non-refundable 
                  via self serve under MINUTES delivery option owing to quick delivery times, 
                  except if cancellation/refund is requested via CX Agent.
                </p>

                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Circumstances for Cancellation:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>The Order could not be delivered within the estimated time that was displayed while placing the order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>The Order has not been picked by the Delivery Partner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>The Seller has not accepted or has canceled the Order due to reasons not attributable to You</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Easy Doorstep Cancellation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Any other reason that the Platform may update from time to time</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Refund Timeline:</strong> Any payments you have already made will be 
                    promptly refunded within 5-7 business days for any cancellations. You can track 
                    the status of your refund on the Order Details page/section.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Returns Policy */}
          {activeSection === 'returns' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FaUndo className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Returns Policy</h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-800">
                    Returns is a scheme provided by respective sellers directly under this policy 
                    in terms of which the option of exchange, replacement and/ or refund is offered 
                    by the respective sellers to you.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> All products listed under a particular category may 
                    not have the same returns policy. For all products, the returns/replacement 
                    policy provided on the product page shall prevail over the general returns policy.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                    <FaExchangeAlt className="text-2xl text-green-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800">Exchange</h5>
                    <p className="text-xs text-gray-600">Same product in different size/color</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <FaCheck className="text-2xl text-blue-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800">Replacement</h5>
                    <p className="text-xs text-gray-600">Defective or damaged products</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                    <FaMoneyBillWave className="text-2xl text-purple-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800">Refund</h5>
                    <p className="text-xs text-gray-600">Full refund to original payment method</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-[#306D29]" />
                    Key Points to Remember
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>The return policy is divided into three parts; Do read all sections carefully to understand the conditions and cases under which returns will be accepted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Do refer to the respective item's applicable return/replacement policy on the product page for any exceptions to this returns policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Items must be returned in their original condition with tags and packaging intact</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-sm text-red-800">
                    <strong>Non-Returnable Items:</strong> Perishable goods, custom or personalized 
                    items, intimate apparel, and items marked as "Final Sale" are not eligible for return.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FaQuestionCircle className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#306D29] transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-sm md:text-base">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 ml-4">
                        {expandedFaq === faq.id ? (
                          <FaChevronUp className="text-[#306D29]" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </span>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="p-4 bg-gray-50 border-t border-gray-100 animate-slideDown">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl text-white">
                <h4 className="text-lg font-semibold mb-2">Still have questions?</h4>
                <p className="text-sm opacity-90 mb-4">
                  Our support team is here to help. Contact us anytime!
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm">
                    <FaPhone /> Call Support
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm">
                    <FaEnvelope /> Email Us
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm">
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
          <div className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <MdSecurity className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">Protected Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGift className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStore className="text-green-500 text-xl" />
            <span className="text-sm text-gray-600">Trusted Sellers</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            * Policies are subject to change. Please check the product page for specific return policies.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Return;