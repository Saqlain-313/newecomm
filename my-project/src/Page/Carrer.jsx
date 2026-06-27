import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaHeart,
  FaStar,
  FaRocket,
  FaTrophy,
  FaLightbulb,
  FaHandshake,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaQuoteLeft,
  FaQuoteRight,
  FaGraduationCap,
  FaTree,
  FaCoffee,
  FaGift,
  FaSmile,
  FaCalendarAlt,
  FaGlobe,
  FaBuilding,
  FaGlassCheers
} from "react-icons/fa";
import { MdVerified, MdOutlineLocationOn } from "react-icons/md";

const Carrer = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAnimateStats(true);
  }, []);

  // Company benefits
  const benefits = [
    { id: 1, icon: FaCoffee, title: 'Free Coffee & Snacks', description: 'Stay energized with unlimited coffee and healthy snacks' },
    { id: 2, icon: FaGraduationCap, title: 'Learning & Development', description: 'Continuous learning opportunities and skill development' },
    { id: 3, icon: FaGift, title: 'Employee Discounts', description: 'Generous discounts on all Glamorous products' },
    { id: 4, icon: FaGlassCheers, title: 'Team Celebrations', description: 'Regular team events, parties, and celebrations' },
    { id: 5, icon: FaTree, title: 'Work-Life Balance', description: 'Flexible working hours and remote work options' },
    { id: 6, icon: FaSmile, title: 'Positive Culture', description: 'Fun, inclusive, and supportive work environment' }
  ];

  // Company values
  const values = [
    { id: 1, icon: FaHeart, title: 'Passion', description: 'We love what we do and it shows in our work' },
    { id: 2, icon: FaRocket, title: 'Innovation', description: 'We push boundaries and challenge the status quo' },
    { id: 3, icon: FaUsers, title: 'Collaboration', description: 'We achieve more together as one team' },
    { id: 4, icon: FaStar, title: 'Excellence', description: 'We strive for the highest quality in everything' }
  ];

  // Open positions (mock data)
  const openPositions = [
    { id: 1, title: 'Senior Fashion Designer', department: 'Design', location: 'London, UK', type: 'Full-time' },
    { id: 2, title: 'Marketing Manager', department: 'Marketing', location: 'London, UK', type: 'Full-time' },
    { id: 3, title: 'E-commerce Specialist', department: 'Digital', location: 'Remote', type: 'Full-time' },
    // { id: 4, title: 'UX/UI Designer', department: 'Design', location: 'London, UK', type: 'Full-time' },
    // { id: 5, title: 'Social Media Executive', department: 'Marketing', location: 'London, UK', type: 'Full-time' },
    // { id: 6, title: 'Supply Chain Analyst', department: 'Operations', location: 'London, UK', type: 'Full-time' }
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
          <span className="text-gray-800 font-medium">Careers</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaBriefcase className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Work With <span className="text-[#306D29]">Us</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Join our amazing team and be part of something extraordinary
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-3xl p-8 md:p-10 text-white mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm">
                <FaHeart className="text-pink-300" />
                <span>We're Hiring!</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Join the Glamorous Family
              </h2>
              <p className="text-sm opacity-90 max-w-lg">
                Be part of a dynamic team that's shaping the future of fashion
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                View Openings <FaArrowRight />
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30">
                <FaEnvelope /> Contact HR
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10">
          
          {/* Welcome Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaSmile className="text-green-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Welcome to Glamorous Careers!</h3>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-base md:text-lg italic">
                  "We believe that Monday to Friday should be something to look forward to, 
                  and not just the weekend!"
                </p>
              </div>
              
              <p className="text-base md:text-lg">
                Here at Glamorous we believe that Monday to Friday should be something to look forward to, 
                and not just the weekend! We are dedicated to making the workday exciting and fulfilling 
                and strive for a work environment that empowers our employees to reach their full potential.
              </p>
              
              <p className="text-base md:text-lg">
                We think that a fun and engaging workplace really brings out the best in people. 
                From team building events to company-wide celebrations, we love to create an engaging 
                communal atmosphere across the whole company.
              </p>
            </div>
          </div>

          {/* Our Culture */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Culture</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FaRocket className="text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Work with Passion</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Our teams are passionate about their work, striving for creativity, and delivering high quality. 
                  The nature of our work means departments are always collaborating to achieve the best results.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaLightbulb className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Innovation First</h4>
                </div>
                <p className="text-sm text-gray-600">
                  We're committed to pushing the boundaries of what's possible and constantly challenging 
                  ourselves to be better. We're always looking for new ideas and fresh perspectives.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <FaHandshake className="text-green-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Join Our Team</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    When you join us, you'll be part of a large group of talented individuals who are 
                    dedicated to making a difference. We can't wait to hear from you!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaHeart className="text-red-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.id}
                    className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-[#306D29] to-[#4CAF50] rounded-full">
                        <Icon className="text-white text-xl" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800">{value.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaGift className="text-yellow-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Employee Benefits</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#306D29]/10 rounded-lg flex-shrink-0">
                        <Icon className="text-[#306D29] text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Open Positions</h3>
            </div>

            <div className="space-y-3">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#306D29] hover:shadow-md transition-all duration-300 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-[150px]">
                    <h4 className="font-semibold text-gray-800">{position.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <FaBuilding className="text-xs" /> {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" /> {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" /> {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#306D29] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold">Ready to Join Us?</h4>
                <p className="text-sm opacity-90 mt-1">
                  Get in touch for further information about what roles we are hiring for!
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:HR@glamorous.com"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FaEnvelope /> HR@glamorous.com
                </a>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                  <FaLinkedin /> LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500" />
            Great Place to Work
          </span>
          <span className="flex items-center gap-2">
            <FaUsers className="text-[#306D29]" />
            Diverse Team
          </span>
          <span className="flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Employee First
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Equal Opportunity
          </span>
        </div>
      </div>
    </div>
  );
};

export default Carrer;