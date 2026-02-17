import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import ServicesFooter from "./ServicesFooter";

type ServiceCategory =
  | "Health Care"
  | "Enterprise Enablement"
  | "Business Development"
  | "Legal and Finance";

interface CategoryInfo {
  id: ServiceCategory;
  title: string;
  description: string;
  icon: string;
  isComingSoon?: boolean;
}

const categories: CategoryInfo[] = [
  {
    id: "Health Care",
    title: "Health Care",
    description: "",
    icon: "",
  },
  {
    id: "Enterprise Enablement",
    title: "Enterprise Enablement",
    description: "",
    icon: "",
  },
  {
    id: "Business Development",
    title: "Business Development",
    description: "",
    icon: "",
  },
  {
    id: "Legal and Finance",
    title: "Legal and Finance",
    description: "",
    icon: "",
    isComingSoon: true,
  },
];

export default function ProServices() {
  const [, navigate] = useLocation();
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalService, setModalService] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] =
    useState<ServiceCategory>("Health Care");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero banner slides
  const heroSlides = [
    {
      title: "Health Care Solutions",
      subtitle:
        "AI-powered personal care companions for fertility and parenthood journey",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      imagePath: "/images/health-care-.jpg",
      gradient: "from-teal-900/80 to-emerald-900/80",
      category: "Health Care" as ServiceCategory,
    },
    {
      title: "Enterprise Enablement",
      subtitle: "Intelligent automation for operational excellence and support",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      imagePath: "/images/Enterpeise.jpg",
      gradient: "from-blue-900/80 to-indigo-900/80",
      category: "Enterprise Enablement" as ServiceCategory,
    },
    {
      title: "Business Development",
      subtitle: "Strategic growth solutions and market expansion services",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      imagePath: "/images/business-meeting.jpg",
      gradient: "from-green-900/80 to-emerald-900/80",
      category: "Business Development" as ServiceCategory,
    },
    {
      title: "Legal & Finance",
      subtitle:
        "Professional legal and financial advisory services for businesses",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
      imagePath: "/images/Legal.jpg",
      gradient: "from-purple-900/80 to-violet-900/80",
      category: "Legal and Finance" as ServiceCategory,
    },
  ];

  // Service offerings data
  const services = [
    {
      id: "talentops",
      title: "TalentOps",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      iconBg: "bg-indigo-500",
      color: "from-indigo-600 to-blue-600",
      description: "Comprehensive talent management and workforce optimization",
      details:
        "End-to-end talent operations platform that streamlines recruitment, onboarding, performance management, and workforce planning with AI-powered insights.",
      features: [
        "AI-driven talent sourcing and candidate matching",
        "Automated onboarding and training workflows",
        "Performance analytics and workforce optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
      category: "Enterprise Enablement" as ServiceCategory,
      hasDetailPage: true,
    },

    {
      id: "idea-to-prototype",
      title: "Idea to Prototype",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6l4 2M9 21h6M12 3a9 9 0 100 18"
          />
        </svg>
      ),
      iconBg: "bg-cyan-500",
      color: "from-cyan-600 to-blue-600",
      description: "Turn business ideas into functional prototypes quickly",
      details:
        "We help enterprises transform ideas into working prototypes using rapid validation, AI-assisted development, and structured execution.",
      features: [
        "Idea validation and feasibility analysis",
        "Rapid UI/UX and MVP development",
        "AI-assisted engineering support",
        "Prototype-to-product roadmap",
      ],
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=400&q=80",
      category: "Enterprise Enablement" as ServiceCategory,
      hasDetailPage: true,
    },

    {
      id: "contract-to-hire",
      title: "Contract Hiring",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8"
          />
        </svg>
      ),
      iconBg: "bg-emerald-500",
      color: "from-emerald-600 to-teal-600",
      description: "Evaluate talent on contract before full-time hiring",
      details:
        "Reduce hiring risk by engaging professionals on a contract basis first. Convert to full-time only after real performance validation.",
      features: [
        "AI-driven candidate screening",
        "Performance-based contract engagement",
        "Smooth conversion to full-time roles",
        "Lower hiring and attrition risk",
      ],
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
      category: "Enterprise Enablement" as ServiceCategory,
      hasDetailPage: true,
    },

    {
      id: "presales",
      title: "Pre-Sales Support",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      iconBg: "bg-blue-500",
      color: "from-blue-600 to-indigo-600",
      description: "Generate compelling proposals in minutes, not days",
      details:
        "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs.",
      features: [
        "AI-powered proposal builder that learns your style",
        "Solution architecture sketches and diagrams",
        "Automated pricing recommendations based on market data",
      ],
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80",
      category: "Business Development" as ServiceCategory,
      hasDetailPage: true,
    },
    {
      id: "marketing",
      title: "Marketing & Visibility",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      iconBg: "bg-purple-500",
      color: "from-purple-600 to-pink-600",
      description: "Maintain a professional presence with minimal effort",
      details:
        "Automated content creation that maintains your professional voice while requiring minimal time investment from busy consultants.",
      features: [
        "AI-generated social media content customized to your brand",
        "Thought leadership articles on trending industry topics",
        "Email newsletter campaigns with performance analytics",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      category: "Business Development" as ServiceCategory,
      hasDetailPage: true,
    },
    {
      id: "fertility-care",
      title: "Health Companion",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      iconBg: "bg-pink-500",
      color: "from-pink-600 to-rose-600",
      description: "AI-powered personalized fertility tracking and guidance",
      details:
        "Comprehensive fertility support combining AI-driven cycle tracking, personalized insights, and expert guidance to optimize your reproductive health journey.",
      features: [
        "Intelligent cycle prediction and ovulation tracking",
        "Personalized nutrition and lifestyle recommendations",
        "Real-time symptom analysis and health insights",
        "Secure data management with privacy-first approach",
      ],
      image:
        "https://images.unsplash.com/photo-1559334941-acb7bc1ae33a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Health Care" as ServiceCategory,
      hasDetailPage: true,
    },
    {
      id: "parenthood-journey",
      title: "Health Tech Solutions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      iconBg: "bg-teal-500",
      color: "from-teal-600 to-emerald-600",
      description:
        "Innovative technology support for smarter healthcare delivery",
      details:
        "Health Tech Solutions provides advanced technology-driven healthcare support, helping organizations and individuals optimize care, streamline operations, and improve patient outcomes. With AI-powered insights, data-driven tools, and digital health innovations, we enable smarter decision-making in the healthcare ecosystem.",
      features: [
        "AI-powered health analytics and predictive insights",
        "Digital tools for patient engagement and monitoring",
        "Customized technology solutions for healthcare providers and organizations",
      ],
      image:
        "https://images.unsplash.com/photo-1695313486168-30b4d2183d1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Health Care" as ServiceCategory,
      hasDetailPage: true,
    },
  ];

  // Audience segments
  const audiences = [
    {
      title: "Independent Consultants",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "from-blue-600 to-indigo-600",
      description: "Operate like a larger firm without the overhead",
      benefits: [
        "Professional back-office support without hiring staff",
        "Focus on your expertise while AI handles operations",
        "Present a polished, professional image to clients",
      ],
    },
    {
      title: "Small Consulting Firms",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-purple-600 to-pink-600",
      description: "Scale operations without proportional headcount",
      benefits: [
        "Accelerate growth with operational efficiency",
        "Maintain consistent quality across all functions",
        "Focus your team on billable client work",
      ],
    },
    {
      title: "Mid-Size Practices",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "from-emerald-600 to-cyan-600",
      description: "Selective function augmentation for optimal efficiency",
      benefits: [
        "Augment specific departments during peak demand",
        "Modular services that integrate with existing systems",
        "Reduce operational costs while improving service",
      ],
    },
  ];

  // Filter services based on selected category
  const filteredServices = services.filter(
    (service) => service.category === activeFilter,
  );

  // For carousel navigation
  const carouselRef = useRef<HTMLDivElement>(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle card expansion
  const toggleCard = (id: string) => {
    // Check if we're on desktop (md breakpoint and above)
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      // On desktop, use modal
      setModalService(modalService === id ? null : id);
    } else {
      // On mobile, use inline expansion
      setExpandedCards((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  // Close modal
  const closeModal = () => {
    setModalService(null);
  };

  // Get modal service data
  const getModalService = () => {
    return services.find((s) => s.id === modalService);
  };

  // Auto-advance slides with hover pause functionality
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Don't set interval if hovered

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides.length, isHovered]);

  // Function to scroll to services section and set filter
  const scrollToServices = (category: ServiceCategory) => {
    setActiveFilter(category);
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const headerHeight = 120; // Account for fixed header height
      const elementPosition = servicesSection.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Netflix-style carousel scrolling
  const scrollCards = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerWidth = container.clientWidth;
      // Scroll by approximately 80% of visible width to show partial next card
      const scrollAmount = containerWidth * 0.8;

      if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 lg:py-4 flex justify-between items-center">
          <div
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="Ottobon Logo"
              className="h-8 sm:h-12 lg:h-16 xl:h-20 w-auto"
            />
            <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-extrabold ml-2">
              <span className="text-white">OTTOBON</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#overview"
              className="text-white hover:text-indigo-300 transition-colors"
            >
              Overview
            </a>
            <a
              href="#services"
              className="text-white hover:text-indigo-300 transition-colors"
            >
              Services
            </a>
            <a
              href="#audience"
              className="text-white hover:text-indigo-300 transition-colors"
            >
              Who We Serve
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed top-0 right-0 min-h-fit w-80 max-w-[85vw] bg-gray-900 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 rounded-l-2xl ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* Close button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={closeMobileMenu}
                className="text-white p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-4">
              <a
                href="#overview"
                className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-gray-800 flex items-center"
                onClick={closeMobileMenu}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-indigo-600/30 rounded-full mr-3 text-lg">
                  📊
                </span>
                <span>Overview</span>
              </a>
              <a
                href="#services"
                className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-gray-800 flex items-center"
                onClick={closeMobileMenu}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full mr-3 text-lg">
                  🛠️
                </span>
                <span>Services</span>
              </a>
              <a
                href="#audience"
                className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-gray-800 flex items-center"
                onClick={closeMobileMenu}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-emerald-600/30 rounded-full mr-3 text-lg">
                  👥
                </span>
                <span>Who We Serve</span>
              </a>

              {/* Back to home button */}
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    navigate("/");
                    closeMobileMenu();
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                  Back to Home
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          ></div>
        )}
      </header>

      <style>{`
        /* Simple left-to-right slide transition */
        @keyframes slideInFromRight {
          0% { 
            transform: translateX(100%);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToLeft {
          0% { 
            transform: translateX(0);
            opacity: 1;
          }
          100% { 
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .slide-enter {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .slide-exit {
          animation: slideOutToLeft 0.8s ease-out forwards;
        }

        .coming-soon-button {
          position: relative;
          overflow: hidden;
        }

        /* Hide scrollbars */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>

      <main className="pt-24 pb-16">
        {/* Container for all sections */}
        <div className="container mx-auto px-4">
          {/* Hero Banner with Simple Left-to-Right Slide Transition */}
          <section className="mb-12 mt-8 bg-gray-900 rounded-xl overflow-hidden">
            <div
              className="h-[500px] sm:h-[550px] md:h-[450px] relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 ${
                    index === currentSlide
                      ? "opacity-100 z-10 slide-enter"
                      : "opacity-0 z-0 slide-exit"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.imagePath})` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                    ></div>
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full flex items-center px-6 md:px-12">
                    {/* Left side: Icon and Text */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      {/* Icon */}
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6 text-white">
                        {slide.icon}
                      </div>

                      {/* Text Content */}
                      <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      {/* Learn More Button */}
                      <button
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                        onClick={() => scrollToServices(slide.category)}
                      >
                        Learn More →
                      </button>
                    </div>

                    {/* Right side: Image area (desktop only) */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                </div>
              ))}

              {/* Simple Slide Navigation */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-3">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`transition-all duration-300 ${
                      i === currentSlide
                        ? "bg-white w-8 h-3 rounded-full"
                        : "bg-white/50 hover:bg-white/70 w-3 h-3 rounded-full"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section
            id="overview"
            className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mb-6"
          >
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-300 mb-4">
              The Ottobon Professional Services Organization (PSO) provides
              consultants with comprehensive operational and administrative
              support powered by advanced AI and expert human assistance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 px-2 md:px-0">
              <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col min-h-[200px] md:h-auto mx-auto w-full max-w-sm md:max-w-none">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="rounded-full bg-indigo-600/30 p-2 sm:p-3 mr-0 sm:mr-4 mb-3 sm:mb-0 self-center sm:self-start">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold leading-tight text-center sm:text-left">
                    Operational Excellence
                  </h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  Our AI agents handle administrative tasks with greater speed
                  and consistency than human staff, allowing you to focus on
                  high-value client work instead of routine operations.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col min-h-[200px] md:h-auto mx-auto w-full max-w-sm md:max-w-none">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="rounded-full bg-purple-600/30 p-2 sm:p-3 mr-0 sm:mr-4 mb-3 sm:mb-0 self-center sm:self-start">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold leading-tight text-center sm:text-left">
                    Human-AI Collaboration
                  </h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  For complex tasks requiring judgment or personalization, our
                  expert human team works seamlessly with AI systems to provide
                  the perfect balance of efficiency and expertise.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col min-h-[200px] md:h-auto mx-auto w-full max-w-sm md:max-w-none">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="rounded-full bg-cyan-600/30 p-2 sm:p-3 mr-0 sm:mr-4 mb-3 sm:mb-0 self-center sm:self-start">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold leading-tight text-center sm:text-left">
                    Flexible Service Model
                  </h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  Choose AI-only automation for cost efficiency, or add human
                  expertise for specialized tasks. Scale services up or down
                  based on your current project needs with no long-term
                  commitments.
                </p>
              </div>
            </div>
          </section>

          {/* Service Offerings Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Our Service Offerings
            </h2>
            <p className="text-gray-300 text-lg">
              Each service combines AI automation with optional human support
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-8 px-2 md:px-0">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-2">
              {categories.map((category) => (
                <div key={category.id} className="text-center">
                  <button
                    className={`font-medium py-2 md:py-3 px-3 md:px-6 rounded-full transition flex items-center relative text-sm md:text-base ${
                      activeFilter === category.id
                        ? "bg-indigo-600 text-white shadow-lg"
                        : category.isComingSoon
                          ? "coming-soon-button text-indigo-300 border border-indigo-500/50"
                          : "bg-white/10 hover:bg-white/20 text-white shadow-sm border border-white/20"
                    }`}
                    onClick={() => {
                      if (!category.isComingSoon) {
                        setActiveFilter(category.id);
                      }
                    }}
                    disabled={category.isComingSoon}
                  >
                    <span className="whitespace-nowrap">{category.title}</span>
                    {category.isComingSoon && (
                      <span className="ml-1 md:ml-2 text-xs bg-yellow-500 text-black px-1 md:px-2 py-1 rounded-full font-bold animate-pulse">
                        Soon
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Description for selected category */}
            <div className="text-center animate-fade-in">
              {categories.map(
                (category) =>
                  activeFilter === category.id && (
                    <p key={category.id} className="text-sm text-gray-300 mt-2">
                      {category.description}
                    </p>
                  ),
              )}
            </div>
          </div>

          {/* Services Section - Netflix-style Carousel */}
          <section
            id="services"
            className="bg-purple-900/20 rounded-xl p-6 sm:p-8 md:p-10 border border-purple-800/30 mb-6"
          >
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {activeFilter === "Health Care"
                  ? "Health Care and Business Development"
                  : activeFilter}
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                {activeFilter === "Health Care"
                  ? "Advanced healthcare solutions and business development services"
                  : "AI-powered solutions with optional human support"}
              </p>
            </div>

            {/* Netflix-style Carousel Container */}
            <div className="relative group/carousel">
              {/* Left Arrow - Desktop */}
              {filteredServices.length > 1 && (
                <button
                  onClick={() => scrollCards("left")}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-r-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 items-center justify-center shadow-2xl"
                  aria-label="Previous"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
              )}

              {/* Right Arrow - Desktop */}
              {filteredServices.length > 1 && (
                <button
                  onClick={() => scrollCards("right")}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-l-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 items-center justify-center shadow-2xl"
                  aria-label="Next"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              )}

              {/* Scrollable Cards Container */}
              <div
                ref={carouselRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
                  >
                    {/* Card */}
                    <div
                      className="bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer h-full flex flex-col group/card hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                      onClick={() => toggleCard(service.id)}
                    >
                      {/* Image */}
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                        {/* Click indicator */}
                        <div className="absolute bottom-3 right-3 bg-white/10 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-3 line-clamp-2 flex-1">
                          {service.description}
                        </p>

                        {/* View details button - consistent across all cards */}
                        {service.hasDetailPage ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (service.id === "fertility-care") {
                                navigate("/health-companion");
                              } else if (service.id === "talentops") {
                                navigate("/talentops");
                              } else if (service.id === "idea-to-prototype") {
                                navigate("/idea-to-prototype");
                              } else if (service.id === "contract-to-hire") {
                                navigate("/contract-to-hire");
                              }
                              window.scrollTo(0, 0);
                            }}
                            className={`mt-auto w-full bg-gradient-to-r ${service.color} text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-2`}
                          >
                            <span>Learn More</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        ) : (
                          <div className="text-xs sm:text-sm text-indigo-400 font-medium opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            Click to view details →
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile scroll indicators */}
              <div className="flex justify-center mt-4 gap-1.5 md:hidden">
                {filteredServices.map((_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-gray-600"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Audience Section */}
          <section
            id="audience"
            className="bg-emerald-900/20 rounded-xl p-6 border border-emerald-800/30 mb-6"
          >
            <h2 className="text-2xl font-bold mb-3">Who We Serve</h2>
            <p className="text-gray-300 mb-4">
              Our flexible service model adapts to different consulting business
              models and scales.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 px-2 md:px-0">
              {audiences.map((audience, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-colors mx-auto w-full max-w-sm md:max-w-none"
                >
                  <div
                    className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto`}
                  >
                    {audience.icon}
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-center">
                    {audience.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-center text-sm">
                    {audience.description}
                  </p>

                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
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

      {/* Professional Services FAQ Section */}
      <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mb-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Professional Services FAQ
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                q: "Who is the Professional Services Organization (PSO) for?",
                a: "Independent consultants, small firms, and mid-size practices that want AI-powered pre‑sales, marketing, delivery support, and admin/billing automation.",
              },
              {
                q: "How does Human + AI collaboration work?",
                a: "AI handles speed, drafting, and analysis; mentors calibrate judgment, standards, and nuance. You learn the professional way to combine both.",
              },
              {
                q: "What services are included in the PSO offering?",
                a: "Pre-sales support, marketing & visibility, talent acquisition, project delivery support, admin & billing, payroll management, and specialized health care solutions.",
              },
              {
                q: "Can I choose specific services or do I need the full package?",
                a: "Our services are modular. You can select individual services that meet your current needs and scale up or down as your business requirements change.",
              },
              {
                q: "How do you ensure data security and confidentiality?",
                a: "We maintain enterprise-grade security with encrypted data transmission, secure storage, and strict confidentiality agreements. Your client data remains protected at all times.",
              },
              {
                q: "What's the difference between AI-only and AI+Human services?",
                a: "AI-only provides automated efficiency for routine tasks. AI+Human adds expert judgment for complex decisions, personalization, and quality assurance.",
              },
              {
                q: "How quickly can I get started with PSO services?",
                a: "Most services can be activated within 24-48 hours. Complex integrations may take 1-2 weeks depending on your existing systems and requirements.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-5 mb-3 transition-all duration-300 hover:scale-105 hover:bg-[#112537]/80"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(59, 130, 246, 0.4)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <summary className="cursor-pointer text-white font-medium select-none text-base md:text-lg">
                  {item.q}
                </summary>
                <p className="text-blue-100 mt-2 text-sm md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <ServicesFooter />

      {/* Modal Overlay for Desktop */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-gray-800 rounded-2xl border border-gray-600 shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            {(() => {
              const service = getModalService();
              if (!service) return null;

              return (
                <>
                  {/* Modal Header */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                    {/* Service icon and title overlay */}
                    <div className="absolute bottom-4 left-6">
                      <div className="flex items-center">
                        <div
                          className={`w-16 h-16 ${service.iconBg} rounded-lg flex items-center justify-center shadow-lg mr-4 text-white`}
                        >
                          <div className="scale-150">{service.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {service.title}
                          </h3>
                          <p className="text-white/80">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body with Invisible Scroll */}
                  <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        About This Service
                      </h4>
                      <p className="text-gray-300">{service.details}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start p-2">
                            <svg
                              className="w-5 h-5 text-indigo-400 mt-1 mr-3 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
