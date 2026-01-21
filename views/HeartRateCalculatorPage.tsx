import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeartRateCalculator } from '../components/HeartRateCalculator';
import { ArrowLeft, Heart, TrendingUp, Activity, Zap } from 'lucide-react';

export const HeartRateCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Heart Rate Calculator - Target Heart Rate Zones for Exercise | Dr. Oz Health Facts</title>
        <meta name="description" content="Free heart rate calculator to find your target heart rate zones for optimal exercise and fat burning. Calculate maximum heart rate, training zones, and cardio intensity levels." />
        <meta name="keywords" content="heart rate calculator, target heart rate, maximum heart rate calculator, heart rate zones, cardio zones, fat burning heart rate, exercise heart rate, training zones calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Heart Rate Calculator - Target Heart Rate Zones for Exercise" />
        <meta property="og:description" content="Calculate your target heart rate zones for optimal exercise and fat burning. Free heart rate calculator for all fitness levels." />
        <meta property="og:url" content="https://drozhealthfacts.com/heart-rate-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Heart Rate Calculator - Target Heart Rate Zones" />
        <meta name="twitter:description" content="Calculate your target heart rate zones for optimal exercise." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/heart-rate-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Heart Rate Calculator",
            "description": "Free online heart rate calculator to determine target heart rate zones for exercise, fat burning, and cardio training",
            "url": "https://drozhealthfacts.com/heart-rate-calculator",
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
                "name": "What is target heart rate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Target heart rate is the ideal heart rate range during exercise to maximize cardiovascular benefits and fat burning. It's typically 50-85% of your maximum heart rate, calculated as 220 minus your age."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate my maximum heart rate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most common formula is 220 minus your age. For example, if you're 30 years old, your estimated maximum heart rate is 190 beats per minute (220 - 30 = 190)."
                }
              },
              {
                "@type": "Question",
                "name": "What heart rate zone is best for fat burning?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The fat-burning zone is typically 60-70% of your maximum heart rate. At this intensity, your body primarily uses fat for fuel. However, higher intensities can burn more total calories."
                }
              },
              {
                "@type": "Question",
                "name": "Is it safe to exercise at maximum heart rate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Exercising at maximum heart rate should only be done briefly and by well-trained athletes. Most people should exercise at 50-85% of maximum heart rate for safe, effective workouts."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-red-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Heart Rate Calculator</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Calculate your target heart rate zones for optimal exercise, fat burning, and cardiovascular training. Find your ideal workout intensity.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <HeartRateCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Heart Rate Zones */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-red-600" />
                  Heart Rate Zones
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Different heart rate zones target specific fitness goals, from fat burning to peak performance training.
                </p>
              </div>

              {/* Zone Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Zone Benefits</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-blue-600">Zone 1 (50-60%)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Recovery and warm-up</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Zone 2 (60-70%)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Fat burning and base fitness</p>
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600">Zone 3 (70-80%)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Aerobic fitness</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600">Zone 4 (80-90%)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Anaerobic threshold</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Zone 5 (90-100%)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Maximum effort</p>
                  </div>
                </div>
              </div>

              {/* Exercise Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-blue-600" />
                  Training Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use a heart rate monitor for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Warm up before reaching target zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mix different zones for balanced training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Listen to your body and adjust intensity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Heart Rate Training Zones
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Maximum Heart Rate Formula
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>Basic Formula:</strong> 220 - Age</p>
                  <p><strong>Tanaka Formula:</strong> 208 - (0.7 × Age)</p>
                  <p><strong>Gulati Formula (Women):</strong> 206 - (0.88 × Age)</p>
                  <p><strong>Most Accurate:</strong> Stress test with doctor</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Factors Affecting Heart Rate
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>Age:</strong> Max HR decreases with age</p>
                  <p><strong>Fitness Level:</strong> Fitter = lower resting HR</p>
                  <p><strong>Temperature:</strong> Heat increases HR</p>
                  <p><strong>Medications:</strong> Some affect HR response</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Heart Rate Zones Explained
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  Zone 1: Active Recovery (50-60% Max HR)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Recovery, warm-up, cool-down
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Very light intensity, can hold conversation easily</p>
                  <p>• Promotes blood flow and recovery</p>
                  <p>• Good for beginners or recovery days</p>
                  <p>• Examples: Easy walking, gentle yoga</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  Zone 2: Fat Burning (60-70% Max HR)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Fat burning, base aerobic fitness
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Body primarily burns fat for fuel</p>
                  <p>• Can maintain for long periods</p>
                  <p>• Builds aerobic base and endurance</p>
                  <p>• Examples: Brisk walking, easy cycling</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  Zone 3: Aerobic Base (70-80% Max HR)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Cardiovascular fitness, endurance
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Improves cardiovascular efficiency</p>
                  <p>• Mix of fat and carbohydrate burning</p>
                  <p>• Conversation becomes more difficult</p>
                  <p>• Examples: Moderate jogging, swimming</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  Zone 4: Lactate Threshold (80-90% Max HR)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Performance improvement, speed
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Improves lactate threshold and VO2 max</p>
                  <p>• Primarily burns carbohydrates</p>
                  <p>• Difficult to maintain conversation</p>
                  <p>• Examples: Tempo runs, interval training</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  Zone 5: Maximum Effort (90-100% Max HR)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> Peak power, anaerobic capacity
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Maximum sustainable effort</p>
                  <p>• Can only maintain for short periods</p>
                  <p>• Develops anaerobic power</p>
                  <p>• Examples: Sprints, HIIT intervals</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is target heart rate?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Target heart rate is the ideal heart rate range during exercise to maximize cardiovascular benefits and fat burning. It's typically 50-85% of your maximum heart rate.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How do I calculate my maximum heart rate?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The most common formula is 220 minus your age. For example, if you're 30 years old, your estimated maximum heart rate is 190 beats per minute (220 - 30 = 190).
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What heart rate zone is best for fat burning?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The fat-burning zone is typically 60-70% of your maximum heart rate. At this intensity, your body primarily uses fat for fuel, though higher intensities burn more total calories.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Is it safe to exercise at maximum heart rate?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Exercising at maximum heart rate should only be done briefly and by well-trained athletes. Most people should exercise at 50-85% of maximum heart rate for safe, effective workouts.
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
                to="/bmr-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMR Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate metabolic rate</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-green-600" />
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