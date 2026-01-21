import React, { useState } from 'react';
import { Download, Mail, Gift, Star } from 'lucide-react';

export const LeadMagnet: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-green-100">
          Check your email for your free health guide and weekly health tips!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Free Health Guide</h3>
        <p className="text-blue-100 mb-4">
          Get our "10 Steps to Better Health" guide + weekly health tips
        </p>
        
        {/* Social Proof */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={16} className="text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-blue-100 ml-2">
            Trusted by 50,000+ readers
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200" size={20} />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Get Free Health Guide
        </button>
        
        <p className="text-xs text-blue-200 text-center">
          No spam. Unsubscribe anytime. Your privacy is protected.
        </p>
      </form>
    </div>
  );
};