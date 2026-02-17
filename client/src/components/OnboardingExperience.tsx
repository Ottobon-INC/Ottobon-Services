import { useState, useEffect, useRef } from 'react';
import { useAnimation } from '@/hooks/use-animation';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  background: string;
  character?: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
}

interface OnboardingExperienceProps {
  onClose?: () => void;
}

export default function OnboardingExperience({ onClose }: OnboardingExperienceProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animation hooks
  const sectionRef = useAnimation('animate-fade-in');
  const contentRef = useAnimation('animate-slide-up delay-100');
  const imageRef = useAnimation('animate-slide-right delay-200');

  // Define the onboarding journey steps
  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to Your Learning Journey",
      description: "Every great technology career starts with a single step. At Ottobon Academy, we'll guide you through a transformative experience tailored to your unique strengths and aspirations.",
      icon: "🚀",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600",
      character: {
        name: "Alex Chen",
        role: "Program Director",
        quote: "We don't just teach technology – we cultivate tomorrow's tech leaders through immersive, personalized learning.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Discover Your Unique Path",
      description: "Through our proprietary personality assessment, we'll identify your natural strengths and match you with the perfect learning track that aligns with your abilities.",
      icon: "🧭",
      background: "bg-gradient-to-r from-purple-500 to-pink-500",
      character: {
        name: "Dr. Maya Wilson",
        role: "Career Assessment Specialist",
        quote: "Your career journey should leverage your natural talents. Our assessment identifies paths where you'll truly excel.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Build Real-World Skills",
      description: "You'll tackle real industry projects, collaborating with mentors who have implemented enterprise solutions at leading companies.",
      icon: "⚒️",
      background: "bg-gradient-to-r from-green-500 to-emerald-500",
      character: {
        name: "James Rodriguez",
        role: "Industry Mentor",
        quote: "The projects you'll build here are the same challenges we face daily at Fortune 500 companies. You'll be job-ready from day one.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Join the Elite Network",
      description: "Graduate into our community of tech professionals, gaining access to exclusive job opportunities, continued learning, and career advancement resources.",
      icon: "🌐",
      background: "bg-gradient-to-r from-amber-500 to-orange-500",
      character: {
        name: "Sophia Kim",
        role: "Alumni Relations",
        quote: "Our graduates don't just find jobs – they build meaningful careers with continued support from our ever-growing network.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    }
  ];

  // Start the onboarding experience a few seconds after component mounts
  useEffect(() => {
    // Show the onboarding experience after a delay
    const timer = setTimeout(() => {
      setShowOnboarding(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle next step in the onboarding process
  const goToNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setIsVisible(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsVisible(true);
      }, 500); // Time for exit animation
    } else {
      // Onboarding complete
      setIsVisible(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsComplete(true);
        
        // Hide the onboarding after completion
        setTimeout(() => {
          setShowOnboarding(false);
          if (onClose) {
            onClose();
          }
        }, 2000);
      }, 500);
    }
  };

  // Update visibility on step change
  useEffect(() => {
    setIsVisible(true);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentStep]);

  // Allow users to skip onboarding
  const skipOnboarding = () => {
    setShowOnboarding(false);
    if (onClose) {
      onClose();
    }
  };

  if (!showOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div ref={sectionRef} className="max-w-4xl w-full mx-4 relative">
        {/* Progress bar */}
        <div className="absolute -top-14 left-0 right-0 flex items-center justify-between px-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-6">
            <div 
              className="h-2.5 rounded-full bg-white transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            ></div>
          </div>
          <button 
            onClick={skipOnboarding}
            className="text-white text-sm bg-white/20 hover:bg-white/30 transition py-1 px-3 rounded-full"
          >
            Skip
          </button>
        </div>
        
        {/* Main content card */}
        <div 
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          {/* Step content */}
          {!isComplete && (
            <div className="flex flex-col md:flex-row">
              {/* Left side - Step content */}
              <div ref={contentRef} className={`md:w-1/2 p-8 md:p-10 ${onboardingSteps[currentStep].background} text-white`}>
                <div className="text-4xl mb-4">{onboardingSteps[currentStep].icon}</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{onboardingSteps[currentStep].title}</h2>
                <p className="mb-6 text-white/90">{onboardingSteps[currentStep].description}</p>
                
                <button 
                  onClick={goToNextStep}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    {currentStep < onboardingSteps.length - 1 ? 'Continue' : 'Get Started'}
                    <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 -translate-x-full animate-shine"></span>
                </button>
                
                <div className="mt-8 text-center md:text-left">
                  <div className="w-8 h-1 bg-white/30 rounded-full inline-block md:block"></div>
                  <p className="text-xs mt-2 text-white/70">Step {currentStep + 1} of {onboardingSteps.length}</p>
                </div>
              </div>
              
              {/* Right side - Character & quote */}
              <div ref={imageRef} className="md:w-1/2 bg-gray-50 p-8 md:p-10 flex flex-col">
                {onboardingSteps[currentStep].character && (
                  <>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-lg">
                        <img 
                          src={onboardingSteps[currentStep].character.image} 
                          alt={onboardingSteps[currentStep].character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{onboardingSteps[currentStep].character.name}</h3>
                        <p className="text-sm text-gray-600">{onboardingSteps[currentStep].character.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="bg-white rounded-lg p-6 shadow-inner border border-gray-100 relative">
                        <div className="absolute -top-3 -left-2 text-4xl text-gray-300">"</div>
                        <div className="absolute -bottom-3 -right-2 text-4xl text-gray-300">"</div>
                        <p className="text-gray-700 italic relative z-10">
                          {onboardingSteps[currentStep].character.quote}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Navigation dots */}
                <div className="flex justify-center space-x-2 mt-8">
                  {onboardingSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => {
                          setCurrentStep(index);
                          setIsVisible(true);
                        }, 500);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-blue-600 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Completion screen */}
          {isComplete && (
            <div className="p-10 text-center">
              <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">You're All Set!</h2>
              <p className="mb-6 text-gray-600 max-w-md mx-auto">
                Your journey with Ottobon Academy begins now. Explore our programs and discover your path to tech excellence.
              </p>
              <button 
                onClick={skipOnboarding}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg inline-flex items-center"
              >
                Explore Ottobon
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}