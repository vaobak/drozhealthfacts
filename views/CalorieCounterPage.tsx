import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalorieCounter } from '../components/CalorieCounter';
import { ArrowLeft, Apple, Target, TrendingUp, Activity } from 'lucide-react';

export const CalorieCounterPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Calorie Counter - Track Daily Food Intake & Nutrition | Dr. Oz Health Facts</title>
        <meta name="description" content="Free calorie counter with comprehensive food database. Track your daily food intake, calories, protein, carbs, and fat. Achieve your health and fitness goals." />
        <meta name="keywords" content="calorie counter, food tracker, nutrition tracker, calorie calculator, daily calories, food database, macro tracker, diet tracker, weight loss tracker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Calorie Counter - Track Daily Food Intake & Nutrition" />
        <meta property="og:description" content="Free calorie counter with comprehensive food database to track your daily nutrition and achieve your health goals." />
        <meta property="og:url" content="https://drozhealthfacts.com/calorie-counter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Calorie Counter - Track Daily Food Intake & Nutrition" />
        <meta name="twitter:description" content="Track your daily calories and nutrition with our comprehensive food database." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/calorie-counter" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-green-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Apple size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Advanced Calorie Counter</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl">
              Track your daily food intake with our comprehensive food database. Monitor calories, protein, carbs, and fat to achieve your health goals.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calorie Counter - Main Column */}
            <div className="lg:col-span-2">
              <CalorieCounter />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target size={24} className="text-green-600" />
                  Key Features
                </h2>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Comprehensive food database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Real-time nutrition tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Custom food entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Daily goal tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Macro breakdown (P/C/F)</span>
                  </li>
                </ul>
              </div>

              {/* Nutrition Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Nutrition Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Aim for balanced macronutrients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Include variety in your diet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Stay hydrated throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Focus on whole, unprocessed foods</span>
                  </li>
                </ul>
              </div>

              {/* Calorie Guidelines */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-yellow-600" />
                  Daily Calorie Guidelines
                </h3>
                <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <div className="flex justify-between">
                    <span>Sedentary Women:</span>
                    <span className="font-semibold">1,600-2,000 cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Women:</span>
                    <span className="font-semibold">2,000-2,400 cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sedentary Men:</span>
                    <span className="font-semibold">2,000-2,600 cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Men:</span>
                    <span className="font-semibold">2,400-3,000 cal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};