import React, { useState } from 'react'
import { apiUseCases } from "../constants/index.jsx"

function UseCases() {
  const [useCaseNo, setUseCaseNo] = useState(0);

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-white text-4xl font-bold text-center mb-12">
          Use Cases
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {apiUseCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setUseCaseNo(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl shadow-md transition-all duration-300 
                ${useCaseNo === index 
                  ? "bg-blue-600 text-white shadow-lg scale-105" 
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:scale-105 hover:shadow-lg"}
              `}
            >
              <span className="text-2xl">{useCase.logo}</span>
              <span className="font-semibold">{useCase.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              {apiUseCases[useCaseNo].title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {apiUseCases[useCaseNo].text}
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img 
              src={apiUseCases[useCaseNo].imageUrl} 
              alt={apiUseCases[useCaseNo].title} 
              className="w-4/5 rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCases