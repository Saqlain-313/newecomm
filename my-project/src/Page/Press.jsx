import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaNewspaper,
  FaStar,
  FaCalendarAlt,
  FaArrowRight,
  FaShareAlt,
  FaBookmark,
  FaRegBookmark,
  FaEnvelope,
  FaDownload,
  FaAward,
  FaTrophy,
  FaUsers,
  FaGlobe,
  FaClock,
  FaEye,
  FaThumbsUp,
  FaComment,
  FaTag
} from "react-icons/fa";
import { MdVerified, MdOutlineNewspaper } from "react-icons/md";

const Press = () => {
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Press Categories
  const categories = [
    { id: 'featured', label: 'Featured', icon: FaStar, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'interviews', label: 'Interviews', icon: FaUsers, color: 'bg-blue-100 text-blue-700' },
    { id: 'awards', label: 'Awards', icon: FaTrophy, color: 'bg-purple-100 text-purple-700' },
    { id: 'events', label: 'Events', icon: FaCalendarAlt, color: 'bg-pink-100 text-pink-700' },
    { id: 'partnerships', label: 'Partnerships', icon: FaGlobe, color: 'bg-green-100 text-green-700' }
  ];

  // Press Releases Data
  const pressReleases = [
    {
      id: 1,
      title: 'Glamorous Announces Expansion into European Markets',
      excerpt: 'Leading fashion brand Glamorous announces strategic expansion into key European markets including France, Germany, and Italy.',
      category: 'featured',
      date: '2024-01-15',
      author: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop',
      publication: 'Vogue Business',
      readTime: '5 min read',
      views: 24500,
      likes: 1890,
      comments: 234,
      featured: true,
      tags: ['Expansion', 'Europe', 'Fashion']
    },
    {
      id: 2,
      title: 'Glamorous Wins Best Fashion Brand at UK Business Awards 2024',
      excerpt: 'Glamorous recognized for excellence in fashion innovation and sustainable practices at the prestigious UK Business Awards.',
      category: 'awards',
      date: '2024-01-10',
      author: 'Mike Thompson',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
      publication: 'Fashion Weekly',
      readTime: '3 min read',
      views: 18400,
      likes: 2100,
      comments: 156,
      featured: true,
      tags: ['Awards', 'Recognition', 'Sustainability']
    },
    {
      id: 3,
      title: 'Exclusive Interview: CEO Talks Future of Sustainable Fashion',
      excerpt: 'In an exclusive interview, our CEO discusses the future of sustainable fashion and Glamorous commitment to ethical practices.',
      category: 'interviews',
      date: '2024-01-05',
      author: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop',
      publication: 'Sustainable Fashion Magazine',
      readTime: '8 min read',
      views: 32000,
      likes: 2800,
      comments: 412,
      featured: false,
      tags: ['Sustainability', 'Interview', 'Leadership']
    },
    {
      id: 4,
      title: 'Glamorous Partners with Leading Tech Company for Digital Innovation',
      excerpt: 'Strategic partnership to revolutionize the online shopping experience through AI and machine learning technologies.',
      category: 'partnerships',
      date: '2024-01-02',
      author: 'David Chen',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
      publication: 'TechCrunch',
      readTime: '4 min read',
      views: 15600,
      likes: 1200,
      comments: 98,
      featured: false,
      tags: ['Partnership', 'Technology', 'Innovation']
    },
    {
      id: 5,
      title: 'Glamorous Hosts Exclusive Fashion Show in London',
      excerpt: 'Glamorous unveils its latest collection at a star-studded fashion show in London, attended by industry leaders and celebrities.',
      category: 'events',
      date: '2023-12-20',
      author: 'Lisa Parker',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=400&fit=crop',
      publication: 'Harper\'s Bazaar',
      readTime: '6 min read',
      views: 27800,
      likes: 2300,
      comments: 289,
      featured: false,
      tags: ['Fashion Show', 'London', 'Collection']
    },
    {
      id: 6,
      title: 'Glamorous Named Among Top 50 Fastest Growing Fashion Brands',
      excerpt: 'Glamorous secures position in the prestigious list of fastest growing fashion brands globally.',
      category: 'awards',
      date: '2023-12-15',
      author: 'Robert Martinez',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop',
      publication: 'Business Insider',
      readTime: '3 min read',
      views: 19800,
      likes: 1650,
      comments: 178,
      featured: false,
      tags: ['Growth', 'Recognition', 'Business']
    }
  ];

  // Press Stats
  const stats = [
    { label: 'Press Releases', value: '24', icon: FaNewspaper },
    { label: 'Media Mentions', value: '156', icon: FaShareAlt },
    { label: 'Industry Awards', value: '12', icon: FaAward },
    { label: 'Global Coverage', value: '30+', icon: FaGlobe }
  ];

  const toggleBookmark = (id) => {
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get category color
  const getCategoryColor = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.color : 'bg-gray-100 text-gray-700';
  };

  // Get category label
  const getCategoryLabel = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.label : categoryId;
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
          <span className="text-gray-800 font-medium">Press</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <MdOutlineNewspaper className="text-4xl text-[#306D29]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Press <span className="text-[#306D29]">Center</span>
              </h1>
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Latest news, announcements, and media coverage about Glamorous
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

        {/* Featured Press */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <FaStar className="text-yellow-500 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800">Featured Stories</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pressReleases.filter(item => item.featured).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-[#306D29] text-white text-xs px-3 py-1 rounded-full mb-2">
                      {item.publication}
                    </span>
                    <h3 className="text-white font-bold text-lg line-clamp-2">{item.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> Featured
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                  <div className="flex flex-wrap items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock /> {item.readTime}
                      </span>
                    </div>
                    <button className="text-[#306D29] font-medium text-sm hover:underline flex items-center gap-1">
                      Read More <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Press Releases */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaNewspaper className="text-[#306D29] text-xl" />
            <h2 className="text-2xl font-bold text-gray-800">All Press Releases</h2>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {pressReleases.length}
            </span>
          </div>

          <div className="space-y-4">
            {pressReleases.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-[#306D29] hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                      {item.featured && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FaStar className="text-[10px]" /> Featured
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{item.publication}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#306D29] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>
                    
                    <div className="flex flex-wrap items-center justify-between mt-3">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock /> {item.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye /> {item.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaThumbsUp /> {item.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment /> {item.comments}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(item.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {bookmarked[item.id] ? (
                            <FaBookmark className="text-[#306D29]" />
                          ) : (
                            <FaRegBookmark className="text-gray-400" />
                          )}
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <FaShareAlt className="text-gray-400" />
                        </button>
                        <button className="text-[#306D29] font-medium text-sm hover:underline flex items-center gap-1">
                          Read More <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FaTag className="text-[8px]" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Contact */}
        <div className="mt-8 bg-gradient-to-r from-[#306D29] to-[#4CAF50] rounded-3xl p-8 md:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Media Inquiries</h3>
              <p className="text-sm opacity-90 mt-1">
                For press inquiries, media kits, or interview requests
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#306D29] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                <FaEnvelope /> press@glamorous.com
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
            <FaNewspaper className="text-[#306D29] text-lg" />
            Verified News
          </span>
          <span className="flex items-center gap-2">
            <FaTrophy className="text-yellow-500 text-lg" />
            Award Winning
          </span>
          <span className="flex items-center gap-2">
            <FaUsers className="text-[#306D29] text-lg" />
            Global Audience
          </span>
        </div>
      </div>
    </div>
  );
};

export default Press;