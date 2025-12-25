import React, { useState } from 'react';
import { apiUseCases } from "../constants/index.jsx";
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { themeColors } from '../constants/classes.js';

function UseCases() {
  const [useCaseNo, setUseCaseNo] = useState(0);

  const handlePrev = () => {
    setUseCaseNo((prev) => (prev === 0 ? apiUseCases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setUseCaseNo((prev) => (prev === apiUseCases.length - 1 ? 0 : prev + 1));
  };

  const current = apiUseCases[useCaseNo];

  return (
    <section className="py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto relative">
        
        <h3 className="text-4xl font-bold text-center mb-12">Use Cases</h3>

        {/* Main Body Container */}
        <div className="relative flex items-center group">
          
          {/* Left Button - Positioned outside/at edge of the body */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 md:-left-12 z-20 p-2 text-gray-400 hover:text-white transition-colors active:scale-90"
            aria-label="Previous"
          >
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>

          {/* Content Body */}
          <div 
            key={useCaseNo} 
            className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center w-full bg-secondary/20 p-8 md:p-12 mx-5 rounded-3xl border border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {/* Left Side: Text Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{current.logo}</span>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {current.title}
                </h3>
              </div>
              <p className={`text-lg md:text-xl ${themeColors.text} leading-relaxed`}>
                {current.text}
              </p>
              
              {/* Optional Progress Indicator */}
              <div className="flex gap-2 pt-4">
                {apiUseCases.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${i === useCaseNo ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Image Content */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full" />
                <img 
                  src={current.imageUrl} 
                  alt={current.title} 
                  className="relative w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105 h-50"
                />
              </div>
            </div>
          </div>

          {/* Right Button - Positioned outside/at edge of the body */}
          <button 
            onClick={handleNext}
            className="absolute -right-4 md:-right-12 z-20 p-2 text-gray-400 hover:text-white transition-colors active:scale-90"
            aria-label="Next"
          >
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default UseCases;