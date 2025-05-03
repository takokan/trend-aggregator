import React from 'react';
import { Search, ScrollText, LineChart, Lightbulb } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <Search className="h-8 w-8 text-white" />,
    title: 'Search Any Topic',
    description: 'Enter a keyword, product, or phrase you want to analyze across social media platforms.'
  },
  {
    number: 2,
    icon: <ScrollText className="h-8 w-8 text-white" />,
    title: 'Collect Data',
    description: 'Our system scans YouTube, Reddit, and Twitter to gather the most relevant discussions.'
  },
  {
    number: 3,
    icon: <LineChart className="h-8 w-8 text-white" />,
    title: 'Analyze Trends',
    description: 'AI algorithms process the data to identify patterns, sentiment, and key insights.'
  },
  {
    number: 4,
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: 'Get Insights',
    description: 'Review easy-to-understand dashboards and reports to inform your decisions.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-indigo-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Getting valuable insights from social media has never been easier. Follow these simple steps to uncover what people are saying.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative"
            >
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 right-0 w-full h-0.5 bg-indigo-600 z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 border-t-2 border-r-2 border-indigo-600"></div>
                </div>
              )}
              
              <div className="flex flex-col items-center z-10 relative">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-6">
                  {step.icon}
                </div>
                <span className="absolute top-0 right-0 -mt-2 -mr-2 flex items-center justify-center bg-indigo-500 text-white w-8 h-8 rounded-full font-bold text-sm">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-indigo-200 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;