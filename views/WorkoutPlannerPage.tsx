import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { WorkoutPlanner } from '../components/WorkoutPlanner';
import { ArrowLeft, Dumbbell, Target, TrendingUp, Activity } from 'lucide-react';

export const WorkoutPlannerPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Free Workout Planner - Create Custom Exercise Routines | Dr. Oz Health Facts</title>
        <meta name="description" content="Free workout planner to create custom exercise routines. Plan your workouts, track progress, and achieve your fitness goals with our comprehensive exercise database." />
        <meta name="keywords" content="workout planner, exercise planner, fitness planner, workout routine, exercise routine, fitness tracker, gym planner, workout creator, exercise database" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Workout Planner - Create Custom Exercise Routines" />
        <meta property="og:description" content="Create custom workout routines and track your fitness progress with our comprehensive exercise database." />
        <meta property="og:url" content="https://drozhealthfacts.com/workout-planner" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Workout Planner - Create Custom Exercise Routines" />
        <meta name="twitter:description" content="Plan your workouts and achieve your fitness goals with our workout planner." />
        
        <link rel="canonical" href="https://drozhealthfacts.com/workout-planner" />
      </Helmet>

      <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/health-tools" 
              className="inline-flex items-center text-white hover:text-purple-200 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Health Tools
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Dumbbell size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Workout Planner</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Create custom workout routines, track your progress, and achieve your fitness goals with our comprehensive exercise database and guided workouts.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Workout Planner - Main Column */}
            <div className="lg:col-span-2">
              <WorkoutPlanner />
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target size={24} className="text-purple-600" />
                  Planner Features
                </h2>
                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Exercise database with instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Custom workout creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Real-time workout tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Calorie burn estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span>Pre-built workout templates</span>
                  </li>
                </ul>
              </div>

              {/* Exercise Categories */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-blue-600" />
                  Exercise Categories
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Strength:</strong> Build muscle and power</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Cardio:</strong> Improve heart health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>HIIT:</strong> High-intensity intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Core:</strong> Strengthen your center</span>
                  </li>
                </ul>
              </div>

              {/* Fitness Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-600" />
                  Fitness Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Start with beginner-friendly exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Focus on proper form over speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Allow rest days for recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stay consistent with your routine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Listen to your body</span>
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