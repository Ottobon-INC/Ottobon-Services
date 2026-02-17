import React, { useEffect, useRef, useState, useCallback } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- UTILITY FUNCTIONS ---
// Throttle function for performance optimization
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// --- GLOBAL STYLES ---
const STYLES = `
/* --- GLOBAL CSS POLYFILL --- */
:root {
  --font-playfair: 'Playfair Display', Georgia, serif;
  --font-cormorant: 'Cormorant Garamond', Garamond, serif;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-space: 'Space Grotesk', sans-serif;

  /* Theme Variables */
  --color-ink: #0A0A0B;
  --color-ink-soft: #1A1A1C;
  --color-paper: #FFFFFF;
  --color-paper-warm: #FFFFFF;
  --color-graphite: #2D2D2F;
  --color-graphite-light: #4A4A4D;
  --color-mist: #E8E6E3;
  --color-accent-violet: #7C3AED;
  --color-accent-violet-deep: #5B21B6;
  --color-accent-coral: #F97066;
  --color-accent-coral-soft: #FEB8B3;
  --color-accent-gold: #D4AF37;
  --color-accent-gold-soft: #E8D48A;
  --color-accent-cyan: #06B6D4;
  --color-accent-indigo: #4F46E5;
}

/* Tailwind Theme Polyfills - Ensuring portability without config */
.font-display { font-family: var(--font-playfair); }
.font-elegant { font-family: var(--font-cormorant); }
.font-body { font-family: var(--font-inter); }
.font-accent { font-family: var(--font-space); }

.bg-ink { background-color: var(--color-ink); }
.bg-ink-soft { background-color: var(--color-ink-soft); }
.bg-paper { background-color: var(--color-paper); }
.bg-paper-warm { background-color: var(--color-paper-warm); }
.bg-accent-violet { background-color: var(--color-accent-violet); }
.bg-accent-indigo { background-color: var(--color-accent-indigo); }
.bg-accent-cyan { background-color: var(--color-accent-cyan); }
.bg-accent-gold { background-color: var(--color-accent-gold); }

.text-ink { color: var(--color-ink); }
.text-paper { color: var(--color-paper); }
.text-mist { color: var(--color-mist); }
.text-graphite { color: var(--color-graphite); }
.text-graphite-light { color: var(--color-graphite-light); }
.text-accent-violet { color: var(--color-accent-violet); }
.text-accent-indigo { color: var(--color-accent-indigo); }
.text-accent-cyan { color: var(--color-accent-cyan); }
.text-accent-gold { color: var(--color-accent-gold); }

.border-graphite\\/20 { border-color: rgba(45, 45, 47, 0.2); }
.border-graphite\\/10 { border-color: rgba(45, 45, 47, 0.1); }
.border-white\\/20 { border-color: rgba(255, 255, 255, 0.2); }

/* Global Utilities */
.text-gradient-violet {
    background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.text-gradient-warm {
    background: linear-gradient(135deg, #F97066 0%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }

body { background-color: var(--color-paper); color: var(--color-ink); overflow-x: hidden; width: 100%; }

/* Navigation.css */
.nav-link {
    position: relative;
    display: block;
    text-transform: uppercase;
    padding: 8px 16px;
    text-decoration: none;
    color: var(--nav-text, #262626);
    font-family: var(--font-body, sans-serif);
    font-size: 12px;
    font-weight: 400;
    transition: .5s;
    z-index: 1;
    letter-spacing: 0.2em;
}
.nav-link:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: 2px solid var(--nav-text, #262626);
    border-bottom: 2px solid var(--nav-text, #262626);
    transform: scaleY(2);
    opacity: 0;
    transition: .3s;
    pointer-events: none;
}
.nav-link:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--nav-text, #262626);
    transform: scale(0);
    opacity: 0;
    transition: .3s;
    z-index: -1;
    pointer-events: none;
}
.nav-link:hover {
    color: var(--nav-hover-text, #fff);
}
.nav-link:hover:before {
    transform: scaleY(1);
    opacity: 1;
}
.nav-link:hover:after {
    transform: scale(1);
    opacity: 1;
}
.nav-dark .nav-link {
    --nav-text: #F8F7F4;
    --nav-hover-text: #0A0A0B;
}

/* GoldCard.css */
.gold-card-wrapper { perspective: 1000px; }
.gold-card {
    width: 100%; height: 200px; background: #0A0A0B; position: relative;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    border-radius: 10px; overflow: hidden; transition: all 0.5s ease-in-out;
    cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.05);
}
.gold-border {
    position: absolute; inset: 0px; border: 2px solid #bd9f67; opacity: 0;
    transform: rotate(10deg); transition: all 0.5s ease-in-out; pointer-events: none;
}
.gold-bottom-text {
    position: absolute; left: 50%; bottom: 13px; transform: translateX(-50%);
    font-family: var(--font-accent, sans-serif); font-size: 10px; text-transform: uppercase;
    padding: 0px 5px 0px 8px; color: #bd9f67; background: #0A0A0B; opacity: 0;
    letter-spacing: 7px; transition: all 0.5s ease-in-out; white-space: nowrap;
}
.gold-content {
    transition: all 0.5s ease-in-out; display: flex; flex-direction: column;
    align-items: center; justify-content: center; width: 100%; height: 100%;
}
.gold-logo {
    height: 50px; position: relative; width: 50px; display: flex;
    align-items: center; justify-content: center; overflow: hidden; transition: all 1s ease-in-out;
}
.gold-number {
    font-family: var(--font-display, serif); font-size: 40px; color: #bd9f67;
    font-weight: bold; position: absolute; transition: all 0.5s;
}
.gold-trail { position: absolute; right: 0; height: 100%; width: 100%; opacity: 0; }
.gold-logo-text {
    position: absolute; left: 50%; top: 60%; transform: translate(-50%, -50%);
    margin-top: 20px; color: #bd9f67; font-family: var(--font-display, serif);
    font-size: 18px; opacity: 0; letter-spacing: 0px; transition: all 0.5s ease-in-out 0.2s;
    white-space: nowrap; width: 100%; text-align: center;
}
.gold-card:hover {
    border-radius: 0; transform: scale(1.05); border-color: transparent;
}
.gold-card:hover .gold-logo {
    width: 100%; margin-bottom: 20px; align-items: flex-start; padding-top: 20px;
}
.gold-card:hover .gold-number { transform: translateY(-20px) scale(0.8); opacity: 0; }
.gold-card:hover .gold-border { inset: 15px; opacity: 1; transform: rotate(0); }
.gold-card:hover .gold-bottom-text { letter-spacing: 3px; opacity: 1; transform: translateX(-50%); }
.gold-card:hover .gold-logo-text { opacity: 1; letter-spacing: 1px; margin-top: 0; }
.gold-card:hover .gold-trail { animation: gold-trail 1s ease-in-out; }
@keyframes gold-trail {
    0% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%); opacity: 0; }
    30% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%); opacity: 1; }
    70% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%); opacity: 1; }
    95% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%); opacity: 0; }
}

/* holographic.css */
.holographic-card {
    --holo-rgb: 124, 58, 237;
    position: relative; overflow: hidden; transition: all 0.5s ease; z-index: 1;
}
.holographic-card::before {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: linear-gradient(0deg, transparent, transparent 30%, rgba(var(--holo-rgb), 0.3));
    transform: rotate(-45deg); transition: all 0.5s ease; opacity: 0; pointer-events: none; z-index: 2;
}
.holographic-card:hover {
    transform: scale(1.05); box-shadow: 0 0 20px rgba(var(--holo-rgb), 0.5);
}
.holographic-card:hover::before {
    opacity: 1; transform: rotate(-45deg) translateY(100%);
}
.holographic-card-red { --holo-rgb: 239, 68, 68; }
.holographic-card-theme { --holo-rgb: 124, 58, 237; }
.holographic-card-green { --holo-rgb: 34, 197, 94; }

/* hover-underline.css */
.hover-underline { color: inherit; position: relative; display: inline-block; }
.hover-underline::after, .hover-underline::before {
    content: ''; position: absolute; width: 100%; height: 2px;
    background: linear-gradient(to right, #4F46E5, #7C3AED, #06B6D4);
    bottom: -5px; left: 0; transform: scaleX(0); transform-origin: right; transition: transform 0.4s ease-out;
}
.hover-underline::before { bottom: auto; top: -5px; transform-origin: left; }
.hover-underline:hover::after, .hover-underline:hover::before { transform: scaleX(1); }
`;

