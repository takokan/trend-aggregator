import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Insights?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who use TrendPulse to stay ahead of the conversation.
            No credit card required to get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Start Your Free Trial
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;