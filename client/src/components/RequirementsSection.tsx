export default function RequirementsSection() {
  return (
    <section className="py-16 overflow-hidden bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Hardware & Connectivity */}
          <div className="w-full max-w-2xl mx-auto mb-8 lg:mb-0">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center text-white">
                <i className="fas fa-laptop text-blue-400 mr-3"></i>
                Hardware & Connectivity Requirements
              </h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <p className="mb-4 text-sm sm:text-base text-white">Our cloud-based learning platform is accessible with minimal hardware requirements:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Computer:</strong> Standard Chromebook or basic laptop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Internet:</strong> 10+ Mbps connection speed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Software:</strong> Modern web browser (Chrome, Firefox, Safari)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Optional:</strong> Webcam and microphone for collaborative sessions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Program Structure */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center text-white">
                <i className="fas fa-calendar-alt text-blue-400 mr-3"></i>
                Program Structure & Time Commitment
              </h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <p className="mb-4 text-sm sm:text-base text-white">Our immersive 12-week program prepares you for real-world consulting challenges:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Duration:</strong> 12 weeks intensive training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Weekly commitment:</strong> 40 hours (full-time)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Structure:</strong> Core modules (AM) + Hands-on practice (PM)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle text-blue-400"></i></span>
                  <span className="text-gray-300 text-sm sm:text-base"><strong>Career Support:</strong> 4 additional weeks of job placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}