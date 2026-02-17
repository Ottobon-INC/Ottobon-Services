import React, { useState, useEffect } from "react";

const OperateXLanding: React.FC = () => {
    const [navDark, setNavDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled past hero
            setScrolled(window.scrollY > 50);

            // Detect dark section (why-matters)
            const whyMattersSection = document.querySelector(".why-matters");
            if (whyMattersSection) {
                const rect = whyMattersSection.getBoundingClientRect();
                const headerHeight = 80;
                setNavDark(
                    rect.top <= headerHeight && rect.bottom >= headerHeight,
                );
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const styles = `
        /* ======================================
           Design System - Warm Minimalist Luxury
           ====================================== */

        /* CSS Variables */
        :root {
            /* Colors - Warm Beige & Deep Purple/Maroon */
            --color-bg-warm: #FDF8F6;
            --color-bg-cream: #FCE8E4;
            --color-bg-blush: #F5E6E0;

            --color-primary: #7B3F61;
            --color-primary-dark: #5C2E48;
            --color-primary-light: #9B5A7C;
            --color-accent: #C7546D;

            --color-text-dark: #2D2A32;
            --color-text-medium: #4A4651;
            --color-text-light: #6B6770;
            --color-text-muted: #8C8892;

            --color-white: #FFFFFF;
            --color-dark-section: #3D2C35;

            /* Shadows - Soft & Diffused */
            --shadow-soft: 0 8px 40px rgba(123, 63, 97, 0.08);
            --shadow-medium: 0 12px 50px rgba(123, 63, 97, 0.12);
            --shadow-large: 0 20px 60px rgba(123, 63, 97, 0.15);
            --shadow-glow: 0 0 60px rgba(199, 84, 109, 0.2);

            /* Typography */
            --font-heading: 'Sansita', Georgia, serif;
            --font-body: 'Nunito Sans', -apple-system, sans-serif;

            --font-size-xs: 0.75rem;
            --font-size-sm: 0.875rem;
            --font-size-base: 1.125rem;
            --font-size-lg: 1.35rem;
            --font-size-xl: 1.5rem;
            --font-size-2xl: 2rem;
            --font-size-3xl: 2.75rem;
            --font-size-4xl: 3.5rem;
            --font-size-5xl: 4.5rem;
            --font-size-6xl: 5.5rem;
            --font-size-mega: 4.5rem;

            /* Spacing */
            --space-xs: 0.5rem;
            --space-sm: 1rem;
            --space-md: 1.5rem;
            --space-lg: 2.5rem;
            --space-xl: 4rem;
            --space-2xl: 6rem;
            --space-3xl: 10rem;

            /* Border Radius - Organic & Rounded */
            --radius-sm: 8px;
            --radius-md: 16px;
            --radius-lg: 24px;
            --radius-xl: 40px;
            --radius-full: 9999px;

            /* Transitions */
            --transition-smooth: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            --transition-bounce: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            --transition-slow: 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

            /* Container */
            --container-max: 1100px;
            --container-narrow: 800px;
        }

        /* Reset & Base */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
            font-size: 16px;
        }

        body {
            font-family: var(--font-body);
            font-size: var(--font-size-base);
            font-weight: 400;
            line-height: 1.7;
            color: var(--color-text-dark);
            background-color: var(--color-bg-warm);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-heading);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
            color: var(--color-text-dark);
        }

        h1 { font-size: var(--font-size-mega); font-weight: 900; }
        h2 { font-size: var(--font-size-5xl); font-weight: 800; }
        h3 { font-size: var(--font-size-3xl); font-weight: 700; }

        p {
            font-family: var(--font-body);
            color: var(--color-text-medium);
            line-height: 1.8;
            font-weight: 400;
        }

        a {
            color: var(--color-primary);
            text-decoration: none;
            transition: all var(--transition-smooth);
        }

        a:hover { color: var(--color-accent); }

        /* Container */
        .container {
            max-width: var(--container-max);
            margin: 0 auto;
            padding: 0 2rem;
        }

        ::selection {
            background-color: var(--color-primary);
            color: var(--color-white);
        }

        /* Landing Page Container */
        .landing-page {
            width: 100%;
            overflow-x: hidden;
        }

        /* ======== HEADER ======== */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 1.5rem 0;
            transition: all var(--transition-smooth);
        }

        .header.scrolled {
            background: rgba(253, 248, 246, 0.9);
            backdrop-filter: blur(20px);
            padding: 1rem 0;
        }

        /* Dark section navbar sync */
        .header.nav-dark {
            background: rgba(61, 44, 53, 0.95);
            backdrop-filter: blur(20px);
        }

        .header.nav-dark .logo-icon { color: var(--color-accent); }
        .header.nav-dark .logo-text { color: var(--color-white); }
        .header.nav-dark .nav a { color: rgba(255, 255, 255, 0.8); }
        .header.nav-dark .nav a:hover { color: var(--color-white); }
        .header.nav-dark .nav a::after { background: var(--color-accent); }
        .header.nav-dark .btn-outline { color: var(--color-white); border-color: var(--color-white); }
        .header.nav-dark .btn-outline:hover { background: var(--color-white); color: var(--color-dark-section); }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 100%;
            padding: 0 3rem;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo-icon {
            font-size: 1.75rem;
            color: var(--color-primary);
            transition: transform var(--transition-bounce);
        }

        .logo:hover .logo-icon {
            transform: rotate(45deg) scale(1.1);
        }

        .logo-text {
            font-family: var(--font-heading);
            font-weight: 800;
            font-size: 1.25rem;
            color: var(--color-text-dark);
            letter-spacing: -0.01em;
        }

        .nav {
            display: flex;
            align-items: center;
            gap: 2.5rem;
        }

        .nav a {
            font-family: var(--font-body);
            font-weight: 500;
            font-size: var(--font-size-sm);
            color: var(--color-text-medium);
            position: relative;
            padding: 0.5rem 0;
        }

        .nav a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--color-primary);
            transition: width var(--transition-smooth);
        }

        .nav a:hover { color: var(--color-primary); }
        .nav a:hover::after { width: 100%; }

        /* ======== BUTTONS ======== */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-body);
            font-weight: 600;
            font-size: var(--font-size-sm);
            padding: 1rem 2rem;
            border-radius: var(--radius-full);
            transition: all var(--transition-smooth);
            cursor: pointer;
            border: none;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before { width: 300px; height: 300px; }

        .btn-primary {
            background: var(--color-primary);
            color: var(--color-white);
            box-shadow: var(--shadow-soft);
        }

        .btn-primary:hover {
            background: var(--color-primary-dark);
            transform: translateY(-3px);
            box-shadow: var(--shadow-medium);
        }

        .btn-secondary {
            background: transparent;
            color: var(--color-primary);
            border: 2px solid var(--color-primary);
        }

        .btn-secondary:hover {
            background: var(--color-primary);
            color: var(--color-white);
            transform: translateY(-3px);
        }

        .btn-outline {
            background: transparent;
            color: var(--color-primary);
            border: 1.5px solid var(--color-primary);
            padding: 0.75rem 1.5rem;
            font-size: var(--font-size-xs);
        }

        .btn-outline:hover {
            background: var(--color-primary);
            color: var(--color-white);
        }

        .btn-large {
            padding: 1.25rem 2.5rem;
            font-size: var(--font-size-base);
        }

        /* ======== HERO SECTION ======== */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8rem 0 6rem;
            background: var(--color-bg-warm);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -30%;
            width: 80%;
            height: 150%;
            background: radial-gradient(ellipse, var(--color-bg-cream) 0%, transparent 70%);
            opacity: 0.6;
            pointer-events: none;
        }

        .hero-content {
            text-align: center;
            max-width: 950px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .hero-title {
            font-size: var(--font-size-mega);
            font-weight: 900;
            font-style: italic;
            line-height: 1.15;
            margin-bottom: var(--space-lg);
            color: var(--color-text-dark);
        }

        .hero-title .highlight {
            color: var(--color-primary);
            position: relative;
            display: inline;
            font-style: italic;
        }

        .hero-title .highlight::after {
            content: '';
            position: absolute;
            bottom: 0.12em;
            left: 0;
            right: 0;
            height: 0.12em;
            background: linear-gradient(90deg, #E8A0A0, #D4878F);
            opacity: 0.8;
            z-index: -1;
        }

        .hero-subtitle {
            font-family: var(--font-body);
            font-size: var(--font-size-xl);
            font-weight: 400;
            color: var(--color-text-medium);
            margin-bottom: var(--space-md);
            line-height: 1.7;
        }

        .hero-description {
            font-size: var(--font-size-base);
            color: var(--color-text-light);
            margin-bottom: var(--space-xl);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-cta {
            display: flex;
            gap: 1.25rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* ======== PROBLEM SECTION ======== */
        .problem {
            background: var(--color-bg-cream);
            padding: var(--space-3xl) 0;
            position: relative;
        }

        .section-label {
            font-family: var(--font-body);
            font-size: var(--font-size-xs);
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--color-primary);
            margin-bottom: var(--space-md);
            text-align: center;
            display: block;
        }

        .section-title {
            font-family: var(--font-heading);
            font-size: var(--font-size-4xl);
            text-align: center;
            margin-bottom: var(--space-2xl);
            color: var(--color-text-dark);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .problem-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
            max-width: 900px;
            margin: 0 auto var(--space-xl);
        }

        .problem-card {
            background: var(--color-white);
            padding: var(--space-lg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-soft);
            display: flex;
            align-items: flex-start;
            gap: var(--space-sm);
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
        }

        .problem-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(0deg, transparent, transparent 30%, rgba(123, 63, 97, 0.15));
            transform: rotate(-45deg);
            transition: all 0.6s ease;
            opacity: 0;
        }

        .problem-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: var(--radius-lg);
            border: 2px solid transparent;
            transition: border-color 0.4s ease;
        }

        .problem-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 12px 40px rgba(123, 63, 97, 0.2);
        }

        .problem-card:hover::before {
            opacity: 1;
            transform: rotate(-45deg) translateY(100%);
        }

        .problem-card:hover::after {
            border-color: rgba(123, 63, 97, 0.3);
        }

        .problem-icon {
            width: 40px;
            height: 40px;
            border-radius: var(--radius-md);
            background: linear-gradient(135deg, #FEE2E2, #FECACA);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #DC2626;
            font-size: 1.25rem;
            font-weight: 700;
            flex-shrink: 0;
        }

        .problem-card p {
            font-size: var(--font-size-base);
            font-weight: 500;
            color: var(--color-text-dark);
            margin: 0;
            line-height: 1.5;
        }

        .problem-closing {
            text-align: center;
            font-family: var(--font-heading);
            font-size: var(--font-size-2xl);
            font-weight: 700;
            color: var(--color-primary);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.4;
        }

        /* ======== WHAT WE DO SECTION ======== */
        .what-we-do {
            background: var(--color-bg-warm);
            padding: var(--space-3xl) 0;
            position: relative;
        }

        .what-we-do::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: var(--color-bg-cream);
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
            margin-top: var(--space-lg);
        }

        .feature-card {
            background: var(--color-white);
            padding: var(--space-xl);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-soft);
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform var(--transition-smooth);
        }

        .feature-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(0deg, transparent, transparent 30%, rgba(199, 84, 109, 0.12));
            transform: rotate(-45deg);
            transition: all 0.6s ease;
            opacity: 0;
            pointer-events: none;
        }

        .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 60px rgba(123, 63, 97, 0.2);
        }

        .feature-card:hover::before { transform: scaleX(1); }
        .feature-card:hover::after {
            opacity: 1;
            transform: rotate(-45deg) translateY(100%);
        }

        .feature-number {
            font-family: var(--font-heading);
            font-size: var(--font-size-5xl);
            font-weight: 900;
            background: linear-gradient(135deg, var(--color-bg-cream), var(--color-bg-blush));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: var(--space-sm);
            line-height: 1;
        }

        .feature-card h3 {
            font-size: var(--font-size-xl);
            color: var(--color-primary);
            margin-bottom: var(--space-sm);
            line-height: 1.3;
        }

        .feature-card p {
            font-size: var(--font-size-sm);
            color: var(--color-text-medium);
            line-height: 1.7;
        }

        /* ======== CONTRACT-TO-HIRE SECTION ======== */
        .contract-hire {
            padding: var(--space-3xl) 0;
            background: var(--color-white);
            position: relative;
        }

        .contract-content-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: var(--space-2xl);
            align-items: center;
        }

        .contract-text p {
            font-size: var(--font-size-base);
            margin-bottom: var(--space-md);
            color: var(--color-text-medium);
        }

        .contract-highlight-box {
            background: var(--color-bg-warm);
            padding: var(--space-xl);
            border-radius: var(--radius-xl);
            border: 1px solid rgba(123, 63, 97, 0.05);
            box-shadow: var(--shadow-soft);
        }

        .contract-highlight-box h3 {
            font-size: var(--font-size-xl);
            color: var(--color-primary);
            margin-bottom: var(--space-md);
        }

        .contract-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .contract-list li {
            display: flex;
            align-items: flex-start;
            gap: var(--space-sm);
            margin-bottom: var(--space-sm);
            font-size: var(--font-size-sm);
            color: var(--color-text-dark);
        }

        .contract-list li::before {
            content: '•';
            color: var(--color-accent);
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1;
        }

        .bridge-graphic {
            margin-top: var(--space-xl);
            padding: var(--space-lg);
            background: var(--color-bg-cream);
            border-radius: var(--radius-lg);
            text-align: center;
        }

        .bridge-steps {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--space-md);
            margin-top: var(--space-sm);
            flex-wrap: wrap;
        }

        .bridge-step {
            font-weight: 700;
            color: var(--color-primary);
            padding: var(--space-sm) var(--space-md);
            background: var(--color-white);
            border-radius: var(--radius-full);
            box-shadow: var(--shadow-soft);
        }

        .bridge-arrow {
            color: var(--color-accent);
            font-size: 1.5rem;
        }

        .contract-closing {
             margin-top: var(--space-md);
             font-weight: 600;
             color: var(--color-text-dark);
        }

        @media (max-width: 900px) {
            .contract-content-grid {
                grid-template-columns: 1fr;
                gap: var(--space-xl);
            }
        }

        /* ======== WHY THIS MATTERS SECTION ======== */
        .why-matters {
            background: var(--color-dark-section);
            padding: var(--space-3xl) 0;
            color: var(--color-white);
            position: relative;
            overflow: hidden;
        }

        .why-matters::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 70%, rgba(123, 63, 97, 0.3) 0%, transparent 50%);
            pointer-events: none;
        }

        .why-matters .section-label { color: var(--color-accent); }
        .why-matters .section-title { color: var(--color-white); }

        .checklist {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
            max-width: 800px;
            margin: 0 auto var(--space-xl);
        }

        .checklist-item {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-md) var(--space-lg);
            background: rgba(255, 255, 255, 0.08);
            border-radius: var(--radius-lg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all var(--transition-smooth);
        }

        .checklist-item:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateX(8px);
        }

        .check-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            color: var(--color-white);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
            font-size: 1rem;
        }

        .checklist-item span:last-child {
            font-weight: 500;
            font-size: var(--font-size-base);
            color: rgba(255, 255, 255, 0.9);
        }

        .matters-description {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: var(--font-size-lg);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.8;
        }

        /* ======== WHO IT'S FOR SECTION ======== */
        .who-for {
            padding: var(--space-3xl) 0;
            background: var(--color-bg-warm);
        }

        .audience-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
        }

        .audience-card {
            text-align: center;
            padding: calc(var(--space-xl) - 4px);
            background: var(--color-white);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-soft);
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
        }

        .audience-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(0deg, transparent, transparent 30%, rgba(123, 63, 97, 0.1));
            transform: rotate(-45deg);
            transition: all 0.6s ease;
            opacity: 0;
            pointer-events: none;
        }

        .audience-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: var(--radius-xl);
            border: 2px solid transparent;
            transition: border-color 0.4s ease;
            pointer-events: none;
        }

        .audience-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 60px rgba(123, 63, 97, 0.2);
        }

        .audience-card:hover::before {
            opacity: 1;
            transform: rotate(-45deg) translateY(100%);
        }

        .audience-card:hover::after {
            border-color: var(--color-primary);
        }

        .audience-card h3 {
            font-size: var(--font-size-xl);
            color: var(--color-text-dark);
            margin-bottom: var(--space-sm);
        }

        .audience-card p {
            font-size: var(--font-size-sm);
            color: var(--color-text-medium);
            margin: 0;
            line-height: 1.6;
        }

        /* ======== RESULTS SECTION ======== */
        .results {
            padding: var(--space-3xl) 0;
            background: linear-gradient(180deg, var(--color-bg-cream) 0%, var(--color-bg-warm) 100%);
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
        }

        .result-card {
            background: var(--color-white);
            padding: var(--space-lg);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-soft);
            text-align: center;
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
        }

        .result-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(0deg, transparent, transparent 30%, rgba(123, 63, 97, 0.12));
            transform: rotate(-45deg);
            transition: all 0.6s ease;
            opacity: 0;
            pointer-events: none;
        }

        .result-card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: var(--radius-xl);
            border: 2px solid transparent;
            transition: border-color 0.4s ease;
            pointer-events: none;
        }

        .result-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 60px rgba(123, 63, 97, 0.2);
        }

        .result-card:hover::before {
            opacity: 1;
            transform: rotate(-45deg) translateY(100%);
        }

        .result-card:hover::after {
            border-color: rgba(123, 63, 97, 0.3);
        }

        .result-card h3 {
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: var(--font-size-lg);
            color: var(--color-text-dark);
            margin: 0;
        }

        .results-closing {
            text-align: center;
            font-family: var(--font-heading);
            font-size: var(--font-size-3xl);
            font-weight: 800;
            color: var(--color-primary);
            margin: 0;
        }

        /* ======== FINAL CTA SECTION ======== */
        .final-cta {
            padding: var(--space-3xl) 0;
            background: var(--color-bg-warm);
            position: relative;
        }

        .cta-content {
            text-align: center;
            max-width: 700px;
            margin: 0 auto;
            padding: var(--space-2xl);
            background: var(--color-white);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-large);
            position: relative;
            overflow: hidden;
        }

        .cta-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary));
            background-size: 200% 100%;
            animation: gradientMove 3s ease infinite;
        }

        @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .final-cta h2 {
            font-size: var(--font-size-4xl);
            margin-bottom: var(--space-md);
            color: var(--color-text-dark);
        }

        .final-cta p {
            font-size: var(--font-size-lg);
            margin-bottom: var(--space-xl);
            color: var(--color-text-medium);
        }

        .cta-buttons {
            display: flex;
            gap: 1.25rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* ======== FOOTER ======== */
        .footer {
            background: var(--color-dark-section);
            color: var(--color-white);
            padding: var(--space-md) 0;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 100%;
            padding: 0 3rem;
        }

        .footer .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .footer .logo-icon {
            color: var(--color-accent);
            font-size: 1.25rem;
        }

        .footer .logo-text {
            color: var(--color-white);
            font-size: 1rem;
        }

        .footer-links {
            display: flex;
            gap: var(--space-md);
        }

        .footer-links a {
            color: rgba(255, 255, 255, 0.7);
            font-size: var(--font-size-sm);
            font-weight: 500;
            transition: color var(--transition-smooth);
        }

        .footer-links a:hover { color: var(--color-white); }

        .copyright {
            color: rgba(255, 255, 255, 0.5);
            font-size: var(--font-size-xs);
            margin: 0;
        }

        /* ======== RESPONSIVE DESIGN ======== */
        @media (max-width: 1024px) {
            :root {
                --font-size-mega: 4.5rem;
                --font-size-6xl: 3.5rem;
                --font-size-5xl: 3rem;
                --font-size-4xl: 2.5rem;
            }

            .feature-grid { grid-template-columns: repeat(2, 1fr); }
            .results-grid { grid-template-columns: repeat(2, 1fr); }
            .header-content, .footer-content { padding: 0 2rem; }
            .section-title { font-size: var(--font-size-3xl); }
        }

        @media (max-width: 768px) {
            :root {
                --font-size-mega: 3rem;
                --font-size-6xl: 2.5rem;
                --font-size-5xl: 2rem;
                --font-size-4xl: 1.75rem;
                --font-size-3xl: 1.5rem;
            }

            .container { padding: 0 1.25rem; }
            .header-content { flex-direction: column; gap: 1rem; padding: 0 1.5rem; }
            .nav { gap: 1rem; flex-wrap: wrap; justify-content: center; }
            .hero { padding-top: 10rem; min-height: auto; }
            .hero-title { font-size: var(--font-size-3xl); line-height: 1.2; }
            .hero-cta { flex-direction: column; align-items: center; }
            .problem-grid { grid-template-columns: 1fr; }
            .feature-grid { grid-template-columns: 1fr; }
            .checklist { grid-template-columns: 1fr; }
            .audience-grid { grid-template-columns: 1fr; }
            .results-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
            .cta-buttons { flex-direction: column; align-items: center; }
            .cta-content { padding: var(--space-lg); }
            .footer-content { flex-direction: column; gap: 1rem; text-align: center; padding: 0 1.5rem; }
            .footer .logo { justify-content: center; }
            .section-title { font-size: var(--font-size-2xl); }
            .results-closing { font-size: var(--font-size-xl); }
        }

        @media (max-width: 480px) {
            .header-content, .footer-content { padding: 0 1rem; }
            .logo-icon { font-size: 1.25rem; }
            .logo-text { font-size: 1rem; }
            .nav { gap: 0.75rem; }
            .nav a { font-size: var(--font-size-xs); }
            .btn-outline { padding: 0.5rem 1rem; font-size: var(--font-size-xs); }
            .hero { padding-top: 8rem; }
            .hero-title { font-size: var(--font-size-2xl); }
            .hero-subtitle { font-size: var(--font-size-base); }
            .section-title { font-size: var(--font-size-xl); }
            .results-grid { grid-template-columns: 1fr; }
            .result-card h3 { font-size: var(--font-size-base); }
            .results-closing { font-size: var(--font-size-lg); }
            .audience-card, .feature-card, .problem-card { padding: var(--space-md); }
            .cta-content { padding: var(--space-md); }
            .cta-content h2 { font-size: var(--font-size-xl); }
            .footer-links { gap: var(--space-sm); }
            .footer-links a { font-size: var(--font-size-xs); }
        }

        /* ======== SCROLL ANIMATIONS ======== */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero-content > * {
            opacity: 0;
            animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.55s; }
    `;

    return (
        <div className="landing-page">
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            {/* Header */}
            <header
                className={`header ${scrolled ? " scrolled" : ""}${navDark ? " nav-dark" : ""}`}
            >
                <div className="container header-content">
                    <div className="logo">
                        <span className="logo-icon">◆</span>
                        <span className="logo-text">OperateX</span>
                    </div>
                    <nav className="nav">
                        <a href="#problem">Why Us</a>
                        <a href="#what-we-do">What We Do</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#who-its-for">Who It's For</a>
                        <button className="btn btn-outline">
                            Request a Demo
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        We Don't Just Give You
                        <br />
                        Software.
                        <br />
                        <span className="highlight">We Help You Execute.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Most platforms stop at features and dashboards.
                        <br />
                        We go further — helping organizations turn plans into
                        real, measurable execution.
                    </p>
                    <p className="hero-description">
                        Our platform is built for teams that care about
                        delivery, accountability, and outcomes — not just
                        reports.
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-primary btn-large">
                            Get Started
                        </button>
                        <button className="btn btn-secondary btn-large">
                            Request a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="problem" id="problem">
                <div className="container">
                    <span className="section-label">The Challenge</span>
                    <h2 className="section-title">
                        Why Execution Fails in Most Organizations
                    </h2>
                    <div className="problem-grid">
                        <div className="problem-card">
                            <div className="problem-icon">✗</div>
                            <p>Tasks get marked "done" without validation</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">✗</div>
                            <p>Ownership is unclear across teams</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">✗</div>
                            <p>Processes differ from one team to another</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">✗</div>
                            <p>Leaders see reports, not real progress</p>
                        </div>
                    </div>
                    <p className="problem-closing">
                        Execution breaks down when work is not structured,
                        verified, or aligned.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="what-we-do" id="what-we-do">
                <div className="container">
                    <span className="section-label">Our Approach</span>
                    <h2 className="section-title">What We Do</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-number">01</div>
                            <h3>Build Teams Aligned to Outcomes</h3>
                            <p>
                                We help structure teams around real delivery
                                goals. Roles, responsibilities, and skills are
                                clearly defined so everyone understands their
                                contribution to execution.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-number">02</div>
                            <h3>Contract Hiring, Made Practical</h3>
                            <p>
                                Reduce hiring risk by evaluating talent through
                                real work. Track performance, delivery quality,
                                and consistency before making long-term hiring
                                decisions.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-number">03</div>
                            <h3>
                                Keep Talent, Process, and Delivery Connected
                            </h3>
                            <p>
                                Execution fails when people, processes, and work
                                drift apart. Our system keeps them connected so
                                ownership, progress, and results remain visible
                                at all times.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contract-to-Hire Section */}
            <section className="contract-hire" id="how-it-works">
                <div className="container">
                    <h2 className="section-title">
                        Contract Hiring , Made Practical
                    </h2>

                    <div className="contract-content-grid">
                        <div className="contract-text">
                            <p>
                                Hiring the right people is expensive, slow, and
                                risky — especially when you need talent quickly
                                for a project.
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    {" "}
                                    OperateX
                                </span>{" "}
                                solves this with a contract-to-hire model.
                            </p>
                            <p>
                                First, we provide skilled professionals on a
                                contract basis. They start working on your real
                                project from day one — delivering,
                                collaborating, and proving their value in a real
                                production environment.
                            </p>
                            <p>
                                If the engagement goes well and the company
                                wants to build something long-term, the same
                                people can be converted into full-time
                                employees.
                            </p>

                            <div className="bridge-graphic">
                                <p
                                    style={{
                                        margin: 0,
                                        fontWeight: 600,
                                        color: "var(--color-text-light)",
                                        textTransform: "uppercase",
                                        fontSize: "0.8rem",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    The Bridge Model
                                </p>
                                <div className="bridge-steps">
                                    <div className="bridge-step">
                                        Contract work first
                                    </div>
                                    <div className="bridge-arrow">→</div>
                                    <div className="bridge-step">
                                        Real performance
                                    </div>
                                    <div className="bridge-arrow">→</div>
                                    <div className="bridge-step">
                                        Confident full-time hiring
                                    </div>
                                </div>
                                <p className="contract-closing">
                                    This reduces hiring risk, improves talent
                                    quality, and ensures you only hire people
                                    who have already proven they can execute.
                                </p>
                            </div>
                        </div>

                        <div className="contract-highlight-box">
                            <h3>Ideal for companies that:</h3>
                            <ul className="contract-list">
                                <li>
                                    Need people for short-term or project-based
                                    work
                                </li>
                                <li>
                                    Want to access high-quality talent from
                                    Tier-2 and Tier-3 cities in India
                                </li>
                                <li>
                                    Prefer to evaluate performance before
                                    committing to full-time hiring
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Matters Section */}
            <section className="why-matters">
                <div className="container">
                    <span className="section-label">The Difference</span>
                    <h2 className="section-title">Why This Matters</h2>
                    <div className="checklist">
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>
                                Tasks cannot be closed without validation
                            </span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>Teams do not operate in silos</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>
                                Progress is tied to real outcomes, not
                                assumptions
                            </span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span>
                                Leaders get clarity, not just dashboards
                            </span>
                        </div>
                    </div>
                    <p className="matters-description">
                        This platform acts as a service layer between strategy
                        and execution, ensuring that work is completed correctly
                        and on time.
                    </p>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="who-for" id="who-its-for">
                <div className="container">
                    <span className="section-label">Built For</span>
                    <h2 className="section-title">Who It's For</h2>
                    <div className="audience-grid">
                        <div className="audience-card">
                            <h3>Founders &amp; Executives</h3>
                            <p>
                                Gain clear visibility into execution, risks, and
                                delivery health.
                            </p>
                        </div>
                        <div className="audience-card">
                            <h3>Managers</h3>
                            <p>
                                Maintain control and alignment without
                                micromanagement.
                            </p>
                        </div>
                        <div className="audience-card">
                            <h3>Teams</h3>
                            <p>
                                Work with clarity, structure, and clear
                                expectations of what "done" means.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="results">
                <div className="container">
                    <span className="section-label">Outcomes</span>
                    <h2 className="section-title">The Result</h2>
                    <div className="results-grid">
                        <div className="result-card">
                            <h3>Faster execution</h3>
                        </div>
                        <div className="result-card">
                            <h3>Clear ownership</h3>
                        </div>
                        <div className="result-card">
                            <h3>Reduced delivery risk</h3>
                        </div>
                        <div className="result-card">
                            <h3>Stronger alignment</h3>
                        </div>
                    </div>
                    <p className="results-closing">
                        Execution becomes visible, measurable, and reliable.
                    </p>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="final-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Turn Plans into Execution?</h2>
                        <p>
                            Move beyond dashboards and start delivering real
                            outcomes.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn btn-primary btn-large">
                                Get Started
                            </button>
                            <button className="btn btn-secondary btn-large">
                                Request a Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-content">
                    <div className="logo">
                        <span className="logo-icon">◆</span>
                        <span className="logo-text">OperateX</span>
                    </div>
                    <p className="copyright">
                        © 2026 OperateX. All rights reserved.
                    </p>
                    <div className="footer-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default OperateXLanding;
