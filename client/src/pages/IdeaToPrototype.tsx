/*
  USAGE INSTRUCTIONS:
  1. Install dependencies: npm install framer-motion lenis ogl react
  2. Copy this file into your project (e.g., src/IdeaToPrototype.tsx)
  3. Import and use:
     import IdeaToPrototype from './IdeaToPrototype';

     function App() {
       return <IdeaToPrototype />;
     }
*/

import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence,
    Variants,
} from "framer-motion";
import Lenis from "lenis";
// @ts-ignore
import { Renderer, Program, Triangle, Mesh } from "ogl";

// --- Global Styles (Inlined) ---
const GLOBAL_STYLES = `
:root {
    --font-serif: "Playfair Display", serif;
    --font-sans: "Inter", sans-serif;
    --color-bg: #050505;
    --color-text: #EBEBEB;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;

    /* Gradient Palettes */
    --gradient-metallic: linear-gradient(135deg, #EBEBEB 0%, #A0A0A0 50%, #EBEBEB 100%);
    --gradient-creative: linear-gradient(135deg, #FFF 0%, #8ca6db 50%, #b993d6 100%);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

.serif {
    font-family: var(--font-serif);
    font-style: italic;
}

/* Gradient Utilities */
.text-gradient {
    background: var(--gradient-creative);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shine 5s linear infinite;
}

.text-gradient-metallic {
    background: var(--gradient-metallic);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

@keyframes shine {
    to {
        background-position: 200% center;
    }
}

.hero-bg {
    background: transparent;
}

html.lenis {
    height: auto;
}

.lenis.lenis-smooth {
    scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
}

.lenis.lenis-stopped {
    overflow: hidden;
}

.lenis.lenis-scrolling iframe {
    pointer-events: none;
}

/* Responsive Utilities */
.hero-padding {
    padding-top: 15vh;
}

.hero-footer {
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
}

.hero-footer-text {
    grid-column: 2 / 4;
    font-size: 1.2rem;
    line-height: 1.4;
}

@media (max-width: 768px) {
    .hero-padding {
        padding-top: 12vh;
    }

    .hero-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        text-align: right;
        gap: 1rem;
        margin-top: 1rem;
    }

    .hero-footer-text {
        font-size: 0.9rem;
        max-width: 70%;
    }

    /* Why Us Section - Mobile Fix */
    .why-us-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
    }

    .result-box {
        padding: 1.5rem !important;
        width: 100% !important;
        margin: 0 !important;
    }

    .result-box h3 {
        font-size: 1.5rem !important;
        margin-bottom: 1.5rem !important;
    }

    .result-box li span:last-child {
        font-size: 1rem !important;
    }

    .about-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .about-content {
        grid-column: auto;
    }

    .work-card-content {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .work-card-content p {
        max-width: 100% !important;
    }

    /* Offer Section Mobile Styles */
    .offer-feature-cards {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
    }

    .offer-cost-cards {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
    }

    .offer-testimonial-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
    }

    /* WorkSlider Section - Mobile Fix */
    .work-slider-section {
        height: auto !important;
        position: relative !important;
    }

    .work-slider-sticky {
        position: relative !important;
        height: auto !important;
        flex-direction: column !important;
        padding: 2rem 1rem !important;
    }

    .work-slider-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 2rem !important;
        padding: 0 !important;
        transform: none !important;
    }

    .work-slider-card {
        min-width: 100% !important;
        width: 100% !important;
        height: auto !important;
        margin-right: 0 !important;
        margin-bottom: 2rem !important;
    }

    .work-slider-card-visual {
        height: 200px !important;
        min-height: 200px !important;
    }

    .work-slider-card-visual span {
        font-size: 4rem !important;
    }

    .work-slider-card-title {
        font-size: 1.8rem !important;
    }

    /* Navbar - Mobile Fix */
    .nav-links {
        display: none !important;
    }

    .nav-cta {
        padding: 0.5rem 1rem !important;
        font-size: 0.75rem !important;
    }
}

/* Why Us Section Responsive */
.why-us-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.result-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 4px;
    backdrop-filter: blur(10px);
}

/* About & WorkSlider Responsive */
.about-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
}

.about-content {
    grid-column: 2 / 5;
}

.work-card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: flex-start;
}
`;

// --- Global Types & Constants ---

type Origin =
    | "top-left"
    | "top-right"
    | "left"
    | "right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "top-center";

// --- Hooks ---

const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
};

// --- Components ---

// 1. LightRays
const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m
        ? [
              parseInt(m[1], 16) / 255,
              parseInt(m[2], 16) / 255,
              parseInt(m[3], 16) / 255,
          ]
        : [1, 1, 1];
};

