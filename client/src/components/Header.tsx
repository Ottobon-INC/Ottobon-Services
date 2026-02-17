import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 bg-[#0F1E2E] shadow-xl`}
    >
      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Responsive sizing */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group flex-shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="Ottobon Logo"
              className="h-8 sm:h-12 lg:h-16 xl:h-20 w-auto"
            />
            <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-extrabold ml-2">
              <span className="text-white">OTTOBON</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <nav className="hidden lg:flex space-x-3 xl:space-x-6 flex-shrink-0">
            {[
              { label: "Our Approach", href: "#methodology", icon: "" },
              { label: "Programs", href: "#courses", icon: "" },
              { label: "Talent Compass", href: "#talent-compass", icon: "" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="text-white/90 hover:text-white font-medium py-2 px-3 xl:px-4 rounded-lg hover:bg-white/15 transition-all relative overflow-hidden group text-sm xl:text-base whitespace-nowrap"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-white/80 group-hover:text-white/100 transition-all">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:left-0 group-hover:right-0"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button - Responsive sizing */}
          <div className="hidden lg:flex space-x-3 flex-shrink-0">
            <a
              href="/academy#talent-compass"
              onClick={(e) => {
                e.preventDefault();
                // Check if we're already on the academy page
                if (window.location.pathname === '/academy' || window.location.pathname === '/') {
                  const target = document.querySelector("#talent-compass");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                } else {
                  // Navigate to academy page with anchor
                  window.location.href = '/academy#talent-compass';
                }
              }}
              className="bg-[#FFC107] text-black font-semibold py-2 xl:py-3 px-4 xl:px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 relative overflow-hidden group text-sm xl:text-base whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <svg
                  className="ml-1 w-[16px] h-[16px] xl:w-[20px] xl:h-[20px] translate-y-[1px] xl:translate-y-[2px] transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"
              ></span>
            </a>
          </div>

          {/* Mobile CTA and Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              href="/academy#talent-compass"
              onClick={(e) => {
                e.preventDefault();
                // Check if we're already on the academy page
                if (window.location.pathname === '/academy' || window.location.pathname === '/') {
                  const target = document.querySelector("#talent-compass");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                } else {
                  // Navigate to academy page with anchor
                  window.location.href = '/academy#talent-compass';
                }
              }}
              className="bg-[#FFC107] text-black font-semibold py-2 px-4 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 relative overflow-hidden group text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <svg
                  className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"
              ></span>
            </a>

            <button
              onClick={toggleMobileMenu}
              className="bg-white/10 backdrop-blur-sm rounded-full p-2 text-white focus:outline-none hover:bg-indigo-500/30 transition shadow-sm flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
        </div>
      </div>

      {/* Mobile Navigation - Sideways Slide */}
      <div
        className={`lg:hidden fixed top-0 right-0 min-h-fit w-80 max-w-[85vw] bg-[#0F1E2E]/95 backdrop-blur-md border-l border-indigo-800/50 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 rounded-l-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMobileMenu}
              className="text-white p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
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
              href="#methodology"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const target = document.querySelector("#methodology");
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 100);
              }}
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Our Approach
            </a>
            <a
              href="#courses"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const target = document.querySelector("#courses");
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 100);
              }}
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Programs
            </a>
            <a
              href="#talent-compass"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const target = document.querySelector("#talent-compass");
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 100);
              }}
              className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Talent Compass
            </a>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
}