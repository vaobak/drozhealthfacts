import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MacroCalculator } from '../components/MacroCalculator';
import { ArrowLeft, PieChart, TrendingUp, Heart, Activity } from 'lucide-react';

export const MacroCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Macro Calculator - Calculate Your Macronutrients (Protein, Carbs, Fat) | Dr. Oz Health Facts</title>
        <meta name="description" content="Free macronutrient calculator to determine your daily protein, carbs, and fat needs. Calculate macros for weight loss, muscle gain, or maintenance. Get personalized macro ratios instantly." />
        <meta name="keywords" content="macro calculator, macronutrient calculator, protein calculator, carbs calculator, fat calculator, IIFYM calculator, flexible dieting, macro split calculator, nutrition calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Macro Calculator - Calculate Your Macronutrients" />
        <meta property="og:description" content="Calculate your daily protein, carbs, and fat needs instantly. Free macro calculator for weight loss, muscle gain, or maintenance." />
        <meta property="og:url" content="https://drozhealthfacts.com/macro-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Macro Calculator - Calculate Your Macronutrients" />
        <meta name="twitter:description" content="Calculate your daily protein, carbs, and fat needs instantly." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/macro-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Macro Calculator",
            "description": "Free online macronutrient calculator to determine your daily protein, carbs, and fat needs for weight loss, muscle gain, or maintenance",
            "url": "https://drozhealthfacts.com/macro-calculator",
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
                "name": "What are macros?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Macros (macronutrients) are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats. Each provides calories and serves specific functions in your body."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate my macros?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Calculate macros by first determining your daily calorie needs (TDEE), then distributing those calories among protein (4 cal/g), carbs (4 cal/g), and fats (9 cal/g) based on your goals and activity level."
                }
              },
              {
                "@type": "Question",
                "name": "What's the best macro ratio for weight loss?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For weight loss, a common macro ratio is 40% protein, 30% carbs, 30% fat. This high-protein approach helps preserve muscle mass while in a calorie deficit. Individual needs may vary."
                }
              },
              {
                "@type": "Question",
                "name": "How much protein do I need per day?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Protein needs vary by goal: 0.8-1g per lb for maintenance, 1-1.2g per lb for muscle gain, and 1-1.5g per lb for fat loss. Athletes and active individuals need more protein."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-purple-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <PieChart size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Macro Calculator</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Calculate your daily macronutrient needs (protein, carbs, and fats) based on your goals. Perfect for weight loss, muscle gain, or maintenance.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <MacroCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What are Macros */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-purple-600" />
                  What are Macros?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Macronutrients (macros) are protein, carbohydrates, and fats - the three nutrients your body needs in large amounts for energy and function.
                </p>
              </div>

              {/* Macro Functions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Macro Functions</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-purple-600">Protein (4 cal/g)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Builds and repairs muscle tissue</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Carbs (4 cal/g)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Primary energy source for body</p>
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600">Fats (9 cal/g)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Hormone production and nutrient absorption</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-green-600" />
                  Macro Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Track macros consistently for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Prioritize protein for muscle preservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Adjust based on progress and energy levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Use a food tracking app for accuracy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Macronutrients
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Protein
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Essential for muscle growth, repair, and maintenance. Provides 4 calories per gram.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Sources:</strong> Chicken, fish, eggs, tofu, legumes, Greek yogurt
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Carbohydrates
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Primary energy source for your body and brain. Provides 4 calories per gram.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Sources:</strong> Rice, oats, bread, pasta, fruits, vegetables
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Fats
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Supports hormone production and nutrient absorption. Provides 9 calories per gram.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Sources:</strong> Avocado, nuts, olive oil, fatty fish, seeds
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Macro Ratios for Different Goals
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="text-red-600" size={20} />
                  Weight Loss (Fat Loss)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 40% Protein, 30% Carbs, 30% Fat
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High protein helps preserve muscle mass during calorie deficit. Moderate carbs and fats provide energy while maintaining hormonal balance.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Activity className="text-green-600" size={20} />
                  Muscle Gain (Bulking)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 30% Protein, 40% Carbs, 30% Fat
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Higher carbs fuel intense workouts and support muscle growth. Adequate protein for muscle synthesis and recovery.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Heart className="text-blue-600" size={20} />
                  Maintenance (Balanced)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 30% Protein, 40% Carbs, 30% Fat
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Balanced approach for maintaining current weight and supporting overall health and performance.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What are macros?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Macros (macronutrients) are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats. Each provides calories and serves specific functions in your body.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How do I calculate my macros?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  First, calculate your Total Daily Energy Expenditure (TDEE). Then distribute those calories among protein (4 cal/g), carbs (4 cal/g), and fats (9 cal/g) based on your goals and activity level.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's the best macro ratio for weight loss?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For weight loss, a common ratio is 40% protein, 30% carbs, 30% fat. High protein helps preserve muscle mass while in a calorie deficit. Adjust based on your preferences and results.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Do I need to track macros every day?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Consistent tracking yields best results, but you don't need to be perfect. Track most days and use it as a learning tool to understand portion sizes and food composition.
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
                to="/protein-intake-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Protein Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate protein needs</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate daily calories</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-blue-600" />
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