const getAnchorAndDir = (origin: string, w: number, h: number) => {
    const outside = 0.2;
    switch (origin) {
        case "top-left":
            return { anchor: [0, -outside * h], dir: [0, 1] };
        case "top-right":
            return { anchor: [w, -outside * h], dir: [0, 1] };
        case "left":
            return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
        case "right":
            return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
        case "bottom-left":
            return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
        case "bottom-center":
            return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
        case "bottom-right":
            return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
        default: // "top-center"
            return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
    }
};

interface LightRaysProps {
    raysOrigin?: Origin;
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    className?: string;
}

const LightRays: React.FC<LightRaysProps> = ({
    raysOrigin = "top-center",
    raysColor = DEFAULT_COLOR,
    raysSpeed = 1,
    lightSpread = 1,
    rayLength = 2,
    pulsating = false,
    fadeDistance = 1.0,
    saturation = 1.0,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0.0,
    distortion = 0.0,
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const uniformsRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
    const animationIdRef = useRef<number | null>(null);
    const meshRef = useRef<any>(null);
    const cleanupFunctionRef = useRef<(() => void) | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        observerRef.current.observe(containerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        if (cleanupFunctionRef.current) {
            cleanupFunctionRef.current();
            cleanupFunctionRef.current = null;
        }

        const initializeWebGL = async () => {
            if (!containerRef.current) return;

            await new Promise((resolve) => setTimeout(resolve, 10));

            if (!containerRef.current) return;

            const renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio, 2),
                alpha: true,
            });
            rendererRef.current = renderer;

            const gl = renderer.gl;
            gl.canvas.style.width = "100%";
            gl.canvas.style.height = "100%";
            gl.canvas.style.display = "block";

            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(
                    containerRef.current.firstChild,
                );
            }
            containerRef.current.appendChild(gl.canvas);

            const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

            const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

            const uniforms = {
                iTime: { value: 0 },
                iResolution: { value: [1, 1] },

                rayPos: { value: [0, 0] },
                rayDir: { value: [0, 1] },

                raysColor: { value: hexToRgb(raysColor) },
                raysSpeed: { value: raysSpeed },
                lightSpread: { value: lightSpread },
                rayLength: { value: rayLength },
                pulsating: { value: pulsating ? 1.0 : 0.0 },
                fadeDistance: { value: fadeDistance },
                saturation: { value: saturation },
                mousePos: { value: [0.5, 0.5] },
                mouseInfluence: { value: mouseInfluence },
                noiseAmount: { value: noiseAmount },
                distortion: { value: distortion },
            };
            uniformsRef.current = uniforms;

            const geometry = new Triangle(gl);
            const program = new Program(gl, {
                vertex: vert,
                fragment: frag,
                uniforms,
            });
            const mesh = new Mesh(gl, { geometry, program });
            meshRef.current = mesh;

            const updatePlacement = () => {
                if (!containerRef.current || !renderer) return;

                renderer.dpr = Math.min(window.devicePixelRatio, 2);

                const { clientWidth: wCSS, clientHeight: hCSS } =
                    containerRef.current;
                renderer.setSize(wCSS, hCSS);

                const dpr = renderer.dpr;
                const w = wCSS * dpr;
                const h = hCSS * dpr;

                uniforms.iResolution.value = [w, h];

                const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
                uniforms.rayPos.value = anchor;
                uniforms.rayDir.value = dir;
            };

            const loop = (t: number) => {
                if (
                    !rendererRef.current ||
                    !uniformsRef.current ||
                    !meshRef.current
                ) {
                    return;
                }

                uniforms.iTime.value = t * 0.001;

                if (followMouse && mouseInfluence > 0.0) {
                    const smoothing = 0.92;

                    smoothMouseRef.current.x =
                        smoothMouseRef.current.x * smoothing +
                        mouseRef.current.x * (1 - smoothing);
                    smoothMouseRef.current.y =
                        smoothMouseRef.current.y * smoothing +
                        mouseRef.current.y * (1 - smoothing);

                    uniforms.mousePos.value = [
                        smoothMouseRef.current.x,
                        smoothMouseRef.current.y,
                    ];
                }

                try {
                    renderer.render({ scene: mesh });
                    animationIdRef.current = requestAnimationFrame(loop);
                } catch (error) {
                    console.warn("WebGL rendering error:", error);
                    return;
                }
            };

            window.addEventListener("resize", updatePlacement);
            updatePlacement();
            animationIdRef.current = requestAnimationFrame(loop);

            cleanupFunctionRef.current = () => {
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                    animationIdRef.current = null;
                }

                window.removeEventListener("resize", updatePlacement);

                if (renderer) {
                    try {
                        const canvas = renderer.gl.canvas;
                        const loseContextExt =
                            renderer.gl.getExtension("WEBGL_lose_context");
                        if (loseContextExt) {
                            loseContextExt.loseContext();
                        }

                        if (canvas && canvas.parentNode) {
                            canvas.parentNode.removeChild(canvas);
                        }
                    } catch (error) {
                        console.warn("Error during WebGL cleanup:", error);
                    }
                }

                rendererRef.current = null;
                uniformsRef.current = null;
                meshRef.current = null;
            };
        };

        initializeWebGL();

        return () => {
            if (cleanupFunctionRef.current) {
                cleanupFunctionRef.current();
                cleanupFunctionRef.current = null;
            }
        };
    }, [
        isVisible,
        raysOrigin,
        raysColor,
        raysSpeed,
        lightSpread,
        rayLength,
        pulsating,
        fadeDistance,
        saturation,
        followMouse,
        mouseInfluence,
        noiseAmount,
        distortion,
    ]);

    useEffect(() => {
        if (
            !uniformsRef.current ||
            !containerRef.current ||
            !rendererRef.current
        )
            return;

        const u = uniformsRef.current;
        const renderer = rendererRef.current;

        u.raysColor.value = hexToRgb(raysColor);
        u.raysSpeed.value = raysSpeed;
        u.lightSpread.value = lightSpread;
        u.rayLength.value = rayLength;
        u.pulsating.value = pulsating ? 1.0 : 0.0;
        u.fadeDistance.value = fadeDistance;
        u.saturation.value = saturation;
        u.mouseInfluence.value = mouseInfluence;
        u.noiseAmount.value = noiseAmount;
        u.distortion.value = distortion;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        const dpr = renderer.dpr;
        // @ts-ignore
        const { anchor, dir } = getAnchorAndDir(
            raysOrigin,
            wCSS * dpr,
            hCSS * dpr,
        );
        u.rayPos.value = anchor;
        u.rayDir.value = dir;
    }, [
        raysColor,
        raysSpeed,
        lightSpread,
        raysOrigin,
        rayLength,
        pulsating,
        fadeDistance,
        saturation,
        mouseInfluence,
        noiseAmount,
        distortion,
    ]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !rendererRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mouseRef.current = { x, y };
        };

        if (followMouse) {
            window.addEventListener("mousemove", handleMouseMove);
            return () =>
                window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [followMouse]);

    return (
        <div
            ref={containerRef}
            className={`light-rays-container ${className}`.trim()}
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        />
    );
};

