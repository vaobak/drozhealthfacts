import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, Activity, Scale, TrendingUp, Search } from 'lucide-react';

export const HealthTools: React.FC = () => {
  return (
    <div className="pb-16 bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator size={40} />
            <h1 className="text-4xl md:text-5xl font-bold">Health Tools & Calculators</h1>
          </div>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Free health calculators and tracking tools to help you monitor and improve your wellness
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* BMI Calculator - MOST SEARCHED (150K+/month) */}
          <Link 
            to="/bmi-calculator"
            className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold">BMI Calculator</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Calculate your Body Mass Index to determine if you're at a healthy weight
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Calculate BMI</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Ovulation Calculator - 2ND MOST SEARCHED (80K+/month) */}
          <Link 
            to="/ovulation-calculator"
            className="group bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-bold">Ovulation Calculator</h3>
              </div>
              <p className="text-pink-100 mb-4">
                Track your fertile days and ovulation cycle for family planning
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Track Ovulation</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Body Fat Calculator - 3RD MOST SEARCHED (50K+/month) */}
          <Link 
            to="/body-fat-calculator"
            className="group bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold">Body Fat Calculator</h3>
              </div>
              <p className="text-yellow-100 mb-4">
                Calculate your body fat percentage using multiple measurement methods
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Calculate Body Fat</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Advanced Calorie Counter - HIGH SEARCH (45K+/month) */}
          <Link 
            to="/calorie-counter"
            className="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold">Advanced Calorie Counter</h3>
              </div>
              <p className="text-green-100 mb-4">
                Track your daily food intake with comprehensive food database
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Track Calories</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Symptom Checker - HIGH SEARCH (40K+/month) */}
          <Link 
            to="/symptom-checker"
            className="group bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold">Symptom Checker</h3>
              </div>
              <p className="text-red-100 mb-4">
                Analyze your symptoms and get insights about possible health conditions
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Check Symptoms</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Blood Pressure Tracker - HIGH SEARCH (35K+/month) */}
          <Link 
            to="/blood-pressure-tracker"
            className="group bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold">Blood Pressure Tracker</h3>
              </div>
              <p className="text-red-100 mb-4">
                Monitor and track your blood pressure readings for better heart health
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Track BP</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Ideal Weight Calculator - HIGH SEARCH (25K+/month) */}
          <Link 
            to="/ideal-weight-calculator"
            className="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold">Ideal Weight Calculator</h3>
              </div>
              <p className="text-green-100 mb-4">
                Find your healthy weight range based on height and body type
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Calculate Weight</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Calorie Calculator - HIGH SEARCH (30K+/month) */}
          <Link 
            to="/calorie-calculator"
            className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold">Calorie Calculator</h3>
              </div>
              <p className="text-orange-100 mb-4">
                Calculate your daily calorie needs for weight management goals
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Calculate Calories</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Protein Calculator - MEDIUM SEARCH (15K+/month) */}
          <Link 
            to="/protein-intake-calculator"
            className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold">Protein Calculator</h3>
              </div>
              <p className="text-purple-100 mb-4">
                Calculate your daily protein needs for muscle building and health
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Calculate Protein</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Drug Interaction Checker - MEDIUM SEARCH (20K+/month) */}
          <Link 
            to="/drug-interaction-checker"
            className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold">Drug Interaction Checker</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Check for dangerous interactions between your medications
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Check Interactions</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Health Risk Assessment - MEDIUM SEARCH (15K+/month) */}
          <Link 
            to="/health-risk-assessment"
            className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold">Health Risk Assessment</h3>
              </div>
              <p className="text-orange-100 mb-4">
                Comprehensive evaluation of your health risks across multiple categories
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Assess Risks</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Lab Results Interpreter - LOWER SEARCH (8K+/month) */}
          <Link 
            to="/lab-results-interpreter"
            className="group bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold">Lab Results Interpreter</h3>
              </div>
              <p className="text-teal-100 mb-4">
                Understand your blood test results with clear explanations
              </p>
              <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Interpret Results</span>
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            More Health Tools
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Workout Planner - MOVED FROM MAIN */}
            <Link 
              to="/workout-planner"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Activity className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Workout Planner</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Create custom exercise routines
              </p>
            </Link>

            {/* Medication Reminder - MOVED FROM MAIN */}
            <Link 
              to="/medication-reminder"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Medication Reminder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Never miss your medications
              </p>
            </Link>

            {/* Pregnancy Due Date Calculator - HIGH SEARCH */}
            <Link 
              to="/pregnancy-due-date-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="text-pink-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Pregnancy Due Date</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate your baby's due date
              </p>
            </Link>

            {/* Heart Rate Calculator - MEDIUM SEARCH */}
            <Link 
              to="/heart-rate-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="text-pink-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Heart Rate Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate target heart rate
              </p>
            </Link>

            {/* Water Intake Calculator - MEDIUM SEARCH */}
            <Link 
              to="/water-intake-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="text-cyan-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Water Intake</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate daily water requirements
              </p>
            </Link>

            {/* BMR Calculator - MEDIUM SEARCH */}
            <Link 
              to="/bmr-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">BMR Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate basal metabolic rate
              </p>
            </Link>

            {/* TDEE Calculator - MEDIUM SEARCH */}
            <Link 
              to="/tdee-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="text-teal-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">TDEE Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Total daily energy expenditure
              </p>
            </Link>

            {/* Macro Calculator - MEDIUM SEARCH */}
            <Link 
              to="/macro-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Macro Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate protein, carbs, and fats
              </p>
            </Link>

            {/* Heart Rate Zone Calculator - LOWER SEARCH */}
            <Link 
              to="/heart-rate-zone-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="text-pink-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Heart Rate Zone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Find your target heart rate zones
              </p>
            </Link>

            {/* Sleep Calculator - LOWER SEARCH */}
            <Link 
              to="/sleep-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Sleep Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Optimize your sleep schedule
              </p>
            </Link>

            {/* Diabetes Risk Calculator - LOWER SEARCH */}
            <Link 
              to="/diabetes-risk-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Activity className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Diabetes Risk</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Assess diabetes risk factors
              </p>
            </Link>

            {/* Caffeine Calculator - LOWER SEARCH */}
            <Link 
              to="/caffeine-calculator"
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-500 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="text-amber-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Caffeine Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Calculate safe caffeine intake
              </p>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2 flex items-center gap-2">
            <span>⚠️</span> Important Medical Disclaimer
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            These tools are for informational and educational purposes only. They are not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult with a qualified healthcare provider before making any decisions about your health, medications, or treatment plans. If you have a medical emergency, call your doctor or emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};