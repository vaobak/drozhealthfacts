import React, { useState } from 'react';
import { Calculator, TrendingUp, Scale } from 'lucide-react';

interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  average: number;
  range: { min: number; max: number };
}

export const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [frame, setFrame] = useState<'small' | 'medium' | 'large'>('medium');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<IdealWeightResult | null>(null);

  const calculateIdealWeight = () => {
    let heightInInches: number;
    
    if (unit === 'metric') {
      heightInInches = parseFloat(height) / 2.54;
    } else {
      heightInInches = parseFloat(height);
    }

    // Devine Formula
    let devine: number;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInInches - 60);
    }

    // Robinson Formula
    let robinson: number;
    if (gender === 'male') {
      robinson = 52 + 1.9 * (heightInInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInInches - 60);
    }

    // Miller Formula
    let miller: number;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (heightInInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInInches - 60);
    }

    // Hamwi Formula
    let hamwi: number;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInInches - 60);
    }

    const average = (devine + robinson + miller + hamwi) / 4;

    // Adjust for frame size
    let frameAdjustment = 1;
    if (frame === 'small') frameAdjustment = 0.9;
    if (frame === 'large') frameAdjustment = 1.1;

    const adjustedAverage = average * frameAdjustment;
    const rangeMin = adjustedAverage * 0.9;
    const rangeMax = adjustedAverage * 1.1;

    // Convert to selected unit
    if (unit === 'imperial') {
      setResult({
        devine: parseFloat((devine * 2.20462).toFixed(1)),
        robinson: parseFloat((robinson * 2.20462).toFixed(1)),
        miller: parseFloat((miller * 2.20462).toFixed(1)),
        hamwi: parseFloat((hamwi * 2.20462).toFixed(1)),
        average: parseFloat((adjustedAverage * 2.20462).toFixed(1)),
        range: {
          min: parseFloat((rangeMin * 2.20462).toFixed(1)),
          max: parseFloat((rangeMax * 2.20462).toFixed(1))
        }
      });
    } else {
      setResult({
        devine: parseFloat(devine.toFixed(1)),
        robinson: parseFloat(robinson.toFixed(1)),
        miller: parseFloat(miller.toFixed(1)),
        hamwi: parseFloat(hamwi.toFixed(1)),
        average: parseFloat(adjustedAverage.toFixed(1)),
        range: {
          min: parseFloat(rangeMin.toFixed(1)),
          max: parseFloat(rangeMax.toFixed(1))
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (height) {
      calculateIdealWeight();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-green-600 dark:text-green-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ideal Weight Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Find your healthy weight range</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'metric'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Height {unit === 'metric' ? '(cm)' : '(inches)'}
          </label>
          <input
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                gender === 'male'
                  ? 'bg-green-600 text-white'
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
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Frame Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setFrame('small')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                frame === 'small'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => setFrame('medium')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                frame === 'medium'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setFrame('large')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                frame === 'large'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Large
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate Ideal Weight
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Result */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="text-green-600" size={20} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Ideal Weight Range</span>
            </div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {result.range.min} - {result.range.max} {unit === 'metric' ? 'kg' : 'lbs'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average: <span className="font-semibold text-green-600">{result.average} {unit === 'metric' ? 'kg' : 'lbs'}</span>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Calculation Methods
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Devine Formula:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{result.devine} {unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Robinson Formula:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{result.robinson} {unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Miller Formula:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{result.miller} {unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Hamwi Formula:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{result.hamwi} {unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">💡 Recommendations</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• This is a general guideline based on your height and frame</li>
              <li>• Individual ideal weight can vary based on muscle mass and body composition</li>
              <li>• Consult with a healthcare provider for personalized advice</li>
              <li>• Focus on overall health, not just the number on the scale</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: These calculations are estimates based on standard formulas. Individual needs may vary. Consult a healthcare professional for personalized guidance.
      </p>
    </div>
  );
};
