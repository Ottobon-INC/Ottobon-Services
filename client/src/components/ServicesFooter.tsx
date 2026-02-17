export default function ServicesFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/assets/logo.png"
                alt="Ottobon Logo"
                className="h-10 w-auto object-contain mr-3 filter drop-shadow-lg"
              />
              <div className="text-xl font-bold text-white tracking-wide">
                OTTOBON
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered professional services for modern consultancies. Streamline operations, accelerate growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Health Care
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Enterprise Enablement
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Business Development
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <i className="fas fa-envelope text-blue-400 mr-2"></i>
                <a href="mailto:hr.services@ottobon.in" className="text-gray-300 hover:text-blue-400 transition-colors">
                  hr.services@ottobon.in
                </a>
              </li>
              <li className="flex items-center text-sm">
                <i className="fas fa-phone text-blue-400 mr-2"></i>
                <a href="tel:+919281011683" className="text-gray-300 hover:text-blue-400 transition-colors">
                  +91 9281011683
                </a>
              </li>
              <li className="flex space-x-3 mt-4">
                <a href="https://www.linkedin.com/company/ottobon-prof-svc-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all">
                  <i className="fab fa-linkedin text-gray-300"></i>
                </a>
                <a href="https://www.instagram.com/ottobon.verse/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all">
                  <i className="fab fa-instagram text-gray-300"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-3 md:mb-0">
            © {new Date().getFullYear()} OttoBon Professional Services. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}