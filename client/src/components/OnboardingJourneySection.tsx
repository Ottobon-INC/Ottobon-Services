import { useState } from 'react';
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

export default function OnboardingJourneySection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Animation hooks
  const sectionRef = useAnimation('animate-fade-in');
  const titleRef = useAnimation('animate-slide-up');
  const descriptionRef = useAnimation('animate-slide-up delay-100');
  const journeyRef = useAnimation('animate-scale-in delay-200');

  // Define the onboarding journey steps
  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to Your Learning Journey",
      description: "Every great technology career starts with a single step. At Ottobon, we'll guide you through a transformative experience tailored to your unique strengths and aspirations.",
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

  // Handle step navigation
  const goToStep = (index: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(index);
      setIsVisible(true);
    }, 300);
  };

  const goToNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <section id="journey" className="py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-3">
          Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Immersive</span> Learning Experience
        </h2>
        <p ref={descriptionRef} className="text-center text-gray-700 max-w-2xl mx-auto mb-16">
          We've designed a comprehensive journey that transforms beginners into industry-ready professionals through a structured, supportive learning path.
        </p>
        
        <div ref={journeyRef} className="max-w-5xl mx-auto">
          {/* Progress steps with arrows */}
          <div className="mb-10">
            <div className="flex justify-between items-center relative">
              {/* Background progress line */}
              <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 -translate-y-1/2"></div>
              
              {/* Colored progress line */}
              <div 
                className="absolute h-1 bg-gradient-to-r from-blue-600 to-purple-600 left-0 top-1/2 -translate-y-1/2 transition-all duration-500" 
                style={{ width: `${((currentStep) / (onboardingSteps.length - 1)) * 100}%` }}
              ></div>
              
              {/* Step circles with arrows */}
              {onboardingSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="z-10 flex flex-col items-center group"
                >
                  <button
                    onClick={() => goToStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md relative
                      ${index <= currentStep 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-white text-gray-400 border border-gray-200'}`}
                    aria-label={`Go to step ${index + 1}`}
                  >
                    {index < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : index === currentStep ? (
                      <span className="animate-pulse">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    )}
                    
                    {/* Tooltip on hover */}
                    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute -bottom-12 bg-gray-800 text-white text-xs font-medium py-1 px-3 rounded-lg shadow-lg whitespace-nowrap">
                      {step.title}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main content card */}
          <div 
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left side - Step content */}
              <div className={`md:w-1/2 p-8 md:p-10 ${onboardingSteps[currentStep].background} text-white`}>
                <div className="text-4xl mb-4">{onboardingSteps[currentStep].icon}</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{onboardingSteps[currentStep].title}</h2>
                <p className="mb-6 text-white/90">{onboardingSteps[currentStep].description}</p>
                
                <div className="flex space-x-3">
                  {currentStep > 0 && (
                    <button 
                      onClick={goToPrevStep}
                      className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-6 rounded-full transition"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < onboardingSteps.length - 1 ? (
                    <button 
                      onClick={goToNextStep}
                      className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        Continue
                        <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <a 
                      href="#assessment"
                      className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        Take Assessment
                        <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Right side - Character & quote */}
              <div className="md:w-1/2 bg-gray-50 p-8 md:p-10 flex flex-col">
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
                      onClick={() => goToStep(index)}
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
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Ready to find your perfect tech career path?</p>
            <a 
              href="#assessment" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg inline-flex items-center"
            >
              Take Assessment
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}