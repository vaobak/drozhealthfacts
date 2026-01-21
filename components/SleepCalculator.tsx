import React, { useState } from 'react';
import { Calculator, Moon, Clock, Sun } from 'lucide-react';

interface SleepResult {
  bedtimes: string[];
  wakeupTimes: string[];
  sleepDuration: string;
  cycles: number;
}

export const SleepCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'bedtime' | 'wakeup'>('bedtime');
  const [targetTime, setTargetTime] = useState('');
  const [result, setResult] = useState<SleepResult | null>(null);

  const calculateSleep = () => {
    const fallAsleepTime = 15; // minutes to fall asleep
    const cycleLength = 90; // minutes per sleep cycle
    const recommendedCycles = [4, 5, 6]; // 6, 7.5, 9 hours of sleep

    if (calculationType === 'bedtime') {
      // Calculate bedtimes based on wake-up time
      const [hours, minutes] = targetTime.split(':').map(Number);
      const wakeupMinutes = hours * 60 + minutes;
      
      const bedtimes: string[] = [];
      const cycles: number[] = [];
      
      recommendedCycles.forEach(cycleCount => {
        const sleepMinutes = cycleCount * cycleLength;
        const bedtimeMinutes = wakeupMinutes - sleepMinutes - fallAsleepTime;
        
        let adjustedBedtime = bedtimeMinutes;
        if (adjustedBedtime < 0) {
          adjustedBedtime += 24 * 60; // Add 24 hours if negative
        }
        
        const bedHours = Math.floor(adjustedBedtime / 60);
        const bedMins = adjustedBedtime % 60;
        
        bedtimes.push(`${bedHours.toString().padStart(2, '0')}:${bedMins.toString().padStart(2, '0')}`);
        cycles.push(cycleCount);
      });

      setResult({
        bedtimes,
        wakeupTimes: [targetTime],
        sleepDuration: `${recommendedCycles[0] * 1.5} - ${recommendedCycles[recommendedCycles.length - 1] * 1.5} hours`,
        cycles: recommendedCycles.length
      });
    } else {
      // Calculate wake-up times based on bedtime
      const [hours, minutes] = targetTime.split(':').map(Number);
      const bedtimeMinutes = hours * 60 + minutes + fallAsleepTime;
      
      const wakeupTimes: string[] = [];
      
      recommendedCycles.forEach(cycleCount => {
        const sleepMinutes = cycleCount * cycleLength;
        const wakeupMinutes = bedtimeMinutes + sleepMinutes;
        
        let adjustedWakeup = wakeupMinutes;
        if (adjustedWakeup >= 24 * 60) {
          adjustedWakeup -= 24 * 60; // Subtract 24 hours if over midnight
        }
        
        const wakeHours = Math.floor(adjustedWakeup / 60);
        const wakeMins = adjustedWakeup % 60;
        
        wakeupTimes.push(`${wakeHours.toString().padStart(2, '0')}:${wakeMins.toString().padStart(2, '0')}`);
      });

      setResult({
        bedtimes: [targetTime],
        wakeupTimes,
        sleepDuration: `${recommendedCycles[0] * 1.5} - ${recommendedCycles[recommendedCycles.length - 1] * 1.5} hours`,
        cycles: recommendedCycles.length
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetTime) {
      calculateSleep();
    }
  };

  const formatSleepDuration = (cycles: number) => {
    const hours = cycles * 1.5;
    return `${hours} hours (${cycles} cycles)`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <Calculator className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sleep Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculate optimal sleep times</p>
        </div>
      </div>

      {/* Calculation Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCalculationType('bedtime')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            calculationType === 'bedtime'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Moon size={18} className="inline mr-2" />
          Find Bedtime
        </button>
        <button
          onClick={() => setCalculationType('wakeup')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            calculationType === 'wakeup'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Sun size={18} className="inline mr-2" />
          Find Wake Time
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {calculationType === 'bedtime' ? 'What time do you want to wake up?' : 'What time do you want to go to bed?'}
          </label>
          <input
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px]"
        >
          Calculate Sleep Times
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {calculationType === 'bedtime' ? (
            <>
              {/* Bedtime Results */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="text-purple-600" size={20} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Recommended Bedtimes</span>
                </div>
                <div className="space-y-3">
                  {result.bedtimes.map((bedtime, index) => (
                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{bedtime}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatSleepDuration([4, 5, 6][index])}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Wake at {result.wakeupTimes[0]}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {index === 0 && 'Minimum sleep'}
                          {index === 1 && 'Recommended'}
                          {index === 2 && 'Optimal sleep'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Wake-up Results */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-2 border-orange-200 dark:border-orange-700">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="text-orange-600" size={20} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Recommended Wake-up Times</span>
                </div>
                <div className="space-y-3">
                  {result.wakeupTimes.map((wakeupTime, index) => (
                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{wakeupTime}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatSleepDuration([4, 5, 6][index])}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Bed at {result.bedtimes[0]}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {index === 0 && 'Minimum sleep'}
                          {index === 1 && 'Recommended'}
                          {index === 2 && 'Optimal sleep'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Sleep Cycle Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              Sleep Cycle Information
            </h4>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>• Each sleep cycle lasts approximately 90 minutes</p>
              <p>• We account for 15 minutes to fall asleep</p>
              <p>• Waking at the end of a cycle helps you feel refreshed</p>
              <p>• Most adults need 4-6 complete sleep cycles (6-9 hours)</p>
            </div>
          </div>

          {/* Sleep Quality Tips */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">💤 Sleep Quality Tips</h4>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Keep your bedroom cool (60-67°F / 15-19°C)</li>
              <li>• Use blackout curtains or an eye mask</li>
              <li>• Avoid screens 1 hour before bedtime</li>
              <li>• Try relaxation techniques like deep breathing</li>
              <li>• Maintain a consistent sleep schedule, even on weekends</li>
              <li>• Avoid large meals, caffeine, and alcohol before bed</li>
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
        Note: This calculator is based on average 90-minute sleep cycles. Individual sleep patterns may vary. Consult a healthcare professional if you have persistent sleep issues.
      </p>
    </div>
  );
};