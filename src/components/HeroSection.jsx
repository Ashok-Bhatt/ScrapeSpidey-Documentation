import React from 'react'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h3 className="text-5xl font-extrabold leading-tight">
            All your coding profiles <br /> in one API
          </h3>
          <p className="text-lg text-gray-300">
            Scrape Spidey explores platforms like <span className="font-semibold text-white">LeetCode, CodeChef, GeeksforGeeks,</span> 
            and <span className="font-semibold text-white">Codeforces</span>, bringing all your coding data together.
          </p>
          <p className="text-lg text-gray-300">
            From solved problems and streaks to contest history, ratings, and achievements — 
            everything is captured in one unified view. Whether you’re building dashboards, 
            analyzing performance, or showcasing your journey, Scrape Spidey makes it simple 
            with a single, easy-to-use API.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-400 hover:border-white rounded-xl font-semibold transition">
              View Docs
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center w-full lg:w-1/2">
          <img 
            src="/Images/banner.png" 
            alt="Scrape Spidey banner" 
            className="w-4/5 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection