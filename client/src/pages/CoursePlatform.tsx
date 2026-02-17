// static-dashboard.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Static Dashboard Page
 * - Full UI preserved from your original
 * - No API calls, no localStorage/session, no real navigation
 * - Clickables are stubs (show toast or do nothing)
 * - Copy-pasteable into any React + TypeScript project (Tailwind classes preserved)
 */

/* ------------------------ Types & Demo data ------------------------ */

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  rating: number;
  category: string;
  thumbnail: string;
  isEnrolled?: boolean;
  progress?: number;
};

const coursesData: Course[] = [
  {
    id: "ai-in-web-development",
    title: "AI in Web Development",
    description:
      "Master the integration of AI technologies in modern web development. Learn to build intelligent applications using machine learning APIs, natural language processing, and computer vision.",
    instructor: "Dr. Sarah Chen",
    duration: "8 hours",
    price: 3999,
    level: "Beginner",
    students: 2847,
    rating: 4.8,
    category: "AI & Machine Learning",
    thumbnail:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-agent-build",
    title: "AI in Agent Build",
    description:
      "Build autonomous AI agents that can perform complex tasks. Learn agent architecture, tool integration, decision-making frameworks, and how to create intelligent systems that reason and act.",
    instructor: "Dr. James Wilson",
    duration: "10 hours",
    price: 4999,
    level: "Intermediate",
    students: 1856,
    rating: 4.9,
    category: "AI & Agents",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-in-marketing",
    title: "AI in Marketing",
    description:
      "Transform your marketing strategy with AI. Learn to leverage AI for content creation, customer segmentation, predictive analytics, personalization, and automated campaign optimization.",
    instructor: "Emily Martinez",
    duration: "7 hours",
    price: 3799,
    level: "Beginner",
    students: 2134,
    rating: 4.7,
    category: "AI & Marketing",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "python-using-ai",
    title: "Python using AI",
    description:
      "Harness the power of AI with Python. Master AI libraries, build machine learning models, work with neural networks, and create intelligent automation using Python's AI ecosystem.",
    instructor: "Prof. Michael Chang",
    duration: "12 hours",
    price: 4599,
    level: "Intermediate",
    students: 3421,
    rating: 4.8,
    category: "Python & AI",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
];

const landingCoursesData: Course[] = [];

/* ----------------------- Simple UI building blocks ---------------------- */

function IconBadge({
  children,
  className = "",
  dataTip = "",
  label = "",
}: {
  children: ReactNode;
  className?: string;
  dataTip?: string;
  label?: string;
}) {
  return (
    <button
      className={`absolute w-11 h-11 rounded-xl grid place-items-center bg-white border border-gray-200 shadow-lg cursor-default transition-all duration-200 ease-out hover:scale-[1.06] hover:shadow-xl hover:ring-2 hover:ring-green-600/25 focus-visible:ring-2 focus-visible:ring-green-600/25 focus:outline-none ${className}`}
      data-tip={dataTip}
      aria-label={label}
      type="button"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

/* ---------------------------- Tiny Toast ------------------------------- */
/* Small local toast so UI actions give feedback (no external libs) */
function useLocalToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2200);
    return () => clearTimeout(t);
  }, [msg]);
  return {
    toast: (t: string) => setMsg(t),
    ToastEl: msg ? (
      <div className="fixed right-4 bottom-6 z-50 bg-black text-white px-4 py-2 rounded-md shadow">
        {msg}
      </div>
    ) : null,
  };
}

