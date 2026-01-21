import React, { useState } from 'react';
import { Calculator, TrendingUp, Activity } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    unit: 'metric'
  });
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    mildWeightLoss: number;
    weightLoss: number;
    extremeWeightLoss: number;
    mildWeightGain: number;
    weightGain: number;
    extremeWeightGain: number;
  } | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little or no exercise)', multiplier: 1.2 },
    light: { label: 'Lightly active (1-3 days/week)', multiplier: 1.375 },
    moderate: { label: 'Moderately active (3-5 days/week)', multiplier: 1.55 },
    active: { label: 'Very active (6-7 days/week)', multiplier: 1.725 },
    extreme: { label: 'Extra active (very intense exercise)', multiplier: 1.9 }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setResult(null);
  };

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    
    let weight = parseFloat(formData.weight);
    let height = parseFloat(formData.height);
    const age = parseInt(formData.age);

    // Convert to metric if imperial
    if (formData.unit === 'imperial') {
      weight = weight * 0.453592; // lbs to kg
      height = height * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (formData.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = activityLevels[formData.activityLevel as keyof typeof activityLevels].multiplier;
    const maintenance = bmr * activityMultiplier;

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      mildWeightLoss: Math.round(maintenance - 250),
      weightLoss: Math.round(maintenance - 500),
      extremeWeightLoss: Math.round(maintenance - 1000),
      mildWeightGain: Math.round(maintenance + 250),
      weightGain: Math.round(maintenance + 500),
      extremeWeightGain: Math.round(maintenance + 1000)
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator size={32} />
          <h2 className="text-2xl font-bold">Calorie Calculator</h2>
        </div>
        <p className="text-orange-100">Calculate your daily calorie needs based on your activity level</p>
      </div>

      {/* Form */}
      <form onSubmit={calculateCalories} className="p-6 space-y-6">
        {/* Unit System */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unit System
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, unit: 'metric' })}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                formData.unit === 'metric'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300'
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, unit: 'imperial' })}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                formData.unit === 'imperial'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300'
              }`}
            >
              Imperial (lbs, in)
            </button>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: 'male' })}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                formData.gender === 'male'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: 'female' })}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                formData.gender === 'female'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="15"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="25"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({formData.unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="30"
              max="300"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={formData.unit === 'metric' ? '70' : '154'}
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({formData.unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="100"
              max="250"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={formData.unit === 'metric' ? '170' : '67'}
            />
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Activity Level
          </label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(activityLevels).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[52px]"
        >
          <Calculator size={20} />
          Calculate Calories
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-orange-600" />
            Your Daily Calorie Needs
          </h3>

          <div className="space-y-4">
            {/* BMR */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Basal Metabolic Rate (BMR)</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Calories burned at rest</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.bmr}</p>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Maintenance Calories</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">To maintain current weight</p>
                </div>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-200">{result.maintenance}</p>
              </div>
            </div>

            {/* Weight Loss */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">Weight Loss Goals</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mild loss (0.25 kg/week)</span>
                  <span className="font-semibold text-green-600">{result.mildWeightLoss} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Weight loss (0.5 kg/week)</span>
                  <span className="font-semibold text-green-600">{result.weightLoss} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Extreme loss (1 kg/week)</span>
                  <span className="font-semibold text-green-600">{result.extremeWeightLoss} cal</span>
                </div>
              </div>
            </div>

            {/* Weight Gain */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">Weight Gain Goals</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mild gain (0.25 kg/week)</span>
                  <span className="font-semibold text-orange-600">{result.mildWeightGain} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Weight gain (0.5 kg/week)</span>
                  <span className="font-semibold text-orange-600">{result.weightGain} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fast gain (1 kg/week)</span>
                  <span className="font-semibold text-orange-600">{result.extremeWeightGain} cal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              <strong>Note:</strong> These are estimates based on the Mifflin-St Jeor equation. Individual needs may vary. Consult a healthcare provider or registered dietitian for personalized advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