// 2. Loader
const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "#000",
                color: "#EBEBEB",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(3rem, 10vw, 10rem)",
            }}
        >
            {count}%
        </motion.div>
    );
};

// 3. Nav
const Nav: React.FC = () => {
    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                padding: "var(--spacing-md)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                zIndex: 100,
                mixBlendMode: "difference",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
            }}
        >
            <div
                className="nav-links"
                style={{ display: "flex", gap: "var(--spacing-lg)" }}
            >
                <a
                    href="#idea"
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                    }}
                >
                    <span>01</span>
                    <span style={{ marginLeft: "10px" }}>Idea</span>
                </a>
                <a
                    href="#execution"
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                    }}
                >
                    <span>02</span>
                    <span style={{ marginLeft: "10px" }}>Execution</span>
                </a>
                <a
                    href="#philosophy"
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                    }}
                >
                    <span>03</span>
                    <span style={{ marginLeft: "10px" }}>Philosophy</span>
                </a>
            </div>

            <button
                className="nav-cta"
                style={{
                    background: "transparent",
                    border: "1px solid #EBEBEB",
                    color: "#EBEBEB",
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                }}
                onClick={() =>
                    document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#EBEBEB";
                    e.currentTarget.style.color = "#050505";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#EBEBEB";
                }}
            >
                Let's Talk
            </button>
        </nav>
    );
};

