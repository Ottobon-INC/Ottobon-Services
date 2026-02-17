import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAnimation } from '@/hooks/use-animation';

// Define types for trait assessment
interface Trait {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  score: number;
}

// Define question interface
interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    traits: Record<string, number>; // Maps trait IDs to score impacts
    backgroundFactors?: Record<string, number>; // Maps to educational/experience factors
  }[];
  type: 'trait' | 'background';
  category?: string;
}

// Define course interface
interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Career Launch' | 'Tech Edge';
  traitMatches: Record<string, number>; // How important each trait is for this course
  backgroundFactors: Record<string, number>; // How background factors affect this course's match
  icon: string;
  color: string;
}

// Define user profile
interface UserProfile {
  traits: Record<string, number>; // Maps trait IDs to scores
  background: Record<string, number | string>; // Educational/experience factors
  currentPath: 'career-switcher' | 'recent-graduate' | 'experienced'; // Current career path
  discountEligibility: number; // 0-100 percentage
  courseMatches: Record<string, number>; // Maps course IDs to match percentages
}

// Define component phases
type AssessmentPhase =
  | 'intro'
  | 'path-selection'
  | 'skills-collection'
  | 'trait-assessment'
  | 'background-assessment'
  | 'results';

// Define skill categories and suggestions
interface SkillCategory {
  id: string;
  name: string;
  suggestions: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    suggestions: [
      'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
      'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Vue.js',
      'Angular', 'PHP', 'Java', 'C++', 'REST APIs', 'GraphQL', 'Redis',
      'Kubernetes', 'Jenkins', 'Figma', 'Adobe Creative Suite', 'Sketch',
      'AutoCAD', 'Salesforce', 'Tableau', 'Power BI', 'Excel', 'JIRA'
    ]
  },
  {
    id: 'soft',
    name: 'Soft Skills',
    suggestions: [
      'Leadership', 'Communication', 'Team Management', 'Project Management',
      'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability',
      'Negotiation', 'Public Speaking', 'Mentoring', 'Conflict Resolution',
      'Strategic Planning', 'Decision Making', 'Creativity', 'Collaboration',
      'Customer Service', 'Sales', 'Marketing', 'Training & Development'
    ]
  },
  {
    id: 'industry',
    name: 'Industry Knowledge',
    suggestions: [
      'Healthcare', 'Finance', 'E-commerce', 'Education', 'Manufacturing',
      'Retail', 'Telecommunications', 'Real Estate', 'Legal', 'Government',
      'Agile/Scrum', 'DevOps', 'Machine Learning', 'Data Science', 'Cybersecurity',
      'Cloud Computing', 'Digital Marketing', 'SEO/SEM', 'Business Analysis',
      'Quality Assurance', 'UI/UX Design', 'Product Management', 'Consulting'
    ]
  }
];

