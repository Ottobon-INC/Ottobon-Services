import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1E2E]/95 backdrop-blur-md shadow-lg"
          : "bg-[#0F1E2E]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="Ottobon Logo"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto transition-transform group-hover:scale-105"
            />
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
              OTTOBON
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#about");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="hidden sm:block text-white/90 hover:text-white font-medium text-sm md:text-base lg:text-lg transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#services-overview"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#services-overview");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="hidden sm:block text-white/90 hover:text-white font-medium text-sm md:text-base lg:text-lg transition-colors duration-200"
            >
              Our Services
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}