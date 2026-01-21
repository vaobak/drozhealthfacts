import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BloodPressureTracker } from '../components/BloodPressureTracker';
import { ArrowLeft, Activity, Heart, TrendingUp, AlertCircle } from 'lucide-react';

export const BloodPressureTrackerPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Blood Pressure Tracker & Monitor | Track Your BP Readings | Dr. Oz Health Facts</title>
        <meta name="description" content="Free blood pressure tracker to monitor and record your BP readings. Track systolic and diastolic pressure, understand your results, and maintain heart health with our easy-to-use tool." />
        <meta name="keywords" content="blood pressure tracker, BP monitor, blood pressure log, hypertension tracker, blood pressure chart, BP readings, heart health monitor, systolic pressure, diastolic pressure" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Blood Pressure Tracker & Monitor" />
        <meta property="og:description" content="Track and monitor your blood pressure readings. Free, easy to use, and helps you maintain heart health." />
        <meta property="og:url" content="http://drozhealthfacts.com/blood-pressure-tracker" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Blood Pressure Tracker & Monitor" />
        <meta name="twitter:description" content="Track and monitor your blood pressure readings for better heart health." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="http://drozhealthfacts.com/blood-pressure-tracker" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Blood Pressure Tracker",
            "description": "Free online blood pressure tracker to monitor and record your BP readings for better heart health",
            "url": "http://drozhealthfacts.com/blood-pressure-tracker",
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
              "url": "http://drozhealthfacts.com"
            }
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
                <Activity size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Blood Pressure Tracker</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Monitor and track your blood pressure readings to maintain optimal heart health. Record your systolic and diastolic pressure and understand what your numbers mean.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tracker - Main Column */}
            <div className="lg:col-span-2">
              <BloodPressureTracker />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What is Blood Pressure */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={24} className="text-red-600" />
                  What is Blood Pressure?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Blood pressure is the force of blood pushing against artery walls. It's measured in two numbers: systolic (top) and diastolic (bottom) pressure.
                </p>
              </div>

              {/* BP Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">BP Categories</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-green-600 mb-1">Normal</div>
                    <div className="text-gray-600 dark:text-gray-400">&lt; 120/80 mmHg</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-600 mb-1">Elevated</div>
                    <div className="text-gray-600 dark:text-gray-400">120-129/&lt;80 mmHg</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-600 mb-1">High BP Stage 1</div>
                    <div className="text-gray-600 dark:text-gray-400">130-139/80-89 mmHg</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-600 mb-1">High BP Stage 2</div>
                    <div className="text-gray-600 dark:text-gray-400">≥ 140/90 mmHg</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 mb-1">Hypertensive Crisis</div>
                    <div className="text-gray-600 dark:text-gray-400">&gt; 180/120 mmHg</div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Tips for Accurate Readings
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Rest for 5 minutes before measuring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Sit with back supported and feet flat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Avoid caffeine 30 minutes before</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Take readings at the same time daily</span>
                  </li>
                </ul>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      When to Seek Help
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      If your reading is 180/120 or higher, wait 5 minutes and test again. If still high, seek emergency medical care immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Blood Pressure Readings
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Systolic Pressure (Top Number)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Systolic pressure measures the force when your heart beats and pumps blood. It's the higher number in a blood pressure reading and indicates the maximum pressure in your arteries.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Diastolic Pressure (Bottom Number)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Diastolic pressure measures the force when your heart rests between beats. It's the lower number and represents the minimum pressure in your arteries.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Blood Pressure Monitoring Matters
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Regular blood pressure monitoring is crucial for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>Early detection of hypertension (high blood pressure)</li>
              <li>Preventing heart disease and stroke</li>
              <li>Monitoring effectiveness of blood pressure medications</li>
              <li>Identifying patterns and triggers</li>
              <li>Making informed lifestyle changes</li>
              <li>Reducing risk of kidney disease</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How to Lower Blood Pressure Naturally
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Lifestyle Changes</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Reduce sodium intake (less than 2,300mg/day)</li>
                  <li>• Exercise regularly (150 minutes/week)</li>
                  <li>• Maintain healthy weight</li>
                  <li>• Limit alcohol consumption</li>
                  <li>• Quit smoking</li>
                  <li>• Manage stress effectively</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Dietary Recommendations</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Follow DASH diet (Dietary Approaches to Stop Hypertension)</li>
                  <li>• Eat more fruits and vegetables</li>
                  <li>• Choose whole grains</li>
                  <li>• Include lean proteins</li>
                  <li>• Limit processed foods</li>
                  <li>• Increase potassium-rich foods</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How often should I check my blood pressure?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have high blood pressure, check it daily at the same time. For normal BP, weekly or monthly checks are sufficient. Always follow your doctor's recommendations.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What causes high blood pressure?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Factors include genetics, age, obesity, high sodium diet, lack of exercise, stress, smoking, and certain medical conditions. Often, there's no single cause.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Can stress affect blood pressure?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, stress can cause temporary spikes in blood pressure. Chronic stress may contribute to long-term high blood pressure. Practice stress management techniques like meditation and deep breathing.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Health Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                to="/bmi-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate your Body Mass Index</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Explore more health calculators and trackers</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
