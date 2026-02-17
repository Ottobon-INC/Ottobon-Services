import { useState, useEffect } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

export default function AssessmentSection() {
  const [currentView, setCurrentView] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Track whether onboarding has been shown
  const [seenOnboarding, setSeenOnboarding] = useState(() => {
    return localStorage.getItem('hasSeenOnboarding') === 'true';
  });
  
  // Show onboarding automatically if first visit
  useEffect(() => {
    if (!seenOnboarding) {
      localStorage.setItem('hasSeenOnboarding', 'true');
      setSeenOnboarding(true);
    }
  }, [seenOnboarding]);

  const questions: Question[] = [
    {
      id: 1,
      text: "When faced with a complex problem, you typically:",
      options: [
        "Break it down into smaller components and tackle each systematically",
        "Look for patterns and similarities to problems you've solved before",
        "Gather input from others to gain different perspectives",
        "Rely on intuition and creative approaches"
      ]
    },
    {
      id: 2,
      text: "Which best describes your approach to learning new technologies?",
      options: [
        "Reading documentation and following tutorials step-by-step",
        "Experimenting and building small projects to test capabilities",
        "Taking structured courses with assessments",
        "Learning as needed when solving real problems"
      ]
    },
    {
      id: 3,
      text: "When working on a team project, you prefer to:",
      options: [
        "Take a leadership role organizing tasks and timelines",
        "Focus on technical implementation and problem solving",
        "Bridge communication between technical and non-technical members",
        "Contribute creative ideas and alternative approaches"
      ]
    }
  ];

  const startAssessment = () => {
    setCurrentView('questions');
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentView('results');
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentView('intro');
    }
  };

  return (
    <section id="assessment" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Career Aptitude Assessment</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-white opacity-90">
          Discover your unique strengths and the perfect program match through our comprehensive assessment tool. Find your ideal path and maximize your potential.
        </p>
        
        <div className="flex justify-center items-center mb-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-flex items-center max-w-2xl">
            <div className="bg-green-500 rounded-full p-2 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="text-white">
              <strong className="block text-lg">Save up to 90% on your tuition</strong>
              <span className="opacity-90">Assessment results combined with your background can qualify you for substantial discounts</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 text-gray-900 max-w-4xl mx-auto">
          {currentView === 'intro' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Career Aptitude Assessment</h3>
              <p className="mb-6 text-gray-700">
                This assessment evaluates your natural aptitudes, working style, and personal strengths to match you with the ideal technology consulting path.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
                <h4 className="font-bold">Benefits of completing this assessment:</h4>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized program recommendations based on your strengths</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Potential tuition discount of up to 90% based on results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Insights to help counselors create your optimal learning path</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={startAssessment}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
              >
                Start Your Assessment
              </button>
            </div>
          )}
          
          {currentView === 'questions' && (
            <>
              <div className="question-container mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  {currentQuestion + 1}. {questions[currentQuestion].text}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <label 
                      key={index} 
                      className={`flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        answers[questions[currentQuestion].id] === index ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`q${questions[currentQuestion].id}`} 
                        className="mt-1 mr-3"
                        checked={answers[questions[currentQuestion].id] === index}
                        onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={goToPrevQuestion} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition"
                >
                  Previous
                </button>
                <button 
                  onClick={goToNextQuestion} 
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition shadow-sm hover:shadow-md"
                >
                  {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
                </button>
              </div>
            </>
          )}
          
          {currentView === 'results' && (
            <>
              <h3 className="text-2xl font-bold mb-6">Your Consultant Potential Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Your Strengths</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Technical Aptitude</span>
                        <span>82%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Problem Solving</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Client Communication</span>
                        <span>68%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Recommended Paths</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2"><i className="fas fa-star"></i></span>
                      <span><strong>Primary:</strong> AI Consulting – Generative AI Solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2"><i className="fas fa-star"></i></span>
                      <span><strong>Secondary:</strong> Business Applications – Salesforce CX</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2"><i className="fas fa-award"></i></span>
                      <span><strong>Scholarship Eligible:</strong> 75% tuition reduction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><i className="fas fa-percentage"></i></span>
                      <span><strong>Additional Discount:</strong> Up to 15% more based on experience</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Congratulations!
                </h4>
                <p className="mb-4">
                  Based on your assessment, you currently qualify for a <strong className="text-blue-700">75% tuition reduction</strong>. Combined with your experience-based discount, you could receive up to <strong className="text-blue-700">90% off your total tuition</strong>.
                </p>
                <p className="mb-4">
                  We recommend exploring our AI Consulting track, where your technical aptitude and problem-solving skills will be valuable assets.
                </p>
                <p>
                  Schedule a call with our admissions team to discuss your results and finalize your discount eligibility.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#enroll" 
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg text-center"
                >
                  Apply Now
                </a>
                <button 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-full transition text-center"
                >
                  Schedule Consultation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
