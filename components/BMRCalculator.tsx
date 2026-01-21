import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Activity } from 'lucide-react';

interface BMRResult {
  bmr: number;
  tdeeValues: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
  formula: string;
}

export const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [formula, setFormula] = useState<'mifflin' | 'harris'>('mifflin');
  const [result, setResult] = useState<BMRResult | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary', description: 'Little/no exercise', multiplier: 1.2 },
    light: { label: 'Light Activity', description: '1-3 days/week', multiplier: 1.375 },
    moderate: { label: 'Moderate Activity', description: '3-5 days/week', multiplier: 1.55 },
    active: { label: 'Very Active', description: '6-7 days/week', multiplier: 1.725 },
    veryActive: { label: 'Extremely Active', description: '2x per day, intense', multiplier: 1.9 }
  };

  const calculateBMR = () => {
    let weightKg: number;
    let heightCm: number;

    if (unit === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592;
      heightCm = parseFloat(height) * 2.54;
    } else {
      weightKg = parseFloat(weight);
      heightCm = parseFloat(height);
    }

    const ageNum = parseFloat(age);
    let bmr: number;
    let formulaUsed: string;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }
      formulaUsed = 'Mifflin-St Jeor';
    } else {
      // Harris-Benedict Equation (Revised)
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
      }
      formulaUsed = 'Harris-Benedict';
    }

    // Calculate TDEE for different activity levels
    const tdeeValues = {
      sedentary: Math.round(bmr * activityLevels.sedentary.multiplier),
      light: Math.round(bmr * activityLevels.light.multiplier),
      moderate: Math.round(bmr * activityLevels.moderate.multiplier),
      active: Math.round(bmr * activityLevels.active.multiplier),
      veryActive: Math.round(bmr * activityLevels.veryActive.multiplier)
    };

    setResult({
      bmr: Math.round(bmr),
      tdeeValues,
      formula: formulaUsed
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height && age) {
      calculateBMR();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-orange-600 dark:text-orange-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">BMR Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your metabolic rate</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'metric'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  gender === 'male'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  gender === 'female'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Calculation Formula
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormula('mifflin')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                formula === 'mifflin'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Mifflin-St Jeor
            </button>
            <button
              type="button"
              onClick={() => setFormula('harris')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                formula === 'harris'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Harris-Benedict
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate BMR & TDEE
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* BMR Result */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-2 border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-orange-600" size={20} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Basal Metabolic Rate</span>
            </div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {result.bmr} cal/day
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Using {result.formula} equation
            </div>
          </div>

          {/* TDEE Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-orange-600" />
              Total Daily Energy Expenditure (TDEE)
            </h4>
            
            <div className="space-y-3">
              {Object.entries(activityLevels).map(([key, level]) => (
                <div key={key} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{level.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{level.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      {result.tdeeValues[key as keyof typeof result.tdeeValues]} cal
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      BMR × {level.multiplier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metabolism Breakdown */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Metabolism Breakdown
            </h4>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>BMR (Basal Metabolic Rate):</span>
                <span className="font-semibold">60-75% of total</span>
              </div>
              <div className="flex justify-between">
                <span>Physical Activity:</span>
                <span className="font-semibold">15-30% of total</span>
              </div>
              <div className="flex justify-between">
                <span>Thermic Effect of Food:</span>
                <span className="font-semibold">8-10% of total</span>
              </div>
              <div className="flex justify-between">
                <span>Non-Exercise Activity:</span>
                <span className="font-semibold">15-30% of total</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">🔥 Boost Your Metabolism</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Build muscle through strength training (muscle burns more calories)</li>
              <li>• Eat protein with every meal (higher thermic effect)</li>
              <li>• Stay hydrated and drink cold water</li>
              <li>• Get 7-9 hours of quality sleep</li>
              <li>• Include HIIT workouts in your routine</li>
              <li>• Don't skip meals or severely restrict calories</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: BMR calculations are estimates based on population averages. Individual metabolism can vary by ±20%. Consult a healthcare professional for personalized advice.
      </p>
    </div>
  );
};