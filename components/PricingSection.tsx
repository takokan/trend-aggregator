import React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals exploring social media trends',
    features: [
      'Basic search functionality',
      '10 searches per day',
      'Access to YouTube data only',
      'Basic trend summaries',
      'Standard support'
    ],
    buttonText: 'Start Free',
    buttonVariant: 'secondary'
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'Ideal for professionals and content creators',
    features: [
      'Unlimited searches',
      'Full access to all platforms',
      'Advanced AI insights',
      'Data export capabilities',
      'Priority support'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
    featured: true
  },
  {
    name: 'Business',
    price: '$99',
    period: 'per month',
    description: 'For teams and businesses requiring advanced analytics',
    features: [
      'All Pro features',
      'Team collaboration',
      'Advanced analytics',
      'API access',
      'Dedicated account manager'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary'
  }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-900">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your needs. No hidden fees or long-term commitments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                plan.featured ? 'border-2 border-indigo-500 relative' : 'border border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-indigo-600">{plan.price}</span>
                  <span className="ml-2 text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 mr-3 mt-0.5">
                        <Check size={14} />
                      </span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.buttonVariant === 'primary' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;