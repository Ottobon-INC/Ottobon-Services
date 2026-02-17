import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAnimation, useStaggeredAnimation } from "@/hooks/use-animation";

type CourseCategory = "all" | "Career Launch" | "Tech Edge" | "Career Assist";

interface CategoryInfo {
  id: CourseCategory;
  title: string;
  description: string;
}

const categories: CategoryInfo[] = [
  {
    id: "Career Launch",
    title: "Up-Skill",
    description: "Placement Guaranteed path",
  },
  {
    id: "Tech Edge",
    title: "Job Assist",
    description: "High demand skills in Market",
  },
  {
    id: "Career Assist",
    title: "Career Support",
    description: "Expert guidance for your career journey",
  },
];

interface Course {
  id: string;
  title: string;
  category: "Career Launch" | "Tech Edge" | "Career Assist";
  categoryLabel: string;
  color: string;
  bgColor: string;
  description: string;
  outcomes: string[];
  logoUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function CoursesSection() {
  const [activeFilter, setActiveFilter] =
    useState<CourseCategory>("Career Launch");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Courses data
  const courses: Course[] = [
    {
      id: "ai-uiux",
      title: "AI for Web Development",
      category: "Career Launch",
      categoryLabel: "Design Intelligence",
      color: "indigo-800",
      bgColor: "indigo-100",
      description:
        "Integrate AI into UI/UX workflows for smarter, data-driven design and personalized user experiences.",
      outcomes: [
        "Master AI-driven design principles and tools",
        "Build generative UI/UX prototyping systems",
        "Apply AI to user research and testing workflows",
        "Design adaptive, personalized interfaces",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-indigo-700",
    },
    {
      id: "ai-agent-development",
      title: "AI Agent Development",
      category: "Career Launch",
      categoryLabel: "Agent Engineering",
      color: "emerald-800",
      bgColor: "emerald-100",
      description:
        "Build intelligent AI agents and autonomous systems using cutting-edge frameworks and NLP.",
      outcomes: [
        "Design conversational AI agents and chatbots",
        "Build multi-agent systems and autonomous workflows",
        "Implement advanced NLP and reasoning capabilities",
        "Create scalable agent architectures for enterprises",
      ],
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-700",
    },
    {
      id: "ai-marketing",
      title: "AI in Marketing",
      category: "Career Launch",
      categoryLabel: "Marketing Intelligence",
      color: "amber-800",
      bgColor: "amber-100",
      description:
        "Master AI-driven marketing strategies and automation tools to transform customer engagement.",
      outcomes: [
        "Build AI-powered marketing automation systems",
        "Master predictive analytics and behavior modeling",
        "Create AI-driven content and campaign optimization",
        "Implement advanced attribution and ROI measurement",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-700",
    },
    {
      id: "ai-data-labeling",
      title: "AI Data Labeling",
      category: "Career Launch",
      categoryLabel: "Data Intelligence",
      color: "pink-800",
      bgColor: "pink-100",
      description:
        "Specialize in high-quality data annotation and labeling workflows for training robust AI models.",
      outcomes: [
        "Master advanced data annotation and quality control",
        "Design efficient labeling workflows and guidelines",
        "Build automated labeling and human-in-the-loop systems",
        "Apply domain-specific labeling for various AI applications",
      ],
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/512px-Jupyter_logo.svg.png",
      gradientFrom: "from-pink-500",
      gradientTo: "to-pink-700",
    },
    {
      id: "resume-builder",
      title: "Resume Building",
      category: "Tech Edge",
      categoryLabel: "Career Tools",
      color: "blue-800",
      bgColor: "blue-100",
      description:
        "AI-powered, ATS-friendly resumes that stand out with industry templates and smart customization.",
      outcomes: [
        "Start from Scratch / Modify Existing / JD-Based Resume modes",
        "Upload an existing resume for instant refinement",
        "Paste a job description to tailor a role-specific resume",
        "Export in professional formats",
        "Outcome: polished, targeted resumes for every application",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
    },
    {
      id: "job-matching",
      title: "Find a Job",
      category: "Tech Edge",
      categoryLabel: "Career Opportunities",
      color: "green-800",
      bgColor: "green-100",
      description:
        "Finds roles that fit both your skills and personality with personalized job alerts.",
      outcomes: [
        "Personality + skill matching for best-fit opportunities",
        "Personalized job alerts after you create your resume",
        "Smart filters: location, experience, remote/hybrid/on-site, etc.",
        "Real-time updates with fresh openings across industries",
        "Outcome: discover the right job and culture for you",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-700",
    },
    {
      id: "mock-interviews",
      title: "Mock Interviews",
      category: "Tech Edge",
      categoryLabel: "Interview Preparation",
      color: "purple-800",
      bgColor: "purple-100",
      description:
        "Unlimited AI-powered practice to boost confidence with Standard and JD-Based modes.",
      outcomes: [
        "Modes: Standard (by domain) / JD-Based (from a job description)",
        "Mixed question types: MCQs, descriptive, scenario-based",
        "Detailed feedback highlighting strengths & improvement areas",
        "Actionable tips to fix weak spots step by step",
        "Extra learning support via our expert app",
        "Outcome: be fully prepared before the real interview",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-700",
    },
    {
      id: "expert-app",
      title: "Guidance Hub",
      category: "Career Assist",
      categoryLabel: "Guidance from Experts",
      color: "teal-800",
      bgColor: "teal-100",
      description:
        "Helps you to solve everyday technical challenges, grow within your organization, and map a clear path to success.",
      outcomes: [
        "Access expert knowledge in many fields",
        "Learn best practices and strategies",
        "Get your own personalized answers",
        "Receive real-time answers to technical questions",
        "Build skills through interactive expert sessions",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712038.png",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-700",
    },
  ];

  // Filter courses based on selected category
  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

  // Toggle flip card state
  const toggleFlipCard = (courseId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  // Responsive slide count function
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  // State for responsive slides
  const [slidesPerView, setSlidesPerView] = useState(getVisibleSlides());

  // Embla carousel setup
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: "keepSnaps",
    direction: "ltr",
    startIndex: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  // Check if we need to show navigation at all
  const [canScroll, setCanScroll] = useState(true);

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = getVisibleSlides();
      if (newSlidesPerView !== slidesPerView) {
        setSlidesPerView(newSlidesPerView);

        // Reset and rebuild carousel when window size changes
        if (embla) {
          embla.reInit();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [embla, slidesPerView]);

  const onSelect = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    // Set initial scroll state
    const updateCanScroll = () => {
      const totalSlides = filteredCourses.length;
      const visibleSlides = getVisibleSlides();
      setCanScroll(totalSlides > visibleSlides);
    };

    updateCanScroll();
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", updateCanScroll);

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", updateCanScroll);
    };
  }, [embla, onSelect, filteredCourses, canScroll]);

  // Animation refs
  const sectionRef = useAnimation("animate-fade-in");
  const headingRef = useAnimation("animate-slide-up");
  const descriptionRef = useAnimation("animate-slide-up delay-100");
  const filtersRef = useAnimation("animate-slide-up delay-200");
  const carouselRef = useAnimation("animate-scale-in delay-300");

  return (
    <section
      id="courses"
      className="py-16 overflow-hidden bg-black relative"
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4 bg-blue-500/10 px-6 py-2 rounded-full border border-blue-400/20 backdrop-blur-sm">
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
              In-Demand Skills
            </span>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
          >
            Advance Your Professional Skills
          </h2>
          <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400/80 via-blue-300/50 to-purple-400/80 rounded-full"></div>
        </div>

        {/* Course Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <button
                  className={`font-semibold py-3 px-8 rounded-lg transition-all duration-200 ${
                    activeFilter === category.id
                      ? "bg-blue-600 text-white shadow-lg border-2 border-blue-500 shadow-blue-500/30"
                      : "bg-white/5 hover:bg-white/10 text-blue-100 shadow-sm border-2 border-white/10 hover:border-white/20 backdrop-blur-sm"
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.title}
                </button>
              </div>
            ))}
          </div>

          {/* Description for selected category only */}
          <div className="flex justify-center animate-fade-in">
            {categories.map(
              (category) =>
                activeFilter === category.id && (
                  <p
                    key={category.id}
                    className="text-sm text-blue-200/80 mt-2 text-center max-w-md"
                  >
                    {category.description}
                  </p>
                ),
            )}
          </div>
        </div>

        {/* Course Carousel */}
        <div ref={carouselRef} className="relative">
          <div
            className="overflow-hidden"
            ref={viewportRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={`flex ${filteredCourses.length === 1 ? "justify-center" : ""}`}
            >
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`${filteredCourses.length === 1 ? "w-full max-w-sm mx-auto" : "min-w-[100%] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)]"} px-2 sm:px-4 flex-shrink-0`}
                >
                  <div
                    className={`flip-card ${flippedCards[course.id] ? "flipped" : ""} group relative h-[450px] sm:h-[500px]`}
                    onClick={() => toggleFlipCard(course.id)}
                    onTouchStart={() => setIsHovering(true)}
                    onTouchEnd={() => setIsHovering(false)}
                    onMouseDown={() => setIsHovering(true)}
                    onMouseUp={() => setIsHovering(false)}
                  >
                    <div
                      className={`flip-card-inner ${flippedCards[course.id] ? "flipped" : ""}`}
                    >
                      {/* Card Front */}
                      <div className="flip-card-front">
                        <div
                          className={`h-3/5 bg-gradient-to-br ${course.gradientFrom} ${course.gradientTo} flex items-center justify-center p-6 sm:p-8 relative overflow-hidden`}
                        >
                          {/* Professional decorative pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage:
                                  "linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.3) 49%, rgba(255,255,255,0.3) 51%, transparent 52%), linear-gradient(150deg, transparent 48%, rgba(255,255,255,0.3) 49%, rgba(255,255,255,0.3) 51%, transparent 52%)",
                                backgroundSize: "20px 20px",
                              }}
                            ></div>
                          </div>

                          {/* Course title in header */}
                          <div className="relative z-10 text-center px-4">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight break-words">
                              {course.title}
                            </h3>
                            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                              <span className="text-white text-xs sm:text-sm font-semibold">
                                {course.categoryLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-2/5 bg-gray-900/95 border-t-2 border-white/10">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                {course.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 self-start sm:self-auto sm:ml-3">
                              {course.id !== "ai-uiux" && (
                                <span className="text-xs font-bold px-3 py-1.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/40 whitespace-nowrap">
                                  Coming Soon
                                </span>
                              )}
                              {course.id === "ai-uiux" && (
                                <span className="text-xs font-bold px-3 py-1.5 rounded-md bg-green-500/20 text-green-300 border border-green-500/40 whitespace-nowrap">
                                  Enroll Now
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div className="flip-card-back">
                        <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col bg-gray-900/95">
                          <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-white/10">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex-1 min-w-0">
                              <span className="truncate">{course.title}</span>
                            </h3>
                            <button
                              className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition flex-shrink-0 ml-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlipCard(course.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>

                          <div className="overflow-y-auto flex-1 scrollbar-hide">
                            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
                              <h4 className="font-bold mb-3 text-blue-300 text-sm sm:text-base uppercase tracking-wide">
                                Key Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {course.outcomes.map((outcome, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start text-xs sm:text-sm"
                                  >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                                    <span className="text-gray-300 leading-relaxed">
                                      {outcome}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Conditional content based on course category */}
                            {course.category === "Career Launch" ? (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-purple-300 text-xs sm:text-sm uppercase tracking-wide">
                                      Duration
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      12-week immersive program
                                    </p>
                                  </div>

                                  <div className="bg-green-500/10 border border-green-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-green-300 text-xs sm:text-sm uppercase tracking-wide">
                                      Format
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      Expert guidance and career mentorship
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-lg mb-4">
                                  <h4 className="font-bold mb-2 text-gray-200 text-xs sm:text-sm uppercase tracking-wide">
                                    Career Opportunities
                                  </h4>
                                  <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                    Graduates work as specialized consultants in
                                    top firms with excellent career advancement
                                    opportunities and competitive compensation
                                    packages.
                                  </p>
                                </div>
                              </>
                            ) : course.category === "Tech Edge" ? (
                              <>
                                <div className="grid grid-cols-1 gap-3 mb-4">
                                  <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-indigo-300 text-xs sm:text-sm uppercase tracking-wide">
                                      {course.id === "resume-builder" &&
                                        "Multiple Modes"}
                                      {course.id === "job-matching" &&
                                        "Smart Matching"}
                                      {course.id === "mock-interviews" &&
                                        "Unlimited Practice"}
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      {course.id === "resume-builder" &&
                                        "Start from scratch, modify existing, or create JD-based resumes"}
                                      {course.id === "job-matching" &&
                                        "Personality and skill-based matching for best-fit roles"}
                                      {course.id === "mock-interviews" &&
                                        "Practice anytime with Standard or JD-Based interview modes"}
                                    </p>
                                  </div>

                                  <div className="bg-teal-500/10 border border-teal-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-teal-300 text-xs sm:text-sm uppercase tracking-wide">
                                      {course.id === "resume-builder" &&
                                        "ATS-Optimized"}
                                      {course.id === "job-matching" &&
                                        "Real-Time Updates"}
                                      {course.id === "mock-interviews" &&
                                        "Detailed Feedback"}
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      {course.id === "resume-builder" &&
                                        "Templates optimized for applicant tracking systems"}
                                      {course.id === "job-matching" &&
                                        "Fresh openings across industries with smart filters"}
                                      {course.id === "mock-interviews" &&
                                        "Highlights strengths and improvement areas with actionable tips"}
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/30 p-3 sm:p-4 rounded-lg mb-4">
                                  <h4 className="font-bold mb-2 text-amber-300 text-xs sm:text-sm uppercase tracking-wide">
                                    {course.id === "resume-builder" &&
                                      "Professional Results"}
                                    {course.id === "job-matching" &&
                                      "Perfect Fit"}
                                    {course.id === "mock-interviews" &&
                                      "Interview Ready"}
                                  </h4>
                                  <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                    {course.id === "resume-builder" &&
                                      "Polished, targeted resumes for every application with multiple export formats"}
                                    {course.id === "job-matching" &&
                                      "Discover the right job and culture that matches your skills and personality"}
                                    {course.id === "mock-interviews" &&
                                      "Be fully prepared before the real interview with comprehensive practice sessions"}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-1 gap-3 mb-4">
                                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-cyan-300 text-xs sm:text-sm uppercase tracking-wide">
                                      Expert Mentors
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      Industry professionals with years of
                                      experience
                                    </p>
                                  </div>

                                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 sm:p-4 rounded-lg">
                                    <h4 className="font-bold mb-2 text-rose-300 text-xs sm:text-sm uppercase tracking-wide">
                                      Personalized
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                      Tailored guidance based on your goals
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-slate-500/10 border border-slate-500/30 p-3 sm:p-4 rounded-lg mb-4">
                                  <h4 className="font-bold mb-2 text-slate-200 text-xs sm:text-sm uppercase tracking-wide">
                                    Investment
                                  </h4>
                                  <p className="text-gray-300 text-xs sm:text-sm leading-tight">
                                    Affordable monthly subscription with
                                    unlimited access to expert guidance and
                                    resources.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="mt-4 text-center pt-4 border-t border-white/10">
                            {course.id === "ai-uiux" ? (
                              <button
                                onClick={() => {
                                  window.location.href =
                                    "https://cohort.ottobon.cloud/";
                                }}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center text-sm sm:text-base"
                              >
                                Apply Now
                                <svg
                                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  ></path>
                                </svg>
                              </button>
                            ) : (
                              <button
                                disabled
                                className="bg-white/5 text-gray-400 font-bold py-3 px-8 rounded-lg cursor-not-allowed inline-flex items-center text-sm sm:text-base border border-white/10"
                              >
                                Coming Soon
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only show if we can scroll */}
          {canScroll && (
            <>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-2 bg-black/60 backdrop-blur-sm shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-10 text-white/70 hover:text-white hover:bg-black/80 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50"
                onClick={() => embla?.scrollPrev()}
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-2 md:right-2 bg-black/60 backdrop-blur-sm shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-10 text-white/70 hover:text-white hover:bg-black/80 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50"
                onClick={() => embla?.scrollNext()}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
