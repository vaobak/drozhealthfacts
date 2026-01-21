import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { WaterIntakeCalculator } from '../components/WaterIntakeCalculator';
import { ArrowLeft, Droplet, TrendingUp, Sun, Thermometer } from 'lucide-react';

export const WaterIntakePage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Water Intake Calculator - Calculate Daily Water Needs | Dr. Oz Health Facts</title>
        <meta name="description" content="Free water intake calculator to determine your daily hydration needs. Calculate how much water you should drink based on weight, activity level, and climate. Stay properly hydrated for optimal health." />
        <meta name="keywords" content="water intake calculator, daily water needs, hydration calculator, how much water to drink, water consumption, hydration tracker, water requirements, daily water intake" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Water Intake Calculator - Calculate Daily Water Needs" />
        <meta property="og:description" content="Calculate your daily water intake needs for optimal hydration. Free and personalized." />
        <meta property="og:url" content="http://drozhealthfacts.com/water-intake-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Water Intake Calculator" />
        <meta name="twitter:description" content="Calculate how much water you should drink daily." />
        
        {/* Canonical */}
        <link rel="canonical" href="http://drozhealthfacts.com/water-intake-calculator" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Water Intake Calculator",
            "description": "Free online water intake calculator to determine daily hydration needs",
            "url": "http://drozhealthfacts.com/water-intake-calculator",
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
        <div className="bg-gradient-to-r from-cyan-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/health-tools" className="inline-flex items-center text-white hover:text-cyan-200 mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Droplet size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Water Intake Calculator</h1>
            </div>
            <p className="text-xl text-cyan-100 max-w-3xl">
              Calculate your daily water requirements based on your weight, activity level, and climate conditions. Stay properly hydrated for optimal health and performance.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <WaterIntakeCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Droplet size={24} className="text-cyan-600" />
                  Why Hydration Matters
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Water is essential for every cell, tissue, and organ in your body. Proper hydration regulates temperature, lubricates joints, and transports nutrients.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Dehydration Signs</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Dark yellow urine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Dry mouth and lips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Headaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Fatigue and dizziness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Decreased urination</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sun size={20} className="text-blue-600" />
                  Hydration Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Drink water throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Carry a reusable water bottle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Set hourly reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Eat water-rich foods</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Your Daily Water Needs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  How Much Water Do You Need?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  The general recommendation is 30-35ml per kilogram of body weight. However, this varies based on activity level, climate, and individual factors.
                </p>
                <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded p-3 font-mono text-sm">
                  Daily Water = Weight (kg) × 30-40 ml
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  The 8×8 Rule
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You may have heard "drink 8 glasses of 8 ounces per day" (about 2 liters). While this is a good starting point, individual needs vary significantly based on body size, activity, and environment.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Factors Affecting Water Needs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Thermometer size={20} className="text-orange-600" />
                  Climate & Temperature
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hot or humid weather increases water loss through sweat. Add 250-500ml extra in hot climates or during summer months.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-600" />
                  Physical Activity
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Exercise increases water loss. Drink 400-800ml extra per hour of moderate to intense exercise. Weigh yourself before and after to gauge loss.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Health Conditions
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Fever, vomiting, or diarrhea increase fluid loss. Pregnancy and breastfeeding also increase water needs. Consult your doctor for specific conditions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Diet & Lifestyle
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  High-protein or high-fiber diets, caffeine, and alcohol increase water needs. Fruits and vegetables contribute to hydration.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits of Proper Hydration
            </h2>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800 mb-6">
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Regulates body temperature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Lubricates joints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Protects organs and tissues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Helps dissolve minerals and nutrients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Carries nutrients to cells</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Prevents constipation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Improves skin health</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 text-xl">✓</span>
                  <span>Boosts energy and brain function</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Water-Rich Foods
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              About 20% of daily water intake comes from food. Include these hydrating foods:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-200 mb-2">Fruits (90%+ water)</h4>
                <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                  <li>• Watermelon (92%)</li>
                  <li>• Strawberries (91%)</li>
                  <li>• Cantaloupe (90%)</li>
                  <li>• Oranges (88%)</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">Vegetables (90%+ water)</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Cucumber (96%)</li>
                  <li>• Lettuce (95%)</li>
                  <li>• Celery (95%)</li>
                  <li>• Tomatoes (94%)</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Other Sources</h4>
                <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                  <li>• Soups & broths</li>
                  <li>• Smoothies</li>
                  <li>• Herbal teas</li>
                  <li>• Yogurt</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Can you drink too much water?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, overhydration (hyponatremia) can occur but is rare. It happens when you drink excessive amounts in a short time, diluting blood sodium levels. Spread water intake throughout the day.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Does coffee or tea count toward water intake?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, all fluids count, including coffee and tea. While caffeine has a mild diuretic effect, it doesn't negate the hydration benefits. However, water is still the best choice.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How do I know if I'm drinking enough water?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Check your urine color - it should be pale yellow. Dark yellow indicates dehydration. You should urinate every 2-4 hours. Thirst is also a good indicator, but don't wait until you're very thirsty.
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
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Calorie Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate daily calorie needs</p>
                </div>
              </Link>

              <Link to="/bmi-calculator" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Droplet size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check body mass index</p>
                </div>
              </Link>

              <Link to="/health-tools" className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sun size={24} className="text-green-600" />
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
