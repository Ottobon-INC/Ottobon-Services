import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ServicesContent() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});

  // Toggle card expansion
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Service data
  const services = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      features: [
        'Proposal Builder AI Agent',
        'Solution Architecture Sketches',
        'Pricing Strategy Recommendations'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Visibility',
      icon: '📣',
      color: 'from-purple-600 to-pink-600',
      description: 'Maintain a professional presence with minimal effort',
      features: [
        'Social Media Content Generation',
        'Thought Leadership Articles',
        'Email Newsletter Campaigns'
      ]
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      features: [
        'Task AI Agent for Jira/Asana',
        'Automated Status Updates',
        'Risk Identification'
      ]
    },
    {
      id: 'admin',
      title: 'Admin & Billing',
      icon: '📊',
      color: 'from-rose-600 to-red-600',
      description: 'Automated back-office operations for consultants',
      features: [
        'Automated Invoice Generation',
        'Contract Management',
        'Expense Tracking'
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
        'Present a polished, professional image to clients'
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
        'Focus your team on billable client work'
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
        'Reduce operational costs while improving service'
      ]
    }
  ];

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

  // State for hero banner
  const [currentSlide, setCurrentSlide] = useState(0);

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
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-10 sm:h-14 md:h-20 w-auto" />
            <h1 className="text-lg sm:text-xl font-bold ml-0">OTTOBON</h1>
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
        {/* Hero Banner with Multiple Images */}
        <section className="relative h-auto overflow-hidden container mx-auto px-4">
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
                  <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-xl text-white/90 mb-6">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Icon display */}
                  <div className="hidden md:flex items-center justify-center w-1/2">
                    <div className="relative w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 z-10">
                      <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-white/5 to-white/10 blur-xl"></div>
                      <div className="text-7xl relative z-10">{slide.icon}</div>
                    </div>
                  </div>
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

        <div className="container mx-auto px-4">
          {/* Overview Section */}
          <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mt-6 mb-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => toggleCard(service.id)}
                  >
                    <div className={`bg-gradient-to-r ${service.color} p-3 flex items-center`}>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">{service.icon}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm flex-1">{service.title}</h3>
                      <button className="text-white/80 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={expandedCards[service.id] ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-300">{service.description}</p>

                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedCards[service.id] ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="bg-white/5 rounded-lg p-3">
                          <h4 className="text-xs font-medium text-white/90 mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start text-xs">
                                <svg className="w-3 h-3 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={`mt-2 text-xs font-medium text-center text-indigo-400 ${
                        expandedCards[service.id] ? 'hidden' : 'block'
                      }`}>
                        Click for details
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
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-full mb-3 bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto`}>
                    <span className="text-2xl">{audience.icon}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-center">{audience.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 text-center">{audience.description}</p>

                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-xs text-gray-300">{benefit}</p>
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