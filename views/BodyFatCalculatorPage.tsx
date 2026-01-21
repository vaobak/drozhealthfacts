import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BodyFatCalculator } from '../components/BodyFatCalculator';
import { ArrowLeft, Scale, TrendingUp, Activity, Target } from 'lucide-react';

export const BodyFatCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Body Fat Calculator - Calculate Body Fat Percentage | Dr. Oz Health Facts</title>
        <meta name="description" content="Free body fat calculator using multiple methods. Calculate your body fat percentage with skinfold, BMI, and Navy method. Get accurate body composition analysis." />
        <meta name="keywords" content="body fat calculator, body fat percentage, body composition, skinfold calculator, navy method, BMI body fat, fitness calculator, body analysis" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Body Fat Calculator - Calculate Body Fat Percentage" />
        <meta property="og:description" content="Calculate your body fat percentage using multiple proven methods. Free, accurate body composition analysis." />
        <meta property="og:url" content="https://drozhealthfacts.com/body-fat-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Body Fat Calculator - Calculate Body Fat Percentage" />
        <meta name="twitter:description" content="Calculate your body fat percentage with multiple methods. Free body composition analysis." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/body-fat-calculator" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-yellow-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Scale size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Body Fat Calculator</h1>
            </div>
            <p className="text-xl text-yellow-100 max-w-3xl">
              Calculate your body fat percentage using multiple proven methods. Get accurate insights into your body composition for better fitness and health goals.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Body Fat Calculator - Main Column */}
            <div className="lg:col-span-2">
              <BodyFatCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Calculation Methods */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target size={24} className="text-yellow-600" />
                  Calculation Methods
                </h2>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Skinfold Method:</strong> Uses calipers to measure skin thickness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Navy Method:</strong> Uses body measurements and height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>BMI Method:</strong> Estimates based on BMI and age</span>
                  </li>
                </ul>
              </div>

              {/* Body Fat Ranges */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Healthy Body Fat Ranges
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Men:</h4>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-300 ml-4">
                      <li>• Essential: 2-5%</li>
                      <li>• Athletes: 6-13%</li>
                      <li>• Fitness: 14-17%</li>
                      <li>• Average: 18-24%</li>
                      <li>• Obese: 25%+</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Women:</h4>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-300 ml-4">
                      <li>• Essential: 10-13%</li>
                      <li>• Athletes: 14-20%</li>
                      <li>• Fitness: 21-24%</li>
                      <li>• Average: 25-31%</li>
                      <li>• Obese: 32%+</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips for Accuracy */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-green-600" />
                  Tips for Accurate Results
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Measure at the same time of day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Use consistent measurement techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Avoid measuring after exercise or meals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Take multiple measurements for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Track changes over time, not single readings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};