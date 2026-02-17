import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import "./Internship.css";

export default function Internship() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Mobile menu close on resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    // Intersection Observer for scroll effects
    const sections = document.querySelectorAll("section[id]");
    const options = {
      rootMargin: "0px",
      threshold: 0.2,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Chart.js initialization
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx && window.Chart) {
        new window.Chart(ctx, {
          type: "radar",
          data: {
            labels: [
              "Hands-on AI",
              "Mentorship",
              "Portfolio Strength",
              "Pro Network",
              "Certification",
            ],
            datasets: [
              {
                label: "AI Innovation Internship",
                data: [9, 8, 9, 7, 10],
                backgroundColor: "rgba(59, 130, 246, 0.4)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: "rgba(59, 130, 246, 1)",
              },
              {
                label: "Generic Paid Internship",
                data: [3, 4, 3, 5, 2],
                backgroundColor: "rgba(107, 114, 128, 0.4)",
                borderColor: "rgba(107, 114, 128, 1)",
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: "rgba(107, 114, 128, 1)",
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              r: {
                angleLines: { color: "rgba(0, 0, 0, 0.15)" },
                grid: { color: "rgba(0, 0, 0, 0.15)" },
                pointLabels: {
                  font: { size: 14, weight: "600" },
                  color: "#374151",
                },
                ticks: {
                  backdropColor: "rgba(248, 247, 244, 0.9)",
                  color: "#6B7280",
                  stepSize: 2,
                  display: false,
                },
                min: 0,
                max: 10,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: { size: 14 },
                  padding: 20,
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                titleFont: { weight: "bold" },
              },
            },
          },
        });
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="internship-page antialiased">
      <header
        id="header"
        className="internship-header bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100"
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-xl font-bold text-gray-800 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-blue-600 text-3xl">
              <img
                src="/assets/logo.png"
                alt="OTTOBON"
                className="w-[60px] h-auto"
              />
            </span>
            <span>OTTOBON Internship</span>
          </button>
          <div className="hidden md:flex space-x-10">
            <a
              href="#investment"
              onClick={(e) => handleSmoothScroll(e, "#investment")}
              className="nav-link text-gray-600 font-medium hover:text-blue-600 transition duration-300"
            >
              The Value
            </a>
            <a
              href="#journey"
              onClick={(e) => handleSmoothScroll(e, "#journey")}
              className="nav-link text-gray-600 font-medium hover:text-blue-600 transition duration-300"
            >
              Your Journey
            </a>
            <a
              href="#payoff"
              onClick={(e) => handleSmoothScroll(e, "#payoff")}
              className="nav-link text-gray-600 font-medium hover:text-blue-600 transition duration-300"
            >
              Career Payoff
            </a>
            <a
              href="#apply"
              onClick={(e) => handleSmoothScroll(e, "#apply")}
              className="btn-primary bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-md hover:bg-blue-700"
            >
              Apply Now
            </a>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={mobileMenuOpen}
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
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>
        <div
          className={`mobile-menu-transition md:hidden bg-white border-t border-gray-100 ${mobileMenuOpen ? "open" : ""}`}
        >
          <div className="px-6 pt-2 pb-4">
            <a
              href="#investment"
              onClick={(e) => handleSmoothScroll(e, "#investment")}
              className="block py-3 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
            >
              The Value
            </a>
            <a
              href="#journey"
              onClick={(e) => handleSmoothScroll(e, "#journey")}
              className="block py-3 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
            >
              Your Journey
            </a>
            <a
              href="#payoff"
              onClick={(e) => handleSmoothScroll(e, "#payoff")}
              className="block py-3 px-3 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
            >
              Career Payoff
            </a>
            <a
              href="#apply"
              onClick={(e) => handleSmoothScroll(e, "#apply")}
              className="block py-3 px-3 rounded-md mt-2 text-center bg-blue-600 text-white font-medium"
            >
              Apply Now
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 md:py-32 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
              AI APPLICATION DEVELOPER PROGRAM
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
              Accelerate Your Career Capital <br className="hidden sm:inline" />{" "}
              in Applied AI
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Targeted internship tracks for <b>3rd/4th Year Undergrads</b> and{" "}
              <b>Freshers</b>. Build real-world AI applications, gain elite
              mentorship, and follow a clear path from a free internship to{" "}
              <b>paid roles</b> and <b>full-time offers</b>.<br />
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmY5RbqR90zPf4bg2gTAeEuBBfb4rkYDVuWyhwlmVBgcTpKg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-blue-600 text-white font-semibold py-3 px-10 rounded-xl shadow-xl w-full sm:w-auto text-lg hover:bg-blue-700"
              >
                Secure Your Spot
              </a>
              <a
                href="#investment"
                onClick={(e) => handleSmoothScroll(e, "#investment")}
                className="font-semibold text-blue-600 py-3 px-6 hover:text-blue-800 transition duration-300"
              >
                See The Value &rarr;
              </a>
            </div>
          </div>
        </section>

        <section id="investment" className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                The Non-Monetary Investment: Skill, Exposure & Credibility 🚀
              </h2>
              <p className="mt-4 text-md text-gray-600 max-w-2xl mx-auto">
                We offset the free nature by guaranteeing non-negotiable gains
                that will define your career trajectory. This is your gateway to
                validated, meaningful industry exposure.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="glass-card p-6 rounded-2xl shadow-lg">
                <span className="text-3xl text-blue-600 mb-2 block">🤝</span>
                <h3 className="text-xl font-bold text-gray-900">
                  Elite Mentorship
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Direct guidance from experts at <b>top MNCs</b>. Build a
                  genuine professional network and secure career-defining
                  references.
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl shadow-lg">
                <span className="text-3xl text-blue-600 mb-2 block">🛠️</span>
                <h3 className="text-xl font-bold text-gray-900">
                  Exclusive Tool Access
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Hands-on experience with <b>paid, professional-grade AI</b>{" "}
                  and MLOps tools, mastering the industry-standard deployment
                  workflows.
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl shadow-lg">
                <span className="text-3xl text-blue-600 mb-2 block">🏅</span>
                <h3 className="text-xl font-bold text-gray-900">
                  Professional Certification
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Earn a completion certificate from <b>OTTOBON Academy</b>
                  —proof of high-quality training and critical practical
                  capability.
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl shadow-lg">
                <span className="text-3xl text-blue-600 mb-2 block">💾</span>
                <h3 className="text-xl font-bold text-gray-900">
                  Real-World Portfolio
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Build portfolio-ready AI products with real market use. Gain
                  exposure to high-growth domains like{" "}
                  <b>healthcare and consulting</b>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="py-20 bg-gray-50 border-t border-b border-gray-100"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Choose Your Career Path 🚀
              </h2>
              <p className="mt-4 text-md text-gray-600 max-w-2xl mx-auto">
                We offer two distinct tracks designed for your current academic
                or professional level, each with a direct path to a career with
                us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  FOR 3RD & 4TH YEAR STUDENTS
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mt-3 mb-4">
                  12-Week Foundation Program
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  A 12-week (free) intensive program to build your core AI
                  application development skills. You'll work on real products
                  and be mentored by industry experts.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                  <h4 className="font-bold text-blue-800">
                    Contingency: Paid Internship
                  </h4>
                  <p className="text-sm text-blue-700">
                    Exceptional performers will be extended for an{" "}
                    <b>additional 12-week PAID internship</b> to deepen their
                    expertise.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                  FOR FRESH GRADUATES
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mt-3 mb-4">
                  8-Week Conversion Program
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  An 8-week (free) fast-track program focused on immediate
                  impact and team integration. Prove your skills on live
                  projects and prepare for a full-time role.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                  <h4 className="font-bold text-green-800">
                    Contingency: Full-Time Offer
                  </h4>
                  <p className="text-sm text-green-700">
                    Successful interns will be converted directly into{" "}
                    <b>full-time AI Application Developer</b> roles at OTTOBON.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Core Responsibilities: Building Real-World Value
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
                  <span className="text-4xl text-blue-600">&#9999;</span>
                  <p className="mt-3 font-semibold text-gray-700">
                    Advanced Prompt & Content Refinement
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
                  <span className="text-4xl text-blue-600">&#9733;</span>
                  <p className="mt-3 font-semibold text-gray-700">
                    UI/UX Review & Data Curation
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
                  <span className="text-4xl text-blue-600">
                    &#128104;&#8205;&#128187;
                  </span>
                  <p className="mt-3 font-semibold text-gray-700">
                    Cross-Domain Team Collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="payoff" className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                The Ultimate Payoff: Your Career Edge 🥇
              </h2>
              <p className="mt-4 text-md text-gray-600 max-w-2xl mx-auto">
                You'll leave with tangible assets that instantly elevate your
                profile, making you a top candidate for competitive roles in
                tech, product, and consulting.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
                    A Resume That Commands Attention
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You won't just list an internship. You'll showcase{" "}
                    <b>quantifiable, high-value achievements</b>:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 text-lg font-bold">
                        &#10148;
                      </span>
                      <span>
                        <strong>Engineered and validated content</strong> for an{" "}
                        <b>LLM-driven healthcare agent</b>, successfully
                        improving knowledge retrieval accuracy by 15%.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 text-lg font-bold">
                        &#10148;
                      </span>
                      <span>
                        <strong>Collaborated with UI/UX and Engineering</strong>{" "}
                        on 4 major feature deployments, ensuring seamless
                        integration of AI outputs into the user journey.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 text-lg font-bold">
                        &#10148;
                      </span>
                      <span>
                        Gained <b>Professional Certification</b> from OTTOBON
                        Academy in <b>Applied AI Application Development</b>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Your Career Capital Growth
                </h3>
                <div className="chart-container">
                  <canvas ref={chartRef} id="careerChart"></canvas>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Comparing the career value gained from our focused program
                  versus a generic, less-structured internship.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="apply"
          className="py-20 bg-blue-700 border-t border-blue-800"
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Ready to Build Your Future, Today?
            </h2>
            <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
              If you are a highly motivated{" "}
              <b>3rd year, 4th year, or recent graduate</b> ready to commit,
              learn, and earn certified, real-world credibility, this is your
              moment.
            </p>
            <div className="mt-10">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmY5RbqR90zPf4bg2gTAeEuBBfb4rkYDVuWyhwlmVBgcTpKg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-yellow-400 text-blue-800 font-extrabold py-3 px-6 sm:py-4 sm:px-12 rounded-full shadow-2xl uppercase tracking-wider text-base sm:text-xl hover:bg-yellow-300 hover:shadow-3xl w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
              >
                Apply for the Cohort
              </a>
              <p className="text-sm text-blue-300 mt-4">
                Applications are now open for the next intake.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm">
            &copy; 2025 OTTOBON Academy. All Rights Reserved. | Dedicated to
            Real-World AI Impact.
          </p>
        </div>
      </footer>
    </div>
  );
}