export default function TalentCompassAssessment() {
  // Navigation
  const [, setLocation] = useLocation();
  
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const titleRef = useAnimation('animate-slide-up');
  const compassRef = useAnimation('animate-scale-in delay-100');

  // State for controlling assessment flow
  const [currentPhase, setCurrentPhase] = useState<AssessmentPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const compassCanvas = useRef<HTMLCanvasElement>(null);

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    traits: {
      ambition: 0,
      learnability: 0,
      accountability: 0,
      integrity: 0,
      curiosity: 0,
      adaptability: 0,
      emotionalIntelligence: 0
    },
    background: {
      education: '',
      languages: 0,
      yearsExperience: 0,
      relevantProjects: 0
    },
    currentPath: 'recent-graduate',
    discountEligibility: 0,
    courseMatches: {}
  });

  // Skills collection state
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('technical');

  // Define the 7 core traits
  const traits: Trait[] = [
    {
      id: 'ambition',
      name: 'Ambition',
      description: 'Drive to achieve goals and pursue continuous improvement',
      icon: '🚀',
      color: 'from-blue-400 to-blue-600',
      score: 0
    },
    {
      id: 'learnability',
      name: 'Learnability',
      description: 'Ability to quickly acquire and apply new knowledge',
      icon: '📚',
      color: 'from-purple-400 to-purple-600',
      score: 0
    },
    {
      id: 'accountability',
      name: 'Accountability',
      description: 'Taking ownership of actions, commitments, and outcomes',
      icon: '✅',
      color: 'from-green-400 to-green-600',
      score: 0
    },
    {
      id: 'integrity',
      name: 'Integrity',
      description: 'Adherence to ethical principles and trustworthiness',
      icon: '🛡️',
      color: 'from-gray-400 to-gray-600',
      score: 0
    },
    {
      id: 'curiosity',
      name: 'Curiosity',
      description: 'Desire to explore, question, and understand new concepts',
      icon: '🔍',
      color: 'from-amber-400 to-amber-600',
      score: 0
    },
    {
      id: 'adaptability',
      name: 'Adaptability',
      description: 'Flexibility in changing environments and requirements',
      icon: '🔄',
      color: 'from-teal-400 to-teal-600',
      score: 0
    },
    {
      id: 'emotionalIntelligence',
      name: 'Emotional Intelligence',
      description: 'Awareness and management of emotions in self and others',
      icon: '❤️',
      color: 'from-red-400 to-red-600',
      score: 0
    }
  ];

  // Define courses with trait importance weights
  const courses: Course[] = [
    {
      id: 'ai-uiux',
      title: 'AI for UI/UX Designer',
      description: 'Integrate AI into UI/UX workflows for smarter, data-driven design and personalized user experiences.',
      category: 'Career Launch',
      traitMatches: {
        curiosity: 0.9,
        learnability: 0.8,
        adaptability: 0.7,
        emotionalIntelligence: 0.8,
        accountability: 0.6,
        integrity: 0.5,
        ambition: 0.7
      },
      backgroundFactors: {
        education: 0.6,
        languages: 0.5,
        yearsExperience: 0.5,
        relevantProjects: 0.8
      },
      icon: '🎨',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 'ai-marketing',
      title: 'AI in Marketing',
      description: 'Master AI-driven marketing strategies and automation tools to transform customer engagement.',
      category: 'Career Launch',
      traitMatches: {
        adaptability: 0.9,
        learnability: 0.8,
        curiosity: 0.8,
        emotionalIntelligence: 0.7,
        accountability: 0.7,
        ambition: 0.8,
        integrity: 0.6
      },
      backgroundFactors: {
        education: 0.5,
        languages: 0.6,
        yearsExperience: 0.6,
        relevantProjects: 0.7
      },
      icon: '📈',
      color: 'from-amber-500 to-amber-700'
    },
    {
      id: 'ai-agent-development',
      title: 'AI Agent Development',
      description: 'Build intelligent AI agents and autonomous systems using cutting-edge frameworks and NLP.',
      category: 'Career Launch',
      traitMatches: {
        curiosity: 0.9,
        learnability: 0.9,
        adaptability: 0.8,
        accountability: 0.8,
        ambition: 0.7,
        integrity: 0.7,
        emotionalIntelligence: 0.5
      },
      backgroundFactors: {
        education: 0.7,
        languages: 0.8,
        yearsExperience: 0.6,
        relevantProjects: 0.9
      },
      icon: '🤖',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      id: 'ai-data-labeling',
      title: 'AI Data Labeling',
      description: 'Specialize in high-quality data annotation and labeling workflows for training robust AI models.',
      category: 'Career Launch',
      traitMatches: {
        accountability: 0.9,
        integrity: 0.9,
        learnability: 0.7,
        adaptability: 0.6,
        curiosity: 0.6,
        ambition: 0.5,
        emotionalIntelligence: 0.4
      },
      backgroundFactors: {
        education: 0.5,
        languages: 0.6,
        yearsExperience: 0.4,
        relevantProjects: 0.7
      },
      icon: '🏷️',
      color: 'from-pink-500 to-pink-700'
    }
  ];

  // Define category-specific questions
  const getQuestionsForPath = (path: 'career-switcher' | 'recent-graduate' | 'experienced'): Question[] => {
    const careerSwitcherQuestions: Question[] = [
      // Personality & Category Questions (6)
      {
        id: 1,
        text: "When learning a completely new skill, you usually:",
        options: [
          {
            text: "Follow structured lessons carefully step by step",
            traits: { accountability: 2, integrity: 1, learnability: 1 }
          },
          {
            text: "Experiment with hands-on practice immediately",
            traits: { curiosity: 2, adaptability: 1, ambition: 1 }
          },
          {
            text: "Seek mentors or peers for guidance",
            traits: { emotionalIntelligence: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Research deeply before taking action",
            traits: { learnability: 2, curiosity: 1, integrity: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 2,
        text: "Transitioning into a new career excites you because:",
        options: [
          {
            text: "It's an ambitious challenge worth pursuing",
            traits: { ambition: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "It offers opportunities to learn continuously",
            traits: { learnability: 2, curiosity: 2, adaptability: 1 }
          },
          {
            text: "It allows you to adapt and reinvent yourself",
            traits: { adaptability: 2, ambition: 1, curiosity: 1 }
          },
          {
            text: "It lets you work with diverse people and teams",
            traits: { emotionalIntelligence: 2, adaptability: 1, integrity: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 3,
        text: "When faced with unfamiliar technology, you:",
        options: [
          {
            text: "Persist until you master it fully",
            traits: { ambition: 2, accountability: 2, learnability: 1 }
          },
          {
            text: "Break it into smaller parts to understand",
            traits: { adaptability: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "Look for practical applications to learn by doing",
            traits: { curiosity: 2, adaptability: 1, learnability: 1 }
          },
          {
            text: "Ask others how they solved similar issues",
            traits: { emotionalIntelligence: 2, learnability: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 4,
        text: "The biggest strength you bring from your previous field is:",
        options: [
          {
            text: "Accountability and discipline",
            traits: { accountability: 2, integrity: 1, ambition: 1 }
          },
          {
            text: "Curiosity to explore new paths",
            traits: { curiosity: 2, learnability: 2, adaptability: 1 }
          },
          {
            text: "Adaptability in uncertain environments",
            traits: { adaptability: 2, learnability: 1, emotionalIntelligence: 1 }
          },
          {
            text: "Emotional intelligence with people",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 5,
        text: "If you face self-doubt in your transition, you:",
        options: [
          {
            text: "Push through with determination",
            traits: { ambition: 2, accountability: 1, integrity: 1 }
          },
          {
            text: "Seek structured learning paths",
            traits: { learnability: 2, accountability: 1, integrity: 1 }
          },
          {
            text: "Experiment with smaller wins to build confidence",
            traits: { adaptability: 2, curiosity: 1, learnability: 1 }
          },
          {
            text: "Rely on peer/community encouragement",
            traits: { emotionalIntelligence: 2, adaptability: 1, learnability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 6,
        text: "To succeed in your new career, you value most:",
        options: [
          {
            text: "Clear milestones and accountability",
            traits: { accountability: 2, ambition: 1, integrity: 1 }
          },
          {
            text: "Opportunities to be innovative",
            traits: { curiosity: 2, learnability: 1, ambition: 1 }
          },
          {
            text: "Flexibility in exploring different paths",
            traits: { adaptability: 2, curiosity: 1, learnability: 1 }
          },
          {
            text: "Collaboration and mentorship",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      // Course-Oriented Questions (3)
      {
        id: 7,
        text: "Which type of project excites you most?",
        options: [
          {
            text: "Designing user-friendly experiences with AI ",
            traits: { curiosity: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-uiux' }
          },
          {
            text: "Creating campaigns with AI tools ",
            traits: { adaptability: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-marketing' }
          },
          {
            text: "Building intelligent assistants",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { coursePreference: 'ai-agent-development' }
          },
          {
            text: "Organizing/labeling data for AI systems ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { coursePreference: 'ai-data-labeling' }
          }
        ],
        type: 'background'
      },
      {
        id: 8,
        text: "If you had to pick a learning style, you'd prefer:",
        options: [
          {
            text: "Visual and design-driven learning",
            traits: { curiosity: 1, emotionalIntelligence: 1 },
            backgroundFactors: { learningStyle: 'visual' }
          },
          {
            text: "Business and communication-focused learning",
            traits: { emotionalIntelligence: 1, adaptability: 1 },
            backgroundFactors: { learningStyle: 'business' }
          },
          {
            text: "Technical and coding-heavy projects",
            traits: { learnability: 1, curiosity: 1 },
            backgroundFactors: { learningStyle: 'technical' }
          },
          {
            text: "Structured data handling and accuracy",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { learningStyle: 'structured' }
          }
        ],
        type: 'background'
      },
      {
        id: 9,
        text: "In your new career, you'd like to:",
        options: [
          {
            text: "Make products more usable ",
            traits: { emotionalIntelligence: 1, curiosity: 1 },
            backgroundFactors: { careerGoal: 'usability' }
          },
          {
            text: "Drive customer engagement ",
            traits: { emotionalIntelligence: 1, adaptability: 1 },
            backgroundFactors: { careerGoal: 'engagement' }
          },
          {
            text: "Develop smart tools ",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { careerGoal: 'development' }
          },
          {
            text: "Ensure AI systems have clean data ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { careerGoal: 'data-quality' }
          }
        ],
        type: 'background'
      },
      {
        id: 10,
        text: "When starting your new career path, your biggest priority is:",
        options: [
          {
            text: "Building a strong portfolio of work",
            traits: { ambition: 1, accountability: 1 },
            backgroundFactors: { priority: 'portfolio' }
          },
          {
            text: "Networking with industry professionals",
            traits: { emotionalIntelligence: 1, adaptability: 1 },
            backgroundFactors: { priority: 'networking' }
          },
          {
            text: "Gaining hands-on experience quickly",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { priority: 'experience' }
          },
          {
            text: "Understanding industry standards and practices",
            traits: { integrity: 1, accountability: 1 },
            backgroundFactors: { priority: 'standards' }
          }
        ],
        type: 'background'
      }
    ];

    const recentGraduateQuestions: Question[] = [
      // Personality & Category Questions (6)
      {
        id: 1,
        text: "As you start your career, you are most motivated by:",
        options: [
          {
            text: "Building ambitious projects",
            traits: { ambition: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "Exploring and experimenting with new tech",
            traits: { curiosity: 2, learnability: 2, adaptability: 1 }
          },
          {
            text: "Adapting to industry trends quickly",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Working in supportive teams",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 2,
        text: "When faced with a challenge you've never seen before, you:",
        options: [
          {
            text: "Keep trying until you crack it",
            traits: { ambition: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "Break it down into parts and test solutions",
            traits: { adaptability: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "Search forums/videos for approaches",
            traits: { curiosity: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Ask peers or mentors for advice",
            traits: { emotionalIntelligence: 2, learnability: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 3,
        text: "As a student-turned-professional, you want to focus on:",
        options: [
          {
            text: "Accountability and results",
            traits: { accountability: 2, ambition: 1, integrity: 1 }
          },
          {
            text: "Creativity and innovation",
            traits: { curiosity: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Flexibility and adaptability",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Collaboration and communication",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 4,
        text: "Your preferred way of learning outside academics is:",
        options: [
          {
            text: "Online courses/certifications",
            traits: { learnability: 2, accountability: 1, integrity: 1 }
          },
          {
            text: "Building personal projects",
            traits: { curiosity: 2, ambition: 1, learnability: 1 }
          },
          {
            text: "Joining communities/events",
            traits: { emotionalIntelligence: 2, adaptability: 1, learnability: 1 }
          },
          {
            text: "Reading technical articles",
            traits: { learnability: 2, curiosity: 1, integrity: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 5,
        text: "In your first professional project, you'd like to be known for:",
        options: [
          {
            text: "Delivering on time with discipline",
            traits: { accountability: 2, integrity: 1, ambition: 1 }
          },
          {
            text: "Bringing fresh creative ideas",
            traits: { curiosity: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Quickly adapting to new tech stacks",
            traits: { adaptability: 2, learnability: 2, curiosity: 1 }
          },
          {
            text: "Supporting teammates and clients well",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 6,
        text: "To feel successful early in your career, you'd want:",
        options: [
          {
            text: "A strong track record of achievements",
            traits: { ambition: 2, accountability: 1, integrity: 1 }
          },
          {
            text: "Space to explore new technologies",
            traits: { curiosity: 2, learnability: 2, adaptability: 1 }
          },
          {
            text: "Opportunities to work across multiple roles",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Recognition for teamwork",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      // Course-Oriented Questions (3)
      {
        id: 7,
        text: "If you had to pick a role right after graduation, you'd choose:",
        options: [
          {
            text: "Designing smart, user-friendly interfaces ",
            traits: { curiosity: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-uiux' }
          },
          {
            text: "Supporting marketing teams with AI tools",
            traits: { adaptability: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-marketing' }
          },
          {
            text: "Developing AI-driven agents",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { coursePreference: 'ai-agent-development' }
          },
          {
            text: "Handling AI datasets",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { coursePreference: 'ai-data-labeling' }
          }
        ],
        type: 'background'
      },
      {
        id: 8,
        text: "What excites you most about AI?",
        options: [
          {
            text: "Enhancing human experiences",
            traits: { emotionalIntelligence: 1, curiosity: 1 },
            backgroundFactors: { aiInterest: 'human-enhancement' }
          },
          {
            text: "Optimizing business growth",
            traits: { ambition: 1, adaptability: 1 },
            backgroundFactors: { aiInterest: 'business-optimization' }
          },
          {
            text: "Creating intelligent tools",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { aiInterest: 'tool-creation' }
          },
          {
            text: "Structuring and cleaning information",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { aiInterest: 'data-structuring' }
          }
        ],
        type: 'background'
      },
      {
        id: 9,
        text: "As a graduate, your ideal first project would involve:",
        options: [
          {
            text: "Improving product usability ",
            traits: { emotionalIntelligence: 1, curiosity: 1 },
            backgroundFactors: { projectPreference: 'usability' }
          },
          {
            text: "Supporting a brand launch with AI ",
            traits: { adaptability: 1, emotionalIntelligence: 1 },
            backgroundFactors: { projectPreference: 'brand-launch' }
          },
          {
            text: "Coding a chatbot ",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { projectPreference: 'chatbot' }
          },
          {
            text: "Preparing datasets for AI training ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { projectPreference: 'dataset-prep' }
          }
        ],
        type: 'background'
      },
      {
        id: 10,
        text: "What do you hope to achieve in your first year of work?",
        options: [
          {
            text: "Become proficient in industry-standard tools",
            traits: { learnability: 1, accountability: 1 },
            backgroundFactors: { firstYearGoal: 'tools-proficiency' }
          },
          {
            text: "Build meaningful relationships with colleagues",
            traits: { emotionalIntelligence: 1, adaptability: 1 },
            backgroundFactors: { firstYearGoal: 'relationships' }
          },
          {
            text: "Contribute to innovative projects",
            traits: { curiosity: 1, ambition: 1 },
            backgroundFactors: { firstYearGoal: 'innovation' }
          },
          {
            text: "Establish a reputation for reliability",
            traits: { integrity: 1, accountability: 1 },
            backgroundFactors: { firstYearGoal: 'reliability' }
          }
        ],
        type: 'background'
      }
    ];

    const experiencedProfessionalQuestions: Question[] = [
      // Personality & Category Questions (6)
      {
        id: 1,
        text: "At this stage of your career, you value most:",
        options: [
          {
            text: "Taking on ambitious leadership challenges",
            traits: { ambition: 2, accountability: 1, emotionalIntelligence: 1 }
          },
          {
            text: "Continuously learning emerging technologies",
            traits: { learnability: 2, curiosity: 2, adaptability: 1 }
          },
          {
            text: "Adapting expertise across industries",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Mentoring and collaborating",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 2,
        text: "When managing complex projects, your approach is:",
        options: [
          {
            text: "Accountability—ensure deadlines are met",
            traits: { accountability: 2, ambition: 1, integrity: 1 }
          },
          {
            text: "Innovation—find smarter methods",
            traits: { curiosity: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Flexibility—adjust plans as needed",
            traits: { adaptability: 2, emotionalIntelligence: 1, learnability: 1 }
          },
          {
            text: "Empathy—understand team needs",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 3,
        text: "The biggest driver for your career growth is:",
        options: [
          {
            text: "Achieving ambitious outcomes",
            traits: { ambition: 2, accountability: 1, learnability: 1 }
          },
          {
            text: "Exploring cutting-edge solutions",
            traits: { curiosity: 2, learnability: 2, adaptability: 1 }
          },
          {
            text: "Remaining versatile in changing markets",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Building strong networks",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 4,
        text: "When reskilling into new domains, you prefer:",
        options: [
          {
            text: "Structured, outcome-driven learning",
            traits: { accountability: 2, learnability: 1, integrity: 1 }
          },
          {
            text: "Experimental, hands-on exploration",
            traits: { curiosity: 2, adaptability: 1, learnability: 1 }
          },
          {
            text: "Flexible, adaptive approaches",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Peer-driven collaborations",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 5,
        text: "If a team is stuck, your likely action is:",
        options: [
          {
            text: "Step in with direct accountability",
            traits: { accountability: 2, ambition: 1, integrity: 1 }
          },
          {
            text: "Propose innovative alternatives",
            traits: { curiosity: 2, learnability: 1, adaptability: 1 }
          },
          {
            text: "Adjust timelines/methods",
            traits: { adaptability: 2, emotionalIntelligence: 1, learnability: 1 }
          },
          {
            text: "Motivate with empathy",
            traits: { emotionalIntelligence: 2, integrity: 1, adaptability: 1 }
          }
        ],
        type: 'trait'
      },
      {
        id: 6,
        text: "In upgrading your skills, you prioritize:",
        options: [
          {
            text: "Practical impact and results",
            traits: { accountability: 2, ambition: 1, integrity: 1 }
          },
          {
            text: "Exposure to new fields",
            traits: { curiosity: 2, learnability: 2, adaptability: 1 }
          },
          {
            text: "Transferability across industries",
            traits: { adaptability: 2, learnability: 1, curiosity: 1 }
          },
          {
            text: "Building influence and leadership",
            traits: { emotionalIntelligence: 2, ambition: 1, integrity: 1 }
          }
        ],
        type: 'trait'
      },
      // Course-Oriented Questions (3)
      {
        id: 7,
        text: "Which AI-driven skill would enhance your current expertise?",
        options: [
          {
            text: "Designing next-gen experiences ",
            traits: { curiosity: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-uiux' }
          },
          {
            text: "Scaling customer impact ",
            traits: { ambition: 1, emotionalIntelligence: 1 },
            backgroundFactors: { coursePreference: 'ai-marketing' }
          },
          {
            text: "Building automation tools ",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { coursePreference: 'ai-agent-development' }
          },
          {
            text: "Managing reliable datasets ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { coursePreference: 'ai-data-labeling' }
          }
        ],
        type: 'background'
      },
      {
        id: 8,
        text: "If you reskill, you'd like your learning to directly impact:",
        options: [
          {
            text: "End-user experience ",
            traits: { emotionalIntelligence: 1, curiosity: 1 },
            backgroundFactors: { impactArea: 'user-experience' }
          },
          {
            text: "Business strategy ",
            traits: { ambition: 1, adaptability: 1 },
            backgroundFactors: { impactArea: 'business-strategy' }
          },
          {
            text: "Technical innovation",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { impactArea: 'technical-innovation' }
          },
          {
            text: "Data reliability ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { impactArea: 'data-reliability' }
          }
        ],
        type: 'background'
      },
      {
        id: 9,
        text: "As an experienced professional, you'd prefer a course that:",
        options: [
          {
            text: "Helps you innovate in design thinking ",
            traits: { curiosity: 1, emotionalIntelligence: 1 },
            backgroundFactors: { courseStyle: 'design-innovation' }
          },
          {
            text: "Boosts your influence in business growth ",
            traits: { ambition: 1, emotionalIntelligence: 1 },
            backgroundFactors: { courseStyle: 'business-influence' }
          },
          {
            text: "Strengthens your technical authority ",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { courseStyle: 'technical-authority' }
          },
          {
            text: "Improves your accuracy in data management ",
            traits: { accountability: 1, integrity: 1 },
            backgroundFactors: { courseStyle: 'data-accuracy' }
          }
        ],
        type: 'background'
      },
      {
        id: 10,
        text: "Looking ahead, your main professional aspiration is to:",
        options: [
          {
            text: "Lead strategic initiatives and drive organizational change",
            traits: { ambition: 1, emotionalIntelligence: 1 },
            backgroundFactors: { aspiration: 'strategic-leadership' }
          },
          {
            text: "Become a recognized expert in emerging technologies",
            traits: { curiosity: 1, learnability: 1 },
            backgroundFactors: { aspiration: 'technical-expertise' }
          },
          {
            text: "Mentor and develop the next generation of professionals",
            traits: { emotionalIntelligence: 1, integrity: 1 },
            backgroundFactors: { aspiration: 'mentorship' }
          },
          {
            text: "Build and optimize high-performing teams",
            traits: { accountability: 1, adaptability: 1 },
            backgroundFactors: { aspiration: 'team-building' }
          }
        ],
        type: 'background'
      }
    ];

    switch (path) {
      case 'career-switcher':
        return careerSwitcherQuestions;
      case 'recent-graduate':
        return recentGraduateQuestions;
      case 'experienced':
        return experiencedProfessionalQuestions;
      default:
        return careerSwitcherQuestions;
    }
  };

  // Get questions based on current user path
  const allQuestions = getQuestionsForPath(userProfile.currentPath);

  // Get current question
  const currentQuestion = allQuestions[currentQuestionIndex];

  // Split questions into trait and background for UI purposes
  const traitQuestions = allQuestions.filter(q => q.type === 'trait');
  const backgroundQuestions = allQuestions.filter(q => q.type === 'background');

  // Handle path selection
  const selectPath = (path: 'career-switcher' | 'recent-graduate' | 'experienced') => {
    setUserProfile({
      ...userProfile,
      currentPath: path
    });
    setCurrentPhase('skills-collection');
  };

  // Skills collection functions
  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill) && selectedSkills.length < 15) {
      setSelectedSkills([...selectedSkills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const proceedFromSkills = () => {
    if (selectedSkills.length >= 3) {
      setCurrentPhase('trait-assessment');
    }
  };

  // Handle answer selection
  const selectAnswer = (optionIndex: number) => {
    const option = currentQuestion.options[optionIndex];

    // Update trait scores
    if (option.traits) {
      const updatedTraits = { ...userProfile.traits };

      Object.entries(option.traits).forEach(([traitId, score]) => {
        updatedTraits[traitId] = (updatedTraits[traitId] || 0) + score;
      });

      setUserProfile({
        ...userProfile,
        traits: updatedTraits
      });
    }

    // Update background factors
    if (option.backgroundFactors) {
      const updatedBackground = { ...userProfile.background };

      Object.entries(option.backgroundFactors).forEach(([factor, value]) => {
        updatedBackground[factor] = value;
      });

      setUserProfile({
        ...userProfile,
        background: updatedBackground
      });
    }

    // Mark question as answered
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);

    // Move to next question or phase
    if (currentQuestionIndex < traitQuestions.length - 1 && currentQuestion.type === 'trait') {
      // Still in trait assessment phase
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === traitQuestions.length - 1 && currentQuestion.type === 'trait') {
      // Move to background assessment
      setCurrentPhase('background-assessment');
      setCurrentQuestionIndex(traitQuestions.length);
    } else if (currentQuestionIndex < allQuestions.length - 1) {
      // Continue with background questions
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete
      calculateResults();
      setCurrentPhase('results');
      setAssessmentComplete(true);
    }

    // Update compass visualization
    updateCompassVisualization();
  };

  // Calculate final results
  const calculateResults = () => {
    // Calculate course matches based on traits, background, and skills
    const matches: Record<string, number> = {};

    courses.forEach(course => {
      let matchScore = 0;
      let totalWeight = 0;

      // Calculate trait match component (50% weight)
      Object.entries(course.traitMatches).forEach(([traitId, importance]) => {
        const traitScore = userProfile.traits[traitId] || 0;
        // Normalize trait score to 0-1 range (assuming max score of 10)
        const normalizedScore = Math.min(traitScore / 10, 1);
        matchScore += normalizedScore * importance * 0.5;
        totalWeight += importance * 0.5;
      });

      // Calculate background match component (25% weight)
      Object.entries(course.backgroundFactors).forEach(([factor, importance]) => {
        const factorValue = userProfile.background[factor] || 0;
        // Normalize factor value to 0-1 range (assuming max value of 4)
        const normalizedValue = typeof factorValue === 'number' ? Math.min(factorValue / 4, 1) : 0;
        matchScore += normalizedValue * importance * 0.25;
        totalWeight += importance * 0.25;
      });

      // Calculate skills match component (25% weight)
      const courseRelevantSkills = getCourseRelevantSkills(course.id);
      const skillsMatchCount = selectedSkills.filter(skill =>
        courseRelevantSkills.some(relevant =>
          relevant.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(relevant.toLowerCase())
        )
      ).length;
      const skillsMatchRatio = selectedSkills.length > 0 ? skillsMatchCount / selectedSkills.length : 0;
      matchScore += skillsMatchRatio * 0.25;
      totalWeight += 0.25;

      // Normalize final score as percentage
      matches[course.id] = Math.round((matchScore / totalWeight) * 100);
    });

    // Calculate discount eligibility (basic algorithm)
    // This is a simplified calculation - could be made more sophisticated
    const traitScores = Object.values(userProfile.traits);
    const avgTraitScore = traitScores.reduce((sum, score) => sum + score, 0) / traitScores.length;

    // Normalize to 0-100 scale (assuming max avg score of 2)
    const traitComponent = Math.min(avgTraitScore / 2, 1) * 60; // 60% of discount based on traits

    // Background component (40% of discount)
    const educationValue = Number(userProfile.background.education) || 0;
    const experienceValue = Number(userProfile.background.yearsExperience) || 0;
    const projectsValue = Number(userProfile.background.relevantProjects) || 0;

    const backgroundComponent =
      (educationValue / 4) * 15 + // 15% from education
      (experienceValue / 3) * 15 + // 15% from experience
      (projectsValue / 3) * 10;    // 10% from projects

    // Calculate total discount (maximum 90%)
    const calculatedDiscount = Math.min(Math.round(traitComponent + backgroundComponent), 90);

    // Update user profile with results
    const updatedProfile = {
      ...userProfile,
      courseMatches: matches,
      discountEligibility: calculatedDiscount
    };
    
    setUserProfile(updatedProfile);

    // Save assessment results to localStorage for EnrollmentSection
    const bestMatch = getBestCourseMatchFromResults(matches);
    if (bestMatch) {
      const assessmentResults = {
        bestMatch: bestMatch.course.title,
        bestMatchScore: bestMatch.score,
        courseMatches: matches,
        discountEligibility: calculatedDiscount,
        traits: updatedProfile.traits,
        skills: selectedSkills
      };
      localStorage.setItem('assessmentResults', JSON.stringify(assessmentResults));
    }
  };

  // Update the compass visualization
  const updateCompassVisualization = () => {
    const canvas = compassCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw compass background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    // Draw trait sections
    const numTraits = traits.length;
    const angleStep = (Math.PI * 2) / numTraits;

    traits.forEach((trait, index) => {
      const startAngle = index * angleStep - Math.PI / 2;
      const endAngle = (index + 1) * angleStep - Math.PI / 2;

      // Get trait score (normalized to 0-1)
      const score = (userProfile.traits[trait.id] || 0) / 10;
      const traitRadius = radius * Math.max(0.1, score);

      // Draw section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, traitRadius, startAngle, endAngle);
      ctx.closePath();

      // Create gradient based on trait color
      const colorParts = trait.color.split(' ');
      const fromColor = colorParts[0].replace('from-', '').replace('-400', '');
      const toColor = colorParts[1].replace('to-', '').replace('-600', '');

      const getColor = (name: string) => {
        const colors: Record<string, string> = {
          'blue': '#3b82f6',
          'purple': '#9333ea',
          'green': '#10b981',
          'gray': '#6b7280',
          'amber': '#f59e0b',
          'teal': '#14b8a6',
          'red': '#ef4444',
          'indigo': '#6366f1'
        };
        return colors[name] || '#000000';
      };

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, traitRadius
      );
      gradient.addColorStop(0, getColor(fromColor));
      gradient.addColorStop(1, getColor(toColor));

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add trait label
      const labelRadius = radius + 15;
      const labelX = centerX + Math.cos(startAngle + angleStep / 2) * labelRadius;
      const labelY = centerY + Math.sin(startAngle + angleStep / 2) * labelRadius;

      ctx.font = '12px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(trait.name, labelX, labelY);
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw compass icon in center
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧭', centerX, centerY);
  };

  // Initialize canvas when component loads
  useEffect(() => {
    const canvas = compassCanvas.current;
    if (!canvas) return;

    // Set canvas dimensions based on phase
    if (currentPhase === 'trait-assessment' || currentPhase === 'background-assessment') {
      canvas.width = 300;
      canvas.height = 300;
    } else {
      canvas.width = 400;
      canvas.height = 400;
    }

    // Initial visualization
    updateCompassVisualization();
  }, [compassCanvas, currentPhase]);

  // Update compass visualization when user profile changes
  useEffect(() => {
    updateCompassVisualization();
  }, [userProfile.traits]);

  // Get best course match
  const getBestCourseMatch = () => {
    if (!Object.keys(userProfile.courseMatches).length) return null;

    const sortedMatches = Object.entries(userProfile.courseMatches)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    if (!sortedMatches.length) return null;

    const [bestMatchId, bestMatchScore] = sortedMatches[0];
    const course = courses.find(c => c.id === bestMatchId);

    if (!course) return null;

    return { course, score: bestMatchScore };
  };

  // Helper function to get best match from calculated results
  const getBestCourseMatchFromResults = (matches: Record<string, number>) => {
    if (!Object.keys(matches).length) return null;

    const sortedMatches = Object.entries(matches)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    if (!sortedMatches.length) return null;

    const [bestMatchId, bestMatchScore] = sortedMatches[0];
    const course = courses.find(c => c.id === bestMatchId);

    if (!course) return null;

    return { course, score: bestMatchScore };
  };

  // Get relevant skills for each course
  const getCourseRelevantSkills = (courseId: string): string[] => {
    const skillMaps: Record<string, string[]> = {
      'ai-uiux': [
        'Figma', 'Adobe Creative Suite', 'Sketch', 'UI/UX Design', 'Design',
        'JavaScript', 'React', 'HTML/CSS', 'Prototyping', 'User Research',
        'Creativity', 'Problem Solving', 'Communication', 'Critical Thinking'
      ],
      'ai-marketing': [
        'Digital Marketing', 'SEO/SEM', 'Marketing', 'Google Analytics',
        'Social Media', 'Content Marketing', 'Email Marketing', 'CRM',
        'Communication', 'Sales', 'Creativity', 'Data Analysis',
        'Customer Service', 'Strategic Planning'
      ],
      'ai-agent-development': [
        'Python', 'JavaScript', 'Node.js', 'Machine Learning', 'AI/ML',
        'Natural Language Processing', 'TensorFlow', 'PyTorch', 'APIs',
        'Programming', 'Software Development', 'Problem Solving',
        'Critical Thinking', 'Learning', 'Technical Writing'
      ],
      'ai-data-labeling': [
        'Data Analysis', 'Data Science', 'Excel', 'SQL', 'Python', 'R',
        'Data Visualization', 'Quality Assurance', 'Attention to Detail',
        'Documentation', 'Process Improvement', 'Accuracy', 'Patience'
      ]
    };
    return skillMaps[courseId] || [];
  };

  // Cache best match to avoid repetitive calls
  const bestMatch = getBestCourseMatch();

  // Start the assessment
  const startAssessment = () => {
    setAssessmentStarted(true);
    setCurrentPhase('path-selection');
  };

  // Navigation functions
  const goBack = () => {
    if (currentPhase === 'path-selection') {
      setCurrentPhase('intro');
      setAssessmentStarted(false);
    } else if (currentPhase === 'skills-collection') {
      setCurrentPhase('path-selection');
      setSelectedSkills([]);
      setSkillInput('');
    } else if (currentPhase === 'trait-assessment') {
      setCurrentPhase('skills-collection');
      setCurrentQuestionIndex(0);
      setAnsweredQuestions([]);
    } else if (currentPhase === 'background-assessment') {
      setCurrentPhase('trait-assessment');
      setCurrentQuestionIndex(0);
      // Keep trait answers but reset to start of trait questions
      const traitAnswers = answeredQuestions.filter(id => id <= traitQuestions.length);
      setAnsweredQuestions(traitAnswers);
    } else if (currentPhase === 'results') {
      setCurrentPhase('background-assessment');
      setCurrentQuestionIndex(traitQuestions.length);
      setAssessmentComplete(false);
    }
  };

  // Render trait score card
  const renderTraitScoreCard = (trait: Trait) => {
    const score = userProfile.traits[trait.id] || 0;
    const normalizedScore = Math.min(score / 10, 1) * 100; // 0-100 scale

    return (
      <div key={trait.id} className="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">{trait.icon}</span>
          <h4 className="font-semibold text-white">{trait.name}</h4>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${trait.color}`}
            style={{ width: `${normalizedScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400">{trait.description}</p>
      </div>
    );
  };

  // Render course card
  const renderCourseCard = (course: Course) => {
    const matchScore = userProfile.courseMatches[course.id] || 0;

    return (
      <div
        key={course.id}
        className={`border rounded-lg p-5 ${
          matchScore > 80 ? 'border-green-400 bg-green-900/30' :
          matchScore > 60 ? 'border-blue-400 bg-blue-900/30' : 'border-gray-600 bg-gray-700/50'
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{course.icon}</span>
            <h3 className="font-bold text-lg text-white">{course.title}</h3>
          </div>
          <div className="bg-gray-700 border border-gray-600 rounded-full px-3 py-1 text-sm font-medium text-white">
            {matchScore}% Match
          </div>
        </div>

        <p className="text-gray-300 mb-4">{course.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{course.category}</span>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="talent-compass"
      className={`overflow-hidden relative ${
        currentPhase === 'trait-assessment' || currentPhase === 'background-assessment'
          ? 'bg-black min-h-screen'
          : 'py-16 bg-black'
      }`}
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* Background decorations - only show for non-assessment phases */}
      {currentPhase !== 'trait-assessment' && currentPhase !== 'background-assessment' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#CDFFD8]/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#94B9FF]/10 to-transparent"></div>
        </div>
      )}

      <div className={`${
        currentPhase === 'trait-assessment' || currentPhase === 'background-assessment'
          ? ''
          : 'container mx-auto px-4 relative z-10'
      }`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4 bg-purple-500/20 px-4 py-2 rounded-full">
            <svg className="text-purple-400 mr-2 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            <span className="text-purple-300 font-medium text-sm uppercase tracking-wider">Personalized Assessment</span>
          </div>
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-3 leading-tight text-white">
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Talent Compass</span> Journey
          </h2>
        </div>

        {currentPhase === 'intro' && (
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-blue-100 mb-8">
              Discover your unique path in technology consulting through our personalized assessment tool.
              Based on your core strengths and background, we'll identify your ideal learning track and
              potential for tuition discounts of up to 90%.
            </p>

            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-left text-white">Personalized Path Discovery</h3>
                  <ul className="text-left space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">Identify your natural strengths across 7 key traits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">Get matched with optimal learning tracks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">See how your background enhances your potential</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-left text-white">Unlock Your Potential</h3>
                  <ul className="text-left space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">Qualify for up to 90% tuition discounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">Join the Fast Lane application process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-200">Get a personalized learning roadmap</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={startAssessment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
              >
                Begin Your Journey
              </button>
            </div>

            <div className="flex justify-center">
              <div className="max-w-md">
                <p className="text-sm text-gray-500 mb-4">
                  The assessment takes approximately 5 minutes to complete and provides
                  immediate results. Your answers help us tailor a personalized learning
                  experience that maximizes your strengths.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentPhase === 'path-selection' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
              </button>
              <span className="text-sm text-gray-500">Step 1 of 3</span>
            </div>
            <p className="text-center text-gray-600 mb-10">
              Select your current position to customize your assessment journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div
                className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition hover:-translate-y-1 border-2 border-gray-700/50 hover:border-blue-400"
                onClick={() => selectPath('career-switcher')}
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-3xl mb-4 mx-auto">
                  🔄
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Career Switcher</h3>
                <p className="text-gray-300 text-center">
                  Coming from another field and looking to transition into technology consulting.
                </p>
              </div>

              <div
                className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition hover:-translate-y-1 border-2 border-gray-700/50 hover:border-blue-400"
                onClick={() => selectPath('recent-graduate')}
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-3xl mb-4 mx-auto">
                  🎓
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Recent Graduate</h3>
                <p className="text-gray-300 text-center">
                  Starting your professional journey with a focus on technology.
                </p>
              </div>

              <div
                className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition hover:-translate-y-1 border-2 border-gray-700/50 hover:border-blue-400"
                onClick={() => selectPath('experienced')}
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-3xl mb-4 mx-auto">
                  💼
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Experienced Professional</h3>
                <p className="text-gray-300 text-center">
                  Looking to specialize or update your skills in the tech industry.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentPhase === 'skills-collection' && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
              </button>
              <span className="text-sm text-gray-500">Step 2 of 4</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Tell us about your skills</h2>
              <p className="text-gray-300">
                Add your key technical and professional skills to help us recommend the perfect courses for you.
              </p>
            </div>

            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 border border-gray-700/50">
              {/* Skills Input Section */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillInputKeyPress}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={selectedSkills.length >= 15}
                  />
                  <button
                    onClick={() => addSkill(skillInput)}
                    disabled={!skillInput.trim() || selectedSkills.length >= 15}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Add Skill
                  </button>
                </div>

                <div className="flex justify-between text-sm text-gray-400">
                  <span>
                    {selectedSkills.length < 3
                      ? `Add at least ${3 - selectedSkills.length} more skill${3 - selectedSkills.length !== 1 ? 's' : ''} to continue`
                      : `${selectedSkills.length} of 15 skills added`
                    }
                  </span>
                  <span>{15 - selectedSkills.length} slots remaining</span>
                </div>
              </div>

              {/* Selected Skills Display */}
              {selectedSkills.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-white">Your Skills ({selectedSkills.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm flex items-center gap-2"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {/* Skill Categories and Suggestions */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 text-white">Browse by Category</h3>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {skillCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveSkillCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        activeSkillCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Skill Suggestions - More columns for wider layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                  {skillCategories
                    .find(cat => cat.id === activeSkillCategory)
                    ?.suggestions.filter(suggestion => !selectedSkills.includes(suggestion))
                    .slice(0, 32)
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => addSkill(suggestion)}
                        disabled={selectedSkills.length >= 15}
                        className="px-3 py-2 text-sm bg-gray-700 hover:bg-blue-600/20 border border-gray-600 hover:border-blue-400 rounded-lg text-left transition disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-white"
                      >
                        {suggestion}
                      </button>
                    ))
                  }
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <button
                  onClick={proceedFromSkills}
                  disabled={selectedSkills.length < 3}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {(currentPhase === 'trait-assessment' || currentPhase === 'background-assessment') && (
          <div className="min-h-screen">
              <div className="container mx-auto px-4">
              {/* Back Button and Step Indicator */}
              <div className="flex justify-between items-center mb-6 pt-6">
                <button
                  onClick={goBack}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </button>
                <span className="text-sm text-gray-500">
                  {currentPhase === 'trait-assessment' ? 'Step 3 of 4' : 'Step 4 of 4'}
                </span>
              </div>

                {/* Page Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Talent Compass</span> Journey
                  </h2>
                  <p className="text-blue-100">
                    Let's discover your core strengths and natural talents through personalized questions.
                  </p>
                </div>

                {/* Main Assessment Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Left Side - Compass Visualization */}
                  <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold mb-4 text-center text-white">Your Talent Compass</h3>
                    <div className="flex justify-center mb-4">
                      <canvas
                        ref={compassCanvas}
                        width="300"
                        height="300"
                        className="max-w-full"
                      ></canvas>
                    </div>
                    <p className="text-sm text-gray-300 text-center">
                      This visualization updates in real-time as you answer questions,
                      showing how your unique strengths are being mapped.
                    </p>
                  </div>

                  {/* Right Side - Question Section */}
                  <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-700/50">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          {currentPhase === 'trait-assessment' ? 'Trait Assessment' : 'Background Assessment'}
                        </span>
                        <span className="text-sm font-medium text-gray-300">
                          Question {currentQuestionIndex + 1} of {allQuestions.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          style={{
                            width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {currentQuestion && (
                      <div>
                        <h3 className="text-xl font-bold mb-6 text-white">{currentQuestion.text}</h3>

                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => selectAnswer(index)}
                              className="w-full text-left p-4 border border-gray-600 bg-gray-700/50 rounded-lg hover:bg-blue-600/20 hover:border-blue-400 transition text-gray-200"
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        )}

        {currentPhase === 'results' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goBack}
                className="flex items-center text-white hover:text-gray-300 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
              </button>
            </div>
            <p className="text-center text-white mb-10">
              Based on your responses, we've created a personalized profile highlighting your strengths and optimal paths.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Compass and traits visualization */}
              <div>
                <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-center text-white">Your Talent Compass</h3>
                  <div className="flex justify-center mb-4">
                    <canvas
                      ref={compassCanvas}
                      width="400"
                      height="400"
                      className="max-w-full"
                    ></canvas>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-white">Your Core Strengths</h3>
                  <div className="space-y-4">
                    {traits.map(trait => renderTraitScoreCard(trait))}
                  </div>
                </div>
              </div>

              {/* Results and recommendations */}
              <div className="lg:col-span-2">
                {/* Discount eligibility card */}
                <div className="bg-gradient-to-r from-green-600 to-black rounded-xl shadow-lg p-8 text-white mb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                      <p className="opacity-90 mb-4">
                        Based on your assessment, you've qualified for a significant tuition discount.
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <span className="text-4xl font-bold">{userProfile.discountEligibility}%</span>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <span className="text-white mr-2 mt-1">✨</span>
                      <p>
                        Your unique combination of traits and background makes you eligible
                        for up to <strong>{userProfile.discountEligibility}% off your tuition</strong>.
                        This discount will be applied automatically when you enroll in any of our programs.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setLocation('/enroll')}
                      className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Join Fast Lane
                        <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Course matches */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border border-gray-700">
                  <h3 className="text-xl font-bold mb-6 text-white">Your Recommended Paths</h3>

                  <div className="space-y-6 mb-8">
                    {bestMatch?.course && (
                      <div className="border-2 border-green-400 rounded-lg p-6 bg-gray-800/90 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold flex items-center text-white">
                            <span className="text-xl mr-2">🏆</span>
                            Best Match: {bestMatch.course.title}
                          </h4>
                          <span className="bg-green-500/20 text-green-400 border border-green-400/30 font-medium px-3 py-1 rounded-full text-sm">
                            {bestMatch.score}% Match
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">
                          {bestMatch.course.description}
                        </p>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setLocation('/enroll')}
                            className="bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg relative overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              Apply Now
                              <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                              </svg>
                            </span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-shine"></span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <h4 className="font-medium text-gray-500">Other Strong Matches</h4>
                      {courses
                        .filter(course => course.id !== bestMatch?.course?.id)
                        .sort((a, b) => (userProfile.courseMatches[b.id] || 0) - (userProfile.courseMatches[a.id] || 0))
                        .slice(0, 2)
                        .map(course => renderCourseCard(course))
                      }
                    </div>
                  </div>

                  <div className="flex justify-center pt-4 border-t border-gray-600">
                    <button
                      onClick={() => setLocation('/enroll')}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Schedule a Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}