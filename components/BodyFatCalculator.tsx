import React, { useState } from 'react';
import { Calculator, Scale, TrendingUp } from 'lucide-react';

interface BodyFatResult {
  percentage: number;
  category: string;
  method: string;
}

export const BodyFatCalculator: React.FC = () => {
  const [method, setMethod] = useState<'navy' | 'bmi' | 'skinfold'>('navy');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [result, setResult] = useState<BodyFatResult | null>(null);

  const calculateNavyMethod = (): number => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const hi = parseFloat(hip);

    if (gender === 'male') {
      return 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      return 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }
  };

  const calculateBMIMethod = (): number => {
    const h = parseFloat(height) / 100; // convert to meters
    const w = parseFloat(weight);
    const a = parseFloat(age);
    const bmi = w / (h * h);

    if (gender === 'male') {
      return (1.20 * bmi) + (0.23 * a) - 16.2;
    } else {
      return (1.20 * bmi) + (0.23 * a) - 5.4;
    }
  };

  const getBodyFatCategory = (percentage: number, gender: string): string => {
    if (gender === 'male') {
      if (percentage < 6) return 'Essential Fat';
      if (percentage < 14) return 'Athletes';
      if (percentage < 18) return 'Fitness';
      if (percentage < 25) return 'Average';
      return 'Obese';
    } else {
      if (percentage < 14) return 'Essential Fat';
      if (percentage < 21) return 'Athletes';
      if (percentage < 25) return 'Fitness';
      if (percentage < 32) return 'Average';
      return 'Obese';
    }
  };

  const handleCalculate = () => {
    let percentage: number;
    let methodName: string;

    switch (method) {
      case 'navy':
        percentage = calculateNavyMethod();
        methodName = 'Navy Method';
        break;
      case 'bmi':
        percentage = calculateBMIMethod();
        methodName = 'BMI Method';
        break;
      default:
        percentage = 15; // placeholder for skinfold
        methodName = 'Skinfold Method';
    }

    const category = getBodyFatCategory(percentage, gender);

    setResult({
      percentage: Math.round(percentage * 10) / 10,
      category,
      method: methodName
    });
  };

  const isFormValid = () => {
    if (method === 'navy') {
      return height && waist && neck && (gender === 'male' || hip);
    }
    if (method === 'bmi') {
      return height && weight && age;
    }
    return false;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
          <Scale className="text-yellow-600" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Body Fat Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Calculation Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod('navy')}
              className={`p-3 rounded-lg border-2 transition-all ${
                method === 'navy'
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-yellow-300'
              }`}
            >
              Navy Method
            </button>
            <button
              onClick={() => setMethod('bmi')}
              className={`p-3 rounded-lg border-2 transition-all ${
                method === 'bmi'
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-yellow-300'
              }`}
            >
              BMI Method
            </button>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGender('male')}
              className={`p-3 rounded-lg border-2 transition-all ${
                gender === 'male'
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-yellow-300'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`p-3 rounded-lg border-2 transition-all ${
                gender === 'female'
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-yellow-300'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="170"
            />
          </div>

          {method === 'bmi' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="30"
                />
              </div>
            </>
          )}

          {method === 'navy' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waist (cm)
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Neck (cm)
                </label>
                <input
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="35"
                />
              </div>
              {gender === 'female' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hip (cm)
                  </label>
                  <input
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="90"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!isFormValid()}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate Body Fat
        </button>

        {/* Results */}
        {result && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-yellow-600" size={20} />
              Your Body Fat Results
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {result.percentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Body Fat</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {result.category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Category</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {result.method}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Method Used</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};