import React, { useState } from 'react';
import { Calculator, Coffee, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface CaffeineItem {
  name: string;
  amount: number;
  caffeine: number;
}

interface CaffeineResult {
  totalCaffeine: number;
  safeLimit: number;
  isExcessive: boolean;
  timeToEliminate: number;
  peakTime: number;
  recommendations: string[];
  effects: string[];
}

const caffeineDatabase: { [key: string]: number } = {
  'espresso': 63, // per shot (30ml)
  'coffee-brewed': 95, // per 8oz cup
  'coffee-instant': 62, // per 8oz cup
  'coffee-decaf': 3, // per 8oz cup
  'tea-black': 47, // per 8oz cup
  'tea-green': 28, // per 8oz cup
  'tea-white': 15, // per 8oz cup
  'tea-oolong': 37, // per 8oz cup
  'energy-drink': 80, // per 8oz
  'cola': 34, // per 12oz can
  'dark-chocolate': 12, // per oz
  'milk-chocolate': 6, // per oz
  'cocoa': 4, // per 8oz cup
  'pre-workout': 150, // per serving
  'caffeine-pill': 200, // per pill
};

export const CaffeineCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [caffeineItems, setCaffeineItems] = useState<CaffeineItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('coffee-brewed');
  const [itemAmount, setItemAmount] = useState<string>('1');
  const [result, setResult] = useState<CaffeineResult | null>(null);

  const addCaffeineItem = () => {
    const amount = parseFloat(itemAmount);
    if (!amount || amount <= 0) return;

    const caffeinePerUnit = caffeineDatabase[selectedItem];
    const totalCaffeine = caffeinePerUnit * amount;

    const newItem: CaffeineItem = {
      name: getItemDisplayName(selectedItem),
      amount,
      caffeine: totalCaffeine
    };

    setCaffeineItems([...caffeineItems, newItem]);
    setItemAmount('1');
  };

  const removeItem = (index: number) => {
    setCaffeineItems(caffeineItems.filter((_, i) => i !== index));
  };

  const getItemDisplayName = (key: string): string => {
    const names: { [key: string]: string } = {
      'espresso': 'Espresso Shot',
      'coffee-brewed': 'Brewed Coffee (8oz)',
      'coffee-instant': 'Instant Coffee (8oz)',
      'coffee-decaf': 'Decaf Coffee (8oz)',
      'tea-black': 'Black Tea (8oz)',
      'tea-green': 'Green Tea (8oz)',
      'tea-white': 'White Tea (8oz)',
      'tea-oolong': 'Oolong Tea (8oz)',
      'energy-drink': 'Energy Drink (8oz)',
      'cola': 'Cola (12oz)',
      'dark-chocolate': 'Dark Chocolate (1oz)',
      'milk-chocolate': 'Milk Chocolate (1oz)',
      'cocoa': 'Hot Cocoa (8oz)',
      'pre-workout': 'Pre-workout Supplement',
      'caffeine-pill': 'Caffeine Pill',
    };
    return names[key] || key;
  };

  const calculateCaffeine = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0 || caffeineItems.length === 0) {
      return;
    }

    let weightKg = weightNum;
    if (unit === 'imperial') {
      weightKg = weightNum * 0.453592;
    }

    const totalCaffeine = caffeineItems.reduce((sum, item) => sum + item.caffeine, 0);
    
    // Safe limit is generally 400mg per day for healthy adults, or 6mg per kg body weight
    const safeLimitByWeight = weightKg * 6;
    const safeLimit = Math.min(400, safeLimitByWeight);
    
    const isExcessive = totalCaffeine > safeLimit;

    // Caffeine half-life is approximately 5-6 hours
    const halfLife = 5.5;
    const timeToEliminate = halfLife * 4; // Time to eliminate ~94% of caffeine
    
    // Peak caffeine levels occur 30-60 minutes after consumption
    const peakTime = 45; // minutes

    // Generate recommendations based on intake
    const recommendations: string[] = [];
    
    if (isExcessive) {
      recommendations.push('Your caffeine intake exceeds safe daily limits');
      recommendations.push('Consider reducing caffeine consumption gradually');
      recommendations.push('Spread caffeine intake throughout the day');
    } else {
      recommendations.push('Your caffeine intake is within safe limits');
    }
    
    if (totalCaffeine > 200) {
      recommendations.push('Avoid caffeine 6 hours before bedtime');
      recommendations.push('Stay hydrated - drink extra water');
    }
    
    recommendations.push('Monitor your body\'s response to caffeine');
    recommendations.push('Consider caffeine-free alternatives in the afternoon');

    // Generate effects based on intake level
    const effects: string[] = [];
    
    if (totalCaffeine < 50) {
      effects.push('Mild alertness increase');
      effects.push('Slight mood improvement');
    } else if (totalCaffeine < 100) {
      effects.push('Increased alertness and focus');
      effects.push('Enhanced mood and energy');
      effects.push('Improved physical performance');
    } else if (totalCaffeine < 200) {
      effects.push('Significant alertness and focus');
      effects.push('Enhanced cognitive performance');
      effects.push('Increased heart rate');
      effects.push('Possible mild jitters');
    } else if (totalCaffeine < 400) {
      effects.push('High alertness and energy');
      effects.push('Increased heart rate and blood pressure');
      effects.push('Possible anxiety or jitters');
      effects.push('Enhanced athletic performance');
    } else {
      effects.push('Excessive stimulation');
      effects.push('Anxiety and restlessness');
      effects.push('Rapid heart rate');
      effects.push('Possible headaches');
      effects.push('Sleep disruption');
      effects.push('Potential caffeine toxicity symptoms');
    }

    const newResult: CaffeineResult = {
      totalCaffeine,
      safeLimit,
      isExcessive,
      timeToEliminate,
      peakTime,
      recommendations,
      effects
    };

    setResult(newResult);
  };

  const getSafetyColor = (isExcessive: boolean) => {
    return isExcessive ? 'text-red-600' : 'text-green-600';
  };

  const getSafetyBgColor = (isExcessive: boolean) => {
    return isExcessive 
      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
          <Coffee size={24} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Caffeine Calculator</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your daily caffeine intake and safety limits</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Weight
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="metric">kg</option>
              <option value="imperial">lbs</option>
            </select>
          </div>
        </div>

        {/* Add Caffeine Items */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add Caffeine Source
          </label>
          <div className="flex gap-2">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <optgroup label="Coffee">
                <option value="espresso">Espresso Shot (30ml) - 63mg</option>
                <option value="coffee-brewed">Brewed Coffee (8oz) - 95mg</option>
                <option value="coffee-instant">Instant Coffee (8oz) - 62mg</option>
                <option value="coffee-decaf">Decaf Coffee (8oz) - 3mg</option>
              </optgroup>
              <optgroup label="Tea">
                <option value="tea-black">Black Tea (8oz) - 47mg</option>
                <option value="tea-green">Green Tea (8oz) - 28mg</option>
                <option value="tea-white">White Tea (8oz) - 15mg</option>
                <option value="tea-oolong">Oolong Tea (8oz) - 37mg</option>
              </optgroup>
              <optgroup label="Other Drinks">
                <option value="energy-drink">Energy Drink (8oz) - 80mg</option>
                <option value="cola">Cola (12oz) - 34mg</option>
                <option value="cocoa">Hot Cocoa (8oz) - 4mg</option>
              </optgroup>
              <optgroup label="Food & Supplements">
                <option value="dark-chocolate">Dark Chocolate (1oz) - 12mg</option>
                <option value="milk-chocolate">Milk Chocolate (1oz) - 6mg</option>
                <option value="pre-workout">Pre-workout Supplement - 150mg</option>
                <option value="caffeine-pill">Caffeine Pill - 200mg</option>
              </optgroup>
            </select>
            <input
              type="number"
              value={itemAmount}
              onChange={(e) => setItemAmount(e.target.value)}
              placeholder="Qty"
              min="0.1"
              step="0.1"
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addCaffeineItem}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Caffeine Items List */}
        {caffeineItems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Caffeine Intake</h3>
            <div className="space-y-2">
              {caffeineItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.amount}x {item.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({item.caffeine}mg caffeine)
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculateCaffeine}
          disabled={!weight || caffeineItems.length === 0}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate Caffeine Impact
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className={`rounded-lg p-6 border ${getSafetyBgColor(result.isExcessive)}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-amber-600" />
                Your Caffeine Analysis
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Caffeine</div>
                  <div className="text-2xl font-bold text-amber-600">{result.totalCaffeine}mg</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Safe Daily Limit</div>
                  <div className="text-2xl font-bold text-gray-600">{result.safeLimit}mg</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Safety Status</div>
                  <div className={`text-2xl font-bold ${getSafetyColor(result.isExcessive)}`}>
                    {result.isExcessive ? 'Excessive' : 'Safe'}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Clock size={16} />
                    Peak Effect Time
                  </div>
                  <div className="text-lg font-bold text-blue-600">{result.peakTime} minutes</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Clock size={16} />
                    Time to Eliminate
                  </div>
                  <div className="text-lg font-bold text-purple-600">{result.timeToEliminate} hours</div>
                </div>
              </div>
            </div>

            {/* Expected Effects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Coffee size={20} className="text-amber-600" />
                Expected Effects
              </h4>
              <ul className="space-y-2">
                {result.effects.map((effect, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-green-600" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Caffeine Timeline */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Caffeine Timeline</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">0-15 minutes:</span>
                  <span className="text-gray-900 dark:text-white">Absorption begins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">30-60 minutes:</span>
                  <span className="text-gray-900 dark:text-white">Peak blood levels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">3-5 hours:</span>
                  <span className="text-gray-900 dark:text-white">Half-life (50% eliminated)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">12-24 hours:</span>
                  <span className="text-gray-900 dark:text-white">Complete elimination</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Disclaimer:</strong> This calculator provides estimates based on average caffeine content and metabolism. 
                Individual sensitivity varies. Pregnant women, children, and people with certain medical conditions should 
                consult healthcare providers about caffeine consumption.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};