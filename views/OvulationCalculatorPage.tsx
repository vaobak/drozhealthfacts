import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { OvulationCalculator } from '../components/OvulationCalculator';
import { ArrowLeft, Heart, Calendar, TrendingUp, Activity } from 'lucide-react';

export const OvulationCalculatorPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Ovulation Calculator - Track Fertile Days & Ovulation Cycle | Dr. Oz Health Facts</title>
        <meta name="description" content="Free ovulation calculator to track your fertile days and ovulation cycle. Plan pregnancy with accurate fertility tracking and menstrual cycle predictions." />
        <meta name="keywords" content="ovulation calculator, fertility calculator, fertile days, ovulation cycle, pregnancy planning, menstrual cycle, fertility tracking, conception calculator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Ovulation Calculator - Track Fertile Days & Ovulation Cycle" />
        <meta property="og:description" content="Track your fertile days and ovulation cycle for family planning. Free, accurate fertility calculator." />
        <meta property="og:url" content="https://drozhealthfacts.com/ovulation-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Ovulation Calculator - Track Fertile Days & Ovulation Cycle" />
        <meta name="twitter:description" content="Plan pregnancy with our free ovulation calculator. Track fertile days accurately." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/ovulation-calculator" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-pink-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Ovulation Calculator</h1>
            </div>
            <p className="text-xl text-pink-100 max-w-3xl">
              Track your fertile days and ovulation cycle for family planning. Get accurate predictions for your most fertile days to increase your chances of conception.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ovulation Calculator - Main Column */}
            <div className="lg:col-span-2">
              <OvulationCalculator />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* How It Works */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Calendar size={24} className="text-pink-600" />
                  How Ovulation Works
                </h2>
                <ul className="space-y-2 text-sm text-pink-800 dark:text-pink-300">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span>Ovulation typically occurs 14 days before your next period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span>Fertile window is 5 days before and 1 day after ovulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span>Sperm can survive up to 5 days in the reproductive tract</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span>Egg survives 12-24 hours after ovulation</span>
                  </li>
                </ul>
              </div>

              {/* Fertility Signs */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Signs of Ovulation
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Changes in cervical mucus (clear, stretchy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Slight increase in basal body temperature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mild pelvic or abdominal pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Light spotting or discharge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Increased sex drive</span>
                  </li>
                </ul>
              </div>

              {/* Tips for Conception */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-green-600" />
                  Tips for Conception
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Have intercourse every 1-2 days during fertile window</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Track your cycle for 3+ months for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Maintain a healthy lifestyle and diet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Take folic acid supplements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Consult a doctor if trying for over 12 months</span>
                  </li>
                </ul>
              </div>

              {/* Important Note */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Important Note
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  This calculator provides estimates based on average cycle lengths. Individual cycles can vary. For irregular cycles or fertility concerns, consult with a healthcare provider or fertility specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};