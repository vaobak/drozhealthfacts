import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProteinIntakeCalculator } from '../components/ProteinIntakeCalculator';
import { ArrowLeft, Activity, TrendingUp, Heart, Dumbbell } from 'lucide-react';

export const ProteinIntakeCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Protein Calculator - Calculate Your Daily Protein Needs | Dr. Oz Health Facts</title>
        <meta name="description" content="Free protein intake calculator to determine your daily protein needs for muscle gain, weight loss, or maintenance. Calculate protein requirements based on weight, activity level, and fitness goals." />
        <meta name="keywords" content="protein calculator, protein intake calculator, daily protein needs, protein requirements, how much protein, protein per day, muscle building protein, protein for weight loss" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Protein Calculator - Calculate Your Daily Protein Needs" />
        <meta property="og:description" content="Calculate your daily protein needs instantly. Free protein calculator for muscle gain, weight loss, or maintenance based on your goals." />
        <meta property="og:url" content="https://drozhealthfacts.com/protein-intake-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Protein Calculator - Calculate Your Daily Protein Needs" />
        <meta name="twitter:description" content="Calculate your daily protein needs instantly based on your goals." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/protein-intake-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Protein Intake Calculator",
            "description": "Free online protein calculator to determine your daily protein needs for muscle gain, weight loss, or maintenance",
            "url": "https://drozhealthfacts.com/protein-intake-calculator",
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
                "name": "How much protein do I need per day?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Protein needs vary by goal: 0.8-1g per lb for maintenance, 1-1.2g per lb for muscle gain, and 1-1.5g per lb for fat loss. Athletes and very active individuals typically need more protein than sedentary people."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate my protein intake?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Calculate protein intake by multiplying your body weight by a factor based on your goal: 0.8-1g/lb for maintenance, 1-1.2g/lb for muscle gain, or 1-1.5g/lb for weight loss. Activity level also affects requirements."
                }
              },
              {
                "@type": "Question",
                "name": "What are the best sources of protein?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best protein sources include lean meats (chicken, turkey, fish), eggs, dairy (Greek yogurt, cottage cheese), legumes (beans, lentils), tofu, tempeh, and protein supplements like whey or plant-based powders."
                }
              },
              {
                "@type": "Question",
                "name": "Can I eat too much protein?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While protein is essential, excessive intake (more than 2g per lb body weight) may strain kidneys in susceptible individuals and displace other important nutrients. Most people can safely consume 0.8-1.5g per lb body weight."
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
                <Dumbbell size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Protein Intake Calculator</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl">
              Calculate your daily protein needs based on your weight, activity level, and fitness goals. Get personalized protein recommendations for optimal health and performance.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <ProteinIntakeCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Why Protein Matters */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-orange-600" />
                  Why Protein Matters
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Protein is essential for building and repairing muscle tissue, supporting immune function, and maintaining healthy skin, hair, and nails.
                </p>
              </div>

              {/* Protein Guidelines */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Protein Guidelines</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-orange-600">Maintenance</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">0.8-1g per lb body weight</p>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Muscle Gain</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">1-1.2g per lb body weight</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Fat Loss</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">1-1.5g per lb body weight</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Athletes</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">1.2-2g per lb body weight</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-blue-600" />
                  Protein Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Spread protein intake throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Aim for 20-40g protein per meal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Include protein in post-workout meals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Choose lean, high-quality sources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Protein Requirements
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Benefits of Adequate Protein
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <li>• Builds and repairs muscle tissue</li>
                  <li>• Supports immune system function</li>
                  <li>• Helps maintain healthy weight</li>
                  <li>• Increases satiety and reduces hunger</li>
                  <li>• Preserves lean mass during weight loss</li>
                  <li>• Supports bone health and strength</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Best Protein Sources
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>Animal Sources:</strong> Chicken, turkey, fish, lean beef, eggs, Greek yogurt, cottage cheese</p>
                  <p><strong>Plant Sources:</strong> Lentils, chickpeas, tofu, tempeh, quinoa, nuts, seeds</p>
                  <p><strong>Supplements:</strong> Whey protein, casein, plant-based protein powders</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Protein Needs by Goal
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Activity className="text-green-600" size={20} />
                  Muscle Gain & Strength
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 1-1.2g per lb body weight (2.2-2.6g per kg)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Higher protein intake supports muscle protein synthesis, especially when combined with resistance training. Distribute intake across 4-6 meals for optimal results.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="text-red-600" size={20} />
                  Weight Loss & Fat Loss
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 1-1.5g per lb body weight (2.2-3.3g per kg)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High protein intake during calorie deficit helps preserve lean muscle mass, increases satiety, and has a higher thermic effect, burning more calories during digestion.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Heart className="text-blue-600" size={20} />
                  Maintenance & General Health
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Recommended:</strong> 0.8-1g per lb body weight (1.8-2.2g per kg)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adequate protein supports overall health, immune function, and helps maintain muscle mass as you age. Minimum RDA is 0.36g per lb, but active individuals benefit from more.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How much protein do I need per day?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Protein needs vary by goal: 0.8-1g per lb for maintenance, 1-1.2g per lb for muscle gain, and 1-1.5g per lb for fat loss. Athletes and very active individuals typically need more.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  When should I eat protein?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Distribute protein evenly throughout the day, aiming for 20-40g per meal. Post-workout protein (within 2 hours) helps with muscle recovery. Protein before bed can support overnight muscle repair.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Can I eat too much protein?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  While protein is essential, excessive intake (&gt;2g per lb) may strain kidneys in susceptible individuals and displace other nutrients. Most people can safely consume 0.8-1.5g per lb body weight.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Do I need protein supplements?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Supplements aren't necessary if you meet protein needs through whole foods. However, protein powder can be convenient for busy lifestyles, post-workout nutrition, or when struggling to meet daily targets.
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
                to="/macro-calculator"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Macro Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate all macronutrients</p>
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
