import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TDEECalculator } from '../components/TDEECalculator';
import { ArrowLeft, Activity, TrendingUp, Zap, Target } from 'lucide-react';

export const TDEECalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free TDEE Calculator - Total Daily Energy Expenditure Calculator | Dr. Oz Health Facts</title>
        <meta name="description" content="Free TDEE calculator to determine your total daily energy expenditure. Calculate calories burned per day for weight loss, maintenance, and muscle gain goals." />
        <meta name="keywords" content="TDEE calculator, total daily energy expenditure, calories burned calculator, daily calorie needs, BMR calculator, metabolism calculator, weight loss calories, calorie deficit calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free TDEE Calculator - Total Daily Energy Expenditure" />
        <meta property="og:description" content="Calculate your total daily energy expenditure (TDEE) for accurate calorie needs and weight management goals." />
        <meta property="og:url" content="https://drozhealthfacts.com/tdee-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free TDEE Calculator - Total Daily Energy Expenditure" />
        <meta name="twitter:description" content="Calculate your TDEE for accurate calorie needs and weight goals." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/tdee-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TDEE Calculator",
            "description": "Free online TDEE calculator to determine total daily energy expenditure for weight loss, maintenance, and muscle gain",
            "url": "https://drozhealthfacts.com/tdee-calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "Dr. Oz Health Facts",
              "url": "https://drozhealthfacts.com"
            }
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is TDEE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including your basal metabolic rate (BMR) plus calories burned through physical activity and exercise."
                }
              },
              {
                "@type": "Question",
                "name": "How is TDEE calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TDEE is calculated by multiplying your BMR (Basal Metabolic Rate) by an activity factor that represents your daily activity level, ranging from sedentary (1.2) to very active (1.9)."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between BMR and TDEE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR is the calories your body burns at rest for basic functions. TDEE includes BMR plus all additional calories burned through daily activities, exercise, and movement."
                }
              },
              {
                "@type": "Question",
                "name": "How do I use TDEE for weight loss?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For weight loss, eat 300-500 calories below your TDEE for gradual loss (0.5-1 lb/week), or 500-750 calories below for faster loss (1-1.5 lb/week). Never go below 1200 calories for women or 1500 for men."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-orange-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Zap size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">TDEE Calculator</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl">
              Calculate your Total Daily Energy Expenditure to determine accurate calorie needs for weight loss, maintenance, or muscle gain.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <TDEECalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* TDEE Components */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={24} className="text-orange-600" />
                  TDEE Components
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Your total daily energy expenditure includes BMR plus activity calories.
                </p>
              </div>

              {/* Activity Levels */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Levels</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-blue-600">Sedentary (1.2)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Little to no exercise</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Light (1.375)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Light exercise 1-3 days/week</p>
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600">Moderate (1.55)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Moderate exercise 3-5 days/week</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600">Active (1.725)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Heavy exercise 6-7 days/week</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Very Active (1.9)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Very heavy exercise, physical job</p>
                  </div>
                </div>
              </div>

              {/* Weight Goals */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Weight Goals
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Weight Loss: TDEE - 300-750 calories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Maintenance: Eat at TDEE level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Muscle Gain: TDEE + 200-500 calories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Track progress and adjust as needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Total Daily Energy Expenditure (TDEE)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  TDEE Formula
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>TDEE = BMR × Activity Factor</strong></p>
                  <p><strong>BMR:</strong> Basal Metabolic Rate</p>
                  <p><strong>Activity Factor:</strong> 1.2 - 1.9</p>
                  <p><strong>Result:</strong> Total calories burned daily</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  BMR Calculation Methods
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>Mifflin-St Jeor:</strong> Most accurate</p>
                  <p><strong>Harris-Benedict:</strong> Traditional method</p>
                  <p><strong>Katch-McArdle:</strong> Uses body fat %</p>
                  <p><strong>Cunningham:</strong> For lean individuals</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              TDEE Components Breakdown
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  Basal Metabolic Rate (BMR) - 60-75%
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Energy for basic bodily functions at rest
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Breathing, circulation, cell production</p>
                  <p>• Brain and nervous system function</p>
                  <p>• Protein synthesis and metabolism</p>
                  <p>• Temperature regulation</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  Thermic Effect of Food (TEF) - 8-10%
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Energy cost of digesting and processing food
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Protein: 20-30% of calories consumed</p>
                  <p>• Carbohydrates: 5-10% of calories</p>
                  <p>• Fats: 0-5% of calories consumed</p>
                  <p>• Higher protein = higher TEF</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  Non-Exercise Activity (NEAT) - 15-30%
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Energy for daily activities excluding formal exercise
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Walking, typing, maintaining posture</p>
                  <p>• Fidgeting and spontaneous movement</p>
                  <p>• Occupational activities</p>
                  <p>• Varies greatly between individuals</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  Exercise Activity (EAT) - 15-30%
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Energy burned during planned physical exercise
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Structured workouts and sports</p>
                  <p>• Cardio, strength training, flexibility</p>
                  <p>• Most variable component of TDEE</p>
                  <p>• Can be accurately tracked and modified</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Using TDEE for Weight Management
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-3">Weight Loss</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Moderate:</strong> TDEE - 300-500 cal</p>
                  <p><strong>Aggressive:</strong> TDEE - 500-750 cal</p>
                  <p><strong>Rate:</strong> 0.5-1.5 lbs/week</p>
                  <p><strong>Minimum:</strong> 1200 cal (women), 1500 cal (men)</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Maintenance</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Target:</strong> Eat at TDEE level</p>
                  <p><strong>Range:</strong> ±100-200 calories</p>
                  <p><strong>Monitor:</strong> Weight stability</p>
                  <p><strong>Adjust:</strong> Based on results</p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">Muscle Gain</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Lean Bulk:</strong> TDEE + 200-300 cal</p>
                  <p><strong>Bulk:</strong> TDEE + 300-500 cal</p>
                  <p><strong>Rate:</strong> 0.5-1 lb/week</p>
                  <p><strong>Protein:</strong> 0.8-1.2g per lb bodyweight</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is TDEE?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including your basal metabolic rate (BMR) plus calories burned through physical activity and exercise.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How is TDEE calculated?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  TDEE is calculated by multiplying your BMR (Basal Metabolic Rate) by an activity factor that represents your daily activity level, ranging from sedentary (1.2) to very active (1.9).
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's the difference between BMR and TDEE?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMR is the calories your body burns at rest for basic functions. TDEE includes BMR plus all additional calories burned through daily activities, exercise, and movement.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How do I use TDEE for weight loss?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For weight loss, eat 300-500 calories below your TDEE for gradual loss (0.5-1 lb/week), or 500-750 calories below for faster loss (1-1.5 lb/week). Never go below 1200 calories for women or 1500 for men.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Health Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/bmr-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMR Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate basal metabolic rate</p>
                </div>
              </Link>

              <Link 
                to="/calorie-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Calorie Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate daily calorie needs</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">All Health Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore more calculators</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};