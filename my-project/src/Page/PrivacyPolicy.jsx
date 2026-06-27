import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaCookie,
  FaLink,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowRight,
  FaDatabase,
  FaUserShield,
  FaServer,
  FaGlobe,
  FaFileAlt,
  FaPrint,
  FaDownload,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShieldVirus
} from "react-icons/fa";
import { MdVerified, MdSecurity, MdPrivacyTip } from "react-icons/md";

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'intro', title: 'Introduction', icon: FaInfoCircle },
    { id: 'collection', title: 'What We Collect', icon: FaDatabase },
    { id: 'usage', title: 'How We Use Information', icon: FaServer },
    { id: 'security', title: 'Security', icon: FaLock },
    { id: 'cookies', title: 'Cookies', icon: FaCookie },
    { id: 'links', title: 'External Links', icon: FaLink },
    { id: 'control', title: 'Your Rights', icon: FaUserShield }
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
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaShieldAlt className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Privacy <span className="text-[#306D29]">Policy</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaShieldAlt className="text-green-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">100%</p>
            <p className="text-xs text-gray-500">Data Protected</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaLock className="text-blue-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">256-bit</p>
            <p className="text-xs text-gray-500">Encryption</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MdPrivacyTip className="text-purple-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">GDPR</p>
            <p className="text-xs text-gray-500">Compliant</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaUserShield className="text-orange-600 text-lg" />
            </div>
            <p className="text-xl font-bold text-gray-800">24/7</p>
            <p className="text-xs text-gray-500">Monitoring</p>
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

          {/* Introduction */}
          <div className="mb-8" id="intro">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MdPrivacyTip className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Last Updated:</strong> January 2024
                </p>
              </div>
              
              <p dangerouslySetInnerHTML={{ __html: highlightText(
                'This privacy policy sets out how this website (hereafter "the Store") uses and protects any information that you give the Store while using this website. The Store is committed to ensuring that your privacy is protected.'
              ) }} />
              
              <p dangerouslySetInnerHTML={{ __html: highlightText(
                'Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.'
              ) }} />
              
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800 flex items-start gap-2">
                  <FaInfoCircle className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>The Store may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</span>
                </p>
              </div>
            </div>
          </div>

          {/* What We Collect */}
          <div className="mb-8" id="collection">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaDatabase className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">What We Collect</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>We may collect the following information:</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUserSecret className="text-[#306D29]" />
                    <h4 className="font-semibold text-gray-800">Personal Information</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Name
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Contact information including email address
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Demographic information (postcode, preferences, interests)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCookie className="text-[#306D29]" />
                    <h4 className="font-semibold text-gray-800">Cookies & Tracking</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Traffic log cookies
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Website usage statistics
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Preferences and interests
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> For the exhaustive list of cookies we collect, see the List of cookies we collect section.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-8" id="usage">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaServer className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="text-green-600" />
                    <h4 className="font-semibold text-green-800">Internal Use</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Internal record keeping</li>
                    <li>• Improve our products and services</li>
                    <li>• Customise website according to your interests</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaEnvelope className="text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Communication</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Promotional emails about new products</li>
                    <li>• Special offers and information</li>
                    <li>• Market research purposes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-8" id="security">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaLock className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Security</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <FaShieldVirus className="text-red-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 text-lg">Your Data is Safe</h4>
                    <p className="text-red-700 mt-2">
                      We are committed to ensuring that your information is secure. In order to prevent 
                      unauthorised access or disclosure, we have put in place suitable physical, electronic 
                      and managerial procedures to safeguard and secure the information we collect online.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <FaLock className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Physical Security</h5>
                  <p className="text-xs text-gray-600">Secure facilities and access control</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <FaServer className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Electronic Security</h5>
                  <p className="text-xs text-gray-600">256-bit encryption and firewalls</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <FaUserShield className="text-[#306D29] text-2xl mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-800 text-sm">Managerial Procedures</h5>
                  <p className="text-xs text-gray-600">Regular security audits and training</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-8" id="cookies">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaCookie className="text-yellow-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">How We Use Cookies</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>What is a Cookie?</strong> A cookie is a small file which asks permission to be placed 
                  on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse 
                  web traffic or lets you know when you visit a particular site.
                </p>
              </div>

              <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Cookie Benefits</h4>
                    <ul className="space-y-1 text-sm text-gray-600 mt-1">
                      <li>• Help us provide you with a better website</li>
                      <li>• Monitor which pages you find useful</li>
                      <li>• No access to your computer or personal data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Cookie Control:</strong> You can choose to accept or decline cookies. Most web browsers 
                  automatically accept cookies, but you can usually modify your browser setting to decline cookies 
                  if you prefer. This may prevent you from taking full advantage of the website.
                </p>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="mb-8" id="links">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaLink className="text-indigo-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Links to Other Websites</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-indigo-500 text-xl flex-shrink-0 mt-1" />
                  <p className="text-sm text-indigo-800">
                    Our website may contain links to other websites of interest. However, once you have used 
                    these links to leave our site, you should note that we do not have any control over that 
                    other website. Therefore, we cannot be responsible for the protection and privacy of any 
                    information which you provide whilst visiting such sites and such sites are not governed 
                    by this privacy statement. You should exercise caution and look at the privacy statement 
                    applicable to the website in question.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-8" id="control">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaUserShield className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Controlling Your Personal Information</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Your Rights</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Opt-out of direct marketing communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Request access to your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Correct or update your information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Request deletion of your data</span>
                  </li>
                </ul>
              </div>

              <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Data Access Request:</strong> You may request details of personal information which we hold 
                  about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy 
                  of the information held on you please email us this request using our Contact Us information.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Data Correction:</strong> If you believe that any information we are holding on you is 
                  incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct 
                  any information found to be incorrect.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold">Have Questions?</h4>
                  <p className="text-sm opacity-90 mt-1">
                    Contact our privacy team for any concerns about your data
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:privacy@glamorous.com"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <FaEnvelope /> privacy@glamorous.com
                  </a>
                  <Link to='/contact' className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                    <FaPhone /> Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-lg" />
            GDPR Compliant
          </span>
          <span className="flex items-center gap-2">
            <FaLock className="text-[#306D29] text-lg" />
            256-bit SSL
          </span>
          <span className="flex items-center gap-2">
            <FaShieldAlt className="text-green-500 text-lg" />
            Data Protected
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500 text-lg" />
            Regular Audits
          </span>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            * This privacy policy is effective from January 2024. We reserve the right to update this policy at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;