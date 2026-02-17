
import React from 'react';

export default function AcademyFAQSection() {
  const faqData = [
    {
      q: "What does Ottobon Academy include?",
      a: "Guided learning paths, mentor sessions, portfolio projects, assessments, resume craft, role matching, and interview prep—optimized with AI to cut learning time.",
    },
    {
      q: "Do you help with job placement?",
      a: "We support your full job journey: ATS-ready resume, role targeting, mock interviews with feedback, and post-placement check-ins.",
    },
    {
      q: "How much time should I budget for Academy?",
      a: "Expect structured weekly cadence with project work. Many learners complete core paths in 12–16 weeks, depending on prior experience.",
    },
    {
      q: "Can I join while working full-time?",
      a: "Yes. We design schedules for working professionals with asynchronous modules plus mentor checkpoints.",
    },
    {
      q: "What courses are available in the Academy?",
      a: "We offer AI for UI/UX Design, AI in Marketing, AI Agent Development, and AI Data Labeling. Each course includes practical projects and industry-relevant skills.",
    },
    {
      q: "How does the AI-powered learning work?",
      a: "Our AI system personalizes your learning path, provides instant feedback on projects, and adapts the curriculum based on your progress and career goals.",
    },
    {
      q: "What support do I get as a student?",
      a: "You'll have access to dedicated mentors, peer study groups, career counseling, and our AI-powered learning assistant available 24/7.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28 bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
             FAQ
          </h2>
          <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqData.map((item, idx) => (
            <details
              key={idx}
              className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-5 sm:p-6 mb-3 sm:mb-4 transition-all duration-300 hover:scale-105 hover:bg-[#112537]/80"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(59, 130, 246, 0.4)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <summary className="cursor-pointer text-white font-medium select-none text-base sm:text-lg md:text-xl list-none">
                <div className="flex items-center justify-between">
                  <span className="pr-4">{item.q}</span>
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-transform duration-200 details-open:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