/* ------------------------ Small SiteLayout replica ----------------------- */
/* Keep same headerProps shape as in your original so the UI matches */
function SiteLayout({
  headerProps,
  children,
}: {
  headerProps: any;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo Section - Enhanced */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0ea5a7] to-[#0c9092] rounded-xl opacity-20 group-hover:opacity-30 blur transition-all"></div>
                <div className="relative w-11 h-11 bg-gradient-to-br from-[#0ea5a7] to-[#0c9092] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  MetaLearn
                </div>
                <div className="text-xs font-medium text-gray-500 tracking-wide hidden sm:block">
                  Harvard method of teaching
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Refined */}
            <nav className="hidden lg:flex items-center gap-2">
              {headerProps?.showSearch && (
                <div className="relative mr-4">
                  <input
                    value={headerProps?.searchQuery ?? ""}
                    onChange={(e) =>
                      headerProps?.onSearchChange?.(e.target.value)
                    }
                    placeholder="Search courses..."
                    className="w-72 xl:w-96 pl-4 pr-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5a7]/20 focus:border-[#0ea5a7] focus:bg-white transition-all placeholder:text-gray-400"
                    aria-label="Search courses"
                  />
                </div>
              )}

              <button
                type="button"
                className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#0ea5a7] hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => headerProps?.onNavigate?.("/courses")}
              >
                Courses
              </button>

              <button
                type="button"
                className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#0ea5a7] hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2"
                onClick={() => headerProps?.onNavigate?.("/cart")}
                aria-label="Cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Cart</span>
                {(headerProps?.cartCount ?? 0) > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {headerProps?.cartCount}
                  </span>
                )}
              </button>

              <button
                className="ml-4 p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                onClick={() => headerProps?.onLoginClick?.()}
                type="button"
                aria-label="Sign in with Google"
              >
                <svg className="w-6 h-6" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.9 16 19.1 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 15.4 3 8.1 8.1 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.2 0 10-2 13.6-5.4l-6.3-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3C34.8 31.5 29.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
                  />
                </svg>
              </button>
            </nav>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                type="button"
                className="relative p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                onClick={() => headerProps?.onNavigate?.("/cart")}
                aria-label="Cart"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {(headerProps?.cartCount ?? 0) > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {headerProps?.cartCount}
                  </span>
                )}
              </button>

              <button
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                onClick={() => headerProps?.onLoginClick?.()}
                type="button"
                aria-label="Sign in with Google"
              >
                <svg className="w-6 h-6" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.9 16 19.1 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 15.4 3 8.1 8.1 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.2 0 10-2 13.6-5.4l-6.3-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3C34.8 31.5 29.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Enhanced */}
          {headerProps?.showSearch && (
            <div className="pb-4 lg:hidden">
              <div className="relative">
                <input
                  value={headerProps?.searchQuery ?? ""}
                  onChange={(e) =>
                    headerProps?.onSearchChange?.(e.target.value)
                  }
                  placeholder="Search courses..."
                  className="w-full pl-4 pr-4 py-3 text-sm border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5a7]/20 focus:border-[#0ea5a7] focus:bg-white transition-all placeholder:text-gray-400"
                  aria-label="Search courses"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

/* ------------------------------ Page ---------------------------------- */

export default function StaticDashboardFull() {
  const { toast, ToastEl } = useLocalToast();

  // Build base catalog (merge demo arrays)
  const baseCatalog = useMemo(
    () => [
      ...coursesData,
      ...landingCoursesData.filter(
        (lc) => !coursesData.some((c) => c.id === lc.id),
      ),
    ],
    [],
  );

  // State (all local in-memory)
  const [catalogCourses] = useState<Course[]>(baseCatalog);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(baseCatalog);
  const [cart, setCart] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // scroller ref
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(catalogCourses);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredCourses(
        catalogCourses.filter(
          (course) =>
            course.title.toLowerCase().includes(q) ||
            course.description.toLowerCase().includes(q) ||
            course.category.toLowerCase().includes(q),
        ),
      );
    }
  }, [searchQuery, catalogCourses]);

  // UI-only handlers (stubs)
  const handleNavClick = useCallback(
    (href: string) => {
      toast("Coming Soon");
    },
    [toast],
  );

  const enrollNow = useCallback(
    (course: Course) => {
      toast("Coming Soon");
    },
    [toast],
  );

  const addToCart = useCallback(
    (course: Course) => {
      toast("Coming Soon");
    },
    [cart, toast],
  );

  const continueLearning = useCallback(
    (course: Course) => {
      toast("Coming Soon");
    },
    [toast],
  );

  const handleLogout = useCallback(() => {
    toast("Coming Soon");
  }, [toast]);

  const handleProfileClick = useCallback(() => {
    toast("Coming Soon");
  }, [toast]);

  const handleSettingsClick = useCallback(() => {
    toast("Coming Soon");
  }, [toast]);

  const scrollRail = (direction: number) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: direction * 280, behavior: "smooth" });
    }
  };

  // video modal (local)
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const HERO_VIDEO_URL =
    "https://www.youtube.com/embed/p3F-1QyvHnY?si=Mb0WsuWza5wbgG0W";
  const [videoSrc, setVideoSrc] = useState("");

  const handleVideoModal = (open: boolean) => {
    if (open) {
      setVideoSrc(HERO_VIDEO_URL);
      setIsVideoDialogOpen(true);
    } else {
      setVideoSrc("");
      setIsVideoDialogOpen(false);
    }
  };

  const totalCartValue = cart.reduce((s, c) => s + c.price, 0);
  const exploreCourses = filteredCourses.filter((c) => !c.isEnrolled);
  const heroCourse = catalogCourses[0];

  const userStub = {
    name: "Learner",
    email: "learner@example.com",
    initials: "L",
  };

  return (
    <SiteLayout
      headerProps={{
        cartCount: cart.length,
        currentPath: "/",
        onNavigate: handleNavClick,
        showSearch: true,
        searchQuery,
        onSearchChange: setSearchQuery,
        isAuthenticated: false,
        user: userStub,
        onProfileClick: handleProfileClick,
        onSettingsClick: handleSettingsClick,
        onLogout: handleLogout,
        onLoginClick: () => toast("Coming Soon"),
      }}
    >
      {/* HERO */}
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-7 items-center pt-8 px-2 sm:px-4 lg:px-2 relative">
        <div>
          <div className="text-red-600 font-bold mb-2">Learn anywhere</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-[-0.02em]">
            Your Next <br className="hidden sm:inline" />
            Online School
          </h1>
          <p className="text-gray-500 max-w-lg mt-3 mb-5">
            Build your portfolio by earning certifications when you complete
            courses.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              className="bg-[#0ea5a7] text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-[#0ea5a7]/30 hover:shadow-xl hover:translate-y-[-1px] transition-all flex items-center gap-2"
              onClick={() => heroCourse && enrollNow(heroCourse)}
              type="button"
            >
              Enroll
              <ChevronRight className="w-5 h-5" />
            </button>

            <a
              className="flex items-center gap-2 text-gray-900 font-semibold cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleVideoModal(true);
              }}
              href="#play"
            >
              <span className="w-10 h-10 rounded-full bg-red-500 grid place-items-center text-white shadow-lg shadow-red-500/30">
                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
              </span>
              Play Video
            </a>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-2xl overflow-visible hidden sm:block">
          <div
            className="absolute inset-0 filter blur-xl opacity-20"
            style={{
              background:
                "conic-gradient(from 220deg, #0ea5a7 0 30%, #2563eb 30% 55%, #ef4444 55% 75%, #10b981 75% 100%)",
            }}
          />
          <div
            className="relative h-full min-h-[360px] rounded-2xl bg-center bg-cover bg-no-repeat shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=1200&auto=format&fit=crop')",
              clipPath: "polygon(10% 0, 90% 0, 70% 100%, 0% 100%)",
            }}
          />

          <IconBadge
            className="left-[14%] top-[52%]"
            dataTip="Google 101"
            label="Google 101"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.9 16 19.1 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5 29.5 3 24 3 15.4 3 8.1 8.1 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 45c5.2 0 10-2 13.6-5.4l-6.3-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3C34.8 31.5 29.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C8 39.5 15.4 45 24 45c10.5 0 20-7.6 20-21 0-1.4-.2-2.8-.4-3.5z"
              />
            </svg>
          </IconBadge>

          <IconBadge
            className="right-[7%] top-[18%]"
            dataTip="Sheets"
            label="Google Sheets"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#0F9D58"
                d="M8 8h22l10 10v22a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
              />
              <path fill="#fff" d="M30 8v10h10" />
              <rect x="14" y="22" width="20" height="2" fill="#fff" />
              <rect x="14" y="27" width="20" height="2" fill="#fff" />
              <rect x="14" y="32" width="20" height="2" fill="#fff" />
            </svg>
          </IconBadge>

          <IconBadge
            className="right-[12%] bottom-[8%]"
            dataTip="Drive"
            label="Google Drive"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#0F9D58" d="M17 8h14l11 19-7 13H13L6 27 17 8z" />
              <path fill="#FFCD40" d="M17 8l7 12-11 7L6 27 17 8z" />
              <path fill="#4285F4" d="M31 8l-7 12 11 7 7-12L31 8z" />
            </svg>
          </IconBadge>

          <IconBadge
            className="left-[36%] bottom-[-12px]"
            dataTip="AI Assistant"
            label="AI Assistant"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0ea5a7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v5M12 17v5M4.2 4.2l3.5 3.5M16.3 16.3l3.5 3.5M2 12h5M17 12h5M4.2 19.8l3.5-3.5M16.3 7.7l3.5-3.5" />
            </svg>
          </IconBadge>

          <svg
            className="absolute right-[6%] top-[58%] opacity-25 rotate-6"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            stroke="#0f172a"
            strokeOpacity=".4"
            strokeWidth="2"
          >
            <path d="M60 20a22 22 0 1 1 0 44 22 22 0 0 1 0-44Z" />
            <path d="M58 70 45 108l16-10 16 10-13-38" />
          </svg>
        </div>
      </section>

      {/* TRENDING */}
      <h2 className="text-3xl sm:text-4xl font-serif text-center mt-16 mb-6 font-bold">
        Trending Courses{" "}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </h2>

      <section className="relative p-2 sm:p-4 lg:px-11">
        <button
          type="button"
          className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 hidden sm:flex items-center justify-center"
          onClick={() => scrollRail(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={railRef}
          className="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory pb-2"
        >
          {exploreCourses.map((course) => (
            <article
              key={course.id}
              className="flex-shrink-0 w-[250px] sm:w-[280px] bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer snap-start overflow-hidden"
              onClick={() => setSelectedCourse(course)}
              role="button"
            >
              <div className="w-full h-36 bg-gray-200 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                <div className="text-yellow-500 text-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-500" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-500 font-normal">
                    {" "}
                    • {course.students} students
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {course.description}
                </p>
                <button
                  className="w-full mt-4 bg-gray-400 text-white font-semibold shadow-md py-2 rounded cursor-not-allowed"
                  disabled
                  type="button"
                >
                  Coming Soon
                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 hidden sm:flex items-center justify-center"
          onClick={() => scrollRail(1)}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Features Overview Section */}
      <section className="mt-24 mb-16 px-2 sm:px-4 lg:px-11">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Learning Experience That Adapts to You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powered by cutting-edge AI and personalized support to ensure your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Socratic AI Tutor */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-[#0ea5a7]/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0ea5a7] to-[#0c9092] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Socratic AI Tutor</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn through guided questioning that helps you discover answers yourself, fostering deeper understanding and critical thinking.
            </p>
            <div className="flex items-center text-[#0ea5a7] font-semibold text-sm">
              <span>Explore AI Tutor</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AI Chatbot */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 AI Assistant</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get instant answers to your questions anytime. Our AI chatbot is always ready to help clarify concepts and guide your learning journey.
            </p>
            <div className="flex items-center text-purple-600 font-semibold text-sm">
              <span>Chat Now</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module Assessments */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Assessments</h3>
            <p className="text-gray-600 text-sm mb-4">
              Test your knowledge with interactive quizzes and assessments after each module. Track your progress and identify areas for improvement.
            </p>
            <div className="flex items-center text-blue-600 font-semibold text-sm">
              <span>View Assessments</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Certificates */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Certificates</h3>
            <p className="text-gray-600 text-sm mb-4">
              Earn industry-recognized certificates upon course completion. Showcase your achievements to employers and boost your career prospects.
            </p>
            <div className="flex items-center text-amber-600 font-semibold text-sm">
              <span>See Sample Certificate</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Expert Tutors */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-green-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Tutors</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with industry professionals and experienced instructors. Get personalized guidance and mentorship throughout your learning journey.
            </p>
            <div className="flex items-center text-green-600 font-semibold text-sm">
              <span>Meet Our Tutors</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-red-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Progress Dashboard</h3>
            <p className="text-gray-600 text-sm mb-4">
              Monitor your learning journey with detailed analytics. Track completion rates, quiz scores, and time invested in each course.
            </p>
            <div className="flex items-center text-red-600 font-semibold text-sm">
              <span>View Dashboard</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Selected course floating card */}
      {selectedCourse && (
        <div className="fixed left-4 bottom-4 z-40 bg-white border rounded-lg shadow-lg w-80 p-4">
          <div className="flex items-start gap-3">
            <img
              src={selectedCourse.thumbnail}
              alt=""
              className="w-16 h-12 object-cover rounded"
            />
            <div>
              <div className="font-bold">{selectedCourse.title}</div>
              <div className="text-sm text-gray-500">
                {selectedCourse.instructor}
              </div>
              <div className="text-sm mt-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-white border rounded"
                  onClick={() => {
                    addToCart(selectedCourse);
                    setSelectedCourse(null);
                  }}
                  type="button"
                >
                  Add to cart
                </button>
                <button
                  className="px-3 py-1 bg-[#0ea5a7] text-white rounded"
                  onClick={() => {
                    enrollNow(selectedCourse);
                    setSelectedCourse(null);
                  }}
                  type="button"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
          <div
            className="text-xs text-gray-400 mt-2 cursor-pointer"
            onClick={() => setSelectedCourse(null)}
          >
            Close
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => handleVideoModal(false)}
            className="fixed inset-0 bg-black/40"
          />
          <div className="relative z-10 w-full max-w-4xl">
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-black/40">
              <iframe
                title="Hero Video"
                width="100%"
                height="100%"
                src={videoSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder={0}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Local toast */}
      {ToastEl}
    </SiteLayout>
  );
}