// 4. Hero
const Hero: React.FC = () => {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 1,
            },
        },
    };

    const item: Variants = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section
            className="hero-bg hero-padding"
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "var(--spacing-md)",
                paddingRight: "var(--spacing-md)",
                paddingBottom: "var(--spacing-md)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <motion.h1
                        variants={item}
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(4rem, 15vw, 15rem)",
                            fontStyle: "italic",
                            lineHeight: 0.8,
                            letterSpacing: "-0.04em",
                            paddingBottom: "0.1em",
                        }}
                    >
                        Idea
                    </motion.h1>
                </div>

                <div
                    style={{
                        overflow: "hidden",
                        padding: "1rem 0",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Top vertical line */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "2rem", opacity: 0.5 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        style={{
                            width: "1px",
                            background: "var(--color-text)",
                            marginBottom: "0.5rem",
                        }}
                    />

                    <motion.span
                        variants={item}
                        style={{
                            fontSize: "clamp(1rem, 2vw, 2rem)",
                            fontFamily: "var(--font-sans)",
                            textTransform: "uppercase",
                            display: "block",
                        }}
                    >
                        TO
                    </motion.span>

                    {/* Bottom vertical line with arrow */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "2rem", opacity: 0.5 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        style={{
                            width: "1px",
                            background: "var(--color-text)",
                            marginTop: "0.5rem",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "4px solid transparent",
                                borderRight: "4px solid transparent",
                                borderTop: "6px solid var(--color-text)",
                            }}
                        />
                    </motion.div>
                </div>

                <div style={{ overflow: "hidden" }}>
                    <motion.h1
                        variants={item}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(4rem, 15vw, 15rem)",
                            fontWeight: 400,
                            lineHeight: 0.8,
                            letterSpacing: "-0.02em",
                            paddingBottom: "0.1em",
                        }}
                    >
                        Prototype
                    </motion.h1>
                </div>
            </motion.div>

            <div className="hero-footer">
                <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>(001)</div>
                <div className="hero-footer-text">
                    Most systems capture intent but lose momentum.
                    <span className="serif"> We structure the chaos.</span>
                </div>
            </div>
        </section>
    );
};

// 5. WhyUs
// 5. WhyUs
const WhyUs: React.FC = () => {
    return (
        <section
            style={{
                padding: "var(--spacing-xl) var(--spacing-md)",
                position: "relative",
            }}
        >
            <div className="why-us-grid">
                {/* Left Side: The Problem */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: "clamp(2rem, 3vw, 3rem)",
                            fontFamily: "var(--font-serif)",
                            lineHeight: 1.2,
                            marginBottom: "2rem",
                        }}
                    >
                        <span style={{ fontStyle: "italic", opacity: 0.7 }}>
                            India has ideas everywhere.
                        </span>
                        <br />
                        <span className="text-gradient">
                            What’s missing is movement.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: "1.25rem",
                            lineHeight: 1.6,
                            opacity: 0.8,
                            maxWidth: "90%",
                        }}
                    >
                        Great ideas die because they never become prototypes.{" "}
                        <br />
                        Revenue dies because execution stalls.
                    </motion.p>
                </div>

                {/* Right Side: The Result Box */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="result-box"
                >
                    <h3
                        style={{
                            fontSize: "2rem",
                            fontFamily: "var(--font-sans)",
                            marginBottom: "2rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Result:
                    </h3>

                    <ul
                        style={{
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                        }}
                    >
                        <li
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "flex-start",
                            }}
                        >
                            <span
                                style={{
                                    color: "#8ca6db",
                                    fontSize: "1.2rem",
                                    marginTop: "0.2rem",
                                }}
                            >
                                •
                            </span>
                            <span
                                style={{ fontSize: "1.2rem", lineHeight: 1.5 }}
                            >
                                We Build at{" "}
                                <strong style={{ color: "#fff" }}>
                                    1/10th
                                </strong>{" "}
                                the typical cost of US, UK, or Canada —{" "}
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        fontFamily: "var(--font-serif)",
                                    }}
                                >
                                    without chaos.
                                </span>
                            </span>
                        </li>
                        <li
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "flex-start",
                            }}
                        >
                            <span
                                style={{
                                    color: "#8ca6db",
                                    fontSize: "1.2rem",
                                    marginTop: "0.2rem",
                                }}
                            >
                                •
                            </span>
                            <span
                                style={{ fontSize: "1.2rem", lineHeight: 1.5 }}
                            >
                                Reduce Cognitive Overload in both task doer and
                                task Giver Using{" "}
                                <strong className="text-gradient">Ai</strong>.
                            </span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};
