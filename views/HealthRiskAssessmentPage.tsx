import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HealthRiskAssessment } from '../components/HealthRiskAssessment';
import { ArrowLeft, Shield, TrendingUp, Heart, Activity } from 'lucide-react';

export const HealthRiskAssessmentPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Health Risk Assessment - Evaluate Your Health Risks | Dr. Oz Health Facts</title>
        <meta name="description" content="Free comprehensive health risk assessment to evaluate your risks for cardiovascular disease, diabetes, cancer, and mental health conditions. Get personalized recommendations." />
        <meta name="keywords" content="health risk assessment, health screening, risk evaluation, cardiovascular risk, diabetes risk, cancer risk, health questionnaire, preventive health" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Health Risk Assessment - Evaluate Your Health Risks" />
        <meta property="og:description" content="Comprehensive health risk assessment across multiple categories with personalized recommendations." />
        <meta property="og:url" content="https://drozhealthfacts.com/health-risk-assessment" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Health Risk Assessment - Evaluate Your Health Risks" />
        <meta name="twitter:description" content="Evaluate your health risks and get personalized recommendations." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/health-risk-assessment" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
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
                <Shield size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Health Risk Assessment</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Comprehensive evaluation of your health risks across cardiovascular, diabetes, cancer, and mental health categories. Get personalized recommendations for prevention and wellness.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Health Risk Assessment - Main Column */}
            <div className="lg:col-span-2">
              <HealthRiskAssessment />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Assessment Categories */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-blue-600" />
                  Assessment Areas
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="text-red-500" size={16} />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Cardiovascular:</strong> Heart disease & stroke risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="text-blue-500" size={16} />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Diabetes:</strong> Type 2 diabetes risk factors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="text-purple-500" size={16} />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Cancer:</strong> Various cancer risk factors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Mental Health:</strong> Stress & wellness factors</span>
                  </div>
                </div>
              </div>

              {/* Risk Levels */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Risk Levels</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Low Risk:</strong> Continue healthy habits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Moderate Risk:</strong> Lifestyle changes recommended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300"><strong>High Risk:</strong> Medical consultation advised</span>
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-green-600" />
                  Prevention Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Regular physical activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Balanced, nutritious diet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Avoid smoking and limit alcohol</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Manage stress effectively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Regular health screenings</span>
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