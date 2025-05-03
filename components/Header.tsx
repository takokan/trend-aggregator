"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-indigo-900 shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-white">TrendPulse</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-indigo-300 transition-colors">Features</a>
          <a href="#how-it-works" className="text-white hover:text-indigo-300 transition-colors">How It Works</a>
          <a href="#pricing" className="text-white hover:text-indigo-300 transition-colors">Pricing</a>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full transition-colors">
            Try for Free
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900 absolute top-full left-0 w-full shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-white hover:text-indigo-300 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-white hover:text-indigo-300 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-white hover:text-indigo-300 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full transition-colors">
              Try for Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;