// 5.5. Offer (New Section) - Card-based Presentation
const Offer: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const featureCards = [
        {
            number: "01",
            title: "Ideas & Opportunities",
            content:
                "Over time and with experience, you will encounter a lot of ideas and opportunities.",
            accent: "#8ca6db",
        },
        {
            number: "02",
            title: "The Challenge",
            content:
                "But you don't necessarily have the time or effort to pursue them.",
            accent: "#b993d6",
        },
        {
            number: "03",
            title: "The Need",
            content: "So you will need a quick validation from somebody.",
            accent: "#8ca6db",
        },
    ];

    return (
        <section
            style={{
                padding: "var(--spacing-xl) var(--spacing-md)",
                position: "relative",
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {/* Section Header */}
                <motion.div
                    variants={cardVariants}
                    style={{
                        textAlign: "center",
                        marginBottom: "var(--spacing-lg)",
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.9rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            opacity: 0.5,
                        }}
                    >
                        Our Value Proposition
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            marginTop: "1rem",
                            lineHeight: 1.1,
                        }}
                    >
                        From <span className="text-gradient">Idea</span> to{" "}
                        <span
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontStyle: "normal",
                            }}
                        >
                            Reality
                        </span>
                    </h2>
                </motion.div>

                {/* Feature Cards Row */}
                <div
                    className="offer-feature-cards"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "var(--spacing-lg)",
                    }}
                >
                    {featureCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: `0 20px 50px rgba(140, 166, 219, 0.2)`,
                                borderColor: card.accent,
                            }}
                            style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "12px",
                                padding: "2rem",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "default",
                                transition: "border-color 0.3s ease",
                            }}
                        >
                            {/* Card Number */}
                            <motion.span
                                style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "20px",
                                    fontSize: "5rem",
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                    opacity: 0.05,
                                    color: card.accent,
                                    lineHeight: 1,
                                }}
                            >
                                {card.number}
                            </motion.span>

                            {/* Card Header */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "0.8rem",
                                        fontFamily: "var(--font-sans)",
                                        padding: "0.3rem 0.8rem",
                                        background: `${card.accent}20`,
                                        borderRadius: "20px",
                                        color: card.accent,
                                    }}
                                >
                                    {card.number}
                                </span>
                                <h3
                                    style={{
                                        fontSize: "1.1rem",
                                        fontFamily: "var(--font-sans)",
                                        fontWeight: 600,
                                        color: "#fff",
                                    }}
                                >
                                    {card.title}
                                </h3>
                            </div>

                            {/* Card Content */}
                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                    opacity: 0.85,
                                }}
                            >
                                "{card.content}"
                            </p>

                            {/* Accent Line */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60px" }}
                                transition={{
                                    delay: 0.5 + index * 0.1,
                                    duration: 0.5,
                                }}
                                style={{
                                    height: "2px",
                                    background: `linear-gradient(90deg, ${card.accent}, transparent)`,
                                    marginTop: "1.5rem",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Highlight Card - The Solution */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{ scale: 1.01 }}
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(140, 166, 219, 0.1) 0%, rgba(185, 147, 214, 0.05) 100%)",
                        border: "1px solid rgba(140, 166, 219, 0.3)",
                        borderRadius: "16px",
                        padding: "clamp(2rem, 4vw, 3rem)",
                        marginBottom: "2rem",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Background Decoration */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "300px",
                            height: "300px",
                            background:
                                "radial-gradient(circle, rgba(140, 166, 219, 0.15) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    <motion.h3
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                            fontFamily: "var(--font-sans)",
                            marginBottom: "1rem",
                            lineHeight: 1.2,
                            position: "relative",
                        }}
                    >
                        That quick validation is the{" "}
                        <span
                            className="text-gradient"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontStyle: "italic",
                                fontWeight: 600,
                            }}
                        >
                            prototype
                        </span>
                        .
                    </motion.h3>

                    <motion.p
                        style={{
                            fontSize: "1.2rem",
                            opacity: 0.8,
                            maxWidth: "600px",
                            margin: "0 auto",
                            lineHeight: 1.6,
                            position: "relative",
                        }}
                    >
                        We are here to offer that.
                    </motion.p>
                </motion.div>

                {/* Cost Comparison Cards */}
                <div
                    className="offer-cost-cards"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "2rem",
                    }}
                >
                    {/* Cost Card 1 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0 15px 40px rgba(140, 166, 219, 0.15)",
                        }}
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            padding: "2rem",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "12px",
                                background:
                                    "linear-gradient(135deg, #8ca6db 0%, #b993d6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-sans)",
                                flexShrink: 0,
                            }}
                        >
                            1/10
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: "1.3rem",
                                    fontFamily: "var(--font-sans)",
                                    marginBottom: "0.75rem",
                                    fontWeight: 600,
                                }}
                            >
                                <span className="text-gradient">1/10th</span>{" "}
                                the Cost
                            </h4>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    lineHeight: 1.6,
                                    opacity: 0.8,
                                }}
                            >
                                Compared to traditional providers, we can do it
                                at nearly one-tenth of the usual cost.
                            </p>
                        </div>
                    </motion.div>

                    {/* Cost Card 2 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0 15px 40px rgba(140, 166, 219, 0.15)",
                        }}
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            padding: "2rem",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "12px",
                                background:
                                    "linear-gradient(135deg, #b993d6 0%, #8ca6db 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-sans)",
                                flexShrink: 0,
                            }}
                        >
                            US/UK
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: "1.3rem",
                                    fontFamily: "var(--font-sans)",
                                    marginBottom: "0.75rem",
                                    fontWeight: 600,
                                }}
                            >
                                Global Standards, Local Cost
                            </h4>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    lineHeight: 1.6,
                                    opacity: 0.8,
                                }}
                            >
                                If you build this prototype in the US or UK, the
                                general cost will be based on that. We offer the
                                same quality at a fraction of the price.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Testimonial Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{
                        scale: 1.01,
                        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
                    }}
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "16px",
                        padding: "clamp(2rem, 4vw, 3rem)",
                        position: "relative",
                    }}
                >
                    {/* Quote Icon */}
                    <div
                        style={{
                            position: "absolute",
                            top: "1.5rem",
                            left: "2rem",
                            fontSize: "4rem",
                            fontFamily: "var(--font-serif)",
                            opacity: 0.1,
                            lineHeight: 1,
                        }}
                    >
                        "
                    </div>

                    <div
                        className="offer-testimonial-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "2rem",
                            alignItems: "center",
                        }}
                    >
                        {/* Quote Content */}
                        <div style={{ paddingLeft: "1rem" }}>
                            <p
                                style={{
                                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                "I'll be happy to. We can start to utilize the
                                concept."
                            </p>
                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    lineHeight: 1.6,
                                    opacity: 0.85,
                                }}
                            >
                                "As a talent officer, this is a{" "}
                                <span
                                    style={{
                                        color: "#8ca6db",
                                        fontWeight: 500,
                                    }}
                                >
                                    useful functionality
                                </span>
                                . This is not a useless effort."
                            </p>
                        </div>

                        {/* Attribution */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            style={{
                                background: "rgba(140, 166, 219, 0.1)",
                                borderRadius: "12px",
                                padding: "1.5rem",
                                border: "1px solid rgba(140, 166, 219, 0.2)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg, #8ca6db 0%, #b993d6 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.2rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    TO
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        Talent Officer
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.85rem",
                                            opacity: 0.6,
                                        }}
                                    >
                                        Early Adopter Feedback
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

// 6. WorkSlider
const projects = [
    {
        title: "Idea Capture",
        type: "01",
        category: "Inception",
        desc: "Raw thoughts are preserved before momentum fades. No formatting pressure. No premature structure.",
        details:
            "Great ideas often die in the friction of formatting. Our capture system is designed to be as instantaneous as thought itself. By removing the barrier between 'thinking' and 'recording', we ensure that the nuance of your original insight is never lost. We support voice notes, quick sketches, and raw text dumps that are automatically tagged and categorized for later refinement.",
    },
    {
        title: "Structured Validation",
        type: "02",
        category: "Clarity",
        desc: "Ideas are clarified, shaped, and grounded before effort is invested.",
        details:
            "Optimism is the enemy of execution. Our validation protocols force you to confront the hard questions early. We provide rigorous frameworks for market testing, technical feasibility analysis, and resource estimation. This ensures that you only commit resources to concepts that have a genuine path to reality, filtering out the noise before it becomes expensive.",
    },
    {
        title: "Clear Ownership",
        type: "03",
        category: "Responsibility",
        desc: "Every idea moves forward with responsibility attached. No ambiguity. No diffusion.",
        details:
            "The Bystander Effect kills projects. In our system, nothing exists without an owner. We map every initiative to a specific individual who is accountable for its progress. This doesn't just mean assigning tasks; it means empowering leaders. Clear ownership creates a culture of momentum where everyone knows exactly what is expected of them and has the autonomy to deliver.",
    },
    {
        title: "Proof-Based Tracking",
        type: "04",
        category: "Evidence",
        desc: "Progress is measured through evidence, not status updates.",
        details:
            "Green/Yellow/Red status updates are often lies we tell ourselves. We replace subjective reporting with objective proof. Did the prototype compile? Did the user sign up? Is the API returning 200 OK? Our tracking system requires tangible artifacts for every milestone, creating an undeniable record of truth that cuts through the politics of project management.",
    },
    {
        title: "Outcome Shipping",
        type: "05",
        category: "Realization",
        desc: "Execution ends only when something real exists—not when intent is declared.",
        details:
            "Shipping is a habit, not an event. We optimize everything for the final mile. Automated deployment pipelines, rigorous QA checklists, and go-to-market playbooks are baked into the core workflow. We stop celebrating 'almost done' and start celebrating 'live'. Because until it is in the hands of the user, it is just a hallucination.",
    },
];

const WorkSlider: React.FC = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    const [selectedFeature, setSelectedFeature] = useState<
        (typeof projects)[0] | null
    >(null);

    return (
        <>
            <section
                ref={targetRef}
                className="work-slider-section"
                style={{ height: "400vh", position: "relative" }}
            >
                <div
                    className="work-slider-sticky"
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                        background: "#111",
                        color: "#EBEBEB",
                    }}
                >
                    <motion.div
                        className="work-slider-container"
                        style={{ x, display: "flex", paddingLeft: "10vw" }}
                    >
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                className="work-slider-card"
                                style={{
                                    minWidth: "70vw",
                                    height: "70vh",
                                    marginRight: "5vw",
                                    display: "grid",
                                    gridTemplateRows: "1fr auto",
                                    gap: "2rem",
                                    position: "relative",
                                }}
                            >
                                {/* Visual Block (mimicking image) */}
                                <div
                                    className="work-slider-card-visual"
                                    style={{
                                        background: "#1a1a1a",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "10vw",
                                            fontFamily: "var(--font-serif)",
                                            fontStyle: "italic",
                                            opacity: 0.2 /* Increased brightness */,
                                            lineHeight: 0.8,
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {p.category}
                                    </span>
                                    <div
                                        style={{
                                            fontSize: "8rem",
                                            fontFamily: "var(--font-serif)",
                                            fontStyle: "italic",
                                            zIndex: 1,
                                        }}
                                    >
                                        {p.type}
                                    </div>
                                </div>

                                {/* Content Block */}
                                <div className="work-card-content">
                                    <div>
                                        <h3
                                            className="work-slider-card-title"
                                            style={{
                                                fontSize:
                                                    "clamp(2rem, 4vw, 4rem)",
                                                fontFamily: "var(--font-sans)",
                                                letterSpacing: "-0.03em",
                                                marginBottom: "0.5rem",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {p.title}
                                        </h3>
                                        <span
                                            style={{
                                                fontSize: "0.9rem",
                                                textTransform: "uppercase",
                                                opacity: 0.6,
                                            }}
                                        >
                                            — {p.category}
                                        </span>
                                    </div>

                                    <div style={{ paddingTop: "0.5rem" }}>
                                        <p
                                            style={{
                                                fontSize: "1.25rem",
                                                lineHeight: 1.5,
                                                opacity: 0.8,
                                                maxWidth: "500px",
                                            }}
                                        >
                                            {p.desc}
                                        </p>
                                        <motion.div
                                            whileHover={{
                                                scale: 1.05,
                                                originX: 0,
                                            }}
                                            onClick={() =>
                                                setSelectedFeature(p)
                                            }
                                            style={{
                                                marginTop: "2rem",
                                                textTransform: "uppercase",
                                                fontSize: "0.8rem",
                                                letterSpacing: "0.05em",
                                                borderBottom:
                                                    "1px solid currentColor",
                                                display: "inline-block",
                                                paddingBottom: "2px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Explore Feature
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFeature(null)}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100vh",
                            background: "rgba(0,0,0,0.9)",
                            backdropFilter: "blur(10px)",
                            zIndex: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2rem",
                        }}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#111",
                                border: "1px solid #333",
                                padding: "4rem",
                                maxWidth: "800px",
                                width: "100%",
                                color: "#EBEBEB",
                                position: "relative",
                            }}
                        >
                            <button
                                onClick={() => setSelectedFeature(null)}
                                style={{
                                    position: "absolute",
                                    top: "2rem",
                                    right: "2rem",
                                    background: "transparent",
                                    border: "none",
                                    color: "#EBEBEB",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                }}
                            >
                                Close
                            </button>

                            <span
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                    opacity: 0.5,
                                    fontSize: "2rem",
                                }}
                            >
                                {selectedFeature.type}
                            </span>
                            <h2
                                style={{
                                    fontSize: "4rem",
                                    fontFamily: "var(--font-sans)",
                                    letterSpacing: "-0.03em",
                                    margin: "1rem 0 2rem 0",
                                    lineHeight: 1,
                                }}
                            >
                                {selectedFeature.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: "1.5rem",
                                    lineHeight: 1.6,
                                    opacity: 0.8,
                                }}
                            >
                                {selectedFeature.details}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// 7. About
