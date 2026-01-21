import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BMRCalculator } from '../components/BMRCalculator';
import { ArrowLeft, Zap, TrendingUp, Heart, Activity } from 'lucide-react';

export const BMRCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free BMR Calculator - Calculate Basal Metabolic Rate & Daily Calories | Dr. Oz Health Facts</title>
        <meta name="description" content="Free BMR calculator to determine your Basal Metabolic Rate and daily calorie needs. Calculate how many calories you burn at rest using Mifflin-St Jeor and Harris-Benedict equations." />
        <meta name="keywords" content="BMR calculator, basal metabolic rate calculator, metabolism calculator, daily calorie needs, resting metabolic rate, TDEE calculator, calories burned at rest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free BMR Calculator - Calculate Basal Metabolic Rate & Daily Calories" />
        <meta property="og:description" content="Calculate your Basal Metabolic Rate (BMR) and daily calorie needs. Free BMR calculator using proven scientific formulas." />
        <meta property="og:url" content="https://drozhealthfacts.com/bmr-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free BMR Calculator - Calculate Basal Metabolic Rate & Daily Calories" />
        <meta name="twitter:description" content="Calculate your BMR and daily calorie needs with our free calculator." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/bmr-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BMR Calculator",
            "description": "Free online Basal Metabolic Rate calculator to determine daily calorie needs and metabolism using Mifflin-St Jeor and Harris-Benedict equations",
            "url": "https://drozhealthfacts.com/bmr-calculator",
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
                "name": "What is BMR (Basal Metabolic Rate)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR is the number of calories your body burns at rest to maintain basic physiological functions like breathing, circulation, and cell production. It represents 60-75% of total daily energy expenditure."
                }
              },
              {
                "@type": "Question",
                "name": "How is BMR calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR is calculated using formulas like Mifflin-St Jeor (most accurate) or Harris-Benedict equations, which consider your weight, height, age, and gender. The Mifflin-St Jeor equation is: Men: 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between BMR and TDEE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMR is calories burned at rest, while TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through physical activity, exercise, and digestion. TDEE = BMR × activity level multiplier."
                }
              },
              {
                "@type": "Question",
                "name": "How can I increase my BMR?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can increase BMR through strength training (builds muscle), eating protein (higher thermic effect), staying hydrated, getting adequate sleep, and maintaining a healthy weight. Muscle tissue burns more calories than fat tissue."
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
              <h1 className="text-4xl md:text-5xl font-bold">BMR Calculator</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl">
              Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Discover how many calories you burn at rest and with activity.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <BMRCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What is BMR */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-orange-600" />
                  What is BMR?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Basal Metabolic Rate is the calories your body burns at rest for basic functions like breathing, circulation, and cell production.
                </p>
              </div>

              {/* BMR vs TDEE */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">BMR vs TDEE</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-orange-600">BMR</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Calories burned at rest (60-75% of total)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">TDEE</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">BMR + activity calories (total daily needs)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">TEF</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Thermic Effect of Food (8-10%)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">NEAT</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Non-Exercise Activity (15-30%)</p>
                  </div>
                </div>
              </div>

              {/* Metabolism Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-green-600" />
                  Boost Your Metabolism
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Build muscle with strength training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Eat protein with every meal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stay hydrated throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Get 7-9 hours of quality sleep</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Your Metabolism
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Components of Metabolism
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <li>• <strong>BMR (60-75%):</strong> Basic body functions</li>
                  <li>• <strong>Physical Activity (15-30%):</strong> Exercise and movement</li>
                  <li>• <strong>TEF (8-10%):</strong> Digesting and processing food</li>
                  <li>• <strong>NEAT (15-30%):</strong> Non-exercise activities</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Factors Affecting BMR
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Age:</strong> Decreases 1-2% per decade after 30</li>
                  <li>• <strong>Gender:</strong> Men typically have higher BMR</li>
                  <li>• <strong>Body Size:</strong> Larger bodies burn more calories</li>
                  <li>• <strong>Muscle Mass:</strong> Muscle burns more than fat</li>
                  <li>• <strong>Genetics:</strong> Can vary by 20-30%</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              BMR Calculation Methods
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Activity className="text-orange-600" size={20} />
                  Mifflin-St Jeor Equation (Recommended)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Accuracy:</strong> Most accurate for general population
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5</p>
                  <p><strong>Women:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={20} />
                  Harris-Benedict Equation (Revised)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Accuracy:</strong> Good alternative method
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>Men:</strong> BMR = 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)</p>
                  <p><strong>Women:</strong> BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Heart className="text-green-600" size={20} />
                  Katch-McArdle Formula
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Best for:</strong> People who know their body fat percentage
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Formula:</strong> BMR = 370 + (21.6 × lean body mass in kg)</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Activity Level Multipliers
            </h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mb-8">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-blue-600 mb-2">Sedentary (BMR × 1.2)</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs">Little or no exercise, desk job</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600 mb-2">Light Activity (BMR × 1.375)</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs">Light exercise 1-3 days/week</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-600 mb-2">Moderate Activity (BMR × 1.55)</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs">Moderate exercise 3-5 days/week</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-600 mb-2">Very Active (BMR × 1.725)</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs">Hard exercise 6-7 days/week</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is BMR (Basal Metabolic Rate)?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMR is the number of calories your body burns at rest to maintain basic physiological functions like breathing, circulation, and cell production. It represents 60-75% of total daily energy expenditure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How is BMR calculated?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMR is calculated using formulas like Mifflin-St Jeor (most accurate) or Harris-Benedict equations, which consider your weight, height, age, and gender. The Mifflin-St Jeor equation is most commonly used.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's the difference between BMR and TDEE?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMR is calories burned at rest, while TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through physical activity, exercise, and digestion. TDEE = BMR × activity level multiplier.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How can I increase my BMR?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can increase BMR through strength training (builds muscle), eating protein (higher thermic effect), staying hydrated, getting adequate sleep, and maintaining a healthy weight. Muscle tissue burns more calories than fat tissue.
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
                to="/macro-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Macro Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate macronutrients</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-orange-600" />
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