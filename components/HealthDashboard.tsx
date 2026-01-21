import React, { useState } from 'react';
import { User, Heart, Activity, Target, TrendingUp, Calendar } from 'lucide-react';

interface HealthProfile {
  age: number;
  gender: string;
  conditions: string[];
  goals: string[];
  medications: string[];
}

export const HealthDashboard: React.FC = () => {
  const [profile, setProfile] = useState<HealthProfile>({
    age: 0,
    gender: '',
    conditions: [],
    goals: [],
    medications: []
  });

  const healthMetrics = [
    { label: 'BMI', value: '24.5', status: 'Normal', color: 'green' },
    { label: 'Blood Pressure', value: '120/80', status: 'Optimal', color: 'green' },
    { label: 'Heart Rate', value: '72 bpm', status: 'Normal', color: 'green' },
    { label: 'Sleep', value: '7.5 hrs', status: 'Good', color: 'blue' }
  ];

  const recommendations = [
    {
      title: 'Daily Water Intake',
      description: 'Drink 8-10 glasses of water today',
      priority: 'high',
      icon: <Activity size={20} />
    },
    {
      title: 'Exercise Reminder',
      description: '30 minutes of moderate exercise',
      priority: 'medium',
      icon: <Heart size={20} />
    },
    {
      title: 'Medication Reminder',
      description: 'Take your evening medication',
      priority: 'high',
      icon: <Calendar size={20} />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Your Health Dashboard</h1>
            <p className="text-blue-100">Track your health journey and get personalized recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={24} />
              Health Metrics
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${metric.color}-100 text-${metric.color}-800`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="text-green-600" size={24} />
              Health Goals
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white">Lose 10 pounds</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white">Exercise 5x per week</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Today's Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-green-500 bg-green-50 dark:bg-green-900/20'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`${
                      rec.priority === 'high' ? 'text-red-600' :
                      rec.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {rec.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};