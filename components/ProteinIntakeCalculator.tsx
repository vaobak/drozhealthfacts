import React, { useState } from 'react';
import { Calculator, Dumbbell, TrendingUp } from 'lucide-react';

interface ProteinResult {
  grams: number;
  gramsPerKg: number;
  calories: number;
  mealsBreakdown: number[];
}

export const ProteinIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<ProteinResult | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little/no exercise)', multiplier: 0.8 },
    light: { label: 'Light (1-3 days/week)', multiplier: 0.9 },
    moderate: { label: 'Moderate (3-5 days/week)', multiplier: 1.0 },
    active: { label: 'Active (6-7 days/week)', multiplier: 1.1 },
    veryActive: { label: 'Very Active (athlete)', multiplier: 1.3 }
  };

  const goalSettings = {
    loss: { label: 'Weight Loss', proteinPerLb: 1.2, proteinPerKg: 2.6 },
    maintain: { label: 'Maintain Weight', proteinPerLb: 0.9, proteinPerKg: 2.0 },
    gain: { label: 'Muscle Gain', proteinPerLb: 1.0, proteinPerKg: 2.2 }
  };

  const calculateProtein = () => {
    let weightLbs: number;

    if (unit === 'metric') {
      weightLbs = parseFloat(weight) * 2.20462;
    } else {
      weightLbs = parseFloat(weight);
    }

    const goalSetting = goalSettings[goal as keyof typeof goalSettings];
    const activityMultiplier = activityLevels[activity as keyof typeof activityLevels].multiplier;

    // Calculate base protein needs
    let proteinGrams = weightLbs * goalSetting.proteinPerLb * activityMultiplier;
    proteinGrams = Math.round(proteinGrams);

    // Calculate protein per kg
    const weightKg = unit === 'metric' ? parseFloat(weight) : weightLbs * 0.453592;
    const proteinPerKg = parseFloat((proteinGrams / weightKg).toFixed(1));

    // Calculate calories from protein (4 cal per gram)
    const proteinCalories = proteinGrams * 4;

    // Breakdown into meals (assuming 4 meals per day)
    const perMeal = Math.round(proteinGrams / 4);
    const mealsBreakdown = [perMeal, perMeal, perMeal, proteinGrams - (perMeal * 3)];

    setResult({
      grams: proteinGrams,
      gramsPerKg: proteinPerKg,
      calories: proteinCalories,
      mealsBreakdown
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      calculateProtein();
    }
  };

  const getGoalColor = () => {
    if (goal === 'loss') return 'text-red-600';
    if (goal === 'gain') return 'text-green-600';
    return 'text-blue-600';
  };

  const getGoalBgColor = () => {
    if (goal === 'loss') return 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700';
    if (goal === 'gain') return 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700';
    return 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-orange-600 dark:text-orange-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Protein Intake Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your daily protein needs</p>
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
          Metric (kg)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Imperial (lbs)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
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
            Activity Level
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    ? 'bg-orange-600 text-white'
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
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate Protein Needs
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Result */}
          <div className={`p-6 bg-gradient-to-br ${getGoalBgColor()} rounded-lg border-2`}>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className={getGoalColor()} size={20} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Daily Protein Target</span>
            </div>
            <div className={`text-4xl font-bold mb-2 ${getGoalColor()}`}>
              {result.grams}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• {result.gramsPerKg}g per kg body weight</p>
              <p>• {result.calories} calories from protein</p>
            </div>
          </div>

          {/* Meal Breakdown */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-orange-600" />
              Suggested Meal Distribution
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Breakfast</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.mealsBreakdown[0]}g</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lunch</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.mealsBreakdown[1]}g</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Dinner</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.mealsBreakdown[2]}g</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Snacks</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{result.mealsBreakdown[3]}g</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              Distribute protein evenly throughout the day for optimal muscle protein synthesis
            </p>
          </div>

          {/* Protein Sources Examples */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">🥩 High-Protein Food Examples</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold text-blue-600 mb-1">Animal Sources:</p>
                <ul className="space-y-0.5">
                  <li>• Chicken breast (31g per 100g)</li>
                  <li>• Greek yogurt (10g per 100g)</li>
                  <li>• Eggs (13g per 2 eggs)</li>
                  <li>• Salmon (25g per 100g)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-600 mb-1">Plant Sources:</p>
                <ul className="space-y-0.5">
                  <li>• Lentils (9g per 100g cooked)</li>
                  <li>• Tofu (8g per 100g)</li>
                  <li>• Chickpeas (9g per 100g)</li>
                  <li>• Quinoa (4g per 100g cooked)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">💡 Protein Tips</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Aim for 20-40g protein per meal for optimal absorption</li>
              <li>• Include protein in your post-workout meal (within 2 hours)</li>
              <li>• Combine plant proteins for complete amino acid profile</li>
              <li>• Consider protein powder if struggling to meet daily targets</li>
              <li>• Spread intake throughout the day rather than one large meal</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: These calculations are estimates based on standard formulas. Individual needs may vary based on age, body composition, and specific health conditions. Consult a healthcare professional or registered dietitian for personalized advice.
      </p>
    </div>
  );
};
