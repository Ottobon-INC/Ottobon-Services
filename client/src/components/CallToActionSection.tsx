import { useState } from 'react';

export default function CallToActionSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email signup
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 overflow-hidden bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      {/* Gradient fades to match TalentCompassAssessment and avoid banding */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#CDFFD8]/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#94B9FF]/10 to-transparent"></div>

    <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully transitioned into independent consultants through our AI-enhanced learning programs.
          </p>

          {/* Key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Industry-Ready Skills</h3>
              <p className="text-blue-100 text-sm">Salesforce, Oracle, Cloud Computing & Full Stack Development</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-white font-semibold mb-2">AI-Enhanced Learning</h3>
              <p className="text-blue-100 text-sm">Personalized curriculum that adapts to your learning style</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-md">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-white font-semibold mb-2">Consulting Success</h3>
              <p className="text-blue-100 text-sm">Graduate as an independent consultant, not just an employee</p>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => {
                const assessmentElement = document.getElementById('talent-compass');
                if (assessmentElement) {
                  assessmentElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold py-4 px-8 rounded-full transition shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center">
                Take Free Assessment
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            <button 
              onClick={() => {
                const coursesElement = document.getElementById('courses');
                if (coursesElement) {
                  coursesElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full transition text-lg"
            >
              View Programs
            </button>
          </div>

          
        </div>
      </div>
    </section>
  );
}