import { useState, useEffect } from 'react';
import { Clock, BarChart2, Calendar, Users, ChevronDown, ChevronUp, Menu, X, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Tailwind colors applied through inline styles
const colors = {
  primaryGreen: '#5A6E58',
  darkGreen: '#4F5F4E',
  lightGreen: '#788C77',
  lightBackground: '#F5F7F5',
  textcolor:"white"
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const heroSlides = [
    {
      title: "Track Your Time, Boost Your Productivity",
      subtitle: "Effortlessly manage your time with our intuitive tracking app. Know exactly where your hours go and optimize your workflow.",
      backgroundImage: "/api/placeholder/1800/900?text=Time+Tracking+Dashboard",
    },
    {
      title: "Detailed Reports & Analytics",
      subtitle: "Visualize your productivity patterns with beautiful charts and insightful reports that help you make better decisions.",
      backgroundImage: "/api/placeholder/1800/900?text=Analytics+Dashboard",
    },
    {
      title: "Seamless Team Collaboration",
      subtitle: "Keep your entire team in sync with collaborative time tracking, shared projects, and permission-based insights.",
      backgroundImage: "/api/placeholder/1800/900?text=Team+Collaboration",
    }
  ];

  const faqs = [
    {
      question: "How does the time tracking feature work?",
      answer: "Our time tracking feature automatically logs your activities as you work. Simply start the timer when you begin a task, and stop it when you're done. You can also manually edit entries if needed."
    },
    {
      question: "Can I generate reports based on my tracked time?",
      answer: "Yes! You can generate detailed reports based on projects, clients, or time periods. Export them as CSV, PDF, or share them directly with team members or clients."
    },
    {
      question: "Is the app available on mobile devices?",
      answer: "Absolutely. Our app is available on iOS and Android, allowing you to track time on the go and sync across all your devices seamlessly."
    },
    {
      question: "How does team time tracking work?",
      answer: "Administrators can view team members' time entries, generate team reports, and analyze productivity. Team members can only view their own data unless given explicit permissions."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="font-sans" style={{ width:"99vw", backgroundColor: colors.lightBackground }}>
      {/* Navbar */}
      <nav className="px-4 md:px-8 py-4" style={{ backgroundColor: colors.primaryGreen }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="text-white mr-2" size={28} />
            <span className="text-white font-bold text-xl">TimeTrack</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-gray-200">Features</a>
            <a href="#about" className="text-white hover:text-gray-200">About</a>
            <a href="#testimonials" className="text-white hover:text-gray-200">Testimonials</a>
            <a href="#faq" className="text-white hover:text-gray-200">FAQ</a>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: colors.darkGreen }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              Sign In
            </button>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium border-2 border-white"
              onMouseOver={e => e.currentTarget.style.backgroundColor = colors.darkGreen}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Sign Up
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="text-white" size={24} />
              ) : (
                <Menu className="text-white" size={24} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <a href="#features" className="block text-white py-2 hover:text-gray-200">Features</a>
            <a href="#about" className="block text-white py-2 hover:text-gray-200">About</a>
            <a href="#testimonials" className="block text-white py-2 hover:text-gray-200">Testimonials</a>
            <a href="#faq" className="block text-white py-2 hover:text-gray-200">FAQ</a>
            <div className="flex space-x-4 pt-2">
              <button 
                className="px-4 py-2 rounded-md text-white font-medium flex-1"
                style={{ backgroundColor: colors.darkGreen }}
              >
                Sign In
              </button>
              <button 
                className="px-4 py-2 rounded-md text-white font-medium border-2 border-white flex-1"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Carousel Section */}
      <section className="relative min-h-screen">
        {/* Hero Carousel */}
        <div className="relative h-screen overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ 
                backgroundImage: `linear-gradient(rgba(90, 110, 88, 0.85), rgba(79, 95, 78, 0.9)), url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex flex-col justify-center items-center h-full px-4 py-8 text-white">
                <div className="container mx-auto text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">{slide.subtitle}</p>
                  <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                    <button 
                      className="px-8 py-3 rounded-lg text-lg font-medium"
                      style={{ backgroundColor: colors.lightGreen }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = colors.darkGreen}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = colors.lightGreen}
                    >
                      Start Free Trial
                    </button>
                    <button 
                      className="px-8 py-3 rounded-lg text-lg font-medium border-2 border-white"
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 rounded-full p-2 focus:outline-none hover:bg-opacity-30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} color="black" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 rounded-full p-2 focus:outline-none hover:bg-opacity-30"
          aria-label="Next slide"
        >
          <ChevronRight size={24} color="black" />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`mx-1 w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 
                ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-40'}`}
              aria-label={`Go to slide ${index + 1}`}
              style={currentSlide === index ? { backgroundColor: 'white' } : { backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
            />
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-16 px-4 md:px-8" style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: colors.primaryGreen }}>
            Powerful Features for Effective Time Management
          </h2>

          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primaryGreen }}>Effortless Time Tracking</h3>
              <p className="text-lg mb-6" style={{ color: colors.darkGreen }}>
                Start and stop timers with a single click. Our intuitive interface makes tracking your daily activities simple and stress-free. Categorize tasks by project, client, or custom tags.
              </p>
              <ul className="space-y-2">
                {[
                  "One-click timer controls",
                  "Automatic idle detection",
                  "Custom task categories",
                  "Calendar integration"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: colors.lightGreen }}>•</span>
                    <span style={{ color: colors.darkGreen }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-lg shadow-xl overflow-hidden max-w-md">
                <img src="/api/placeholder/600/400" alt="Time tracking interface" className="w-full" />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primaryGreen }}>Insightful Reports & Analytics</h3>
              <p className="text-lg mb-6" style={{ color: colors.darkGreen }}>
                Gain valuable insights about how you spend your time with detailed visual reports. Identify productivity trends and optimize your workflow based on data.
              </p>
              <ul className="space-y-2">
                {[
                  "Visual time distribution charts",
                  "Productivity analysis",
                  "Customizable reporting periods",
                  "Export in multiple formats"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: colors.lightGreen }}>•</span>
                    <span style={{ color: colors.darkGreen }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-lg shadow-xl overflow-hidden max-w-md">
                <img src="/api/placeholder/600/400" alt="Analytics dashboard" className="w-full" />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primaryGreen }}>Team Collaboration</h3>
              <p className="text-lg mb-6" style={{ color: colors.darkGreen }}>
                Perfect for teams of all sizes. Track projects collectively, assign tasks, and monitor progress in real-time. Keep everyone aligned and projects on schedule.
              </p>
              <ul className="space-y-2">
                {[
                  "Team workload visualization",
                  "Project progress tracking",
                  "Task assignment",
                  "Permission-based access"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: colors.lightGreen }}>•</span>
                    <span style={{ color: colors.darkGreen }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-lg shadow-xl overflow-hidden max-w-md">
                <img src="/api/placeholder/600/400" alt="Team collaboration" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 md:px-8" style={{ backgroundColor: colors.lightBackground }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.primaryGreen }}>
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "Freelance Designer",
                quote: "TimeTrack has completely transformed how I manage my client projects. I can now accurately bill hours and track my most productive times of day."
              },
              {
                name: "Michael Chen",
                position: "Project Manager",
                quote: "As a team lead, I needed a solution that works for everyone. TimeTrack's collaborative features have improved our workflow and project estimation by 40%."
              },
              {
                name: "Emily Rodriguez",
                position: "Marketing Director",
                quote: "The reporting features in TimeTrack give me insights I never had before. Now I can allocate my team's resources more effectively across campaigns."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg shadow-lg" 
                style={{ backgroundColor: 'white' }}
              >
                <p className="text-lg mb-6 italic" style={{ color: colors.darkGreen }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="font-bold" style={{ color: colors.primaryGreen }}>{testimonial.name}</h4>
                  <p style={{ color: colors.lightGreen }}>{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-8" style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src="/api/placeholder/600/600" alt="About TimeTrack" className="w-full" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.primaryGreen }}>
                Why Choose TimeTrack?
              </h2>
              <p className="text-lg mb-6" style={{ color: colors.darkGreen }}>
                TimeTrack was born from our own struggles with time management. We've built the tool we wished we had - intuitive, powerful, and designed to help you reclaim your time.
              </p>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Clock size={24} style={{ color: colors.lightGreen }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primaryGreen }}>
                      Designed for Productivity
                    </h3>
                    <p style={{ color: colors.darkGreen }}>
                      Every feature is crafted to help you focus and accomplish more in less time.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <BarChart2 size={24} style={{ color: colors.lightGreen }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primaryGreen }}>
                      Data-Driven Insights
                    </h3>
                    <p style={{ color: colors.darkGreen }}>
                      Understand your productivity patterns and make informed decisions about your work habits.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Users size={24} style={{ color: colors.lightGreen }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primaryGreen }}>
                      Built for Teams
                    </h3>
                    <p style={{ color: colors.darkGreen }}>
                      Whether you're a freelancer or part of a large organization, TimeTrack scales to fit your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 md:px-8" style={{ backgroundColor: colors.lightBackground }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.primaryGreen }}>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border rounded-lg overflow-hidden" 
                style={{ borderColor: colors.lightGreen }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                  style={{ 
                    backgroundColor: openFaq === index ? 'white' : colors.lightBackground,
                    color: colors.primaryGreen
                  }}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  {openFaq === index ? 
                    <ChevronUp size={20} style={{ color: colors.lightGreen }} /> : 
                    <ChevronDown size={20} style={{ color: colors.lightGreen }} />
                  }
                </button>
                {openFaq === index && (
                  <div 
                    className="px-6 py-4"
                    style={{ backgroundColor: 'white', color: colors.darkGreen }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: colors.primaryGreen }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Take Control of Your Time?
          </h2>
          <p className="text-xl text-white mb-8">
            Join thousands of professionals who have transformed their productivity with TimeTrack.
          </p>
          <button 
            className="px-8 py-3 rounded-lg text-lg font-medium text-white"
            style={{ backgroundColor: colors.darkGreen }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            Start Your Free 14-Day Trial
          </button>
          <p className="mt-4 text-white text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8" style={{ backgroundColor: colors.darkGreen }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Clock className="text-white mr-2" size={24} />
                <span className="text-white font-bold text-xl">TimeTrack</span>
              </div>
              <p className="text-sm mb-4" style={{ color: colors.lightGreen }}>
                The simple way to track your time and boost your productivity.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-200">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm hover:text-white" style={{ color: colors.lightGreen }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Documentation', 'Guides', 'API Reference'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm hover:text-white" style={{ color: colors.lightGreen }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Contact', 'Privacy Policy'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm hover:text-white" style={{ color: colors.lightGreen }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-600 text-center">
            <p className="text-sm" style={{ color: colors.textcolor }}>
              © {new Date().getFullYear()} TimeTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}