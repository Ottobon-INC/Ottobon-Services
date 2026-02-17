import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function PSO() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero banner slides
  const heroSlides = [
    {
      title: "Professional Services Org",
      subtitle: "Empowering experts with AI-powered operational support",
      icon: "💼",
      imagePath: "/images/consulting-team.jpg",
      gradient: "from-indigo-900/80 to-purple-900/80"
    },
    {
      title: "End-to-End Business Support",
      subtitle: "From pre-sales to invoicing, we've got your back office covered",
      icon: "🔄",
      imagePath: "/images/business-meeting.jpg",
      gradient: "from-blue-900/80 to-purple-900/80"
    },
    {
      title: "Focus On Your Expertise",
      subtitle: "Let our AI handle the routine tasks while you deliver client value",
      icon: "🚀",
      imagePath: "/images/ai-automation.jpg",
      gradient: "from-emerald-900/80 to-blue-900/80"
    }
  ];
  
  // Service offerings data
  const services = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      details: "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs that match your company's expertise and target market.",
      features: [
        'AI-powered proposal builder that learns your style',
        'Solution architecture sketches and diagrams',
        'Automated pricing recommendations based on market data',
        'Customizable templates for different industries',
        'Integration with CRM systems for lead tracking'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Visibility',
      icon: '📣',
      color: 'from-purple-600 to-pink-600',
      description: 'Maintain a professional presence with minimal effort',
      details: "Automated content creation that maintains your professional voice while requiring minimal time investment, helping consultants stay visible in their industry and attract new business opportunities.",
      features: [
        'AI-generated social media content customized to your brand',
        'Thought leadership articles on trending industry topics',
        'Email newsletter campaigns with performance analytics', 
        'SEO optimization for consultant profiles and websites',
        'Content calendar management and scheduling'
      ]
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      details: "Our AI project management tools handle routine tasks and documentation, allowing consultants to focus on high-value activities like client strategy and relationship management.",
      features: [
        'AI-powered task management integrated with popular tools',
        'Automated status reports and client updates',
        'Risk identification and mitigation suggestions',
        'Document generation for project deliverables',
        'Resource allocation and timeline optimization'
      ]
    }
  ];
  
  // Audience segments
  const audiences = [
    {
      title: 'Independent Consultants',
      icon: '👤',
      color: 'from-blue-600 to-indigo-600',
      description: 'Operate like a larger firm without the overhead',
      benefits: [
        'Professional back-office support without hiring staff',
        'Focus on your expertise while AI handles operations',
        'Present a polished, professional image to clients',
        'Compete with larger firms on service and quality'
      ]
    },
    {
      title: 'Small Consulting Firms',
      icon: '👥',
      color: 'from-purple-600 to-pink-600',
      description: 'Scale operations without proportional headcount',
      benefits: [
        'Accelerate growth with operational efficiency',
        'Maintain consistent quality across all functions',
        'Focus your team on billable client work',
        'Reduce administrative costs while improving service'
      ]
    },
    {
      title: 'Mid-Size Practices',
      icon: '🏢',
      color: 'from-emerald-600 to-cyan-600',
      description: 'Selective function augmentation for optimal efficiency',
      benefits: [
        'Augment specific departments during peak demand',
        'Modular services that integrate with existing systems',
        'Reduce operational costs while improving service',
        'Enterprise-grade capabilities without enterprise overhead'
      ]
    }
  ];
  
  // Toggle card expansion
  const toggleCard = (id: string) => {
    console.log('Toggling card:', id);
    setExpandedCards(prev => {
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      console.log('New state:', newState);
      return newState;
    });
  };
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-20" />
            <h1 className="text-xl font-bold ml-0">OTTOBON</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {/* Navigation links could be added here if needed */}
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button could be added here if needed */}
          </div>
        </div>
      </header>

      <main className="pt-16 pb-16">
        {/* Container for all sections */}
        <div className="container mx-auto px-4">
          {/* Hero Banner with Multiple Images */}
          <section className="mb-6">
            <div className="relative rounded-xl overflow-hidden" style={{height: "400px"}}>
              {heroSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Background image with gradient overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.imagePath})` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
                  </div>
                  
                  {/* Content container */}
                  <div className="relative h-full px-6 py-12 flex items-center">
                    {/* Icon on left */}
                    <div className="hidden md:flex items-center justify-center w-1/4">
                      <div className="relative w-28 h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 z-10">
                        <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-white/5 to-white/10 blur-xl"></div>
                        <div className="text-5xl relative z-10" style={{ animation: 'icon-float 3s ease-in-out infinite' }}>{slide.icon}</div>
                      </div>
                    </div>
                    
                    {/* Text in middle */}
                    <div className="w-full md:w-2/4 md:text-center">
                      <h1 className="text-4xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <p className="text-xl text-white/90 mb-6">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex flex-wrap md:justify-center gap-3">
                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                    
                    {/* Image area on right */}
                    <div className="hidden md:block w-1/4"></div>
                  </div>
                </div>
              ))}
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button 
                onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
                className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </section>
          
          {/* Overview Section */}
          <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-300 mb-4">
              The Ottobon Professional Services Organization (PSO) provides consultants with comprehensive operational and administrative support powered by advanced AI and expert human assistance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-indigo-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Operational Excellence</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Our AI agents handle administrative tasks with greater speed and consistency than human staff.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-purple-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Human-AI Collaboration</h3>
                </div>
                <p className="text-sm text-gray-400">
                  For complex tasks, our expert human team works seamlessly with AI systems.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-cyan-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Flexible Service Model</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Choose AI-only automation or add human expertise based on your needs.
                </p>
              </div>
            </div>
          </section>
          
          {/* Services Section */}
          <section className="bg-purple-900/20 rounded-xl p-6 border border-purple-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Our Service Offerings</h2>
            <p className="text-gray-300 mb-4">
              Each service combines AI automation with optional human support, allowing you to choose the right balance for your needs.
            </p>
            
            {/* Carousel Navigation */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Our Services</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const container = document.getElementById('services-carousel');
                    if (container) {
                      container.scrollBy({ left: -320, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    const container = document.getElementById('services-carousel');
                    if (container) {
                      container.scrollBy({ left: 320, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Carousel of Services */}
            <div 
              id="services-carousel"
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="min-w-[280px] md:min-w-[320px] h-[400px] flex-shrink-0 snap-start"
                >
                  <div className="h-full w-full relative">
                    {/* Front of card */}
                    <div 
                      className={`absolute inset-0 bg-white/5 rounded-xl border border-white/20 shadow-xl flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                        expandedCards[service.id] ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                      onClick={() => toggleCard(service.id)}
                      style={{
                        animation: expandedCards[service.id] ? 'none' : 'soft-glow 3s infinite ease-in-out'
                      }}
                    >
                      <div 
                        className={`bg-gradient-to-r ${service.color} p-5 flex items-center`}
                        style={{
                          backgroundSize: '200% 200%',
                          animation: 'gradient-shift 3s ease infinite'
                        }}
                      >
                        <div 
                          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4"
                          style={{ animation: 'icon-float 3s ease-in-out infinite' }}
                        >
                          <span className="text-4xl">{service.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-lg text-gray-200 mb-4">{service.description}</p>
                        
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-indigo-400 text-sm">Click to see details</span>
                          <div className="animate-bounce">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div 
                      className={`absolute inset-0 bg-gray-800 rounded-xl border border-white/10 shadow-xl p-6 flex flex-col transition-all duration-300 ${
                        expandedCards[service.id] ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                      }`}
                      onClick={() => toggleCard(service.id)}
                      style={{
                        animation: expandedCards[service.id] ? 'card-pulse 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <button 
                          className="bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all duration-300 hover:scale-110"
                          style={{ animation: expandedCards[service.id] ? 'gentle-wiggle 2s ease-in-out infinite' : 'none' }}
                        >
                          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="overflow-y-auto flex-1 pr-1">
                        <p className="text-gray-300 mb-4 text-sm">{service.details}</p>
                        
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-indigo-400 mb-2">Key Features</h4>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Audience Section */}
          <section className="bg-emerald-900/20 rounded-xl p-6 border border-emerald-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Who We Serve</h2>
            <p className="text-gray-300 mb-4">
              Our flexible service model adapts to different consulting business models and scales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {audiences.map((audience, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto`}>
                    <span className="text-3xl">{audience.icon}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-center">{audience.title}</h3>
                  <p className="text-gray-400 mb-4 text-center">{audience.description}</p>
                  
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-sm text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-900 py-4 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center text-white">
                <span className="text-xl mr-2">🤖</span>
                <span className="font-bold text-lg">OTTOBON</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Professional Services Organization</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} Ottobon Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}