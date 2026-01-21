import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IdealWeightCalculator } from '../components/IdealWeightCalculator';
import { ArrowLeft, Scale, TrendingUp, Heart, Activity } from 'lucide-react';

export const IdealWeightCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Ideal Weight Calculator - Find Your Healthy Weight Range | Dr. Oz Health Facts</title>
        <meta name="description" content="Calculate your ideal body weight instantly with our free calculator. Find your healthy weight range based on height, age, gender, and body frame. Get personalized recommendations for optimal health." />
        <meta name="keywords" content="ideal weight calculator, healthy weight calculator, ideal body weight, target weight calculator, perfect weight calculator, weight range calculator, IBW calculator, healthy weight range" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Ideal Weight Calculator - Find Your Healthy Weight Range" />
        <meta property="og:description" content="Calculate your ideal body weight instantly. Free, accurate calculator based on multiple formulas including Devine, Robinson, and Miller methods." />
        <meta property="og:url" content="https://drozhealthfacts.com/ideal-weight-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Ideal Weight Calculator - Find Your Healthy Weight Range" />
        <meta name="twitter:description" content="Calculate your ideal body weight instantly with our free calculator." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/ideal-weight-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Ideal Weight Calculator",
            "description": "Free online ideal weight calculator to determine your healthy weight range based on height, age, gender, and body frame",
            "url": "https://drozhealthfacts.com/ideal-weight-calculator",
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
                "name": "What is ideal body weight?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ideal body weight (IBW) is the optimal weight range for your height, age, and gender that promotes good health and reduces disease risk. It's calculated using scientifically validated formulas like Devine, Robinson, and Miller methods."
                }
              },
              {
                "@type": "Question",
                "name": "How is ideal weight calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ideal weight is calculated using multiple formulas: Devine formula (most common), Robinson formula, Miller formula, and Hamwi formula. Each considers your height and gender, with adjustments for body frame size."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between ideal weight and BMI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMI measures your current weight relative to height, while ideal weight calculates the optimal weight range for your body. Ideal weight considers gender and frame size, making it more personalized than BMI alone."
                }
              }
            ]
          })}
        </script>
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
                <Scale size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Ideal Weight Calculator</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl">
              Calculate your ideal body weight based on your height, age, gender, and body frame. Get your healthy weight range and personalized recommendations.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <IdealWeightCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* What is Ideal Weight */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-green-600" />
                  What is Ideal Weight?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Ideal body weight is the optimal weight range for your height and body type that promotes good health and reduces risk of chronic diseases.
                </p>
              </div>

              {/* Calculation Methods */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Calculation Methods</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-green-600">Devine Formula</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Most widely used medical formula</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Robinson Formula</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Modified version of Devine</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Miller Formula</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Alternative calculation method</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Hamwi Formula</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Used in clinical settings</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-blue-600" />
                  Health Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Set realistic weight goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Focus on sustainable lifestyle changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Combine diet with regular exercise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Consult healthcare provider for guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Your Ideal Weight
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Why Ideal Weight Matters
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Maintaining your ideal weight helps reduce risk of heart disease, diabetes, high blood pressure, and other chronic conditions. It also improves energy levels, mobility, and overall quality of life.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Factors Affecting Ideal Weight
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your ideal weight depends on height, gender, age, body frame size, muscle mass, and bone density. Athletes and very active individuals may weigh more due to higher muscle mass.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How to Reach Your Ideal Weight
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Achieving and maintaining your ideal weight requires a balanced approach:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>Create a sustainable calorie deficit for weight loss (500-750 calories/day)</li>
              <li>Eat a balanced diet rich in whole foods, lean proteins, and vegetables</li>
              <li>Exercise regularly - combine cardio and strength training</li>
              <li>Get adequate sleep (7-9 hours per night)</li>
              <li>Manage stress through meditation, yoga, or other relaxation techniques</li>
              <li>Stay hydrated and limit processed foods and added sugars</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is ideal body weight?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ideal body weight (IBW) is the optimal weight range for your height, age, and gender that promotes good health and reduces disease risk. It's calculated using scientifically validated formulas.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How is ideal weight calculated?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ideal weight is calculated using formulas like Devine (50kg + 2.3kg per inch over 5 feet for women), Robinson, Miller, and Hamwi. Our calculator uses multiple methods and provides an average for accuracy.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's the difference between ideal weight and BMI?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BMI measures your current weight relative to height, while ideal weight calculates the optimal weight range. Ideal weight considers gender and frame size, making it more personalized than BMI.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Is ideal weight the same for everyone?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No, ideal weight varies based on height, gender, age, body frame, and muscle mass. Athletes may have higher ideal weights due to muscle mass, while older adults may have different ranges.
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
                to="/bmi-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate your Body Mass Index</p>
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
