import React from 'react';
import { Heart, Target, Users, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-darkBlue text-white py-20 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Dr. Oz Health Facts</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Your trusted source for evidence-based health information and wellness advice
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-darkBlue dark:text-white mb-6">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
              At Dr. Oz Health Facts, we are committed to providing you with reliable, science-backed health information that empowers you to make informed decisions about your well-being.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Our team of health experts curates and creates content covering nutrition, fitness, mental health, disease prevention, and more. We believe that everyone deserves access to trustworthy health information that can transform their lives.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://picsum.photos/id/1005/600/400"
              alt="Health and Wellness"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-darkBlue dark:text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-brand-blue dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Compassion</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We care deeply about your health journey and provide support every step of the way.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-brand-green dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Accuracy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our content is evidence-based and reviewed by health professionals.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-brand-blue dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build a supportive community focused on health and wellness.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-brand-green dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for excellence in every piece of content we create.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Cover */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-brand-darkBlue dark:text-white text-center mb-12">What We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Nutrition & Diet', desc: 'Evidence-based nutrition advice and healthy eating tips' },
            { title: 'Fitness & Exercise', desc: 'Workout routines and physical activity guidance' },
            { title: 'Mental Health', desc: 'Strategies for emotional well-being and stress management' },
            { title: 'Heart Health', desc: 'Cardiovascular health and disease prevention' },
            { title: 'Sleep & Recovery', desc: 'Tips for better sleep and optimal recovery' },
            { title: 'Disease Prevention', desc: 'Preventive care and immune system support' },
          ].map((topic, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{topic.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-darkBlue dark:text-white mb-6">Our Expert Team</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Our content is created and reviewed by a team of healthcare professionals, nutritionists, fitness experts, and medical writers dedicated to bringing you the most accurate and helpful health information.
          </p>
          <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg">
              "Health is a relationship between you and your body. We're here to help you strengthen that relationship through knowledge, support, and actionable advice."
            </p>
            <p className="text-brand-blue dark:text-blue-400 font-semibold mt-4">- Dr. Oz Health Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};
