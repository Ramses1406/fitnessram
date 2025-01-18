import React, { useState, useEffect } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2 bg-black/95 backdrop-blur-md border-b border-white/10' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>
              KARHA
              <span className="text-red-600 ml-2">FITNESS</span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'About', 'Classes', 'Schedule', 'Trainers', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`
                  text-sm font-medium transition-all duration-200
                  ${isScrolled ? 'text-gray-200' : 'text-white'}
                  hover:text-red-500 relative
                  after:content-[''] after:absolute after:w-0 after:h-0.5 
                  after:bg-red-500 after:left-0 after:-bottom-1 
                  after:transition-all after:duration-300
                  hover:after:w-full
                `}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
            }
          `}
        >
          <div className="py-2 space-y-1 backdrop-blur-lg bg-black/50 rounded-lg border border-white/10">
            {['Home', 'About', 'Classes', 'Schedule', 'Trainers', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-2 text-base font-medium text-white hover:bg-red-600/20 hover:text-red-500 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
