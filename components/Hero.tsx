import React from 'react';
import { Search, Youtube, Twitter, MessageSquare } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <Youtube className="absolute top-1/4 left-1/5 h-24 w-24 text-red-500" />
        <Twitter className="absolute top-1/3 right-1/4 h-20 w-20 text-blue-400" />
        <MessageSquare className="absolute bottom-1/4 left-1/3 h-16 w-16 text-orange-500" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Discover What The World Is Talking About
            </h1>
            <p className="text-xl md:text-2xl text-indigo-200 mb-8">
              Aggregate, analyze, and act on social media trends across YouTube, Reddit, and Twitter with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
                Get Started Free
              </button>
              <button className="bg-transparent border-2 border-indigo-400 hover:bg-indigo-800 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-indigo-700/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/50 shadow-xl transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 mb-6">
                <Search className="text-indigo-300 mr-3" size={20} />
                <input 
                  type="text" 
                  placeholder="Search any topic or product..."
                  className="bg-transparent text-white placeholder-indigo-300 border-none outline-none w-full"
                  disabled
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-indigo-600/30 rounded-lg p-4 border border-indigo-500/30">
                  <div className="flex items-center mb-2">
                    <Youtube className="text-red-400 mr-2" size={20} />
                    <span className="text-indigo-200 font-medium">YouTube Trend</span>
                  </div>
                  <p className="text-white/80">Product review videos showing massive engagement across tech channels...</p>
                </div>
                
                <div className="bg-indigo-600/30 rounded-lg p-4 border border-indigo-500/30">
                  <div className="flex items-center mb-2">
                    <Twitter className="text-blue-400 mr-2" size={20} />
                    <span className="text-indigo-200 font-medium">Twitter Discussion</span>
                  </div>
                  <p className="text-white/80">Viral conversation about key features and pricing concerns...</p>
                </div>
                
                <div className="bg-indigo-600/30 rounded-lg p-4 border border-indigo-500/30">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="text-orange-400 mr-2" size={20} />
                    <span className="text-indigo-200 font-medium">Reddit Threads</span>
                  </div>
                  <p className="text-white/80">In-depth community discussions on r/technology and r/gadgets...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;