const About: React.FC = () => {
    return (
        <section
            id="philosophy"
            style={{ padding: "var(--spacing-xl) var(--spacing-md)" }}
        >
            <div className="about-grid">
                <div
                    style={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                ></div>

                <div className="about-content">
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            marginBottom: "var(--spacing-lg)",
                            lineHeight: 1.1,
                        }}
                    >
                        "Execution is not about effort.
                        <br />
                        It is about{" "}
                        <span
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontStyle: "normal",
                            }}
                        >
                            design
                        </span>
                        ."
                    </h2>

                    <p style={{ fontSize: "1.25rem", lineHeight: 1.6 }}>
                        Great ideas die quietly. Not from lack of ambition, but
                        from the silent friction of everyday chaos. The gap
                        between a flash of brilliance and a shipped product is
                        filled with thousands of tiny decisions, distractions,
                        and doubts. We provide the architectural structure to
                        ensure that fragile momentum never breaks effectively
                        shielding your vision from the entropy of the real
                        world.
                    </p>
                    <p
                        style={{
                            fontSize: "1.25rem",
                            opacity: 0.7,
                            lineHeight: 1.6,
                        }}
                    >
                        Our system acts as the museum for your
                        thoughts—curating, preserving, and eventually exhibiting
                        them as realized outcomes. It transforms the abstract
                        into the concrete, forcing every vague intention to pass
                        through a lattice of validation and clear ownership.
                        This is not just project management; it is a philosophy
                        of bringing the non-existent into existence with
                        surgical precision.
                    </p>
                </div>
            </div>
        </section>
    );
};

