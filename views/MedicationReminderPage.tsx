import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MedicationReminder } from '../components/MedicationReminder';
import { ArrowLeft, Bell, Clock, Shield } from 'lucide-react';

export const MedicationReminderPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Medication Reminder - Never Miss Your Medications | Dr. Oz Health Facts</title>
        <meta name="description" content="Free medication reminder app to track and manage your medications. Set reminders, track doses, and never miss your medications again." />
        <meta name="keywords" content="medication reminder, pill reminder, medication tracker, drug reminder, prescription reminder, medication management, pill tracker, dose tracker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Medication Reminder - Never Miss Your Medications" />
        <meta property="og:description" content="Track and manage your medications with smart reminders. Never miss a dose again." />
        <meta property="og:url" content="https://drozhealthfacts.com/medication-reminder" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Medication Reminder - Never Miss Your Medications" />
        <meta name="twitter:description" content="Smart medication tracking and reminders to keep you healthy." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/medication-reminder" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
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
                <Bell size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Medication Reminder</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Never miss your medications again. Track your prescriptions, set smart reminders, and maintain your health routine with our comprehensive medication management system.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Medication Reminder - Main Column */}
            <div className="lg:col-span-2">
              <MedicationReminder />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Bell size={24} className="text-blue-600" />
                  Smart Features
                </h2>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Multiple daily reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Medication tracking & logging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Progress monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Local data storage</span>
                  </li>
                </ul>
              </div>

              {/* Medication Safety */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-yellow-600" />
                  Medication Safety
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Take medications as prescribed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Don't skip or double doses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Store medications properly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Check expiration dates</span>
                  </li>
                </ul>
              </div>

              {/* Timing Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Clock size={20} className="text-green-600" />
                  Timing Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Take at the same time daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Link to daily routines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Consider food requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Set multiple alarms if needed</span>
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