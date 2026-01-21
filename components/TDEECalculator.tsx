import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Activity, Target } from 'lucide-react';

interface TDEEResult {
  bmr: number;
  tdee: number;
  activityLevel: string;
  weightLoss: {
    mild: number;
    moderate: number;
    aggressive: number;
  };
  weightGain: {
    mild: number;
    moderate: number;
  };
  macros: {
    protein: { min: number; max: number };
    fat: { min: number; max: number };
    carbs: { min: number; max: number };
  };
}

export const TDEECalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<TDEEResult | null>(null);

  const calculateTDEE = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityFactor = parseFloat(activityLevel);

    if (!ageNum || !weightNum || !heightNum || ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      return;
    }

    // Convert to metric if needed
    let weightKg = weightNum;
    let heightCm = heightNum;

    if (unit === 'imperial') {
      weightKg = weightNum * 0.453592; // lbs to kg
      heightCm = heightNum * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * activityFactor;

    const activityLevels: { [key: string]: string } = {
      '1.2': 'Sedentary',
      '1.375': 'Lightly Active',
      '1.55': 'Moderately Active',
      '1.725': 'Very Active',
      '1.9': 'Extremely Active'
    };

    const newResult: TDEEResult = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      activityLevel: activityLevels[activityLevel],
      weightLoss: {
        mild: Math.round(tdee - 300),
        moderate: Math.round(tdee - 500),
        aggressive: Math.round(tdee - 750)
      },
      weightGain: {
        mild: Math.round(tdee + 300),
        moderate: Math.round(tdee + 500)
      },
      macros: {
        protein: {
          min: Math.round((tdee * 0.15) / 4),
          max: Math.round((tdee * 0.25) / 4)
        },
        fat: {
          min: Math.round((tdee * 0.20) / 9),
          max: Math.round((tdee * 0.35) / 9)
        },
        carbs: {
          min: Math.round((tdee * 0.45) / 4),
          max: Math.round((tdee * 0.65) / 4)
        }
      }
    };

    setResult(newResult);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
          <Zap size={24} className="text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TDEE Calculator</h2>
          <p className="text-gray-600 dark:text-gray-400">Calculate your Total Daily Energy Expenditure</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={unit === 'metric'}
                onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Metric (kg, cm)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Imperial (lbs, inches)</span>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="1.2">Sedentary (little to no exercise)</option>
            <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (moderate exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
            <option value="1.9">Extremely Active (very hard exercise, physical job)</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateTDEE}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate TDEE
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-orange-600" />
                Your Results
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Basal Metabolic Rate (BMR)</div>
                  <div className="text-2xl font-bold text-orange-600">{result.bmr} cal/day</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Daily Energy Expenditure</div>
                  <div className="text-2xl font-bold text-orange-600">{result.tdee} cal/day</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Activity Level: <span className="font-semibold text-gray-900 dark:text-white">{result.activityLevel}</span>
              </div>
            </div>

            {/* Weight Goals */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target size={20} className="text-blue-600" />
                Calorie Goals
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-600 mb-3">Weight Loss</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mild (0.5 lb/week):</span>
                      <span className="font-semibold">{result.weightLoss.mild} cal/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moderate (1 lb/week):</span>
                      <span className="font-semibold">{result.weightLoss.moderate} cal/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aggressive (1.5 lb/week):</span>
                      <span className="font-semibold">{result.weightLoss.aggressive} cal/day</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-green-600 mb-3">Weight Gain</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="font-semibold">{result.tdee} cal/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lean Gain (0.5 lb/week):</span>
                      <span className="font-semibold">{result.weightGain.mild} cal/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bulk (1 lb/week):</span>
                      <span className="font-semibold">{result.weightGain.moderate} cal/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Macronutrient Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity size={20} className="text-green-600" />
                Recommended Macros (at TDEE)
              </h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                  <div className="text-lg font-bold text-blue-600">{result.macros.protein.min}-{result.macros.protein.max}g</div>
                  <div className="text-xs text-gray-500">15-25% of calories</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
                  <div className="text-lg font-bold text-yellow-600">{result.macros.fat.min}-{result.macros.fat.max}g</div>
                  <div className="text-xs text-gray-500">20-35% of calories</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                  <div className="text-lg font-bold text-green-600">{result.macros.carbs.min}-{result.macros.carbs.max}g</div>
                  <div className="text-xs text-gray-500">45-65% of calories</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};