import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LabResultsInterpreter } from '../components/LabResultsInterpreter';
import { ArrowLeft, FileText, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export const LabResultsInterpreterPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Lab Results Interpreter - Understand Your Blood Test Results | Dr. Oz Health Facts</title>
        <meta name="description" content="Free lab results interpreter to understand your blood test results. Get explanations for cholesterol, glucose, A1C, TSH, and other common lab tests with personalized recommendations." />
        <meta name="keywords" content="lab results interpreter, blood test results, lab values, cholesterol results, glucose levels, A1C results, TSH levels, lab test explanation, blood work interpreter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Lab Results Interpreter - Understand Your Blood Test Results" />
        <meta property="og:description" content="Understand your lab test results with explanations and personalized recommendations for common blood tests." />
        <meta property="og:url" content="https://drozhealthfacts.com/lab-results-interpreter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Lab Results Interpreter - Understand Your Blood Test Results" />
        <meta name="twitter:description" content="Get clear explanations of your lab test results and personalized health recommendations." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/lab-results-interpreter" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-indigo-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FileText size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Lab Results Interpreter</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Understand your blood test results with clear explanations and personalized recommendations. Get insights into your cholesterol, glucose, A1C, TSH, and other important lab values.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lab Results Interpreter - Main Column */}
            <div className="lg:col-span-2">
              <LabResultsInterpreter />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Supported Tests */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText size={24} className="text-indigo-600" />
                  Supported Tests
                </h2>
                <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-300">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Lipid Panel (Cholesterol, LDL, HDL, Triglycerides)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Diabetes Panel (Glucose, A1C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Thyroid Panel (TSH)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>More tests coming soon</span>
                  </li>
                </ul>
              </div>

              {/* Understanding Results */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Understanding Results
                </h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span><strong>Normal:</strong> Within healthy range</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span><strong>High/Low:</strong> Outside normal range</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span><strong>Critical:</strong> Requires immediate attention</span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Normal ranges may vary by laboratory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Results should be reviewed by your doctor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Consider your complete medical history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Follow up on abnormal results</span>
                  </li>
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-green-600" />
                  Next Steps
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Schedule follow-up with your doctor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Implement recommended lifestyle changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Track your progress over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Ask questions about unclear results</span>
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