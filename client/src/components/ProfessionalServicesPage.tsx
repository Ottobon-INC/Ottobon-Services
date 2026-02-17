import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function ProfessionalServicesPage() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Service offerings data
  const offerings = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      details: "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs.",
      features: [
        'Proposal Builder AI Agent',
        'Solution Architecture Sketches',
        'Pricing Strategy Recommendations'
      ],
      benefits: [
        'Reduce proposal creation time by 80%',
        'Increase win rates with tailored solutions',
        'Maintain consistent quality and messaging'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Visibility',
      icon: '📣',
      color: 'from-purple-600 to-pink-600',
      description: 'Maintain a professional presence with minimal effort',
      details: "Automated content creation that maintains your professional voice while requiring minimal time investment from busy consultants.",
      features: [
        'Social Media Content Generation',
        'Thought Leadership Articles',
        'Email Newsletter Campaigns'
      ],
      benefits: [
        'Consistent brand presence',
        'Thought leadership positioning',
        'Lead generation through content'
      ]
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      details: "Let AI handle routine project management tasks while you focus on strategic decisions and client relationships.",
      features: [
        'Task AI Agent for Jira/Asana',
        'Automated Status Updates',
        'Risk Identification'
      ],
      benefits: [
        'Reduce administrative overhead',
        'Improve project predictability',
        'Maintain client communication'
      ]
    },
    {
      id: 'admin',
      title: 'Admin & Billing',
      icon: '📊',
      color: 'from-rose-600 to-red-600',
      description: 'Automated back-office operations for consultants',
      details: "Streamline administrative tasks with automated invoicing, contract management, and expense tracking that integrates with popular accounting systems.",
      features: [
        'Automated Invoice Generation',
        'Contract Management',
        'Expense Tracking'
      ],
      benefits: [
        'Reduce billing cycles',
        'Improve cash flow management',
        'Minimize administrative overhead'
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
  
  // State for expanded service cards
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  
  // Toggle card expansion
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Header with navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🤖</span>
            <h1 className="text-2xl font-bold tracking-tighter">OTTOBON</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#overview"
              className="text-sm font-medium px-1 py-1 border-b-2 border-transparent hover:border-indigo-500 text-gray-300 hover:text-white transition-colors"
            >
              Overview
            </a>
            <a 
              href="#services"
              className="text-sm font-medium px-1 py-1 border-b-2 border-transparent hover:border-indigo-500 text-gray-300 hover:text-white transition-colors"
            >
              Services
            </a>
            <a 
              href="#audience"
              className="text-sm font-medium px-1 py-1 border-b-2 border-transparent hover:border-indigo-500 text-gray-300 hover:text-white transition-colors"
            >
              Who It's For
            </a>
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Portal
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 bg-white/10 hover:bg-white/20 p-2 rounded-md mr-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md bg-white/10 hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                  mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80' : 'max-h-0'
        }`}>
          <div className="bg-gray-900 border-t border-white/10 px-4 py-3 space-y-2">
            <a 
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              Overview
            </a>
            <a 
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              Services
            </a>
            <a
              href="#audience"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              Who It's For
            </a>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 pt-20">
        {/* Hero section with image background */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: `url('/images/consulting-team.jpg')` 
          }}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90"></div>
          </div>
          
          {/* Content container */}
          <div className="container relative z-10 mx-auto h-full px-4 py-12 flex items-center">
            <div className="w-full md:w-3/4 lg:w-1/2">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                Professional Services Organization
              </h2>
              
              <p className="text-xl text-white/90 mb-6">
                Empowering consultants with AI-powered operational support
              </p>
              
              <div className="flex flex-wrap gap-3">
                <a href="#overview" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  Learn More
                </a>
                <a href="#services" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm">
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Overview section */}
        <section id="overview" className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="bg-indigo-900/30 rounded-xl p-6 border border-indigo-800/30 mb-8">
              <h2 className="text-3xl font-bold mb-4 text-center">Modern Consulting Support</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-center">
                The Ottobon Professional Services Organization (PSO) provides consultants with a comprehensive suite of operational and administrative support services powered by advanced AI and human expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-transform hover:translate-y-[-5px]">
                <div className="rounded-full bg-indigo-900/50 w-14 h-14 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Operational Excellence</h3>
                <p className="text-gray-400">
                  Our AI agents handle administrative tasks, document creation, scheduling, follow-ups, and other routine operations with greater speed and consistency than human staff.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-transform hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-900/50 w-14 h-14 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Human-AI Collaboration</h3>
                <p className="text-gray-400">
                  For complex tasks requiring judgment or personalization, our expert human team works seamlessly with AI systems to provide the best of both worlds.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-transform hover:translate-y-[-5px]">
                <div className="rounded-full bg-cyan-900/50 w-14 h-14 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Flexible Service Model</h3>
                <p className="text-gray-400">
                  Choose AI-only automation for cost efficiency, or add human expertise for specialized tasks. Scale services up or down based on your current project needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services section */}
        <section id="services" className="py-10 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto px-4">
            <div className="bg-indigo-900/30 rounded-xl p-6 border border-indigo-800/30 mb-8">
              <h2 className="text-3xl font-bold mb-4 text-center">Our Service Offerings</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-center">
                Each service combines AI automation with optional human support, allowing you to choose the right balance for your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {offerings.map((service) => (
                <div
                  key={service.id}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedCards[service.id] 
                      ? 'bg-gray-800 transform scale-[1.02] shadow-lg z-10' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div 
                    className={`h-full flex flex-col border border-white/10 rounded-xl overflow-hidden cursor-pointer`}
                    onClick={() => toggleCard(service.id)}
                  >
                    {/* Card header */}
                    <div className={`bg-gradient-to-r ${service.color} p-4 flex items-center`}>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">{service.icon}</span>
                      </div>
                      <h3 className="font-bold text-white flex-1">{service.title}</h3>
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
                    
                    {/* Card content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      
                      {/* Expanded content */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedCards[service.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pt-2 space-y-4">
                          <p className="text-gray-400 text-sm">{service.details}</p>
                          
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-white/90 mb-2">Key Features</h4>
                            <ul className="space-y-1">
                              {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start text-xs">
                                  <svg className="w-3.5 h-3.5 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-white/90 mb-2">Benefits</h4>
                            <ul className="space-y-1">
                              {service.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start text-xs">
                                  <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                  <span className="text-gray-300">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card footer - only visible when not expanded */}
                      <div className={`mt-auto pt-2 text-xs font-medium text-center text-indigo-400 ${
                        expandedCards[service.id] ? 'hidden' : 'block'
                      }`}>
                        Click for details
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Audience section */}
        <section id="audience" className="py-10 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-800/30 mb-8">
              <h2 className="text-3xl font-bold mb-4 text-center">Who We Serve</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-center">
                Our flexible service model adapts to different consulting business models and scales.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audiences.map((audience, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-gray-800/70 transition-colors"
                >
                  <div className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto`}>
                    <span className="text-3xl">{audience.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center">{audience.title}</h3>
                  <p className="text-gray-400 mb-4 text-center">{audience.description}</p>
                  
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-sm text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-950 py-6 border-t border-white/10 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center text-white">
                <span className="text-xl mr-2">🤖</span>
                <span className="font-bold text-xl">OTTOBON</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Enterprise Support Services Organization</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ottobon Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}