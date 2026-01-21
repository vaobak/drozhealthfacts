import React, { useState } from 'react';
import { Calculator, PieChart, TrendingUp } from 'lucide-react';

interface MacroResult {
  calories: number;
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fats: { grams: number; calories: number; percentage: number };
}

export const MacroCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<MacroResult | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
    light: { label: 'Light (1-3 days/week)', multiplier: 1.375 },
    moderate: { label: 'Moderate (3-5 days/week)', multiplier: 1.55 },
    active: { label: 'Active (6-7 days/week)', multiplier: 1.725 },
    veryActive: { label: 'Very Active (2x per day)', multiplier: 1.9 }
  };

  const goalSettings = {
    loss: { label: 'Weight Loss', calorieAdjust: -500, protein: 40, carbs: 30, fats: 30 },
    maintain: { label: 'Maintain Weight', calorieAdjust: 0, protein: 30, carbs: 40, fats: 30 },
    gain: { label: 'Muscle Gain', calorieAdjust: 300, protein: 30, carbs: 40, fats: 30 }
  };

  const calculateMacros = () => {
    let weightKg: number;
    let heightCm: number;

    if (unit === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592;
      heightCm = parseFloat(height) * 2.54;
    } else {
      weightKg = parseFloat(weight);
      heightCm = parseFloat(height);
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseFloat(age) - 161;
    }

    // Calculate TDEE
    const activityMultiplier = activityLevels[activity as keyof typeof activityLevels].multiplier;
    const tdee = bmr * activityMultiplier;

    // Adjust calories based on goal
    const goalSetting = goalSettings[goal as keyof typeof goalSettings];
    const targetCalories = Math.round(tdee + goalSetting.calorieAdjust);

    // Calculate macros
    const proteinCalories = (targetCalories * goalSetting.protein) / 100;
    const carbsCalories = (targetCalories * goalSetting.carbs) / 100;
    const fatsCalories = (targetCalories * goalSetting.fats) / 100;

    const proteinGrams = Math.round(proteinCalories / 4);
    const carbsGrams = Math.round(carbsCalories / 4);
    const fatsGrams = Math.round(fatsCalories / 9);

    setResult({
      calories: targetCalories,
      protein: {
        grams: proteinGrams,
        calories: Math.round(proteinCalories),
        percentage: goalSetting.protein
      },
      carbs: {
        grams: carbsGrams,
        calories: Math.round(carbsCalories),
        percentage: goalSetting.carbs
      },
      fats: {
        grams: fatsGrams,
        calories: Math.round(fatsCalories),
        percentage: goalSetting.fats
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height && age) {
      calculateMacros();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Macro Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your daily macronutrients</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'metric'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-purple-600 text-white'
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    ? 'bg-purple-600 text-white'
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
                    ? 'bg-purple-600 text-white'
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
            Activity Level
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(activityLevels).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Goal
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(goalSettings).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setGoal(key)}
                className={`py-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                  goal === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate Macros
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Daily Calories */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="text-purple-600" size={20} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Calorie Target</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {result.calories} cal
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-purple-600" />
              Your Daily Macros
            </h4>
            
            {/* Protein */}
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-600">Protein</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{result.protein.percentage}%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {result.protein.grams}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {result.protein.calories} calories
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${result.protein.percentage}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-600">Carbohydrates</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{result.carbs.percentage}%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {result.carbs.grams}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {result.carbs.calories} calories
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${result.carbs.percentage}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-yellow-600">Fats</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{result.fats.percentage}%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {result.fats.grams}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {result.fats.calories} calories
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-600 rounded-full"
                  style={{ width: `${result.fats.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">💡 Tips for Success</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Use a food tracking app to monitor your daily intake</li>
              <li>• Weigh your food for accuracy, especially in the beginning</li>
              <li>• Adjust macros based on your progress and energy levels</li>
              <li>• Stay consistent and give it at least 2-4 weeks before adjusting</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: These calculations are estimates based on standard formulas. Individual needs may vary. Consult a healthcare professional or registered dietitian for personalized nutrition advice.
      </p>
    </div>
  );
};
