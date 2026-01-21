import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PregnancyDueDateCalculator } from '../components/PregnancyDueDateCalculator';
import { ArrowLeft, Baby, Calendar, Heart, TrendingUp } from 'lucide-react';

export const PregnancyDueDateCalculatorPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Pregnancy Due Date Calculator - Free Online Tool | HealthHub"
        description="Calculate your pregnancy due date and track important milestones. Free, accurate pregnancy calculator with week-by-week development guide."
        keywords="pregnancy due date calculator, pregnancy calculator, due date, pregnancy weeks, baby due date, pregnancy tracker"
        canonicalUrl="https://healthhub.com/pregnancy-due-date-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center gap-2 text-pink-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Health Tools</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Baby size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Pregnancy Due Date Calculator</h1>
                <p className="text-pink-100 text-lg">
                  Calculate your baby's due date and track pregnancy milestones
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <PregnancyDueDateCalculator />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Key Features */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="text-pink-600" size={20} />
                  Key Features
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Accurate due date calculation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Pregnancy week tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Important milestone dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Trimester breakdown</span>
                  </li>
                </ul>
              </div>

              {/* Important Info */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
                <h3 className="font-bold text-pink-900 dark:text-pink-200 mb-3 flex items-center gap-2">
                  <Calendar className="text-pink-600" size={20} />
                  Important to Know
                </h3>
                <ul className="space-y-2 text-sm text-pink-800 dark:text-pink-300">
                  <li>• Due dates are estimates - only 5% of babies are born on their exact due date</li>
                  <li>• Most babies are born within 2 weeks of their due date</li>
                  <li>• First pregnancies often go past the due date</li>
                  <li>• Regular prenatal care is essential</li>
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-3 flex items-center gap-2">
                  <Heart className="text-yellow-600" size={20} />
                  Medical Disclaimer
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  This calculator provides estimates for educational purposes only. Always consult with your healthcare provider for accurate pregnancy dating and prenatal care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};