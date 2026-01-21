import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeartRateZoneCalculator } from '../components/HeartRateZoneCalculator';
import { ArrowLeft, Heart, Activity, TrendingUp, Zap } from 'lucide-react';

export const HeartRateZonePage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Heart Rate Zone Calculator - Find Your Target HR Zones | Dr. Oz Health Facts</title>
        <meta name="description" content="Free heart rate zone calculator to find your target heart rate zones for optimal training. Calculate max HR, fat burn zone, cardio zone, and anaerobic zone. Improve your workout efficiency." />
        <meta name="keywords" content="heart rate zone calculator, target heart rate, max heart rate, fat burn zone, cardio zone, training zones, HR zones, exercise heart rate, Karvonen formula, VO2 max" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Heart Rate Zone Calculator - Find Your Target HR Zones" />
        <meta property="og:description" content="Calculate your heart rate zones for optimal training and fat burning. Free and easy to use." />
        <meta property="og:url" content="http://drozhealthfacts.com/heart-rate-zone-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Heart Rate Zone Calculator" />
        <meta name="twitter:description" content="Find your target heart rate zones for better workouts." />
        
        {/* Canonical */}
        <link rel="canonical" href="http://drozhealthfacts.com/heart-rate-zone-calculator" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Heart Rate Zone Calculator",
            "description": "Free online heart rate zone calculator to determine optimal training zones",
            "url": "http://drozhealthfacts.com/heart-rate-zone-calculator",
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
        <div className="bg-gradient-to-r from-pink-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/health-tools" className="inline-flex items-center text-white hover:text-pink-200 mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Heart Rate Zone Calculator</h1>
            </div>
            <p className="text-xl text-pink-100 max-w-3xl">
              Calculate your target heart rate zones for optimal training. Find your fat burn zone, cardio zone, and maximum effort zone based on your age and resting heart rate.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <HeartRateZoneCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={24} className="text-pink-600" />
                  What are HR Zones?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Heart rate zones are ranges of heartbeats per minute that correspond to different exercise intensities and training benefits.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Zone Benefits</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-600">Zone 1-2</p>
                    <p className="text-gray-600 dark:text-gray-400">Fat burning & recovery</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">Zone 3</p>
                    <p className="text-gray-600 dark:text-gray-400">Aerobic endurance</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-600">Zone 4</p>
                    <p className="text-gray-600 dark:text-gray-400">Anaerobic capacity</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Zone 5</p>
                    <p className="text-gray-600 dark:text-gray-400">Maximum effort</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Zap size={20} className="text-blue-600" />
                  Training Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use a heart rate monitor for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Warm up before intense training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mix different zones for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Listen to your body</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Heart Rate Training Zones
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Maximum Heart Rate
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Your maximum heart rate (MHR) is the highest number of beats per minute your heart can reach during maximum physical exertion.
                </p>
                <div className="bg-pink-100 dark:bg-pink-900/30 rounded p-3 font-mono text-sm">
                  MHR = 220 - Your Age
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Karvonen Formula
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  This calculator uses the Karvonen formula, which factors in your resting heart rate for more accurate zones:
                </p>
                <div className="bg-pink-100 dark:bg-pink-900/30 rounded p-3 font-mono text-xs">
                  Target HR = ((MHR - RHR) × %Intensity) + RHR
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The 5 Heart Rate Training Zones
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-gray-400">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zone 1: Warm Up (50-60% MHR)</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Very light activity. Used for warming up, cooling down, and recovery. You can easily hold a conversation.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong> Recovery, warm-up, cool-down</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zone 2: Fat Burn (60-70% MHR)</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Light to moderate activity. Your body burns fat as primary fuel source. Comfortable pace for long duration.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong> Fat loss, building aerobic base, long runs</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zone 3: Cardio/Aerobic (70-80% MHR)</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Moderate to hard activity. Improves cardiovascular fitness and endurance. Breathing becomes heavier.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong> Cardiovascular fitness, endurance training</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zone 4: Anaerobic (80-90% MHR)</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Hard activity. Increases maximum performance capacity. Lactic acid builds up. Difficult to maintain conversation.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong> Speed work, interval training, race pace</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zone 5: Red Line/VO2 Max (90-100% MHR)</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Maximum effort. Can only be sustained for short bursts. Used for sprint intervals and peak performance.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong> Sprint intervals, maximum power output</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How to Measure Your Resting Heart Rate
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>1.</strong> Measure first thing in the morning before getting out of bed</li>
                <li><strong>2.</strong> Use your index and middle finger on your wrist or neck</li>
                <li><strong>3.</strong> Count beats for 60 seconds (or 30 seconds × 2)</li>
                <li><strong>4.</strong> Take measurements for 3 consecutive days and average them</li>
                <li><strong>5.</strong> Normal resting HR: 60-100 bpm (athletes: 40-60 bpm)</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Which zone is best for fat burning?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Zone 2 (60-70% MHR) is optimal for fat burning as your body uses fat as the primary fuel source. However, higher intensity zones burn more total calories, which also contributes to fat loss.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How long should I train in each zone?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Most training should be in zones 2-3 (60-80%). Zone 4 for intervals (20-30 min total). Zone 5 sparingly (short bursts). Always include zone 1 for warm-up and cool-down.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Do I need a heart rate monitor?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  While not required, a heart rate monitor (chest strap or wrist-based) provides accurate real-time data. You can also use the "talk test" - if you can talk comfortably, you're in zones 1-2.
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
              <Link to="/calorie-calculator" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Calorie Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate daily calorie needs</p>
                </div>
              </Link>

              <Link to="/bmi-calculator" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check body mass index</p>
                </div>
              </Link>

              <Link to="/health-tools" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">All Health Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore more tools</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
