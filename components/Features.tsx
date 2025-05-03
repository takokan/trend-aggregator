import React from 'react';
import { Search, LineChart, Filter, Zap, BrainCircuit } from 'lucide-react';

const featureItems = [
  {
    icon: <Search className="h-10 w-10 text-indigo-500" />,
    title: 'Cross-Platform Search',
    description: 'Find trending discussions across YouTube, Reddit, and Twitter on any topic or product with our powerful search engine.'
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-indigo-500" />,
    title: 'AI-Powered Insights',
    description: 'Our advanced AI algorithms summarize and extract key insights from mountains of social media data.'
  },
  {
    icon: <Filter className="h-10 w-10 text-indigo-500" />,
    title: 'Filterable Dashboard',
    description: 'Customize your view with powerful filtering options to focus on the data that matters most to you.'
  },
  {
    icon: <Zap className="h-10 w-10 text-indigo-500" />,
    title: 'Optimized Performance',
    description: 'Lightning-fast results thanks to our advanced caching system that delivers insights in milliseconds.'
  },
  {
    icon: <LineChart className="h-10 w-10 text-indigo-500" />,
    title: 'Trend Analytics',
    description: 'Track how conversations evolve over time with detailed analytics and visualization tools.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-900">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our platform the ultimate tool for understanding social media trends and consumer sentiment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-5 p-3 inline-block bg-indigo-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;