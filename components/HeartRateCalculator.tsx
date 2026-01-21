import React, { useState } from 'react';
import { Calculator, Heart, TrendingUp, Activity } from 'lucide-react';

interface HeartRateResult {
  maxHeartRate: number;
  restingHeartRate: number;
  zones: {
    zone1: { min: number; max: number; name: string; description: string; color: string };
    zone2: { min: number; max: number; name: string; description: string; color: string };
    zone3: { min: number; max: number; name: string; description: string; color: string };
    zone4: { min: number; max: number; name: string; description: string; color: string };
    zone5: { min: number; max: number; name: string; description: string; color: string };
  };
  targetZone: { min: number; max: number };
  fatBurningZone: { min: number; max: number };
}

export const HeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('average');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<HeartRateResult | null>(null);

  const fitnessLevels = {
    beginner: { label: 'Beginner', adjustment: 0 },
    average: { label: 'Average', adjustment: 0 },
    good: { label: 'Good', adjustment: 5 },
    excellent: { label: 'Excellent', adjustment: 10 }
  };

  const calculateHeartRate = () => {
    const ageNum = parseInt(age);
    const restingHRNum = parseInt(restingHR);
    
    // Calculate maximum heart rate using different formulas
    let maxHR: number;
    if (gender === 'female') {
      // Gulati formula for women: 206 - (0.88 × age)
      maxHR = Math.round(206 - (0.88 * ageNum));
    } else {
      // Tanaka formula: 208 - (0.7 × age)
      maxHR = Math.round(208 - (0.7 * ageNum));
    }

    // Adjust for fitness level
    const fitnessAdjustment = fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].adjustment;
    maxHR += fitnessAdjustment;

    // Calculate heart rate reserve (HRR) for Karvonen method
    const heartRateReserve = maxHR - restingHRNum;

    // Calculate zones using Karvonen method (more accurate with resting HR)
    const zones = {
      zone1: {
        min: Math.round(restingHRNum + (heartRateReserve * 0.50)),
        max: Math.round(restingHRNum + (heartRateReserve * 0.60)),
        name: 'Active Recovery',
        description: 'Very light intensity, recovery',
        color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-600'
      },
      zone2: {
        min: Math.round(restingHRNum + (heartRateReserve * 0.60)),
        max: Math.round(restingHRNum + (heartRateReserve * 0.70)),
        name: 'Fat Burning',
        description: 'Light intensity, fat burning',
        color: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600'
      },
      zone3: {
        min: Math.round(restingHRNum + (heartRateReserve * 0.70)),
        max: Math.round(restingHRNum + (heartRateReserve * 0.80)),
        name: 'Aerobic Base',
        description: 'Moderate intensity, endurance',
        color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-600'
      },
      zone4: {
        min: Math.round(restingHRNum + (heartRateReserve * 0.80)),
        max: Math.round(restingHRNum + (heartRateReserve * 0.90)),
        name: 'Lactate Threshold',
        description: 'Hard intensity, performance',
        color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-600'
      },
      zone5: {
        min: Math.round(restingHRNum + (heartRateReserve * 0.90)),
        max: maxHR,
        name: 'Maximum Effort',
        description: 'Very hard intensity, peak power',
        color: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-600'
      }
    };

    // General target zone (50-85% of max HR)
    const targetZone = {
      min: Math.round(maxHR * 0.50),
      max: Math.round(maxHR * 0.85)
    };

    // Fat burning zone (60-70% of max HR)
    const fatBurningZone = {
      min: Math.round(maxHR * 0.60),
      max: Math.round(maxHR * 0.70)
    };

    setResult({
      maxHeartRate: maxHR,
      restingHeartRate: restingHRNum,
      zones,
      targetZone,
      fatBurningZone
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && restingHR) {
      calculateHeartRate();
    }
  };

  const getRestingHRStatus = (rhr: number) => {
    if (rhr < 60) return { status: 'Excellent', color: 'text-green-600' };
    if (rhr < 70) return { status: 'Good', color: 'text-blue-600' };
    if (rhr < 80) return { status: 'Average', color: 'text-yellow-600' };
    return { status: 'Above Average', color: 'text-orange-600' };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-red-600 dark:text-red-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Heart Rate Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your target heart rate zones</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resting Heart Rate (bpm)
            </label>
            <input
              type="number"
              min="40"
              max="120"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 70"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Measure when you wake up, before getting out of bed
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
                    ? 'bg-red-600 text-white'
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
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fitness Level
            </label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Object.entries(fitnessLevels).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate Heart Rate Zones
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border-2 border-red-200 dark:border-red-700">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="text-red-600" size={16} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Max Heart Rate</span>
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {result.maxHeartRate} bpm
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="text-blue-600" size={16} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Resting HR</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {result.restingHeartRate} bpm
              </div>
              <div className={`text-xs font-semibold ${getRestingHRStatus(result.restingHeartRate).color}`}>
                {getRestingHRStatus(result.restingHeartRate).status}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="text-green-600" size={16} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Fat Burning Zone</span>
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {result.fatBurningZone.min}-{result.fatBurningZone.max} bpm
              </div>
            </div>
          </div>

          {/* Heart Rate Zones */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart size={18} className="text-red-600" />
              Your Heart Rate Training Zones
            </h4>
            
            <div className="space-y-3">
              {Object.entries(result.zones).map(([key, zone]) => (
                <div key={key} className={`p-4 rounded-lg border-2 ${zone.color.replace('text-', 'border-').replace('600', '200').replace('dark:border-', 'dark:border-').replace('700', '700')} ${zone.color.replace('text-', 'bg-').replace('600', '100').replace('dark:bg-', 'dark:bg-').replace('700', '900/30')}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className={`font-bold ${zone.color}`}>{zone.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{zone.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {zone.min}-{zone.max} bpm
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((zone.min / result.maxHeartRate) * 100)}-{Math.round((zone.max / result.maxHeartRate) * 100)}% Max HR
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${zone.color.replace('text-', 'bg-')}`}
                      style={{ width: `${((zone.max - zone.min) / result.maxHeartRate) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Recommendations */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">🎯 Training Recommendations</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-1">For Fat Loss:</p>
                <p>• Spend 60-80% of workout time in Zone 2 (Fat Burning)</p>
                <p>• Add 1-2 Zone 4 sessions per week</p>
              </div>
              <div>
                <p className="font-semibold mb-1">For Endurance:</p>
                <p>• Build base with 80% Zone 2-3 training</p>
                <p>• Include 20% Zone 4-5 for performance</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">💡 Heart Rate Training Tips</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Use a heart rate monitor or fitness tracker for accuracy</li>
              <li>• Allow 5-10 minutes warm-up before reaching target zones</li>
              <li>• Heart rate can be affected by stress, caffeine, and temperature</li>
              <li>• Listen to your body - perceived exertion is also important</li>
              <li>• Consult a doctor before starting intense exercise programs</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: These calculations provide estimates based on standard formulas. Individual responses may vary. Consult with a healthcare provider or certified trainer for personalized exercise recommendations.
      </p>
    </div>
  );
};