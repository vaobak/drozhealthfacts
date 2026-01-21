import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SymptomChecker } from '../components/SymptomChecker';
import { ArrowLeft, Search, AlertTriangle, Activity, Shield } from 'lucide-react';

export const SymptomCheckerPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Symptom Checker - Analyze Your Symptoms Online | Dr. Oz Health Facts</title>
        <meta name="description" content="Free online symptom checker to analyze your health symptoms and get insights about possible conditions. Get personalized health recommendations based on your symptoms." />
        <meta name="keywords" content="symptom checker, health symptoms, medical symptoms, symptom analyzer, health assessment, online diagnosis, symptom evaluation, health checker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Symptom Checker - Analyze Your Symptoms Online" />
        <meta property="og:description" content="Free online symptom checker to analyze your health symptoms and get insights about possible conditions." />
        <meta property="og:url" content="https://drozhealthfacts.com/symptom-checker" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Symptom Checker - Analyze Your Symptoms Online" />
        <meta name="twitter:description" content="Free online symptom checker to analyze your health symptoms and get insights." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/symptom-checker" />
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
                <Search size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Symptom Checker</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Analyze your symptoms and get insights about possible health conditions. Get personalized recommendations based on your symptoms.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Symptom Checker - Main Column */}
            <div className="lg:col-span-2">
              <SymptomChecker />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* How It Works */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={24} className="text-red-600" />
                  How It Works
                </h2>
                <ol className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">1.</span>
                    <span>Select your symptoms from our comprehensive database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">2.</span>
                    <span>Our system analyzes symptom patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">3.</span>
                    <span>Get possible conditions and recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">4.</span>
                    <span>Consult healthcare provider for proper diagnosis</span>
                  </li>
                </ol>
              </div>

              {/* When to Seek Help */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  When to Seek Immediate Help
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Chest pain or difficulty breathing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Severe abdominal pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Signs of stroke (FAST test)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>High fever with severe symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Severe allergic reactions</span>
                  </li>
                </ul>
              </div>

              {/* Accuracy Note */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-blue-600" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>This tool provides educational information only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Not a substitute for professional medical advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Always consult healthcare providers for diagnosis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Results are based on common symptom patterns</span>
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