const StylesInjection = () => {
  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Space+Grotesk:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Inject Styles if not already present
    if (!document.getElementById("talentops-consolidated-styles")) {
      const style = document.createElement("style");
      style.id = "talentops-consolidated-styles";
      style.innerHTML = STYLES;
      document.head.appendChild(style);
    }
  }, []);
  return null;
};

// --- UI COMPONENTS (Placeholders) ---
// SmoothScroll Component
function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for better performance
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    } as any);

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis raf to GSAP ticker
    // GSAP ticker gives time in seconds, Lenis needs ms
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Disable GSAP's lag smoothing for better sync with Lenis
    gsap.ticker.lagSmoothing(0);

    // Intercept Anchor Clicks for Smooth Scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (
        anchor &&
        anchor.hash &&
        anchor.hash.length > 1 &&
        anchor.origin === window.location.origin
      ) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash, { offset: 0 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(update); // Important cleanup
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const darkSections = ["cta"];
      let isDarkSection = false;
      const navHeight = 100; // Approximate nav height for trigger point

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is overlapping with the navigation area
          if (rect.top <= navHeight && rect.bottom >= navHeight / 2) {
            isDarkSection = true;
            break;
          }
        }
      }
      setIsDark(isDarkSection);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", throttledScroll as any);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleLoginClick = () => {
    const ctaSection = document.getElementById("cta");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isMobileMenuOpen
          ? "h-screen bg-white"
          : `h-auto ${scrolled ? "bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "bg-transparent backdrop-blur-sm"}`
      } ${isDark && !isMobileMenuOpen ? "nav-dark" : ""}`}
    >
      <div className="flex items-center justify-between px-6 md:px-16 py-6 md:py-8">
        <div
          className={`flex items-center gap-2 relative z-[1002] ${isMobileMenuOpen ? "text-ink" : ""}`}
        >
          <span className="font-display text-2xl md:text-3xl font-bold text-gradient-violet">
            T
          </span>
          <span
            className={`font-accent text-[0.65rem] md:text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-300 ${isDark && !isMobileMenuOpen ? "text-paper" : "text-graphite"}`}
          >
            Talent Ops
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12">
          {["FEATURES", "TRUST", "LIFECYCLE", "AUDIENCE"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={handleLoginClick}
            className={`font-accent text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 px-4 py-2 ${
              isDark
                ? "text-paper hover:text-neutral-300"
                : "text-ink hover:text-accent-violet"
            }`}
          >
            Login
          </button>
          <a
            href="#cta"
            className={`font-accent text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5 ${
              isDark
                ? "text-ink bg-paper hover:bg-neutral-200"
                : "text-paper bg-ink hover:bg-accent-violet"
            }`}
          >
            Begin
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden relative z-[1002] p-2 focus:outline-none transition-colors duration-300 ${isDark && !isMobileMenuOpen ? "text-paper" : "text-ink"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`absolute inset-0 top-[80px] bg-white flex flex-col items-center justify-start pt-12 gap-8 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        {["FEATURES", "TRUST", "LIFECYCLE", "AUDIENCE"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-display text-2xl text-ink font-bold hover:text-accent-violet"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <div className="flex flex-col items-center gap-6 mt-8">
          <button
            onClick={handleLoginClick}
            className="font-accent text-sm font-semibold tracking-[0.15em] uppercase text-ink hover:text-accent-violet"
          >
            Login
          </button>
          <a
            href="#cta"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-accent text-sm font-semibold tracking-[0.15em] uppercase px-8 py-4 bg-ink text-paper rounded-sm"
          >
            Begin
          </a>
        </div>
      </div>
    </nav>
  );
}
// Footer Component
function Footer() {
  return (
    <footer className="bg-ink text-paper py-6 px-8 md:px-16 border-t border-graphite/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-1">
          <span className="font-display text-2xl font-bold text-gradient-violet mb-2 block">
            T
          </span>
          <span className="font-accent text-xs font-bold tracking-[0.2em] uppercase text-paper block mb-4">
            TALENT OPS
          </span>
          <p className="font-elegant text-mist text-lg italic leading-relaxed opacity-80">
            Architecture of human potential.
          </p>
        </div>

        <div>
          <h5 className="font-accent text-xs font-bold tracking-[0.2em] uppercase text-graphite-light mb-4">
            Product
          </h5>
          <ul className="flex flex-row flex-wrap gap-4 font-body text-sm text-mist/60">
            <li>
              <a
                href="#alignment"
                className="hover:text-accent-violet transition-colors"
              >
                Alignment
              </a>
            </li>
            <li>
              <a
                href="#performance"
                className="hover:text-accent-violet transition-colors"
              >
                Performance
              </a>
            </li>
            <li>
              <a
                href="#growth"
                className="hover:text-accent-violet transition-colors"
              >
                Growth
              </a>
            </li>
            <li>
              <a
                href="#people"
                className="hover:text-accent-violet transition-colors"
              >
                People
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-accent text-xs font-bold tracking-[0.2em] uppercase text-graphite-light mb-4">
            Connect
          </h5>
          <ul className="flex flex-row flex-wrap gap-4 font-body text-sm text-mist/60">
            <li>
              <a
                href="#"
                className="hover:text-accent-violet transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent-violet transition-colors"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent-violet transition-colors"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-graphite/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-accent text-graphite-light tracking-wider uppercase">
        <span>&copy; 2025 Talent Ops Platform. All rights reserved.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-mist transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-mist transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
// ClickSpark Component
interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
  extraScale?: number;
  children: React.ReactNode;
}

const ClickSpark = ({
  sparkColor = "#000000ff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: number;

    const resizeCanvas = () => {
      // Use viewport dimensions instead of parent container
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200) as unknown as number;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    resizeCanvas(); // Initial sizing

    return () => {
      window.removeEventListener("resize", handleResize as any);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    sparkColor,
    sparkSize,
    sparkRadius,
    sparkCount,
    duration,
    easeFunc,
    extraScale,
  ]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
};
// CursorGlow Component
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover (desktop only)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!glowRef.current) return;

      // Smooth lerp animation
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.15;

      glowRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
// ScrollToTop Component
const Wave = () => (
  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="absolute top-[-95%] left-0 w-[400%] h-full text-accent-indigo opacity-90 fill-current animate-wave"
  >
    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
  </svg>
);

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;

      setScrollProgress(Math.min(100, Math.max(0, scroll * 100)));

      if (totalScroll > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", throttledScroll as any);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
                @keyframes wave {
                    0% { transform: translateX(0) translateZ(0) scaleY(1); }
                    50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
                    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                }
                .animate-wave {
                    animation: wave 5s linear infinite;
                }
                @keyframes wave-back {
                        0% { transform: translateX(0) translateZ(0) scaleY(1); }
                    50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
                    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                }
                    .animate-wave-back {
                    animation: wave-back 8s linear infinite reverse;
                }
            `}</style>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 overflow-hidden border-2 border-accent-indigo bg-white group hover:-translate-y-1 hover:shadow-xl ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        {/* Liquid Container */}
        <div
          className="absolute bottom-0 left-0 w-full z-0 bg-accent-indigo"
          style={{
            height: `${scrollProgress}%`,
            transition: "height 0.1s linear",
          }}
        >
          <div className="absolute bottom-full translate-y-1 left-0 w-full h-4 overflow-visible">
            {/* Front Wave */}
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-[400%] h-full fill-accent-indigo animate-wave origin-bottom"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                transform="scale(1, -1) translate(0, -100)"
              />
            </svg>

            {/* Back Wave (Parallax) */}
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-[400%] h-full fill-accent-indigo/50 animate-wave-back origin-bottom z-[-1]"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                transform="scale(1, -1) translate(0, -100)"
              />
            </svg>
          </div>
        </div>

        {/* Icons */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-indigo transition-opacity duration-300"
            style={{ opacity: scrollProgress > 45 ? 0 : 1 }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white transition-opacity duration-300"
            style={{ opacity: scrollProgress > 45 ? 1 : 0 }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </button>
    </>
  );
}
// HolographicCard Component
function HolographicCard({
  children,
  className = "",
  holographicColor = "124, 58, 237",
}: any) {
  return (
    <div
      className={`holographic-card ${className}`}
      style={{ "--holo-rgb": holographicColor } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
// GlowingCard Component
function GlowingCard({
  children,
  className = "",
  variant = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${className} ${variant === "dark" ? "bg-[#0A0A0B] border-white/5" : "bg-white border-black/5"}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}, transparent 40%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
// SpotlightCard Component
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(124, 58, 237, 0.15)", // Default to accent-violet with low opacity
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
// GoldCard Component (Included for completeness/reference)
function GoldCard() {
  return (
    <div className="gold-card-wrapper">
      <div className="gold-card">
        <div className="gold-content">
          <div className="gold-logo">
            <span className="gold-number">1</span>
            <div className="gold-trail"></div>
          </div>
          <div className="gold-logo-text">Talent Ops</div>
          <div className="gold-bottom-text">Platform</div>
          <div className="gold-border"></div>
        </div>
      </div>
    </div>
  );
}

// --- SECTIONS (Placeholders) ---
// HeroSection Component
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".hero-word");

      // Set initial visible state
      gsap.set(words, { y: 0, opacity: 1, rotateX: 0 });

      gsap.fromTo(
        words,
        { y: 50, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        },
      );

      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-paper px-4 md:px-16"
    >
      <div className="relative z-10 w-full max-w-full md:max-w-screen-2xl text-center perspective-[1000px] flex flex-col items-center justify-center gap-0 px-4">
        <div className="overflow-hidden">
          <span className="hero-word inline-block font-display text-[clamp(1.5rem,4vw,3rem)] italic text-ink font-medium origin-bottom">
            THE
          </span>
        </div>

        <div className="overflow-hidden w-full">
          <h1
            className="hero-word font-display 
            text-[clamp(1.75rem,8vw,9rem)] 
            font-bold 
            leading-[0.85] 
            tracking-tight 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-[#6A3DF0] 
            via-[#5B5CE6] 
            to-[#3B82F6] 
            w-full 
            origin-bottom"
          >
            ARCHITECTURE
          </h1>
        </div>

        <div className="overflow-hidden">
          <span className="hero-word inline-block font-display text-[clamp(1.5rem,4vw,3rem)] italic text-ink font-medium origin-bottom">
            OF
          </span>
        </div>

        <div className="overflow-hidden w-full">
          <h2 className="hero-word font-display text-[clamp(1.75rem,8vw,9rem)] font-black leading-[0.85] tracking-tight text-ink w-full origin-bottom">
            TALENT
          </h2>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-accent text-[0.6rem] tracking-[0.2em] uppercase text-graphite">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-graphite to-transparent" />
      </div>
    </section>
  );
}
// OfferSection Component
function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".offer-card", { opacity: 1, y: 0 });
      gsap.set(".positioning-line", { opacity: 1, y: 0 });

      gsap.from(".offer-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          invalidateOnRefresh: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".positioning-line", {
        scrollTrigger: {
          trigger: ".positioning-line",
          start: "top 95%",
          invalidateOnRefresh: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.8,
        delay: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-paper px-8 md:px-16"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-accent text-xs font-medium tracking-[0.3em] uppercase text-graphite-light mb-6 block">
            WHAT WE OFFER (Clarity, Not Features)
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-6">
            What We Offer
          </h2>
          <p className="font-elegant text-xl text-graphite max-w-2xl mx-auto">
            TalentOps is available in two forms, depending on how much you want
            to own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Service */}
          <div className="offer-card relative p-10 bg-white rounded-2xl border border-graphite/10 hover:border-accent-violet transition-all duration-300 shadow-sm group hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-8">
              <h3 className="font-display text-3xl font-bold text-ink mb-4">
                Talent Ops as a Service
              </h3>
              <p className="font-elegant text-lg text-graphite/80">
                For companies that want to focus purely on execution.
              </p>
            </div>

            <div className="mb-8 p-6 bg-paper-warm rounded-xl">
              <p className="font-medium text-ink mb-4">
                We remotely manage your end-to-end talent operations from India,
                including:
              </p>
              <ul className="space-y-3">
                {[
                  "Hiring and onboarding",
                  "HR operations",
                  "Project and delivery management",
                  "Billing and invoicing",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-graphite">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-graphite/10">
              <p className="font-display text-xl font-medium text-accent-violet">
                You don’t build teams or processes.
                <br />
                You consume outcomes.
              </p>
            </div>
          </div>

          {/* Card 2: Platform */}
          <div className="offer-card relative p-10 bg-white rounded-2xl border border-graphite/10 hover:border-accent-cyan transition-all duration-300 shadow-sm group hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-8">
              <h3 className="font-display text-3xl font-bold text-ink mb-4">
                Talent Ops as a Platform
              </h3>
              <p className="font-elegant text-lg text-graphite/80">
                For companies with teams that want operational clarity.
              </p>
            </div>

            <div className="mb-8 p-6 bg-paper-warm rounded-xl">
              <p className="font-medium text-ink mb-4">
                Use a single system to manage:
              </p>
              <ul className="space-y-3">
                {["People", "Work", "Delivery", "Revenue"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-graphite">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-graphite/10">
              <p className="font-display text-xl font-medium text-graphite">
                Replace tool chaos with a unified Operating System.
              </p>
            </div>
          </div>
        </div>

        <div className="positioning-line text-center py-10 border-y border-graphite/10">
          <p className="font-display text-2xl md:text-3xl font-medium text-ink">
            Platform when you want{" "}
            <span className="text-accent-cyan">control</span>. Service when you
            want <span className="text-accent-violet">simplicity</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
// ProblemSection Component
function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".problem-title", { opacity: 1, y: 0 });
      gsap.set(".problem-list li", { opacity: 1, x: 0 });
      gsap.set(".solution-text", { opacity: 1, scale: 1 });

      gsap.from(".problem-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(".problem-list li", {
        scrollTrigger: {
          trigger: ".problem-list",
          start: "top 90%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
        x: -25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
      });
      gsap.from(".solution-text", {
        scrollTrigger: {
          trigger: ".solution-text",
          start: "top 95%",
          invalidateOnRefresh: true,
        },
        scale: 0.97,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-paper-warm px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="problem-title font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-ink mb-16 leading-tight">
          Why Manual Processes
          <br />
          <span className="text-red-500/80">Break</span>
        </h2>

        <div className="mb-12">
          <p className="font-elegant text-xl text-graphite mb-8">
            In professional services, talent operations are fragmented by
            design. Traditionally, you need:
          </p>
          <ul className="problem-list space-y-6 mb-16">
            {[
              "One person for hiring and HR",
              "One person for delivery or project management",
              "One person for billing and finance",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-xl font-elegant text-graphite"
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-elegant text-2xl text-graphite/60 italic">
            Each sees only their part. No one sees the whole system.
          </p>
        </div>

        <div className="solution-text p-8 border-l-4 border-red-500 bg-red-50 rounded-r-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <h3 className="font-display text-2xl text-red-600 font-bold mb-6">
            The Result
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Delays",
              "Blind spots",
              "Low accountability",
              "Teams disconnected from business reality",
            ].map((res, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-red-500">✕</span>
                <span className="font-medium text-ink">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// BuiltForIndiaSection Component
function BuiltForIndiaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".reveal-text", { opacity: 0, y: 30 });

      gsap.fromTo(
        ".reveal-text",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-4 md:px-16"
      id="built-for-india"
    >
      <div className="max-w-4xl mx-auto">
        <span className="reveal-text font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-6 block"></span>

        <h2 className="reveal-text font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-8 leading-tight">
          Built for <span className="text-accent-violet">Tier-2 & Tier-3</span>{" "}
          Cities
        </h2>

        <div className="reveal-text mb-12 space-y-6">
          <p className="font-elegant text-xl text-graphite">
            Most global HR tools assume metro realities. India doesn’t work that
            way.
          </p>
          <p className="font-elegant text-xl text-graphite">
            Talent in Tier-2 and Tier-3 cities thinks differently, communicates
            differently, and works under different constraints.
          </p>
          <p className="font-medium text-xl text-ink border-l-4 border-accent-cyan pl-6 py-2 bg-cyan-50/50 rounded-r-lg">
            Your people don’t lack intelligence. They lose productivity in
            translation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            "Thinks in native language → executes in English",
            "Bilingual cognition is real, not a flaw",
            "Confidence gaps reduce output, not capability",
            "One-size-fits-all SaaS breaks here",
          ].map((item, i) => (
            <div
              key={i}
              className="reveal-text flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent-indigo/30"
            >
              <span className="w-2 h-2 rounded-full bg-accent-indigo shrink-0" />
              <span className="font-elegant text-lg text-graphite">{item}</span>
            </div>
          ))}
        </div>

        <p className="reveal-text font-display text-2xl text-ink font-medium text-center md:text-left">
          Designed for scalable, repeatable execution.
        </p>
      </div>
    </section>
  );
}
// AiThinkingSection Component
function AiThinkingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".ai-item", { opacity: 0, y: 25 });

      gsap.fromTo(
        ".ai-item",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper-warm overflow-hidden relative px-8 md:px-16"
      id="ai-thinking"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="ai-item font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-6 leading-tight">
            AI That Understands <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r
              from-[#6A3DF0]
              via-[#5B5CE6]
              to-[#3B82F6]"
            >
              How People Think
            </span>
          </h2>
          <p className="ai-item font-display text-2xl text-graphite">
            Not Just What They Do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <HolographicCard className="ai-item p-8 bg-white/50 backdrop-blur-sm space-y-6">
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                <p className="font-elegant text-xl text-graphite">
                  Most systems track tasks. <br />
                  <span className="text-red-500 font-medium">
                    They ignore cognition.
                  </span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                <p className="font-elegant text-xl text-graphite">
                  TalentOps adapts to how people process information, not just
                  outcomes.
                </p>
              </li>
            </ul>
          </HolographicCard>

          <HolographicCard className="ai-item p-8 bg-white/50 backdrop-blur-sm">
            <h3 className="font-display text-xl text-ink mb-6">
              What this means:
            </h3>
            <ul className="space-y-4">
              {[
                "Supports bilingual communication naturally",
                "Adapts to personality and working style",
                "Reduces cognitive load, not adds dashboards",
                "Improves clarity, confidence, and speed",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-lg text-graphite"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </HolographicCard>
        </div>

        <div className="ai-item text-center border-t border-graphite/10 pt-12">
          <p className="font-display text-2xl md:text-3xl font-medium text-ink">
            This is AI aligned to human thinking
            <br />
            <span className="text-graphite/60 text-xl md:text-2xl mt-2 block">
              — not forcing humans to think like software.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
// ProductivitySection Component
function ProductivitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".prod-item", { opacity: 0, scale: 0.95 });

      gsap.to(".prod-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-8 md:px-16"
      id="productivity"
    >
      <div className="max-w-5xl mx-auto">
        <div className="prod-item text-center mb-12">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-cyan mb-4 block">
            PRODUCTIVITY, NOT JUST HIRING
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-6">
            Productivity Is the{" "}
            <span className="text-red-500">Real Problem</span>
          </h2>
          <p className="font-elegant text-xl text-graphite max-w-2xl mx-auto">
            Hiring more people won’t fix execution gaps. Training alone won’t
            unlock output. The biggest opportunity is hidden productivity inside
            existing teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Unlock 30%+", desc: "productivity from current talent" },
            {
              title: "Transform",
              desc: "average performers into high-impact contributors",
            },
            {
              title: "Reduce Friction",
              desc: "across communication, ownership, and follow-through",
            },
            {
              title: "Unify Tools",
              desc: "Replace scattered tools with enforced workflows",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="prod-item p-6 bg-paper-warm rounded-2xl border border-graphite/5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent-violet/30"
            >
              <div className="w-10 h-10 rounded-full bg-accent-violet/10 flex items-center justify-center mb-4 text-accent-violet text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                {card.title}
              </h3>
              <p className="font-elegant text-graphite">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="prod-item text-center bg-accent-indigo/5 p-8 rounded-2xl border border-accent-indigo/10">
          <p className="font-display text-2xl text-accent-indigo font-medium">
            This is Talent Operations — not recruitment software.
          </p>
        </div>
      </div>
    </section>
  );
}

// LearningLoopSection Component
function LearningLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".loop-item", { opacity: 0, scale: 0.9 });

      gsap.to(".loop-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper-warm px-4 md:px-16"
      id="learning"
    >
      <div className="max-w-5xl mx-auto text-center">
        <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-6 block">
          LEARN → WORK → IMPROVE LOOP
        </span>

        <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-8">
          Learning That Leads to{" "}
          <span className="text-accent-violet">Real Work</span>
        </h2>

        <p className="font-elegant text-xl text-graphite mb-16 max-w-2xl mx-auto">
          Certificates don’t build confidence. Real work does. TalentOps
          connects learning directly to execution.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16 py-4">
          {["Learn", "Work", "Improve", "Earn", "Scale"].map((step, i, arr) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center shrink-0"
            >
              <div className="loop-item px-8 py-4 rounded-full bg-white border border-gray-100 shadow-sm transition-all duration-300 min-w-[120px] text-center hover:shadow-lg hover:-translate-y-1 hover:border-accent-violet/30 cursor-default">
                <span className="font-elegant text-xl text-ink font-medium transition-colors duration-300 group-hover:text-accent-violet">
                  {step}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="loop-item my-2 md:my-0 md:mx-4 text-gray-300 md:rotate-0 rotate-90">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            "AI-guided upskilling aligned to real roles",
            "Live projects, not mock exercises",
            "Continuous improvement through feedback",
            "Industry-ready talent, not certificate holders",
          ].map((feature, i) => (
            <div
              key={i}
              className="loop-item p-6 bg-white rounded-xl border border-graphite/10 shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-accent-violet mb-4" />
              <p className="font-elegant text-lg text-ink font-medium leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-display text-2xl text-ink font-medium">
          This is where education meets outcomes.
        </p>
      </div>
    </section>
  );
}
// WhyNowSection Component
function WhyNowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".why-content", { opacity: 0, scale: 0.95 });

      gsap.to(".why-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-8 md:px-16"
      id="why-now"
    >
      <div className="max-w-4xl mx-auto text-center why-content">
        <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-6 block">
          WHY NOW? (AI REALISM, NOT HYPE)
        </span>

        <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-10 leading-tight">
          AI Hype Is Real. <br />
          <span className="text-red-500">Jobs Aren’t Guaranteed.</span>
        </h2>

        <div className="bg-white p-10 rounded-2xl shadow-sm border border-graphite/10 max-w-3xl mx-auto">
          <div className="space-y-4 mb-8 font-elegant text-xl text-graphite">
            <p>AI adoption is rising.</p>
            <p>Hiring is cautious.</p>
            <p className="font-medium text-ink">
              Skill displacement is already happening.
            </p>
          </div>

          <div className="py-8 border-y border-graphite/10 mb-8">
            <p className="font-display text-2xl text-ink leading-relaxed">
              The winners won’t be "AI experts." <br />
              They’ll be{" "}
              <span className="text-accent-indigo font-bold bg-indigo-50 px-2 py-1 rounded">
                AI-native operators
              </span>
            </p>
            <p className="mt-4 font-elegant text-lg text-graphite/80">
              — people who know how to work with systems, structure, and
              execution.
            </p>
          </div>

          <p className="font-display text-xl font-medium text-red-500">
            Adapt before displacement forces it.
          </p>
        </div>
      </div>
    </section>
  );
}
// UseCasesSection Component
function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".use-case-card", { opacity: 0, y: 30 });

      gsap.to(".use-case-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper px-4 md:px-16"
      id="use-cases"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-cyan mb-6 block">
            BUILT FOR REAL USE CASES
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-6">
            Designed to Work{" "}
            <span className="text-accent-cyan">Where It Matters</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[
            "Professional services firms",
            "Internal Talent Ops teams",
            "Educational institutions and academies",
          ].map((useCase, i) => (
            <div
              key={i}
              className="use-case-card group p-8 bg-white rounded-xl border border-graphite/10 hover:border-accent-cyan/50 hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-1.5rem)]"
            >
              <div className="flex items-center gap-4">
                <h3 className="font-elegant text-2xl text-ink font-medium">
                  {useCase}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="use-case-card flex flex-wrap justify-center gap-4 md:gap-12">
          {[
            "Compliance-aware",
            "Process-driven",
            "Scalable across sectors",
          ].map((tag, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-accent-cyan">✓</span>
              <span className="font-elegant text-lg text-graphite font-medium">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// PhilosophyReinforcement Component
function PhilosophyReinforcement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".phil-text", { opacity: 0, y: 20 });

      gsap.to(".phil-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper-warm px-8 md:px-16"
      id="philosophy"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-6 block phil-text">
            CORE PHILOSOPHY
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink mb-2 phil-text">
            AI Assists.
          </h2>
          <h2
            className="font-display 
            text-[clamp(2.5rem,5vw,4.5rem)] 
            font-bold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-[#6A3DF0] 
            via-[#5B5CE6] 
            to-[#3B82F6]"
          >
            Experts Decide.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="phil-text p-8 bg-white rounded-2xl border border-graphite/10 shadow-sm hover:shadow-md transition-all duration-300">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-accent-violet shrink-0" />
                <span className="font-elegant text-lg text-graphite">
                  Experts define rules.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-accent-violet shrink-0" />
                <span className="font-elegant text-lg text-graphite">
                  AI operates within them.
                </span>
              </li>
            </ul>
          </div>

          <div className="phil-text p-8 bg-white rounded-2xl border border-graphite/10 shadow-sm hover:shadow-md transition-all duration-300">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-accent-violet shrink-0" />
                <span className="font-elegant text-lg text-graphite">
                  Progress is blocked if requirements aren't met.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-accent-violet shrink-0" />
                <span className="font-elegant text-lg text-graphite">
                  Completion happens only after validation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="phil-text border-t border-graphite/10 pt-12 mt-8">
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 font-display text-xl text-graphite/40 font-medium text-center">
            <span>No shortcuts.</span>
            <span>No hallucinations.</span>
            <span>No fake productivity.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
// CorePhilosophy Component
function CorePhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".core-content", { opacity: 0, y: 30 });

      gsap.to(".core-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-8 md:px-16"
      id="core-philosophy"
    >
      <div className="max-w-6xl mx-auto text-center">
        <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-8 block core-content">
          THE SHIFT
        </span>

        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-ink mb-8 leading-tight core-content max-w-5xl mx-auto">
          We believe one capable person <br />
          should be able to{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r 
            from-[#6A3DF0] 
            via-[#5B5CE6] 
            to-[#3B82F6]"
          >
            see and manage
          </span>
          <br />
          the entire lifecycle. <br />
        </h2>

        <p className="font-elegant text-xl text-graphite mb-20 core-content">
          From recruiting → to execution → to billing.{" "}
          <span className="text-ink font-medium">End to end.</span>
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20">
          {[
            "Improves decision-making",
            "Reduces overhead",
            "Increases ownership",
            "Raises employee morale",
          ].map((benefit, i) => (
            <div key={i} className="core-content flex items-center gap-3 group">
              <div className="w-2 h-8 bg-accent-indigo/20 rounded-full flex items-center justify-center relative overflow-hidden group-hover:bg-accent-indigo transition-colors duration-300">
                <div className="absolute top-0 w-full h-1/2 bg-accent-indigo rounded-full" />
              </div>
              <span className="font-elegant text-lg text-graphite group-hover:text-ink transition-colors">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        <div className="core-content border-t border-graphite/10 pt-16 max-w-4xl mx-auto">
          <p className="font-display text-xl md:text-2xl text-ink font-medium leading-relaxed">
            When people see how value is created, they naturally contribute more
            <br />
            —without being told.
          </p>
        </div>
      </div>
    </section>
  );
}
// FixedTaskLifecycle Component
function FixedTaskLifecycle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cycle-step", { opacity: 0, scale: 0.9 });
      gsap.set(".cycle-arrow", { opacity: 0, x: -5 });

      // Simple reveal for steps
      gsap.to(".cycle-step", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
      // Simple reveal for arrows
      gsap.to(".cycle-arrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0.5, // Subtle arrow
        x: 0,
        duration: 0.5,
        delay: 0.2, // bit later
        stagger: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const Step = ({ name }: { name: string }) => (
    <div className="cycle-step px-8 py-4 rounded-full bg-white border border-graphite/10 shadow-sm text-ink font-medium font-elegant text-base md:text-lg whitespace-nowrap min-w-[120px] text-center">
      {name}
    </div>
  );

  const Arrow = () => (
    <span className="cycle-arrow text-graphite/40 mx-2">→</span>
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper-warm px-4 md:px-16"
      id="lifecycle"
    >
      <div className="max-w-6xl mx-auto text-center">
        <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-ink mb-6 block">
          HOW IT WORKS
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink mb-6">
          A Consistent Way to Work
        </h2>
        <p className="font-elegant text-lg md:text-xl text-graphite mb-16">
          Every task in TalentOps follows the same enforced lifecycle.
        </p>

        <div className="flex flex-col items-center gap-8 mb-20 overflow-x-auto pb-4">
          {/* Row 1 */}
          <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
            <Step name="Capture" />
            <Arrow />
            <Step name="Refinement" />
            <Arrow />
            <Step name="Design" />
            <Arrow />
            <Step name="Validation" />
            <Arrow />
            <Step name="Build Guidance" />
            <Arrow />
            {/* Wrap to next line logically if space constrains, but design implies flow */}
          </div>
          {/* Row 2 - connecting visually to row 1? Or just a second row. Image shows flow continuing. */}
          <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
            <Step name="Execution & Tracking" />
            <Arrow />
            <Step name="Closing" />
            <Arrow />
            <Step name="Learning" />
          </div>
        </div>

        <div className="border-t border-graphite/10 w-24 mx-auto mb-12"></div>

        <div className="text-center">
          <span className="font-accent text-[0.65rem] font-bold tracking-[0.2em] uppercase text-accent-violet mb-4 block">
            KEY PRINCIPLE
          </span>
          <p className="font-display text-2xl md:text-3xl font-medium text-ink mb-2">
            Progress is blocked if requirements are missing.
          </p>
          <p
            className="font-display 
            text-2xl md:text-3xl 
            font-medium 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-[#6A3DF0] 
            via-[#5B5CE6] 
            to-[#3B82F6] 
            mb-10"
          >
            Completion happens only after validation.
          </p>

          <p className="font-elegant text-lg text-graphite">
            This is how{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r 
              from-[#6A3DF0] 
              via-[#5B5CE6] 
              to-[#3B82F6] 
              font-bold"
            >
              consistency is enforced.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
// AiIntelligenceSection Component
function AiIntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".ai-content", { opacity: 0, y: 30 });

      gsap.to(".ai-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-8 md:px-16"
      id="intelligence"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-cyan mb-6 block ai-content">
            WHY THIS IS DIFFERENT (AI, BUT CONTROLLED)
          </span>
          <h2 className="ai-content font-display text-[clamp(2.5rem,5vw,5rem)] font-bold text-ink mb-6 leading-tight">
            AI That Doesn't <br />
            <span className="text-accent-violet">Invent Work</span>
          </h2>
          <p className="ai-content font-elegant text-xl text-graphite/80 max-w-2xl">
            We still leverage modern LLMs. But intelligence is governed, not
            unleashed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <div className="ai-content p-8 bg-white rounded-2xl border border-graphite/10 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h4 className="font-display text-2xl font-bold text-ink mb-6">
              Most AI tools rely on:
            </h4>
            <ul className="space-y-3">
              {[
                "Generic knowledge",
                "Pattern guessing",
                "Hallucinated confidence",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="font-elegant text-lg text-graphite">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="ai-content p-8 bg-white rounded-2xl border border-graphite/10 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h4 className="font-display text-2xl font-bold text-ink mb-6">
              TalentOps works differently:
            </h4>
            <ul className="space-y-3">
              {[
                "Experts define processes and rules",
                "AI operates only within those boundaries",
                "Templates replace guesswork",
                "Validation replaces assumptions",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                  <span className="font-elegant text-lg text-graphite">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ai-content text-center md:text-left border-t border-graphite/10 pt-12">
          <p className="font-display text-2xl md:text-3xl font-medium text-ink">
            AI assists execution. <br />
            <span className="text-accent-cyan">It never defines reality.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
// TargetAudienceSection Component
function TargetAudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".audience-card", { opacity: 0, y: 20 });
      gsap.set(".audience-text", { opacity: 0, y: 10 });

      gsap.to(".audience-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.to(".audience-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white px-8 md:px-16"
      id="audience"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-graphite/60 mb-4 block">
            WHO THIS IS FOR (BUYER SELF-SELECTION)
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink mb-4">
            Who Uses TalentOps
          </h2>
          <p className="font-elegant text-lg text-graphite">
            If execution quality matters, TalentOps fits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {[
            "Founders who want to focus on delivery, not operations",
            "Small teams scaling their first service lines",
            "Mid-sized companies expanding into new regions",
            "Organizations that want visibility without complexity",
          ].map((text, i) => (
            <div
              key={i}
              className="audience-card p-6 bg-white rounded-xl border border-graphite/10 shadow-sm flex items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:border-accent-violet/30"
            >
              <p className="font-display text-lg font-medium text-ink leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-graphite/10 w-16 mx-auto mb-12"></div>

        <div className="text-center audience-text">
          <h3 className="font-display text-2xl md:text-3xl font-medium text-ink mb-2">
            Whether you{" "}
            <span className="text-accent-violet">outsource everything</span>{" "}
            <br />
            Or <span className="text-accent-cyan">manage it yourself</span>
          </h3>
          <p className="font-elegant text-base text-graphite/60 italic">
            The operating system remains the same.
          </p>
        </div>
      </div>
    </section>
  );
}
// TransparencySection Component
function TransparencySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(".transparency-block");

      // Set initial state explicitly for all blocks
      blocks.forEach((block: any) => {
        gsap.set(block.children, { opacity: 1, y: 0 });
      });

      blocks.forEach((block: any, i) => {
        gsap.from(block.children, {
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
          y: 25,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Set initial state for dividers
      gsap.set(".divider", { opacity: 1, scaleX: 1 });

      // Divider animation
      gsap.utils.toArray(".divider").forEach((div: any) => {
        gsap.from(div, {
          scrollTrigger: {
            trigger: div,
            start: "top 95%",
            invalidateOnRefresh: true,
          },
          opacity: 0,
          scaleX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-paper relative overflow-hidden px-8 md:px-16"
      id="trust"
    >
      {/* Background enhancement */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-graphite/10 to-transparent" />

      <div className="max-w-5xl mx-auto space-y-32">
        {/* Intro Block */}
        <div className="transparency-block text-center max-w-4xl mx-auto">
          <span className="font-accent text-xs font-bold tracking-[0.3em] uppercase text-accent-cyan mb-8 block">
            TRANSPARENCY
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink mb-10 leading-tight">
            Visibility That Aligns
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r 
              from-[#6A3DF0] 
              via-[#5B5CE6] 
              to-[#3B82F6]"
            >
              People and Performance
            </span>
          </h2>
          <div className="space-y-6 font-elegant text-xl text-graphite leading-relaxed max-w-2xl mx-auto">
            <p>
              In every organization, work happens every day—but visibility is
              often missing.
            </p>
            <p>
              TalentOps brings transparency to effort, contribution, and
              outcomes, ensuring employees, managers, and executives operate
              with shared clarity.
            </p>
            <p className="font-medium text-ink pt-4 border-t border-graphite/10 mt-8 inline-block w-full">
              When work is visible, decisions become fair, performance becomes
              measurable, and trust becomes structural.
            </p>
          </div>
        </div>

        <div className="divider flex justify-center text-graphite/20 text-4xl font-display">
          ⸻
        </div>

        {/* Block 1: Employee Revenue Transparency */}
        <div className="transparency-block grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-accent text-xs font-medium tracking-[0.2em] uppercase text-accent-violet mb-4 block">
              EMPLOYEE REVENUE TRANSPARENCY
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6">
              Turn Work Into <br />
              <span className="text-accent-violet">
                Measurable Business Value
              </span>
            </h3>
            <p className="font-elegant text-lg text-graphite leading-relaxed mb-6">
              TalentOps connects these dots. Our platform calculates how
              employee effort across projects and tasks translates into real
              business value, giving organizations a clear view of salary paid
              vs revenue generated.
            </p>
            <p className="font-elegant text-lg text-graphite leading-relaxed">
              This transparency helps managers recognize high impact
              contributors and enables employees to understand their true value
              to the organization.
            </p>
          </div>
          <div className="bg-white border border-graphite/10 rounded-2xl p-8 shadow-sm">
            <ul className="space-y-6">
              {[
                "Every employee works on tasks",
                "Every task contributes to a project",
                "Every project drives revenue",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-xl text-ink font-display"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-violet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider flex justify-center text-graphite/20 text-4xl font-display">
          ⸻
        </div>

        {/* Block 2: Salary vs Revenue */}
        <div className="transparency-block text-center max-w-5xl mx-auto py-24 md:py-32">
          <span className="font-accent text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan mb-10 block">
            SALARY VS REVENUE — FULL TRANSPARENCY
          </span>
          <h3 className="font-display text-5xl md:text-6xl font-bold text-ink mb-16">
            Transparency That Builds Trust
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                title: "Employees",
                desc: "See how their work contributes to company revenue",
              },
              {
                title: "Team Lead",
                desc: "Monitor team performance and guide execution",
              },
              {
                title: "Managers",
                desc: "Identify who drives measurable outcomes",
              },
              {
                title: "Executives",
                desc: "Understand workforce profitability at a glance",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="relative h-[200px] overflow-hidden group cursor-pointer"
              >
                {/* Slide 1 - Title (visible by default, slides up on hover) */}
                <div className="absolute w-full h-full flex items-center justify-center bg-accent-cyan rounded-xl transition-transform duration-700 ease-out group-hover:-translate-y-full z-10">
                  <h4 className="font-display text-2xl text-white text-center px-4">
                    {card.title}
                  </h4>
                </div>

                {/* Slide 2 - Description (hidden below, slides up on hover) */}
                <div className="absolute w-full h-full flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-graphite/10 shadow-lg transition-transform duration-700 ease-out translate-y-full group-hover:translate-y-0">
                  <p className="font-elegant text-graphite text-base leading-relaxed text-center">
                    {card.desc}
                  </p>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent-cyan rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-display text-2xl md:text-3xl text-ink">
            Visible. Role-based. Secure.
            <br />
            <span className="text-graphite text-xl md:text-2xl font-elegant mt-6 block">
              Transparency designed to align effort, performance, and growth.
            </span>
          </p>
        </div>

        <div className="divider flex justify-center text-graphite/20 text-4xl font-display">
          ⸻
        </div>

        {/* Block 3: Tasks to Revenue */}
        <div className="transparency-block grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-gradient-to-br from-paper-warm to-white border border-graphite/10 rounded-2xl p-8 shadow-sm">
            <h4 className="font-display text-xl text-ink mb-6 border-b border-graphite/10 pb-4">
              TalentOps Analyzes:
            </h4>
            <ul className="space-y-4 mb-8">
              {[
                "Time spent on tasks and projects",
                "Task completion and work consistency",
                "Project involvement and outcomes",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-graphite">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="p-4 bg-violet-50 border border-accent-violet/20 rounded-xl text-center">
              <p className="font-display text-lg text-accent-violet">
                ↓ Transforms daily work into <br />
                <span className="font-bold">Revenue Intelligence</span>
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="font-accent text-xs font-medium tracking-[0.2em] uppercase text-accent-violet mb-4 block">
              FROM TASKS TO REVENUE INTELLIGENCE
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6">
              Every Action Counts
            </h3>
            <p className="font-elegant text-lg text-graphite leading-relaxed">
              This allows organizations to move from{" "}
              <span className="text-ink font-medium">activity tracking</span> to{" "}
              <span className="text-accent-violet font-medium">
                impact measurement
              </span>
              .
            </p>
          </div>
        </div>

        <div className="divider flex justify-center text-graphite/20 text-4xl font-display">
          ⸻
        </div>

        {/* Block 4: One Platform */}
        <div className="transparency-block text-center">
          <span className="font-accent text-xs font-medium tracking-[0.2em] uppercase text-accent-cyan mb-4 block">
            ONE PLATFORM. ALL ORGANIZATIONAL TOOLS.
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-12">
            No More Disconnected Systems
          </h3>
          <div className="max-w-6xl mx-auto mb-12">
            {/* First row - 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[
                "HR Management",
                "Work Management",
                "Payroll & Finance",
                "Hiring & Recruitment",
              ].map((tool, i) => (
                <HolographicCard key={i}>
                  <div className="p-8 text-ink font-display text-xl flex items-center justify-center text-center min-h-[120px]">
                    {tool}
                  </div>
                </HolographicCard>
              ))}
            </div>
            {/* Second row - 3 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                "Organization Structure",
                "Communication",
                "Analytics & Dashboards",
              ].map((tool, i) => (
                <HolographicCard key={i + 4}>
                  <div className="p-8 text-ink font-display text-xl flex items-center justify-center text-center min-h-[120px]">
                    {tool}
                  </div>
                </HolographicCard>
              ))}
            </div>
          </div>
          <p className="font-display text-2xl text-ink italic">
            Everything works together — seamlessly.
          </p>
        </div>

        <div className="divider flex justify-center text-graphite/20 text-4xl font-display">
          ⸻
        </div>

        {/* Block 5: Modern Organizations */}
        <div className="transparency-block text-center max-w-4xl mx-auto py-20">
          <span className="font-accent text-xs font-medium tracking-[0.2em] uppercase text-graphite-light mb-8 block">
            BUILT FOR MODERN ORGANIZATIONS
          </span>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-ink mb-12 leading-tight">
            Designed for <br />
            Scale, Clarity, and Control
          </h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-graphite font-elegant text-base">
            <span>Data-driven decisions</span> •<span>Reduced complexity</span>{" "}
            •<span>Fairness through visibility</span>
          </div>
          <div className="space-y-3">
            <p className="font-display text-2xl md:text-3xl text-graphite">
              It's not just management.
            </p>
            <p
              className="font-display 
              text-3xl md:text-4xl 
              font-bold 
              text-transparent 
              bg-clip-text 
              bg-gradient-to-r 
              from-[#6A3DF0] 
              via-[#5B5CE6] 
              to-[#3B82F6]"
            >
              It's organizational intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTASection Component
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Set initial states
      gsap.set(".cta-line-top", { scaleX: 0 });
      gsap.set(".cta-line-bottom", { scaleX: 0 });
      gsap.set(".cta-subtext", { y: 20, opacity: 0 });
      gsap.set(".cta-button", { y: 20, opacity: 0 });

      // cta-words 1, 2, 3 already have opacity-0 translate-y-8 in JSX, so we can animate TO them or SET them if we strip JSX.
      // Let's strip JSX classes in next step for consistency, but for now we can just animate to.
      // Actually, best to SET them here too for safety.
      gsap.set(".cta-word-1", { y: 30, opacity: 0 });
      gsap.set(".cta-word-2", { y: 30, opacity: 0 });
      gsap.set(".cta-word-3", { y: 30, opacity: 0 });

      timeline
        .to(".cta-line-top", { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
        .to(
          ".cta-word-1",
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          ".cta-word-2",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".cta-word-3",
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".cta-subtext",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          ".cta-button",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          ".cta-line-bottom",
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="min-h-[80vh] bg-ink text-paper flex flex-col justify-center items-center text-center px-8 md:px-16 py-32"
    >
      <div className="max-w-4xl w-full">
        <div className="cta-line-top w-[60px] h-[1px] bg-accent-gold mx-auto mb-32" />

        <div className="flex flex-col gap-0 mb-16">
          <span className="cta-word-1 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight">
            BEGIN
          </span>
          <span className="cta-word-2 font-display text-[clamp(1.25rem,3vw,2rem)] font-normal italic text-mist">
            YOUR
          </span>
          <span className="cta-word-3 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight text-gradient-violet">
            TRANSFORMATION
          </span>
        </div>

        <p className="cta-subtext font-elegant text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.8] text-mist mb-16 max-w-3xl mx-auto whitespace-nowrap">
          The future of work is written in the language of human potential.
        </p>

        <button className="cta-button inline-flex items-center gap-4 font-accent text-sm font-semibold tracking-[0.2em] uppercase text-ink bg-paper px-16 py-8 rounded-sm transition-all duration-300 hover:text-paper relative overflow-hidden group">
          <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan transition-all duration-300 group-hover:left-0 z-0" />
          <span className="relative z-10">Request a Demo</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        <div className="cta-line-bottom w-[60px] h-[1px] bg-accent-gold mx-auto mt-32" />
      </div>
    </section>
  );
}

// New Age of Talent Section (Light Theme with Violet/Blue)
function NewAgeTalentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Initial setup
      gsap.set(".new-age-title", { y: 50, opacity: 0 });
      gsap.set(".new-age-text", { y: 30, opacity: 0 });
      gsap.set(".new-age-highlight", { scale: 0.95, opacity: 0 });
      gsap.set(".new-age-pillar", { y: 20, opacity: 0 });
      gsap.set(".new-age-divider", { scaleX: 0, opacity: 0 });

      tl.to(".new-age-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
        .to(".new-age-text-1", { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .to(
          ".new-age-highlight",
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .to(".new-age-text-2", { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .to(
          ".new-age-divider",
          { scaleX: 1, opacity: 0.3, duration: 0.8, ease: "power2.inOut" },
          "-=0.2",
        )
        .to(".new-age-text-3", { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .to(
          ".new-age-pillar",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .to(".new-age-text-4", { y: 0, opacity: 1, duration: 0.8 }, "-=0.2")
        .to(".new-age-footer", { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-paper relative overflow-hidden"
    >
      {/* Background Gradients (Subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <h2 className="new-age-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 leading-tight">
          <span className="text-gradient-violet">New Age</span> of Talent
        </h2>

        <p className="new-age-text new-age-text-1 font-elegant text-xl md:text-2xl text-graphite mb-12 max-w-2xl">
          Talent is no longer defined by location, degrees, or job titles.
        </p>

        {/* Highlight Box */}
        <div className="new-age-highlight bg-white border border-graphite/10 p-8 md:p-12 mb-12 rounded-2xl relative overflow-hidden group shadow-sm">
          {/* Glossy Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <p className="font-display text-2xl md:text-4xl text-ink text-center leading-snug">
            It is defined by how fast ideas become{" "}
            <span className="text-accent-violet italic">outcomes</span>.
          </p>
        </div>

        <div ref={contentRef} className="space-y-12">
          <div className="new-age-text new-age-text-2 space-y-6">
            <p className="font-elegant text-xl md:text-2xl text-graphite leading-relaxed">
              Today’s talent is distributed, self-driven, and execution-hungry.
              <br />
              But most systems are still built for the old world of employment.
            </p>
          </div>

          <div className="new-age-divider w-24 h-[1px] bg-accent-violet" />

          <div className="new-age-text new-age-text-3">
            <p className="font-elegant text-xl md:text-2xl text-graphite mb-8">
              In this new age, skill is not rare. Ideas are not rare. <br />
              <span className="font-bold text-accent-violet italic">
                What is rare is structure.
              </span>
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["Clarity", "Ownership", "Momentum", "Proof"].map((item) => (
              <div
                key={item}
                className="new-age-pillar p-4 border border-graphite/10 bg-paper-warm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="font-display text-sm md:text-base font-bold uppercase tracking-widest text-accent-violet">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="new-age-text new-age-text-4 pt-8">
            <p className="font-elegant text-xl text-graphite/80 italic">
              Talent doesn’t fail because people lack ability. <br />
              Talent fails because{" "}
              <span className="text-ink decoration-accent-violet/30 underline decoration-1 underline-offset-4">
                execution systems are missing
              </span>
              .
            </p>
          </div>

          <div className="new-age-text new-age-footer mt-16 p-8 border border-graphite/5 bg-gradient-to-r from-gray-50 to-transparent text-center rounded-2xl">
            <p className="font-display text-2xl md:text-3xl font-medium text-ink">
              This is why Talent Ops can no longer be an HR function.
            </p>
            <p className="font-display text-sm tracking-[0.2em] text-accent-violet uppercase">
              It must become an execution engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN COMPONENT ---
export default function TalentOpsConsolidated() {
  return (
    <SmoothScroll>
      {/* Inject self-contained styles and fonts */}
      <StylesInjection />

      <main className="relative">
        <ClickSpark
          sparkColor="#7C3AED"
          sparkSize={10}
          sparkRadius={15}
          duration={400}
        >
          <CursorGlow />
          <Navigation />
          <HeroSection />

          {/* Main Content Flow */}
          <OfferSection />
          <NewAgeTalentSection />
          <ProblemSection />

          {/* New Sections Added */}
          <BuiltForIndiaSection />
          <AiThinkingSection />
          <ProductivitySection />

          <LearningLoopSection />
          <WhyNowSection />
          <UseCasesSection />
          <PhilosophyReinforcement />

          <CorePhilosophy />
          <FixedTaskLifecycle />
          <AiIntelligenceSection />
          <TargetAudienceSection />
          <TransparencySection />

          <CTASection />

          <ScrollToTop />
          <Footer />
        </ClickSpark>
      </main>
    </SmoothScroll>
  );
}
