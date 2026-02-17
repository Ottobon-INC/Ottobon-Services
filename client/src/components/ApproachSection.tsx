import { useState } from 'react';

type ApproachFlipState = {
  interpersonal: boolean;
  industry: boolean;
  technical: boolean;
  [key: string]: boolean;
};

export default function ApproachSection() {
  const [flippedCards, setFlippedCards] = useState<ApproachFlipState>({
    interpersonal: false,
    industry: false,
    technical: false
  });

  const toggleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-soft">
      <div className="absolute w-full h-96 top-0 left-0 z-[-1] pattern-dots"></div>
      <div className="absolute w-3/4 h-64 bottom-0 left-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-tr-[100%] transform -skew-y-3"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Unique Approach</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          Our three-pillar methodology creates consultants who can deliver value from day one, combining interpersonal excellence, industry knowledge, and technical expertise.
        </p>
        
        <div className="fancy-divider"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Approach 1: Interpersonal Skills */}
          <div 
            className="flip-card hover-lift"
            style={{height: "450px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front rounded-lg overflow-hidden shadow-md">
                <div className="h-1/2 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-primary text-2xl font-bold">01</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 h-1/2 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-center">Interpersonal Skills</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1 text-center">
                    Technical excellence means little without the ability to communicate effectively and work collaboratively.
                  </p>
                  <button 
                    className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-auto"
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
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Team collaboration" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-primary"
                      />
                      Interpersonal Skills
                    </h3>
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
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technical excellence means little without the ability to communicate effectively and work collaboratively. We develop consultants who are:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Accountable</strong> - Taking ownership of outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Adaptable</strong> - Continuously learning and adjusting to new challenges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Resilient</strong> - Thriving under pressure and overcoming obstacles</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-primary">Our Approach:</h4>
                    <p className="text-gray-700">
                      Our interpersonal skills curriculum includes weekly workshops, regular presentation practice, and team-based projects that mirror real consulting environments. Students receive personalized feedback from industry professionals to refine their consulting presence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Approach 2: Industry Knowledge */}
          <div 
            className="flip-card hover-lift"
            style={{height: "450px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front rounded-lg overflow-hidden shadow-md">
                <div className="h-1/2 bg-gradient-to-r from-blue-500 to-blue-700 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=80" 
                    alt="Industry analysis" 
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-blue-600 text-2xl font-bold">02</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 h-1/2 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-center">Industry Knowledge</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1 text-center">
                    Technology never exists in a vacuum. Our curriculum emphasizes business context and industry-specific challenges.
                  </p>
                  <button 
                    className="text-blue-600 font-medium py-2 px-4 rounded-full border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-auto"
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
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Industry analysis" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-blue-600"
                      />
                      Industry Knowledge
                    </h3>
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
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technology never exists in a vacuum. Our curriculum emphasizes business context and industry-specific challenges:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Business Processes</strong> - Understanding how technology supports operations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Industry Verticals</strong> - Specializing in healthcare, finance, retail or manufacturing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Change Management</strong> - Facilitating organizational transformation</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-blue-600">Our Methodology:</h4>
                    <p className="text-gray-700">
                      Students work on real case studies from our industry partners, gaining practical exposure to different business domains and their unique technology requirements. Guest lectures from industry executives provide context on how technology solutions address specific market challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Approach 3: Technical Expertise */}
          <div 
            className="flip-card hover-lift"
            style={{height: "450px"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner && !inner.classList.contains('flipped')) {
                inner.classList.add('flipped');
              }
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front rounded-lg overflow-hidden shadow-md">
                <div className="h-1/2 bg-gradient-to-r from-purple-500 to-purple-700 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80" 
                    alt="Technical development" 
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-purple-600 text-2xl font-bold">03</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 h-1/2 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-center">Technical Expertise</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1 text-center">
                    Build robust technical foundations across high-demand domains with hands-on experience and certification pathways.
                  </p>
                  <button 
                    className="text-purple-600 font-medium py-2 px-4 rounded-full border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-auto"
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
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Technical development" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-purple-600"
                      />
                      Technical Expertise
                    </h3>
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
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Build robust technical foundations across high-demand domains with hands-on experience and certification pathways:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Technology Stacks</strong> - From front-end to back-end solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Certifications</strong> - Industry-recognized credentials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Implementation Methodology</strong> - Structured project approaches</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-purple-600">Our Technical Edge:</h4>
                    <p className="text-gray-700">
                      Our lab environments provide hands-on practice with the same tools and technologies used by leading consulting firms. Students graduate with both theoretical knowledge and practical implementation experience. We maintain partnerships with major technology vendors to provide certification pathways valued by employers.
                    </p>
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
