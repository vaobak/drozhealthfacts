import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DrugInteractionChecker } from '../components/DrugInteractionChecker';
import { ArrowLeft, Pill, AlertTriangle, Shield, Activity } from 'lucide-react';

export const DrugInteractionCheckerPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Drug Interaction Checker - Check Medication Safety | Dr. Oz Health Facts</title>
        <meta name="description" content="Free drug interaction checker to identify dangerous medication combinations. Check for drug interactions and get safety recommendations for your medications." />
        <meta name="keywords" content="drug interaction checker, medication interactions, drug safety, prescription interactions, medication checker, drug combinations, pharmacy checker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Drug Interaction Checker - Check Medication Safety" />
        <meta property="og:description" content="Free drug interaction checker to identify dangerous medication combinations and get safety recommendations." />
        <meta property="og:url" content="https://drozhealthfacts.com/drug-interaction-checker" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Drug Interaction Checker - Check Medication Safety" />
        <meta name="twitter:description" content="Check for dangerous drug interactions and get medication safety recommendations." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/drug-interaction-checker" />
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
                <Pill size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Drug Interaction Checker</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Check for dangerous interactions between your medications and get safety recommendations to protect your health.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Drug Checker - Main Column */}
            <div className="lg:col-span-2">
              <DrugInteractionChecker />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Safety Levels */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield size={24} className="text-blue-600" />
                  Interaction Levels
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Minor:</strong> Usually safe, monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Moderate:</strong> Caution required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Major:</strong> Avoid combination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Contraindicated:</strong> Never combine</span>
                  </div>
                </div>
              </div>

              {/* Common Interactions */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  Common Interactions
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Blood thinners + Aspirin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>ACE inhibitors + Potassium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Statins + Grapefruit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Antibiotics + Birth control</span>
                  </li>
                </ul>
              </div>

              {/* Safety Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-green-600" />
                  Safety Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Always inform doctors of all medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Include supplements and vitamins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Use one pharmacy for all prescriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Read medication labels carefully</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};