import React, { useState } from 'react';
import { Heart, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export const BloodPressureTracker: React.FC = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [result, setResult] = useState<{
    category: string;
    color: string;
    icon: React.ReactNode;
    description: string;
  } | null>(null);

  const analyzeBP = () => {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);

    let category = '';
    let color = '';
    let icon: React.ReactNode = null;
    let description = '';

    if (sys < 120 && dia < 80) {
      category = 'Normal';
      color = 'text-green-600 dark:text-green-400';
      icon = <CheckCircle size={24} className={color} />;
      description = 'Your blood pressure is in the normal range. Maintain a healthy lifestyle!';
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      category = 'Elevated';
      color = 'text-yellow-600 dark:text-yellow-400';
      icon = <AlertTriangle size={24} className={color} />;
      description = 'Your blood pressure is elevated. Consider lifestyle changes to prevent hypertension.';
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      category = 'High Blood Pressure (Stage 1)';
      color = 'text-orange-600 dark:text-orange-400';
      icon = <AlertCircle size={24} className={color} />;
      description = 'You have Stage 1 hypertension. Consult your doctor about lifestyle changes and possible medication.';
    } else if (sys >= 140 || dia >= 90) {
      category = 'High Blood Pressure (Stage 2)';
      color = 'text-red-600 dark:text-red-400';
      icon = <AlertCircle size={24} className={color} />;
      description = 'You have Stage 2 hypertension. Please consult your doctor immediately.';
    } else if (sys > 180 || dia > 120) {
      category = 'Hypertensive Crisis';
      color = 'text-red-700 dark:text-red-500';
      icon = <AlertCircle size={24} className={color} />;
      description = 'EMERGENCY! Seek medical attention immediately. This is a hypertensive crisis.';
    }

    setResult({ category, color, icon, description });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (systolic && diastolic) {
      analyzeBP();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <Heart className="text-red-600 dark:text-red-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Blood Pressure Tracker</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Check your blood pressure status</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Systolic (Top Number) mmHg
          </label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., 120"
            min="70"
            max="250"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Diastolic (Bottom Number) mmHg
          </label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., 80"
            min="40"
            max="150"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Check Blood Pressure
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className={`mt-6 p-4 rounded-lg border-2 ${
          result.category === 'Normal' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
          result.category === 'Elevated' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
          result.category.includes('Stage 1') ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-start gap-3 mb-3">
            {result.icon}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {systolic}/{diastolic}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">mmHg</span>
              </div>
              <div className={`text-lg font-semibold mb-2 ${result.color}`}>
                {result.category}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {result.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reference Guide */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Blood Pressure Categories (AHA)</h4>
        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span><strong>Normal:</strong> Less than 120/80 mmHg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span><strong>Elevated:</strong> 120-129/less than 80 mmHg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span><strong>Stage 1:</strong> 130-139/80-89 mmHg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span><strong>Stage 2:</strong> 140+/90+ mmHg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-700 rounded-full"></div>
            <span><strong>Crisis:</strong> Higher than 180/120 mmHg</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: This tool is for informational purposes only. Always consult with a healthcare provider for medical advice.
      </p>
    </div>
  );
};
