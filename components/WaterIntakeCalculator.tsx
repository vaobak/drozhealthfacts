import React, { useState } from 'react';
import { Droplet, TrendingUp, Sun } from 'lucide-react';

export const WaterIntakeCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    weight: '',
    unit: 'metric',
    activityLevel: 'moderate',
    climate: 'moderate'
  });
  const [result, setResult] = useState<{
    daily: number;
    perHour: number;
    glasses: number;
    unit: string;
  } | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little exercise)', multiplier: 30 },
    moderate: { label: 'Moderate (some exercise)', multiplier: 35 },
    active: { label: 'Active (regular exercise)', multiplier: 40 },
    veryActive: { label: 'Very Active (intense exercise)', multiplier: 45 }
  };

  const climates = {
    cold: { label: 'Cold climate', adjustment: 0 },
    moderate: { label: 'Moderate climate', adjustment: 250 },
    hot: { label: 'Hot/Humid climate', adjustment: 500 }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setResult(null);
  };

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    
    let weight = parseFloat(formData.weight);
    
    // Convert to kg if imperial
    if (formData.unit === 'imperial') {
      weight = weight * 0.453592;
    }
    
    // Base calculation: weight * activity multiplier
    const activityMultiplier = activityLevels[formData.activityLevel as keyof typeof activityLevels].multiplier;
    let dailyML = weight * activityMultiplier;
    
    // Add climate adjustment
    const climateAdjustment = climates[formData.climate as keyof typeof climates].adjustment;
    dailyML += climateAdjustment;
    
    // Calculate results
    const perHour = dailyML / 16; // Assuming 16 waking hours
    const glasses = dailyML / 250; // 250ml per glass
    
    setResult({
      daily: Math.round(dailyML),
      perHour: Math.round(perHour),
      glasses: Math.round(glasses * 10) / 10,
      unit: 'ml'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Droplet size={32} />
          <h2 className="text-2xl font-bold">Water Intake Calculator</h2>
        </div>
        <p className="text-cyan-100">Calculate your daily water requirements for optimal hydration</p>
      </div>

      {/* Form */}
      <form onSubmit={calculateWater} className="p-6 space-y-6">
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
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-300'
              }`}
            >
              Metric (kg)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, unit: 'imperial' })}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                formData.unit === 'imperial'
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-300'
              }`}
            >
              Imperial (lbs)
            </button>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Weight ({formData.unit === 'metric' ? 'kg' : 'lbs'}) *
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={formData.unit === 'metric' ? '70' : '154'}
          />
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(activityLevels).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Climate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Climate Conditions
          </label>
          <select
            name="climate"
            value={formData.climate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(climates).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[52px]"
        >
          <Droplet size={20} />
          Calculate Water Intake
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-cyan-600" />
            Your Daily Water Needs
          </h3>

          <div className="space-y-4">
            {/* Daily Total */}
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 border-2 border-cyan-500">
              <div className="text-center">
                <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-2">Daily Water Intake</p>
                <p className="text-5xl font-bold text-cyan-900 dark:text-cyan-200 mb-1">
                  {(result.daily / 1000).toFixed(1)}
                </p>
                <p className="text-xl text-cyan-700 dark:text-cyan-300">Liters per day</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                  ({result.daily} ml or {Math.round(result.daily / 29.5735)} fl oz)
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Droplet size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Per Hour</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.perHour} ml</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                    <Sun size={20} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Glasses (250ml)</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.glasses}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200 font-semibold mb-2">Hydration Tips:</p>
              <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Drink water throughout the day, not all at once</li>
                <li>• Increase intake during exercise or hot weather</li>
                <li>• Urine should be light yellow - darker means drink more</li>
                <li>• Eat water-rich foods like fruits and vegetables</li>
                <li>• Set reminders to drink water regularly</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                <strong>Note:</strong> These are general recommendations. Individual needs vary based on health conditions, medications, and other factors. Consult your healthcare provider for personalized advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
