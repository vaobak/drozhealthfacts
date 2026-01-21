import React, { useState } from 'react';
import { Heart, Activity, TrendingUp } from 'lucide-react';

export const HeartRateZoneCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [result, setResult] = useState<{
    maxHR: number;
    zones: {
      name: string;
      percentage: string;
      range: string;
      benefit: string;
      color: string;
    }[];
  } | null>(null);

  const calculateZones = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageNum = parseInt(age);
    const restingNum = parseInt(restingHR);
    
    // Calculate Maximum Heart Rate (220 - age)
    const maxHR = 220 - ageNum;
    
    // Calculate Heart Rate Reserve (HRR)
    const hrr = maxHR - restingNum;
    
    // Calculate zones using Karvonen Formula
    const zones = [
      {
        name: 'Warm Up / Recovery',
        percentage: '50-60%',
        range: `${Math.round(restingNum + hrr * 0.5)}-${Math.round(restingNum + hrr * 0.6)}`,
        benefit: 'Light activity, warm-up, cool-down',
        color: 'bg-gray-100 dark:bg-gray-700 border-gray-300'
      },
      {
        name: 'Fat Burn Zone',
        percentage: '60-70%',
        range: `${Math.round(restingNum + hrr * 0.6)}-${Math.round(restingNum + hrr * 0.7)}`,
        benefit: 'Improves fat burning, basic endurance',
        color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300'
      },
      {
        name: 'Cardio / Aerobic',
        percentage: '70-80%',
        range: `${Math.round(restingNum + hrr * 0.7)}-${Math.round(restingNum + hrr * 0.8)}`,
        benefit: 'Improves cardiovascular fitness',
        color: 'bg-green-50 dark:bg-green-900/20 border-green-300'
      },
      {
        name: 'Anaerobic',
        percentage: '80-90%',
        range: `${Math.round(restingNum + hrr * 0.8)}-${Math.round(restingNum + hrr * 0.9)}`,
        benefit: 'Increases maximum performance capacity',
        color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300'
      },
      {
        name: 'Red Line / VO2 Max',
        percentage: '90-100%',
        range: `${Math.round(restingNum + hrr * 0.9)}-${maxHR}`,
        benefit: 'Maximum effort, short bursts only',
        color: 'bg-red-50 dark:bg-red-900/20 border-red-300'
      }
    ];
    
    setResult({ maxHR, zones });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-red-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Heart size={32} />
          <h2 className="text-2xl font-bold">Heart Rate Zone Calculator</h2>
        </div>
        <p className="text-pink-100">Find your target heart rate zones for optimal training</p>
      </div>

      {/* Form */}
      <form onSubmit={calculateZones} className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years) *
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="15"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="25"
            />
          </div>

          {/* Resting Heart Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resting Heart Rate (bpm) *
            </label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              required
              min="40"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="60"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Measure first thing in the morning before getting up
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[52px]"
        >
          <Activity size={20} />
          Calculate Heart Rate Zones
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-pink-600" />
            Your Heart Rate Zones
          </h3>

          {/* Max HR */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-pink-500 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-pink-900 dark:text-pink-200">Maximum Heart Rate</p>
                <p className="text-xs text-pink-700 dark:text-pink-300 mt-1">220 - your age</p>
              </div>
              <p className="text-3xl font-bold text-pink-900 dark:text-pink-200">{result.maxHR} <span className="text-lg">bpm</span></p>
            </div>
          </div>

          {/* Zones */}
          <div className="space-y-4">
            {result.zones.map((zone, index) => (
              <div key={index} className={`rounded-lg p-4 border-2 ${zone.color}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{zone.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{zone.percentage} of Max HR</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{zone.range} <span className="text-sm">bpm</span></p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{zone.benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200 font-semibold mb-2">Training Tips:</p>
            <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Spend most training time in zones 2-3 for endurance</li>
              <li>• Use zone 4 for interval training</li>
              <li>• Zone 5 should be used sparingly for peak performance</li>
              <li>• Always warm up in zone 1 before intense exercise</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
