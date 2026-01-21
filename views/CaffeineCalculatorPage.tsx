import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CaffeineCalculator } from '../components/CaffeineCalculator';
import { ArrowLeft, Coffee, Clock, AlertTriangle, Activity } from 'lucide-react';

export const CaffeineCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Caffeine Calculator - Daily Caffeine Intake Tracker | Dr. Oz Health Facts</title>
        <meta name="description" content="Free caffeine calculator to track your daily caffeine intake from coffee, tea, energy drinks, and more. Calculate safe limits and caffeine effects on your body." />
        <meta name="keywords" content="caffeine calculator, daily caffeine intake, caffeine tracker, coffee calculator, caffeine limit, caffeine effects, energy drink calculator, tea caffeine content" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Caffeine Calculator - Daily Caffeine Intake Tracker | Dr. Oz Health Facts" />
        <meta property="og:description" content="Free caffeine calculator to track your daily caffeine intake from coffee, tea, energy drinks, and more. Calculate safe limits and caffeine effects on your body." />
        <meta property="og:url" content="https://drozhealthfacts.com/caffeine-calculator" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Free Caffeine Calculator - Daily Caffeine Intake Tracker" />
        <meta property="twitter:description" content="Free caffeine calculator to track your daily caffeine intake from coffee, tea, energy drinks, and more." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/caffeine-calculator" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center gap-2 text-amber-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Health Tools</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Coffee size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Caffeine Calculator</h1>
                <p className="text-amber-100 text-lg">
                  Track your daily caffeine intake and stay within safe limits
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <CaffeineCalculator />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Key Features */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Activity className="text-amber-600" size={20} />
                  Key Features
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Track multiple caffeine sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Calculate safe daily limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Monitor caffeine effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </div>

              {/* Caffeine Facts */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                  <Clock className="text-amber-600" size={20} />
                  Caffeine Facts
                </h3>
                <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                  <li>• Safe daily limit: 400mg for healthy adults</li>
                  <li>• Caffeine peaks in blood after 30-60 minutes</li>
                  <li>• Half-life is 3-5 hours in most people</li>
                  <li>• Avoid caffeine 6 hours before bedtime</li>
                </ul>
              </div>

              {/* Health Warning */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="text-red-600" size={20} />
                  Health Warning
                </h3>
                <p className="text-sm text-red-800 dark:text-red-300">
                  Excessive caffeine can cause anxiety, insomnia, rapid heartbeat, and other health issues. Pregnant women should limit intake to 200mg daily. Consult your doctor if you have heart conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};