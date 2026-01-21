import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SleepCalculator } from '../components/SleepCalculator';
import { ArrowLeft, Moon, TrendingUp, Heart, Clock } from 'lucide-react';

export const SleepCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Sleep Calculator - Calculate Best Bedtime & Wake Up Time | Dr. Oz Health Facts</title>
        <meta name="description" content="Free sleep calculator to find your optimal bedtime and wake-up time based on sleep cycles. Calculate when to sleep and wake up for better rest and energy using 90-minute sleep cycles." />
        <meta name="keywords" content="sleep calculator, bedtime calculator, wake up time calculator, sleep cycle calculator, when to go to bed, optimal sleep time, sleep schedule calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Sleep Calculator - Calculate Best Bedtime & Wake Up Time" />
        <meta property="og:description" content="Calculate your optimal bedtime and wake-up time based on 90-minute sleep cycles. Improve your sleep quality and energy levels." />
        <meta property="og:url" content="https://drozhealthfacts.com/sleep-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Sleep Calculator - Calculate Best Bedtime & Wake Up Time" />
        <meta name="twitter:description" content="Calculate your optimal bedtime and wake-up time based on sleep cycles." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/sleep-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Sleep Calculator",
            "description": "Free online sleep calculator to determine optimal bedtime and wake-up time based on 90-minute sleep cycles",
            "url": "https://drozhealthfacts.com/sleep-calculator",
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
                "name": "How does the sleep calculator work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The sleep calculator uses 90-minute sleep cycles to determine optimal bedtime and wake-up times. It accounts for the time needed to fall asleep (typically 15 minutes) and calculates when you'll complete full sleep cycles."
                }
              },
              {
                "@type": "Question",
                "name": "What is a sleep cycle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A sleep cycle is approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages. Waking up at the end of a complete cycle helps you feel more refreshed and less groggy."
                }
              },
              {
                "@type": "Question",
                "name": "How many hours of sleep do I need?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Adults typically need 7-9 hours of sleep per night. Teenagers need 8-10 hours, while older adults may need 7-8 hours. Individual needs vary based on age, lifestyle, and health factors."
                }
              },
              {
                "@type": "Question",
                "name": "Why do I wake up tired even after 8 hours of sleep?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Waking up tired despite adequate sleep hours often means you're waking up in the middle of a sleep cycle. Using a sleep calculator to time your sleep cycles can help you wake up feeling more refreshed."
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
                <Moon size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Sleep Calculator</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Calculate your optimal bedtime and wake-up time based on 90-minute sleep cycles. Wake up feeling refreshed and energized by timing your sleep correctly.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <SleepCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What are Sleep Cycles */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-purple-600" />
                  Sleep Cycles
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  A complete sleep cycle lasts about 90 minutes and includes light sleep, deep sleep, and REM sleep. Waking at the end of a cycle helps you feel refreshed.
                </p>
              </div>

              {/* Sleep Recommendations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sleep Needs by Age</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-purple-600">Adults (18-64)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">7-9 hours per night</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Teenagers (14-17)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">8-10 hours per night</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Older Adults (65+)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">7-8 hours per night</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600">Young Adults (18-25)</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">7-9 hours per night</p>
                  </div>
                </div>
              </div>

              {/* Sleep Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-blue-600" />
                  Better Sleep Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Keep a consistent sleep schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Avoid screens 1 hour before bed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Keep bedroom cool and dark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Avoid caffeine after 2 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Sleep Cycles and Timing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  The Science of Sleep Cycles
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Sleep occurs in cycles of approximately 90 minutes, each containing stages of light sleep, deep sleep, and REM sleep. Completing full cycles is crucial for feeling rested and alert upon waking.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Why Timing Matters
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Waking up in the middle of a sleep cycle, especially during deep sleep, can leave you feeling groggy and tired. Our calculator helps you time your sleep to wake up naturally at the end of a cycle.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sleep Stages Explained
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Clock className="text-blue-600" size={20} />
                  Stage 1: Light Sleep (5-10 minutes)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Duration:</strong> 5-10 minutes | <strong>Characteristics:</strong> Transition from wake to sleep
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The lightest stage of sleep where you can be easily awakened. Brain waves slow down, and muscle activity decreases. This is the transition period between wakefulness and sleep.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={20} />
                  Stage 2: Light Sleep (45-55 minutes)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Duration:</strong> 45-55 minutes | <strong>Characteristics:</strong> Deeper relaxation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Body temperature drops, heart rate slows, and brain waves continue to slow with brief bursts of activity. This stage makes up about 50% of total sleep time in adults.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Heart className="text-purple-600" size={20} />
                  Stage 3: Deep Sleep (15-25 minutes)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Duration:</strong> 15-25 minutes | <strong>Characteristics:</strong> Restorative sleep
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The deepest stage of sleep, crucial for physical recovery, immune function, and memory consolidation. Very difficult to wake someone during this stage.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Moon className="text-indigo-600" size={20} />
                  REM Sleep (10-15 minutes)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Duration:</strong> 10-15 minutes | <strong>Characteristics:</strong> Dream sleep
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rapid Eye Movement sleep is when most vivid dreams occur. Important for cognitive function, memory processing, and emotional regulation. Brain activity is similar to wakefulness.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How does the sleep calculator work?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The sleep calculator uses 90-minute sleep cycles to determine optimal bedtime and wake-up times. It accounts for the time needed to fall asleep (typically 15 minutes) and calculates when you'll complete full sleep cycles.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is a sleep cycle?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A sleep cycle is approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages. Waking up at the end of a complete cycle helps you feel more refreshed and less groggy.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How many hours of sleep do I need?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Adults typically need 7-9 hours of sleep per night. Teenagers need 8-10 hours, while older adults may need 7-8 hours. Individual needs vary based on age, lifestyle, and health factors.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Why do I wake up tired even after 8 hours of sleep?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Waking up tired despite adequate sleep hours often means you're waking up in the middle of a sleep cycle. Using a sleep calculator to time your sleep cycles can help you wake up feeling more refreshed.
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
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMR Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate metabolic rate</p>
                </div>
              </Link>

              <Link 
                to="/body-fat-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Body Fat Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate body fat percentage</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-purple-600" />
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