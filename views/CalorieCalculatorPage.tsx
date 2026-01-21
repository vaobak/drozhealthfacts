import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalorieCalculator } from '../components/CalorieCalculator';
import { ArrowLeft, Calculator, TrendingUp, Activity, Apple } from 'lucide-react';

export const CalorieCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Calorie Calculator - Calculate Daily Calorie Needs | Dr. Oz Health Facts</title>
        <meta name="description" content="Free calorie calculator to determine your daily calorie needs for weight loss, maintenance, or gain. Calculate BMR and TDEE based on your activity level. Get personalized nutrition recommendations." />
        <meta name="keywords" content="calorie calculator, daily calorie needs, BMR calculator, TDEE calculator, weight loss calories, calorie counter, metabolism calculator, nutrition calculator, calories per day" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Calorie Calculator - Calculate Daily Calorie Needs" />
        <meta property="og:description" content="Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Free, accurate, and easy to use." />
        <meta property="og:url" content="http://drozhealthfacts.com/calorie-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Calorie Calculator - Calculate Daily Calorie Needs" />
        <meta name="twitter:description" content="Calculate your daily calorie needs instantly with our free calculator." />
        
        {/* Canonical */}
        <link rel="canonical" href="http://drozhealthfacts.com/calorie-calculator" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calorie Calculator",
            "description": "Free online calorie calculator to determine daily calorie needs for weight management",
            "url": "http://drozhealthfacts.com/calorie-calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "Dr. Oz Health Facts"
            }
          })}
        </script>
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/health-tools" className="inline-flex items-center text-white hover:text-orange-200 mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Calculator size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Calorie Calculator</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl">
              Calculate your daily calorie needs based on your age, weight, height, and activity level. Get personalized recommendations for weight loss, maintenance, or gain.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <CalorieCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-orange-600" />
                  What is BMR & TDEE?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  <strong>BMR (Basal Metabolic Rate)</strong> is the number of calories your body burns at rest.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  <strong>TDEE (Total Daily Energy Expenditure)</strong> is your BMR plus calories burned through activity.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Calorie Goals</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-green-600">Weight Loss</p>
                    <p className="text-gray-600 dark:text-gray-400">500 cal deficit = 0.5 kg/week</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600">Maintenance</p>
                    <p className="text-gray-600 dark:text-gray-400">Match your TDEE</p>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-600">Weight Gain</p>
                    <p className="text-gray-600 dark:text-gray-400">500 cal surplus = 0.5 kg/week</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Apple size={20} className="text-green-600" />
                  Nutrition Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Focus on nutrient-dense whole foods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Balance protein, carbs, and healthy fats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stay hydrated throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Track your intake for better results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Your Calorie Needs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  How Calories Work
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Calories are units of energy. Your body needs a certain number of calories to maintain basic functions (BMR) plus additional calories for physical activity. The total is your TDEE.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Mifflin-St Jeor Equation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  This calculator uses the Mifflin-St Jeor equation, considered the most accurate formula for calculating BMR:
                </p>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-3 font-mono text-xs">
                  Men: (10 × weight) + (6.25 × height) - (5 × age) + 5<br/>
                  Women: (10 × weight) + (6.25 × height) - (5 × age) - 161
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Activity Level Guide
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>Sedentary:</strong> Little or no exercise, desk job</li>
                <li><strong>Lightly Active:</strong> Light exercise 1-3 days/week</li>
                <li><strong>Moderately Active:</strong> Moderate exercise 3-5 days/week</li>
                <li><strong>Very Active:</strong> Hard exercise 6-7 days/week</li>
                <li><strong>Extra Active:</strong> Very hard exercise, physical job, training twice per day</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Macronutrient Distribution
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once you know your calorie needs, distribute them across macronutrients:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Protein</h4>
                <p className="text-sm text-red-800 dark:text-red-300">25-35% of calories<br/>4 calories per gram</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">Carbohydrates</h4>
                <p className="text-sm text-blue-800 dark:text-blue-300">45-65% of calories<br/>4 calories per gram</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">Fats</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">20-35% of calories<br/>9 calories per gram</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How accurate is this calorie calculator?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate formulas. However, individual metabolism can vary by 10-15%. Use results as a starting point and adjust based on your progress.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How many calories should I eat to lose weight?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For safe, sustainable weight loss, aim for a 500-750 calorie deficit per day, which typically results in 0.5-1 kg loss per week. Never go below 1200 calories (women) or 1500 calories (men) without medical supervision.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Should I eat back exercise calories?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If you selected an activity level that includes your exercise, don't eat back exercise calories. If you chose "sedentary" but exercise regularly, you can eat back 50-75% of estimated exercise calories.
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
              <Link to="/bmi-calculator" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check your body mass index</p>
                </div>
              </Link>

              <Link to="/water-intake-calculator" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calculator size={24} className="text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Water Intake Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate daily water needs</p>
                </div>
              </Link>

              <Link to="/health-tools" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
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
