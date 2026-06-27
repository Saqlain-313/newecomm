import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaGlobe,
  FaUsers,
  FaHeart,
  FaStar,
  FaTrophy,
  FaRocket,
  FaPalette,
  FaShoppingBag,
  FaAward,
  FaChartLine,
  FaBriefcase,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowRight,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaCheckCircle,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaHandshake
} from "react-icons/fa";
import { MdVerified, MdOutlineLocationOn } from "react-icons/md";
import image1 from '../assets/images/aboutimage.jpg';

const About = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAnimateStats(true);
  }, []);

  // Company stats
  const stats = [
    { id: 1, value: '2007', label: 'Founded', icon: FaTrophy },
    { id: 2, value: '30+', label: 'Countries', icon: FaGlobe },
    { id: 3, value: '4000+', label: 'Retail Doors', icon: FaShoppingBag },
    { id: 4, value: '50+', label: 'Global Partners', icon: FaHandshake }
  ];

  // Brand values
  const values = [
    {
      id: 1,
      icon: FaHeart,
      title: 'Customer First',
      description: 'Our customers remain at the heart of everything we do',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      icon: FaPalette,
      title: 'Innovation',
      description: 'Pushing boundaries and defining fashion trends',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 3,
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Present in over 30 countries worldwide',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      icon: FaStar,
      title: 'Quality',
      description: 'Committed to delivering excellence',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: FaInstagram, label: 'Instagram', color: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500' },
    { icon: FaFacebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaYoutube, label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: FaTiktok, label: 'TikTok', color: 'hover:bg-black' },
    { icon: FaPinterest, label: 'Pinterest', color: 'hover:bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-[#306D29] transition-colors">
            <FaHome className="text-xs" />
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">About Us</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaInfoCircle className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                About <span className="text-[#306D29]">Us</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Discover the story behind Glamorous - where fashion meets innovation
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-br from-[#306D29] to-[#4CAF50] rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white text-lg" />
                  </div>
                </div>
                <p className={`text-2xl md:text-3xl font-bold text-[#306D29] transition-all duration-1000 ${animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Hero Image Section */}
          <div className="relative h-64 md:h-96 bg-gradient-to-r from-[#306D29] to-[#4CAF50] overflow-hidden">
            <img
              src={image1}
              alt="About Glamorous"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Story</h2>
                <p className="text-sm md:text-base opacity-90 max-w-2xl">
                  Established in 2007, Glamorous has become a leading womenswear brand worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            
            {/* Brand Story */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#306D29]/10 rounded-lg">
                  <FaQuoteLeft className="text-[#306D29] text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Journey</h3>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base md:text-lg">
                  Established in <span className="font-semibold text-[#306D29]">2007</span> in the U.K, 
                  Glamorous has experienced phenomenal growth becoming one of the leading womenswear 
                  brands on the UK and International Markets.
                </p>
                <p className="text-base md:text-lg">
                  Our roots may be British, but today we're truly a <span className="font-semibold text-[#306D29]">global brand</span>. 
                  Glamorous can be found in over <span className="font-semibold text-[#306D29]">30 countries</span> 
                  throughout the world including the U.S.A, Canada, Australia, Russia, Italy and Germany.
                </p>
                <p className="text-base md:text-lg">
                  We partner with some of the best retailers globally and can be found in more than 
                  <span className="font-semibold text-[#306D29]"> 4,000 retail doors</span> worldwide.
                </p>
              </div>
            </div>

            {/* Our Brand Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaPalette className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Brand</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.id}
                      className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{value.title}</h4>
                          <p className="text-sm opacity-90 mt-1">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Our Philosophy */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaUsers className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Philosophy</h3>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#306D29]">
                  <p className="text-base md:text-lg italic">
                    "Our customers remain at the heart of everything we do, with social media, 
                    pop culture and influencers informing our design direction."
                  </p>
                </div>
                <p className="text-base md:text-lg">
                  Created for fearless females, Glamorous girls aren't afraid to make and break 
                  the fashion rules.
                </p>
                <p className="text-base md:text-lg">
                  We believe fashion should be <span className="font-semibold text-[#306D29]">individual and accessible</span>. 
                  Our website is updated with fresh new lines daily to make sure you're always up 
                  to date with the latest styles.
                </p>
                <p className="text-base md:text-lg">
                  Using innovative fabrics, exciting prints and beautiful silhouettes we offer 
                  <span className="font-semibold text-[#306D29]"> must-wear styles</span> at affordable prices.
                </p>
              </div>
            </div>

            {/* Design Team */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaRocket className="text-orange-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Design Team</h3>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p className="text-base md:text-lg">
                    Our expert design team travels the globe to discover emerging trends that 
                    define the season.
                  </p>
                  <p className="text-base md:text-lg">
                    Back at HQ, inspiration is translated into the <span className="font-semibold text-[#306D29]">directional designs</span> 
                    our customers demand.
                  </p>
                  <p className="text-base md:text-lg">
                    Pushing the boundaries of fashion to the high street, our designers work 
                    closely with in-house buying and merchandising teams to bring you 
                    <span className="font-semibold text-[#306D29]"> tomorrow's trends today</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <FaInstagram className="text-pink-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Connect With Us</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 ${social.color} transition-all duration-300 hover:text-white hover:shadow-lg hover:-translate-y-1`}
                    >
                      <Icon className="text-lg" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaAward className="text-[#306D29] text-lg" />
                <span>Award-winning fashion brand trusted by millions worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-3xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Join the Glamorous Family</h3>
              <p className="text-sm opacity-90 mt-1">Be part of our global community of fashion lovers</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Shop Now <FaArrowRight />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                <FaHeart /> Follow Us
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500" />
            Trusted Brand
          </span>
          <span className="flex items-center gap-2">
            <FaGlobe className="text-[#306D29]" />
            Global Presence
          </span>
          <span className="flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Made with Love
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Quality Assured
          </span>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;