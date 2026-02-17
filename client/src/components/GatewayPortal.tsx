import React, { useMemo, useState } from "react";
import { useLocation } from "wouter";
import HomeHeader from "./HomeHeader";
import { GraduationCap, BriefcaseBusiness, Check, Sparkles } from "lucide-react";

export default function GatewayPortal() {
  const [, navigate] = useLocation();
  const [hoverState, setHoverState] = useState<"academy" | "services" | null>(
    null,
  );
  const [pressing, setPressing] = useState<"academy" | "services" | null>(null);

  // Memoize bubble positions/sizes so background doesn't change on hover-induced re-renders
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        left: Math.random() * 100,
        bottomVh: Math.random() * 80, // 0–80vh from bottom
      })),
    [],
  );

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <HomeHeader />

      {/* Hero Video Section - Responsive Height */}
      <section className="relative h-auto md:h-screen w-full overflow-hidden pt-20 sm:pt-24 md:pt-0">
        <div className="relative md:absolute md:inset-0">
          <video
            className="w-full h-auto md:h-full object-contain md:object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Scroll indicator - Desktop only */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
          <div className="animate-bounce">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Hero Content Section - Below Video */}
      <section className="relative z-10 py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
              <img
                src="/assets/logo.png"
                alt="Ottobon Logo"
                className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain"
              />
              <div className="font-extrabold text-white tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                OTTOBON
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl text-blue-100 font-light mb-4">
              Empowering the Future of AI-Driven Consulting
            </h1>
            <p className="text-lg text-blue-200 mb-6 max-w-3xl mx-auto">
              Learn from AI to become faster, smarter, and more effective.
              Transform into an independent consultant or enhance your
              professional services with cutting-edge skills.
            </p>
            <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Background effects for sections below */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Static particles (no animation) */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className="gateway-bubble"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                left: `${b.left}%`,
                bottom: `${b.bottomVh}vh`,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))",
              }}
            />
          ))}
        </div>
      </div>

      {/* About / Our Vision */}
      <section
        id="about"
        className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4">
          {/* Heading outside the content container for parity with Services */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
               Our Vision
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>

          <div className="max-w-4xl mx-auto text-blue-100 space-y-4 text-center">
            <p className="text-base md:text-lg leading-relaxed">
              Ottobon exists to help people and teams perform like top-tier
              technology consultants. We combine human mentorship with AI
              acceleration so you learn faster, practice on real scenarios, and
              make better decisions from day one.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our work spans two pillars: Ottobon Academy (career launch and
              upskilling) and Ottobon Professional Services (PSO) for working
              consultants and firms. Together they form a continuous system,
              learn the craft, apply it in the field, and keep advancing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services (Academy + Professional Services) */}
      

      <section
        id="services-overview"
        className="relative z-10 pt-8 sm:pt-10 pb-2 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-px w-28 md:w-32 bg-gradient-to-r from-blue-400/80 via-blue-300/50 to-purple-400/80" />
            <p className="text-blue-200 mt-3 max-w-3xl mx-auto text-base md:text-lg">
              Two complementary tracks. Academy turns students and freshers into
              job-ready consultants with guided paths, projects, and interview
              prep. PSO equips working professionals and firms with AI-powered
              operations—so your delivery, marketing, and admin run with
              enterprise-grade efficiency.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="container mx-auto px-4 pb-6 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 md:gap-8 max-w-4xl mx-auto">

            {/* Academy */}
            <div
              className={`w-full transition-transform duration-300 ${
                hoverState === "academy"
                  ? "scale-[1.02]"
                  : hoverState === "services"
                  ? "scale-[0.98] opacity-90"
                  : ""
              }`}
              onMouseEnter={() => setHoverState("academy")}
              onMouseLeave={() => setHoverState(null)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                {/* base */}
                <div className="relative bg-[#0F1E2E] rounded-2xl ring-1 ring-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
                  {/* subtle texture */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.06)_100%)] opacity-[0.08]" />

                  <div className="relative p-6 md:p-8 flex flex-col">
                    {/* header */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/15">
                        <GraduationCap className="w-6 h-6 text-blue-200" />
                      </div>
                      <h3 className="ml-3 text-xl font-bold text-white">
                        Ottobon Academy
                      </h3>
                    </div>

                    {/* copy */}
                    <p className="text-blue-100 text-sm md:text-base mb-5">
                      Transform students and freshers into independent consultants
                      with job-ready skills in high-demand technologies.
                    </p>

                    {/* bullets */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span className="text-blue-50 text-sm md:text-base">
                          AI-Powered Skill Growth
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span className="text-blue-50 text-sm md:text-base">
                          Land Your Dream Job
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span className="text-blue-50 text-sm md:text-base">
                          Thrive With Expert Guidance
                        </span>
                      </div>
                    </div>

                    {/* cta */}
                    <div className="mt-auto pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (pressing) return;
                          setPressing("academy");
                          setTimeout(() => {
                            navigate("/academy");
                            window.scrollTo(0, 0);
                          }, 160);
                        }}
                        aria-pressed={pressing === "academy"}
                        className={`w-full rounded-full bg-[#FFC107] text-black font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 ${
                          pressing === "academy" ? "scale-[1.02]" : ""
                        }`}
                      >
                        <span className="inline-flex items-center justify-center">
                          Get Started
                          <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              className={`w-full transition-transform duration-300 ${
                hoverState === "services"
                  ? "scale-[1.02]"
                  : hoverState === "academy"
                  ? "scale-[0.98] opacity-90"
                  : ""
              }`}
              onMouseEnter={() => setHoverState("services")}
              onMouseLeave={() => setHoverState(null)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                {/* base */}
                <div className="relative bg-[#0F1E2E] rounded-2xl ring-1 ring-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
                  {/* subtle texture */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(255,255,255,0.06),transparent_60%)] opacity-[0.08]" />

                  <div className="relative p-6 md:p-8 flex flex-col">
                    {/* header */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/15">
                        <BriefcaseBusiness className="w-6 h-6 text-pink-200" />
                      </div>
                      <h3 className="ml-3 text-xl font-bold text-white">
                        Ottobon Services
                      </h3>
                    </div>

                    {/* copy */}
                    <p className="text-purple-100 text-sm md:text-base mb-5">
                      Empowering working professionals to transition into
                      consultant providers with advanced tech learning and
                      professional services.
                    </p>

                    {/* bullets */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span className="text-purple-50 text-sm md:text-base">
                          Transform Health with Innovation
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span className="text-purple-50 text-sm md:text-base">
                          Driving Innovation with Expertise
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span className="text-purple-50 text-sm md:text-base">
                          Legal & Finance
                        </span>
                      </div>
                    </div>

                    {/* cta */}
                    <div className="mt-auto pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (pressing) return;
                          setPressing("services");
                          setTimeout(() => {
                            navigate("/services");
                            window.scrollTo(0, 0);
                          }, 160);
                        }}
                        aria-pressed={pressing === "services"}
                        className={`w-full rounded-full bg-[#FFC107] text-black font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 ${
                          pressing === "services" ? "scale-[1.02]" : ""
                        }`}
                      >
                        <span className="inline-flex items-center justify-center">
                          Get Started
                          <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      

      {/* Footer */}
      <div className="relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-2">
          {/* First row: links */}
          <div className="flex space-x-6 order-1">
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Contact
            </a>
          </div>
          {/* Second row: copyright */}
          <div className="text-white/60 text-sm order-2">
            © {new Date().getFullYear()} Ottobon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}