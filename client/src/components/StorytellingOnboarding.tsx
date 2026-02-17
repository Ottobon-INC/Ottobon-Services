import { useState, useEffect, useRef } from 'react';
import { useAnimation } from '@/hooks/use-animation';

// Define character types for the storytelling experience
interface Character {
  name: string;
  role: string;
  background: string;
  avatar: string;
  story: StorySegment[];
}

// Define story segment structure
interface StorySegment {
  id: number;
  text: string;
  choices?: Choice[];
  image?: string;
  animation?: string;
}

// Define choice options that progress the story
interface Choice {
  id: number;
  text: string;
  nextSegmentId: number;
  impact?: string; // How this choice impacts the story/character's path
}

export default function StorytellingOnboarding() {
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const titleRef = useAnimation('animate-slide-up');
  const storyContainerRef = useAnimation('animate-scale-in delay-100');

  // State for tracking current character and story progress
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentSegmentId, setCurrentSegmentId] = useState(1);
  const [storyHistory, setStoryHistory] = useState<number[]>([]);
  const [pathOutcome, setPathOutcome] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  // Characters with their own unique stories and backgrounds
  const characters: Character[] = [
    {
      name: "Arjun Sharma",
      role: "Career Switcher",
      background: "Former CA working in audit, seeking a career transition to tech consulting",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After seven years as a Chartered Accountant in Mumbai's corporate audit sector, I felt trapped in spreadsheets and compliance reports. The work had become mechanical, and I yearned for something that would challenge me intellectually. That's when I discovered how technology consultants were revolutionizing businesses across India...",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "Why did you choose tech consulting over other fields?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Weren't you concerned about leaving a stable CA career?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "My analytical background from CA work was actually a perfect foundation! Tech consulting allowed me to use my business understanding while working with innovative digital solutions. I could see how Indian companies were transforming - from traditional businesses to digital-first enterprises. The variety of projects and constant learning appealed to my curious nature.",
          choices: [
            {
              id: 3,
              text: "What was your first step in this transition?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "Absolutely, leaving a prestigious CA position was terrifying. My family had expectations, and I had EMIs to pay for our flat in Thane. But staying in a field that no longer excited me felt like a bigger risk. I needed a program that would allow me to transition gradually without compromising my current responsibilities.",
          choices: [
            {
              id: 4,
              text: "How did you start your transition journey?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "I took Ottobon's Career Aptitude Assessment, which revealed my natural strengths in process optimization and system integration. The personalized learning path they created helped me leverage my audit experience while building technical expertise in cloud solutions and business automation.",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "What was the learning experience like?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "Did you face any major challenges during the transition?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "The program was intensive yet incredibly practical. Every module connected to real-world business scenarios I could relate to from my CA background. What made it exceptional was the mentorship from industry veterans who understood the Indian business landscape and guided me through sector-specific challenges.",
          choices: [
            {
              id: 7,
              text: "What happened after completing the program?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "The technical learning curve was steep initially. Balancing weekend classes with my CA practice was exhausting. There were moments I doubted my decision, especially when colleagues questioned my choice. The breakthrough came during a project on GST automation when everything clicked together - my domain knowledge with new technical skills.",
          choices: [
            {
              id: 8,
              text: "How did your career progress after that?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "Within two months of completing the program, I received three job offers from leading consulting firms. I'm now a Senior Business Technology Consultant at a Big 4 firm, earning 60% more than my CA salary. More importantly, I wake up excited about work - helping Indian businesses digitally transform. The professional network I built through Ottobon continues to create opportunities.",
          image: "https://images.unsplash.com/photo-1553877522-43269d4995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to someone considering a similar transition?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Start with the assessment - it revealed strengths I never fully appreciated. Trust the process and engage deeply with mentors; their guidance was invaluable in navigating the Indian corporate landscape. Remember, your previous experience is an asset, not a limitation. The transition requires courage but is absolutely worth it for the right mindset.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Arjun, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's growing tech consulting sector.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "Priya Patel",
      role: "Recent Graduate",
      background: "B.Tech Computer Science graduate from Gujarat seeking specialized expertise",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "I completed my B.Tech in Computer Science from NIT Surat feeling both excited and overwhelmed. While I had strong fundamentals and decent grades, I lacked the specialized knowledge that top IT companies were seeking. The campus placement offers I received were generic developer roles that didn't utilize my full potential...",
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What specific challenges did you face as a fresh engineering graduate?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why didn't you accept the placement offers you received?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "The competition was intense! Companies wanted 2+ years of experience even for 'entry-level' positions. During interviews, they focused on specialized skills like cloud architecture or AI implementation that weren't covered in depth during our B.Tech curriculum. I was competing with thousands of other engineering graduates with similar profiles.",
          choices: [
            {
              id: 3,
              text: "How did you discover Ottobon?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "The offers were for typical software developer roles with average packages. I saw seniors from my college in similar positions, and after 2-3 years, they were still doing routine coding work. I wanted to be a technology leader, not just another developer. I realized I needed specialized skills to stand out.",
          choices: [
            {
              id: 4,
              text: "What led you to choose Ottobon specifically?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "My college senior, who was working at Infosys, recommended Ottobon's program. What impressed me was their personalized approach. The Career Aptitude Assessment identified my strengths in systems design and machine learning implementation - areas I was passionate about but hadn't considered as specializations.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "How was your learning experience different from college?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "How did your family react to this decision?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "Unlike college theoretical approaches, every concept was tied directly to industry applications. We worked on real client projects with actual business impact. The curriculum evolved based on current market demands - focusing on AI solutions that Indian companies desperately needed. Most importantly, industry mentors provided insights you can't get from college professors.",
          choices: [
            {
              id: 7,
              text: "How did this impact your job prospects?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "Initially, my parents were worried about me not taking the campus placement offer. 'Beta, secure job lelo pehle,' they said. But when I explained the potential and showed them success stories of other Ottobon graduates, they supported my decision. My confidence in the program helped convince them.",
          choices: [
            {
              id: 8,
              text: "What opportunities opened up for you?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "The transformation was remarkable! Before Ottobon, I was applying to generic developer roles with limited responses. After completing the program, recruiters from top consulting firms were reaching out directly. I accepted a position as AI Solutions Specialist at TCS Digital, with a package 70% higher than typical campus placements for my batch.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to recent engineering graduates?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Don't settle for generic developer positions just because of family pressure or immediate security. The assessment helped me identify where my talents could truly shine. Specialized training made me valuable immediately rather than spending years developing expertise on the job. Invest in yourself early - it pays off exponentially.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Priya, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's booming tech sector.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "Rajesh Kumar",
      role: "Experienced Professional",
      background: "Senior software developer from Bangalore seeking to update skills for leadership roles",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After 12 years as a senior software developer in Bangalore's IT ecosystem, I found myself at a crossroads. The industry was rapidly evolving with AI, cloud-native technologies, and digital transformation initiatives. Despite my experience, I was watching younger colleagues with specialized skills get promoted to architect and leadership positions while I remained stuck...",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What specific challenges were you facing in your career progression?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why not learn these new technologies through online courses?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "I was hitting a ceiling despite my experience. New solution architect positions required expertise in technologies that didn't exist when I started my career - DevOps, containerization, AI/ML integration. Despite my strong foundation in Java and databases, I was being passed over for roles because I lacked hands-on experience with modern cloud-native architectures.",
          choices: [
            {
              id: 3,
              text: "How did you discover Ottobon?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "I tried multiple online platforms - Coursera, Udemy, YouTube tutorials. But it was fragmented learning without proper guidance. I needed structured mentorship that acknowledged my existing experience while filling specific gaps. The pace of technological change in the Indian IT industry meant I couldn't afford years of trial and error.",
          choices: [
            {
              id: 4,
              text: "What made you choose Ottobon over other options?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "Ottobon's approach for experienced professionals was unique. Their assessment didn't just identify knowledge gaps but recognized my extensive development experience. They created an accelerated program focusing precisely on what I needed - modern cloud architectures, AI integration, and leadership skills for the Indian IT context.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "How did they accommodate your experience level and work schedule?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "Were you able to continue working during the program?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "They paired me with senior architects who understood the Indian IT landscape. The curriculum built upon my existing Java and database knowledge rather than starting from basics. They focused on translating my deep technical experience into modern architectural patterns and leadership competencies relevant to India's digital transformation initiatives.",
          choices: [
            {
              id: 7,
              text: "How did this impact your career trajectory?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "Absolutely essential! The program was designed for working professionals. I attended evening sessions twice a week and dedicated weekends to project work. My current company actually supported my participation since they could immediately apply what I was learning to our modernization projects.",
          choices: [
            {
              id: 8,
              text: "What changes did you see in your career afterward?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "Within three months of completing the program, I was leading our company's cloud migration initiative. Six months later, I was promoted to Principal Architect with a 45% salary increase. A year later, I joined a fintech startup as their CTO. The transformation wasn't just in salary - I gained confidence to lead technical strategy for digital-first Indian companies.",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to experienced professionals facing similar challenges?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Don't let your years of experience become a limitation. The assessment will precisely show what you need to focus on without wasting time on concepts you already understand. Your experience is valuable - you just need to connect it strategically to modern technologies. The Indian IT industry rewards specialists, not generalists.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Rajesh, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's rapidly evolving technology landscape.",
          animation: "fade-transition"
        }
      ]
    }
  ];

  // Handle character selection
  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentSegmentId(1);
    setStoryHistory([]);
    setPathOutcome(null);
    setTypingText("");
    typeText(character.story[0].text);
  };

  // Go back to character selection
  const resetStory = () => {
    setSelectedCharacter(null);
    setCurrentSegmentId(1);
    setStoryHistory([]);
    setPathOutcome(null);
    setTypingText("");
  };

  // Handle choice selection
  const makeChoice = (choice: Choice) => {
    if (!selectedCharacter) return;

    // Check if this choice leads to an outcome
    if (choice.impact) {
      setPathOutcome(choice.impact);
    }

    // Add current segment to history before moving to next
    setStoryHistory(prev => [...prev, currentSegmentId]);

    // Find the next segment
    const nextSegment = selectedCharacter.story.find(s => s.id === choice.nextSegmentId);
    if (nextSegment) {
      setCurrentSegmentId(choice.nextSegmentId);
      setTypingText("");
      typeText(nextSegment.text);

      // Scroll to the new content
      setTimeout(() => {
        storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  };

  // Go back to the previous story segment
  const goBack = () => {
    if (storyHistory.length > 0) {
      const prevSegmentId = storyHistory[storyHistory.length - 1];
      setCurrentSegmentId(prevSegmentId);
      setStoryHistory(prev => prev.slice(0, -1));
      setPathOutcome(null);

      // Update typing text for previous segment
      if (selectedCharacter) {
        const prevSegment = selectedCharacter.story.find(s => s.id === prevSegmentId);
        if (prevSegment) {
          setTypingText("");
          typeText(prevSegment.text);
        }
      }
    }
  };

  // Typewriter effect for story text
  const typeText = (text: string) => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;

    const typing = setInterval(() => {
      if (i <= text.length) {
        setTypingText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 15); // Speed of typing

    return () => clearInterval(typing);
  };

  // Get current story segment
  const getCurrentSegment = () => {
    if (!selectedCharacter) return null;
    return selectedCharacter.story.find(s => s.id === currentSegmentId);
  };

  // Current segment
  const currentSegment = getCurrentSegment();

  return (
    <>
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s infinite; }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>

      <section id="stories" className="py-24 relative overflow-hidden bg-black" ref={sectionRef}>
        {/* Enhanced background effects */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl float-animation" style={{animationDelay: '-3s'}}></div>
          <div className="absolute top-3/4 right-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl float-animation" style={{animationDelay: '-1.5s'}}></div>
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-5">
          <div className="absolute inset-0 bg-grid-pattern animate-pulse"></div>
        </div>

        {/* Enhanced gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#CDFFD8]/60 via-[#CDFFD8]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#94B9FF]/60 via-[#94B9FF]/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl float-animation">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Real <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shimmer-effect">Success</span> Stories
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>

          <p className="text-center text-blue-100 max-w-4xl mx-auto text-lg leading-relaxed">
            Explore the inspiring journeys of Indian professionals who've transformed their careers through our program. 
            <br />
            <span className="text-blue-200 font-medium">Choose a story that resonates with your situation to see how your own path might unfold.</span>
          </p>
        </div>

        <div ref={storyContainerRef} className="max-w-6xl mx-auto bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {!selectedCharacter ? (
            // Character selection screen
            <div className="p-10 relative">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                    Choose Your Journey
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover how professionals like you transformed their careers through Ottobon Academy
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {characters.map((character, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white border border-gray-200/50 hover:border-blue-300/50 overflow-hidden"
                      onClick={() => selectCharacter(character)}
                    >
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-indigo-50/0 group-hover:from-blue-50/60 group-hover:via-purple-50/40 group-hover:to-indigo-50/60 transition-all duration-500 rounded-2xl"></div>

                      {/* Floating accent */}
                      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:from-blue-400/40 group-hover:to-purple-400/40 transition-all duration-500"></div>

                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Enhanced avatar with ring animation */}
                        <div className="relative mb-6">
                          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300 relative z-10">
                            <img 
                              src={character.avatar} 
                              alt={character.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          {/* Animated ring */}
                          <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/60 group-hover:scale-125 transition-all duration-500"></div>
                          <div className="absolute inset-0 w-28 h-28 rounded-full border border-purple-400/0 group-hover:border-purple-400/40 group-hover:scale-150 transition-all duration-700 delay-100"></div>
                        </div>

                        {/* Enhanced content */}
                        <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-gray-900 transition-colors">
                          {character.name}
                        </h4>

                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-blue-700 font-semibold text-sm uppercase tracking-wide">
                            {character.role}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                          {character.background}
                        </p>

                        {/* Call-to-action button */}
                        <div className="mt-auto">
                          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <span className="mr-2">Explore Journey</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-7H6" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  ))}
                </div>

                {/* Bottom inspiration text */}
                <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl border border-blue-200/30">
                  <p className="text-gray-700 font-medium">
                    💡 <span className="font-semibold">Real stories</span> from real professionals who transformed their careers
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Choose the journey that resonates with your background and aspirations
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Story progression screen
            <div className="flex flex-col lg:flex-row">
              {/* Enhanced character info sidebar */}
              <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white p-8 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="sticky top-6 relative z-10">
                  <button 
                    onClick={resetStory}
                    className="mb-8 bg-white/20 hover:bg-white/30 py-3 px-5 rounded-xl text-sm flex items-center font-medium backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Choose Another Story
                  </button>

                  {/* Enhanced character profile */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/50 mr-4 shadow-xl">
                          <img 
                            src={selectedCharacter.avatar} 
                            alt={selectedCharacter.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">{selectedCharacter.name}</h3>
                        <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full">
                          <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></div>
                          <p className="text-white/90 text-sm font-medium">{selectedCharacter.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white/70 text-xs uppercase font-semibold mb-2 tracking-wider">Background</h4>
                        <p className="text-sm leading-relaxed">{selectedCharacter.background}</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white/70 text-xs uppercase font-semibold mb-3 tracking-wider">Story Progress</h4>
                        <div className="relative">
                          <div className="w-full bg-white/20 rounded-full h-2 mb-3 overflow-hidden">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 transition-all duration-500 relative overflow-hidden"
                              style={{ width: `${(currentSegmentId / selectedCharacter.story.length) * 100}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                          <p className="text-xs text-white/80 font-medium">
                            {pathOutcome ? '🎯 Journey Complete' : `📖 Part ${currentSegmentId} of ${selectedCharacter.story.length - 1}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {pathOutcome === 'assessment' && (
                    <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-xl">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold mb-2 text-lg">Ready for Your Journey?</h4>
                        <p className="text-sm mb-6 text-white/90 leading-relaxed">
                          Take the assessment to discover your ideal path in technology consulting.
                        </p>
                        <a 
                          href="#talent-compass"
                          className="block w-full bg-white text-blue-700 text-center font-bold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          🚀 Take Assessment Now
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Story content */}
              <div className="md:w-2/3 p-6 md:p-8" ref={storyRef}>
                {currentSegment && (
                  <div className={`story-segment ${currentSegment.animation ? currentSegment.animation : ''}`}>
                    {currentSegment.image && (
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <img 
                          src={currentSegment.image} 
                          alt="Story moment"
                          className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    )}

                    <div className="mb-8">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {typingText}
                        {isTyping && <span className="typing-cursor">|</span>}
                      </p>
                    </div>

                    {/* Choice options */}
                    {currentSegment.choices && currentSegment.choices.length > 0 && !isTyping && (
                      <div className="space-y-3 mt-6">
                        <h4 className="text-sm font-medium text-gray-800">Choose your response:</h4>
                        {currentSegment.choices.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => makeChoice(choice)}
                            className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition flex items-center text-gray-800 hover:text-gray-900"
                          >
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </span>
                            <span className="font-medium">{choice.text}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Navigation controls */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                      {storyHistory.length > 0 && !pathOutcome ? (
                        <button 
                          onClick={goBack}
                          className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Previous
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {pathOutcome === 'assessment' && (
                        <a 
                          href="#talent-compass"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg flex items-center"
                        >
                          Begin Assessment
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-7H6"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </section>
    </>
  );
}