// 8. Footer
const Footer: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse variants for smoother tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <footer
            id="contact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                height: "100vh",
                background: "#000",
                position: "relative",
                overflow: "hidden",
                cursor: "none", // Hide default cursor in footer
            }}
        >
            {/* Spotlight Circle */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovered ? "250px" : "0px",
                    height: isHovered ? "250px" : "0px",
                    backgroundColor: "#EBEBEB",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 10,
                    mixBlendMode: "difference",
                }}
                transition={{ duration: 0.2 }}
            />

            <div
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <h2
                    style={{
                        fontSize: "15vw",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        lineHeight: 0.8,
                        color: "#EBEBEB",
                    }}
                >
                    Start
                </h2>
                <h2
                    style={{
                        fontSize: "15vw",
                        fontFamily: "var(--font-sans)",
                        letterSpacing: "-0.05em",
                        lineHeight: 0.8,
                        color: "#EBEBEB",
                    }}
                >
                    Now
                </h2>

                <p
                    style={{
                        marginTop: "3rem",
                        maxWidth: "400px",
                        textAlign: "center",
                        color: "#EBEBEB",
                        fontSize: "1.2rem",
                        opacity: 0.7,
                        lineHeight: 1.5,
                    }}
                >
                    Stop waiting for the perfect moment. <br />
                    The gap between idea and reality is action.
                </p>

                {/* CTA Button / Hint */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8,
                    }}
                    style={{
                        marginTop: "4rem",
                        border: "1px solid #EBEBEB",
                        padding: "1rem 2rem",
                        borderRadius: "50px",
                        color: "#EBEBEB",
                        textTransform: "uppercase",
                        fontSize: "1rem",
                        letterSpacing: "0.1em",
                    }}
                >
                    Let's Talk
                </motion.div>
            </div>
        </footer>
    );
};

// --- Main Application Component ---

export default function IdeaToPrototype() {
    const [loading, setLoading] = useState(true);
    useLenis();

    return (
        <>
            {/* Inject Global Styles */}
            <style>{GLOBAL_STYLES}</style>

            <AnimatePresence>
                {loading && <Loader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <>
                    {/* Global Light Rays Background */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 0,
                            opacity: 0.6,
                            pointerEvents: "none",
                        }}
                    >
                        <LightRays
                            raysOrigin="top-center"
                            raysColor="#cccccc"
                            raysSpeed={0.2}
                            rayLength={3}
                            lightSpread={0.3}
                            mouseInfluence={0}
                            noiseAmount={0.05}
                            className="custom-rays"
                        />
                    </div>

                    <main style={{ position: "relative", zIndex: 1 }}>
                        <Nav />
                        <section id="idea">
                            <Hero />
                        </section>
                        <section id="execution">
                            <WhyUs />
                            <Offer />
                        </section>
                        <WorkSlider />
                        <About />
                        <Footer />
                    </main>
                </>
            )}
        </>
    );
}
