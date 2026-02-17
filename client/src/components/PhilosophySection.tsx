import { useState } from 'react';

type PhilosophyFlipState = {
  human: boolean;
  accelerated: boolean;
  career: boolean;
  [key: string]: boolean;
};

export default function PhilosophySection() {
  const [flippedCards, setFlippedCards] = useState<PhilosophyFlipState>({
    human: false,
    accelerated: false,
    career: false
  });

  const toggleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="philosophy" className="py-20 bg-gradient-soft pattern-dots section-wave-top">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Philosophy</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          At OttoBon, we believe technical skills alone aren't enough. Our integrated approach prepares consultants who excel technically and interpersonally.
        </p>
        
        <div className="fancy-divider"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Pillar 1 */}
          <div 
            className="flip-card hover-lift" 
            style={{height: "350px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front glass-effect">
                <div className="bg-gradient-primary h-1/3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-8 h-2/3 flex flex-col justify-between">
                  <div>
                    <div className="text-primary text-3xl mb-4 flex justify-center">
                      <i className="fas fa-users"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Human-Centered Expertise</h3>
                    <p className="text-gray-700 text-sm text-center">
                      We emphasize the human side of consulting.
                    </p>
                  </div>
                  <button 
                    className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const parent = e.currentTarget.closest('.flip-card');
                      if (parent) {
                        const inner = parent.querySelector('.flip-card-inner');
                        if (inner) inner.classList.add('flipped');
                      }
                    }}
                  >
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back">
                <div className="h-full p-8 flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">Human-Centered Expertise</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const parent = e.currentTarget.closest('.flip-card');
                        if (parent) {
                          const inner = parent.querySelector('.flip-card-inner');
                          if (inner) inner.classList.remove('flipped');
                        }
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-6">
                      We emphasize the human side of consulting. Technical knowledge must be paired with exceptional communication, adaptability, and empathy.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">Why It Matters:</h4>
                    <p className="text-gray-700 mb-6">
                      The most technically brilliant solutions fail without stakeholder buy-in. Our graduates understand how to build trust, manage expectations, and navigate organizational dynamics.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">How We Develop It:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Intensive communication workshops</li>
                      <li>• Simulated client interactions</li>
                      <li>• Emotional intelligence training</li>
                      <li>• Team-based project challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pillar 2 */}
          <div 
            className="flip-card hover-lift" 
            style={{height: "350px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front glass-effect">
                <div className="bg-gradient-primary h-1/3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" 
                    alt="Accelerated learning" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-8 h-2/3 flex flex-col justify-between">
                  <div>
                    <div className="text-primary text-3xl mb-4 flex justify-center">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Accelerated Mastery</h3>
                    <p className="text-gray-700 text-sm text-center">
                      Our approach accelerates learning through immersive experiences.
                    </p>
                  </div>
                  <button 
                    className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const parent = e.currentTarget.closest('.flip-card');
                      if (parent) {
                        const inner = parent.querySelector('.flip-card-inner');
                        if (inner) inner.classList.add('flipped');
                      }
                    }}
                  >
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back">
                <div className="h-full p-8 flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">Accelerated Mastery</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const parent = e.currentTarget.closest('.flip-card');
                        if (parent) {
                          const inner = parent.querySelector('.flip-card-inner');
                          if (inner) inner.classList.remove('flipped');
                        }
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-6">
                      Our speedway approach accelerates learning through immersive, hands-on experiences with real-world scenarios and industry tools.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">Why It Matters:</h4>
                    <p className="text-gray-700 mb-6">
                      Traditional learning is too slow for today's tech evolution. We compress years of experiential learning into months through deliberate practice and expert coaching.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">How We Implement It:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Industry-led capstone projects</li>
                      <li>• Real-time feedback from experts</li>
                      <li>• Iterative learning cycles</li>
                      <li>• Production-grade environment access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pillar 3 */}
          <div 
            className="flip-card hover-lift" 
            style={{height: "350px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front glass-effect">
                <div className="bg-gradient-primary h-1/3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=600&q=80" 
                    alt="Career growth" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-8 h-2/3 flex flex-col justify-between">
                  <div>
                    <div className="text-primary text-3xl mb-4 flex justify-center">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Career Partnership</h3>
                    <p className="text-gray-700 text-sm text-center">
                      We're committed to your long-term success.
                    </p>
                  </div>
                  <button 
                    className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const parent = e.currentTarget.closest('.flip-card');
                      if (parent) {
                        const inner = parent.querySelector('.flip-card-inner');
                        if (inner) inner.classList.add('flipped');
                      }
                    }}
                  >
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back">
                <div className="h-full p-8 flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">Career Partnership</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const parent = e.currentTarget.closest('.flip-card');
                        if (parent) {
                          const inner = parent.querySelector('.flip-card-inner');
                          if (inner) inner.classList.remove('flipped');
                        }
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-6">
                      We're committed to your long-term success, providing ongoing mentorship and connections to top consulting opportunities.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">Why It Matters:</h4>
                    <p className="text-gray-700 mb-6">
                      Your success is our success. Our extensive industry network and career support services ensure you land not just any job, but the right job with substantial growth potential.
                    </p>
                    <h4 className="font-semibold mb-2 text-primary">Our Commitment Includes:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Personalized career coaching</li>
                      <li>• Interview preparation with industry veterans</li>
                      <li>• Exclusive recruiting events</li>
                      <li>• Alumni network of 2,000+ professionals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
