import { useState } from 'react';

type FlippedCardState = {
  story1: boolean;
  story2: boolean;
  story3: boolean;
  [key: string]: boolean;
};

export default function SuccessStoriesSection() {
  const [flippedCards, setFlippedCards] = useState<FlippedCardState>({
    story1: false,
    story2: false,
    story3: false
  });

  const toggleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="success-stories" className="py-16 overflow-hidden bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* Subtle gradient fades */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#CDFFD8]/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#94B9FF]/5 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Student to Consultant Transformations</h2>
        <p className="text-center text-blue-100 max-w-3xl mx-auto mb-12">
          Discover how our AI-enhanced learning approach has empowered students and freshers to become independent consultants in Salesforce, Oracle, Cloud Computing, and Full Stack Development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Success Story 1 */}
          <div className="flip-card h-[320px]" onClick={() => toggleFlipCard('story1')}>
            <div className={`flip-card-inner ${flippedCards.story1 ? 'flipped' : ''}`}>
              <div className="flip-card-front bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-2xl">👩‍💼</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Priya Sharma</h3>
                      <p className="text-primary">Independent Salesforce Consultant</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-4">
                      "From computer science student to earning $85/hour as a Salesforce consultant..."
                    </p>
                    <div className="text-center mt-2">
                      <button className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto">
                        Read More <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Business Applications</span>
                    <span className="text-sm font-medium">85% Salary Increase</span>
                  </div>
                </div>
              </div>

              <div className="flip-card-back bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Sarah Johnson</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('story1');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-4">
                      "Before OttoBon, I was a marketing coordinator with basic CRM knowledge. The program transformed my career in just 12 weeks, and I now help Fortune 500 clients implement Salesforce solutions."
                    </p>
                    <p className="text-gray-700 mb-4">
                      "The hands-on projects were invaluable - we built real solutions for actual business problems. My capstone project became a case study I presented during my Accenture interview."
                    </p>
                    <p className="text-gray-700">
                      "The career coaching and interview preparation were exceptional. I not only learned the technical skills but also how to position my experience for consulting roles."
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Class of 2023</span>
                    <a href="#" className="text-primary hover:underline text-sm">View LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Story 2 */}
          <div className="flip-card h-[320px]" onClick={() => toggleFlipCard('story2')}>
            <div className={`flip-card-inner ${flippedCards.story2 ? 'flipped' : ''}`}>
              <div className="flip-card-front bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="Michael Chen" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-bold text-lg">Michael Chen</h3>
                      <p className="text-primary">AI Solutions Architect at Deloitte</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-4">
                      "OttoBon's AI track gave me the business context and implementation expertise I needed..."
                    </p>
                    <div className="text-center mt-2">
                      <button className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto">
                        Read More <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">AI Consulting</span>
                    <span className="text-sm font-medium">Hired within 2 weeks</span>
                  </div>
                </div>
              </div>

              <div className="flip-card-back bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Michael Chen</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('story2');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-4">
                      "With a computer science degree but no practical experience, I was struggling to break into consulting. OttoBon's AI track gave me the business context and implementation expertise I needed."
                    </p>
                    <p className="text-gray-700 mb-4">
                      "The instructors were all active industry professionals who shared real-world challenges and solutions. The GenAI implementation project I completed is now part of my portfolio that I showcase to clients."
                    </p>
                    <p className="text-gray-700">
                      "The alumni network is incredibly valuable. A fellow graduate referred me to Deloitte, which fast-tracked my interview process."
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Class of 2023</span>
                    <a href="#" className="text-primary hover:underline text-sm">View LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Story 3 */}
          <div className="flip-card h-[320px]" onClick={() => toggleFlipCard('story3')}>
            <div className={`flip-card-inner ${flippedCards.story3 ? 'flipped' : ''}`}>
              <div className="flip-card-front bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/women/29.jpg" alt="Aisha Patel" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-bold text-lg">Aisha Patel</h3>
                      <p className="text-primary">AWS Solutions Consultant at PWC</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-4">
                      "OttoBon's cloud program provided the perfect balance of technical training and business knowledge..."
                    </p>
                    <div className="text-center mt-2">
                      <button className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto">
                        Read More <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Cloud Computing</span>
                    <span className="text-sm font-medium">Career transition in 3 months</span>
                  </div>
                </div>
              </div>

              <div className="flip-card-back bg-gray-100">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Aisha Patel</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('story3');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 mb-4">
                      "I was a business analyst with limited technical skills. OttoBon's cloud program provided the perfect balance of technical training and business knowledge that consulting firms value."
                    </p>
                    <p className="text-gray-700 mb-4">
                      "The AWS certification prep was intensive but well-structured. By the end of the program, I had earned two AWS certifications which made me immediately marketable."
                    </p>
                    <p className="text-gray-700">
                      "The mock client presentations were challenging but prepared me perfectly for the case interviews at consulting firms. PWC offered me a position before I even completed the program."
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Class of 2022</span>
                    <a href="#" className="text-primary hover:underline text-sm">View LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-200 p-4 rounded-lg inline-block mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">93%</div>
                <div className="text-sm text-gray-700">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">47%</div>
                <div className="text-sm text-gray-700">Avg. Salary Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-gray-700">Weeks to Employment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">86%</div>
                <div className="text-sm text-gray-700">Retention After 1 Year</div>
              </div>
            </div>
          </div>

          <button className="text-primary hover:text-primary/80 font-medium flex items-center justify-center mx-auto">
            View More Success Stories <i className="fas fa-chevron-right ml-1 text-sm"></i>
          </button>
        </div>
      </div>
    </section>
  );
}