import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DiabetesRiskCalculator } from '../components/DiabetesRiskCalculator';
import { ArrowLeft, AlertTriangle, Heart, Activity, TrendingUp } from 'lucide-react';

export const DiabetesRiskCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Diabetes Risk Calculator - Type 2 Diabetes Risk Assessment | Dr. Oz Health Facts</title>
        <meta name="description" content="Free diabetes risk calculator to assess your risk of developing Type 2 diabetes. Calculate your diabetes risk score based on age, weight, family history, and lifestyle factors." />
        <meta name="keywords" content="diabetes risk calculator, type 2 diabetes risk, diabetes assessment, diabetes prevention, diabetes risk factors, prediabetes test, diabetes screening tool" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Diabetes Risk Calculator - Type 2 Diabetes Assessment" />
        <meta property="og:description" content="Assess your risk of developing Type 2 diabetes with our free risk calculator. Get personalized prevention recommendations." />
        <meta property="og:url" content="https://drozhealthfacts.com/diabetes-risk-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Diabetes Risk Calculator - Type 2 Diabetes Assessment" />
        <meta name="twitter:description" content="Assess your diabetes risk and get prevention recommendations." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drozhealthfacts.com/diabetes-risk-calculator" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Diabetes Risk Calculator",
            "description": "Free online diabetes risk calculator to assess Type 2 diabetes risk based on lifestyle and health factors",
            "url": "https://drozhealthfacts.com/diabetes-risk-calculator",
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
                "name": "What is Type 2 diabetes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Type 2 diabetes is a chronic condition where your body becomes resistant to insulin or doesn't produce enough insulin to maintain normal blood sugar levels. It's the most common form of diabetes, affecting over 90% of people with diabetes."
                }
              },
              {
                "@type": "Question",
                "name": "What are the main risk factors for diabetes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Major risk factors include age (45+), being overweight, family history of diabetes, physical inactivity, high blood pressure, and certain ethnicities. Gestational diabetes history also increases risk in women."
                }
              },
              {
                "@type": "Question",
                "name": "Can Type 2 diabetes be prevented?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Type 2 diabetes can often be prevented or delayed through lifestyle changes including maintaining a healthy weight, regular physical activity, eating a balanced diet, and managing blood pressure."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is this diabetes risk calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This calculator provides an estimate based on established risk factors. While useful for awareness, it's not a substitute for professional medical evaluation. Consult a healthcare provider for proper diabetes screening."
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
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Diabetes Risk Calculator</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Assess your risk of developing Type 2 diabetes and get personalized prevention recommendations based on your health profile.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator - Main Column */}
            <div className="lg:col-span-2">
              <DiabetesRiskCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Risk Factors */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={24} className="text-red-600" />
                  Key Risk Factors
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Age, weight, family history, and lifestyle factors all contribute to diabetes risk.
                </p>
              </div>

              {/* Prevention Tips */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Prevention Tips</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-green-600">Healthy Diet</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Focus on whole grains, vegetables, lean proteins</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Regular Exercise</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">150 minutes moderate activity per week</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">Weight Management</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Maintain healthy BMI (18.5-24.9)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600">Regular Screening</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Blood glucose tests as recommended</p>
                  </div>
                </div>
              </div>

              {/* Warning Signs */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-yellow-600" />
                  Warning Signs
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Increased thirst and urination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Unexplained weight loss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Fatigue and weakness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Blurred vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Slow-healing wounds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content - SEO Rich */}
          <div className="mt-12 prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Type 2 Diabetes Risk
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  What is Type 2 Diabetes?
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p>Type 2 diabetes occurs when your body becomes resistant to insulin or doesn't produce enough insulin to maintain normal blood glucose levels.</p>
                  <p>Unlike Type 1 diabetes, Type 2 develops gradually and is often preventable through lifestyle changes.</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Risk Assessment Factors
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                  <p><strong>Age:</strong> Risk increases after 45</p>
                  <p><strong>Weight:</strong> BMI over 25 increases risk</p>
                  <p><strong>Family History:</strong> Genetic predisposition</p>
                  <p><strong>Lifestyle:</strong> Diet and exercise habits</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Major Risk Factors Explained
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  Age and Gender
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> Risk increases significantly after age 45
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Men and women have similar overall risk</p>
                  <p>• Risk doubles every 10 years after age 40</p>
                  <p>• Hormonal changes can affect insulin sensitivity</p>
                  <p>• Regular screening recommended after age 35 if overweight</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  Weight and Body Composition
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> Excess weight, especially abdominal fat, increases insulin resistance
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• BMI over 25 significantly increases risk</p>
                  <p>• Waist circumference is a key indicator</p>
                  <p>• Visceral fat is more dangerous than subcutaneous fat</p>
                  <p>• Even modest weight loss (5-10%) can reduce risk</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  Family History and Genetics
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> Having relatives with diabetes increases your risk 2-6 times
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Parent with diabetes: 15-25% increased risk</p>
                  <p>• Both parents with diabetes: 50% increased risk</p>
                  <p>• Sibling with diabetes: 10-15% increased risk</p>
                  <p>• Genetic factors interact with lifestyle choices</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  Physical Activity Level
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> Regular exercise improves insulin sensitivity and glucose metabolism
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Sedentary lifestyle doubles diabetes risk</p>
                  <p>• 150 minutes/week moderate exercise reduces risk by 30%</p>
                  <p>• Resistance training also provides benefits</p>
                  <p>• Even light activity is better than none</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  Blood Pressure and Health Conditions
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Impact:</strong> High blood pressure often occurs with insulin resistance
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• High BP increases diabetes risk by 2.5 times</p>
                  <p>• PCOS in women significantly increases risk</p>
                  <p>• Sleep apnea is linked to insulin resistance</p>
                  <p>• Gestational diabetes history increases future risk</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Prevention Strategies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">Dietary Changes</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>• Choose whole grains over refined carbs</p>
                  <p>• Increase fiber intake (25-35g daily)</p>
                  <p>• Limit sugary drinks and processed foods</p>
                  <p>• Practice portion control</p>
                  <p>• Include healthy fats (nuts, olive oil)</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Physical Activity</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>• 150 minutes moderate aerobic activity weekly</p>
                  <p>• 2+ days of strength training per week</p>
                  <p>• Break up long periods of sitting</p>
                  <p>• Start slowly and gradually increase</p>
                  <p>• Find activities you enjoy</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-3">Weight Management</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>• Aim for 5-10% weight loss if overweight</p>
                  <p>• Focus on sustainable lifestyle changes</p>
                  <p>• Monitor waist circumference</p>
                  <p>• Seek professional guidance if needed</p>
                  <p>• Celebrate small victories</p>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-3">Regular Monitoring</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>• Annual blood glucose screening</p>
                  <p>• Monitor blood pressure regularly</p>
                  <p>• Track weight and waist measurements</p>
                  <p>• Discuss family history with doctor</p>
                  <p>• Stay up-to-date with health checkups</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What is Type 2 diabetes?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Type 2 diabetes is a chronic condition where your body becomes resistant to insulin or doesn't produce enough insulin to maintain normal blood sugar levels. It's the most common form of diabetes, affecting over 90% of people with diabetes.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What are the main risk factors for diabetes?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Major risk factors include age (45+), being overweight, family history of diabetes, physical inactivity, high blood pressure, and certain ethnicities. Gestational diabetes history also increases risk in women.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Can Type 2 diabetes be prevented?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, Type 2 diabetes can often be prevented or delayed through lifestyle changes including maintaining a healthy weight, regular physical activity, eating a balanced diet, and managing blood pressure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How accurate is this diabetes risk calculator?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This calculator provides an estimate based on established risk factors. While useful for awareness, it's not a substitute for professional medical evaluation. Consult a healthcare provider for proper diabetes screening.
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
                  <TrendingUp size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">BMI Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calculate body mass index</p>
                </div>
              </Link>

              <Link 
                to="/blood-pressure-tracker"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Blood Pressure Tracker</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monitor blood pressure</p>
                </div>
              </Link>

              <Link 
                to="/health-tools"
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-green-600" />
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