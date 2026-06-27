import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaPaperPlane,
  FaHeadset,
  FaPinterest,
  FaLock,
  FaSpinner
} from "react-icons/fa";
import { MdVerified, MdEmail } from "react-icons/md";
import image1 from '../assets/images/contactimage.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    { id: 1, icon: FaEnvelope, title: 'Email Us', detail: 'support@glamorous.com', subDetail: 'We reply within 24 hours', color: 'from-blue-500 to-blue-600' },
    { id: 2, icon: FaPhone, title: 'Call Us', detail: '+91 98765 43210', subDetail: 'Mon-Fri 9AM - 6PM', color: 'from-green-500 to-green-600' },
    { id: 3, icon: FaWhatsapp, title: 'WhatsApp', detail: '+91 98765 43211', subDetail: 'Quick support on WhatsApp', color: 'from-green-600 to-green-700' },
    { id: 4, icon: FaMapMarkerAlt, title: 'Visit Us', detail: 'London, UK', subDetail: '123 Fashion Street, London', color: 'from-red-500 to-red-600' }
  ];

  const socialLinks = [
    { icon: FaInstagram, label: 'Instagram', color: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500' },
    { icon: FaFacebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaYoutube, label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: FaLinkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaPinterest, label: 'Pinterest', color: 'hover:bg-red-500' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7E1B1] via-[#FBF5DD] to-[#E7E1B1] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-[#306D29] transition-colors">
            <FaHome className="text-xs" />
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaHeadset className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Contact <span className="text-[#306D29]">Us</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for any questions or support.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div
                key={info.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className={`inline-flex p-3 bg-gradient-to-r ${info.color} rounded-full text-white mb-3`}>
                  <Icon className="text-xl" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">{info.title}</h4>
                <p className="text-xs text-[#306D29] font-medium mt-1">{info.detail}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{info.subDetail}</p>
              </div>
            );
          })}
        </div>

        {/* Main Contact Form Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side - Image */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img src={image1} alt="Contact Us" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#306D29]/40 to-[#4CAF50]/40 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <FaHeadset className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold">We're Here to Help</h3>
                  <p className="text-sm opacity-90 max-w-xs mx-auto mt-2">
                    Our team is available 24/7 to assist you
                  </p>
                  <div className="flex justify-center gap-6 mt-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <FaCheckCircle className="text-green-300" /> Quick Response
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCheckCircle className="text-green-300" /> Expert Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaPaperPlane className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-600 text-3xl" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Message Sent! 🎉</h4>
                  <p className="text-green-700 mt-2 text-sm">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                          errors.name 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-[#306D29] focus:ring-2 focus:ring-green-100'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                          errors.email 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-[#306D29] focus:ring-2 focus:ring-green-100'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                          errors.phone 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-[#306D29] focus:ring-2 focus:ring-green-100'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <div className="relative">
                      <FaComment className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#306D29] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-3 border rounded-xl outline-none transition-all resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#306D29] focus:ring-2 focus:ring-green-100'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-[#306D29] to-[#4CAF50] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Connect With Us</h3>
            <p className="text-sm text-gray-500 mt-1">Follow us on social media for the latest updates</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 ${social.color} transition-all duration-300 hover:text-white hover:shadow-lg hover:-translate-y-1`}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium">{social.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-center text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <MdVerified className="text-green-500 text-lg" />
            24/7 Support
          </span>
          <span className="flex items-center gap-2">
            <FaHeadset className="text-[#306D29] text-lg" />
            Expert Team
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500 text-lg" />
            Quick Response
          </span>
          <span className="flex items-center gap-2">
            <FaLock className="text-green-500 text-lg" />
            Secure Communication
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;