import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    let bmiValue = 0;
    
    if (unit === 'metric') {
      // BMI = weight (kg) / (height (m))^2
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // BMI = (weight (lbs) / (height (inches))^2) * 703
      bmiValue = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));
    
    // Determine category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const getBMIColor = () => {
    if (!bmi) return 'text-gray-600';
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi >= 18.5 && bmi < 25) return 'text-green-600';
    if (bmi >= 25 && bmi < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIIcon = () => {
    if (!bmi) return <Minus size={24} />;
    if (bmi < 18.5) return <TrendingDown size={24} />;
    if (bmi >= 18.5 && bmi < 25) return <Minus size={24} />;
    return <TrendingUp size={24} />;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height) {
      calculateBMI();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-brand-blue dark:text-blue-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">BMI Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your Body Mass Index</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'metric'
              ? 'bg-brand-blue text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-brand-blue text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 67'}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate BMI
        </button>
      </form>

      {/* Result */}
      {bmi !== null && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your BMI</span>
            <div className={getBMIColor()}>
              {getBMIIcon()}
            </div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${getBMIColor()}`}>
            {bmi}
          </div>
          <div className={`text-lg font-semibold mb-3 ${getBMIColor()}`}>
            {category}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Underweight: BMI less than 18.5</p>
            <p>• Normal weight: BMI 18.5 to 24.9</p>
            <p>• Overweight: BMI 25 to 29.9</p>
            <p>• Obese: BMI 30 or greater</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: BMI is a screening tool and does not diagnose body fatness or health. Consult with a healthcare provider for health assessments.
      </p>
    </div>
  );
};
