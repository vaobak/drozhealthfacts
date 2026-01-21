import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BMICalculator } from '../components/BMICalculator';
import { ArrowLeft, Scale, TrendingUp, Heart, Activity } from 'lucide-react';

export const BMICalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free BMI Calculator - Calculate Your Body Mass Index | Dr. Oz Health Facts</title>
        <meta name="description" content="Free BMI calculator to check if you're at a healthy weight. Calculate your Body Mass Index (BMI) instantly with our easy-to-use tool. Get personalized health recommendations based on your results." />
        <meta name="keywords" content="BMI calculator, body mass index, BMI chart, healthy weight calculator, weight calculator, obesity calculator, underweight calculator, BMI for adults" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free BMI Calculator - Calculate Your Body Mass Index" />
        <meta property="og:description" content="Calculate your BMI instantly and get personalized health recommendations. Free, accurate, and easy to use." />
        <meta property="og:url" content="http://drozhealthfacts.com/bmi-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free BMI Calculator - Calculate Your Body Mass Index" />
        <meta name="twitter:description" content="Calculate your BMI instantly and get personalized health recommendations." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="http://drozhealthfacts.com/bmi-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BMI Calculator",
            "description": "Free online BMI calculator to calculate Body Mass Index and determine if you're at a healthy weight",
            "url": "http://drozhealthfacts.com/bmi-calculator",
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

        {/* HowTo Schema - How to Calculate BMI */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Your BMI (Body Mass Index)",
            "description": "Step-by-step guide to calculate your Body Mass Index using our free BMI calculator",
            "totalTime": "PT2M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "tool": [
              {
                "@type": "HowToTool",
                "name": "BMI Calculator"
              },
              {
                "@type": "HowToTool",
                "name": "Weight Scale"
              },
              {
                "@type": "HowToTool",
                "name": "Height Measurement"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Measure Your Weight",
                "text": "Step on a scale and record your current weight. You can use either pounds (lbs) or kilograms (kg).",
                "url": "http://drozhealthfacts.com/bmi-calculator#step1"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Measure Your Height",
                "text": "Measure your height accurately. You can use either feet/inches or centimeters. Stand straight against a wall for best results.",
                "url": "http://drozhealthfacts.com/bmi-calculator#step2"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Enter Your Information",
                "text": "Input your weight and height into the BMI calculator. Select your preferred unit system (Imperial or Metric).",
                "url": "http://drozhealthfacts.com/bmi-calculator#step3"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Calculate Your BMI",
                "text": "Click the 'Calculate BMI' button. The calculator will instantly compute your Body Mass Index using the formula: BMI = weight (kg) / height (m)²",
                "url": "http://drozhealthfacts.com/bmi-calculator#step4"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Review Your Results",
                "text": "Check your BMI result and category (Underweight, Normal, Overweight, or Obese). Read the personalized health recommendations provided.",
                "url": "http://drozhealthfacts.com/bmi-calculator#step5"
              },
              {
                "@type": "HowToStep",
                "position": 6,
                "name": "Take Action",
                "text": "Based on your results, consult with a healthcare provider if needed. Follow the health tips provided to maintain or achieve a healthy weight.",
                "url": "http://drozhealthfacts.com/bmi-calculator#step6"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Scale size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">BMI Calculator</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Calculate your Body Mass Index (BMI) to determine if you're at a healthy weight for your height. Get instant results and personalized health recommendations.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <BMICalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What is BMI */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-blue-600" />
                  What is BMI?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. It's used as a screening tool to identify potential weight problems in adults.
                </p>
              </div>

              {/* BMI Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">BMI Categories</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Underweight</span>
                    <span className="font-semibold text-blue-600">&lt; 18.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Normal weight</span>
                    <span className="font-semibold text-green-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Overweight</span>
                    <span className="font-semibold text-yellow-600">25 - 29.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Obese</span>
                    <span className="font-semibold text-red-600">≥ 30</span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-green-600" />
                  Health Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Maintain a balanced diet with fruits and vegetables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Exercise regularly - at least 150 minutes per week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stay hydrated and get adequate sleep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Consult healthcare provider for personalized advice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Your BMI Results
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  How to Calculate BMI
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). For imperial units, the formula is: weight (lbs) / [height (in)]² × 703.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-4 font-mono text-sm">
                  BMI = weight (kg) / height (m)²
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  BMI Limitations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMI doesn't distinguish between muscle and fat mass. Athletes with high muscle mass may have a high BMI but low body fat. Always consult with a healthcare provider for a complete health assessment.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why BMI Matters for Your Health
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Maintaining a healthy BMI is important for overall health and can help reduce the risk of chronic diseases such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>Heart disease and stroke</li>
              <li>Type 2 diabetes</li>
              <li>High blood pressure</li>
              <li>Certain types of cancer</li>
              <li>Osteoarthritis</li>
              <li>Sleep apnea</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Is BMI accurate for everyone?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMI is a useful screening tool but has limitations. It may not be accurate for athletes, pregnant women, elderly individuals, or people with high muscle mass. Consult a healthcare provider for personalized assessment.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's a healthy BMI range?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A BMI between 18.5 and 24.9 is considered healthy for most adults. However, ideal BMI can vary based on age, sex, ethnicity, and individual health factors.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How often should I check my BMI?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  It's recommended to check your BMI every few months or whenever there's a significant change in your weight. Regular monitoring helps track your health progress.
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
                to="/blood-pressure-tracker"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Blood Pressure Tracker</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monitor and track your blood pressure readings</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale size={24} className="text-blue-600" />
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
