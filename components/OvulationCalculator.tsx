import React, { useState } from 'react';
import { Calendar, Heart, TrendingUp } from 'lucide-react';

interface OvulationResult {
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
}

export const OvulationCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [result, setResult] = useState<OvulationResult | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriodDate) return;

    const lastPeriod = new Date(lastPeriodDate);
    const cycle = parseInt(cycleLength);

    // Calculate ovulation date (typically 14 days before next period)
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + cycle - 14);

    // Calculate fertile window (5 days before ovulation to 1 day after)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    // Calculate next period
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycle);

    setResult({
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysFromNow = (date: Date): number => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isFormValid = () => {
    return lastPeriodDate && cycleLength && parseInt(cycleLength) >= 21 && parseInt(cycleLength) <= 35;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
          <Heart className="text-pink-600" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ovulation Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Day of Last Period
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Cycle Length (days)
            </label>
            <select
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Array.from({ length: 15 }, (_, i) => i + 21).map(days => (
                <option key={days} value={days}>{days} days</option>
              ))}
            </select>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
          <h3 className="font-semibold text-pink-900 dark:text-pink-200 mb-2">How to Use:</h3>
          <ul className="text-sm text-pink-800 dark:text-pink-300 space-y-1">
            <li>• Enter the first day of your last menstrual period</li>
            <li>• Select your average cycle length (21-35 days is normal)</li>
            <li>• Results are estimates based on a typical 28-day cycle</li>
            <li>• Track for 3+ cycles for better accuracy</li>
          </ul>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateOvulation}
          disabled={!isFormValid()}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calendar size={20} />
          Calculate Ovulation
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-pink-600" size={20} />
              Your Fertility Calendar
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Ovulation Date */}
              <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                <h4 className="font-semibold text-pink-900 dark:text-pink-200 mb-2">Ovulation Date</h4>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatDate(result.ovulationDate)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getDaysFromNow(result.ovulationDate) > 0 
                    ? `In ${getDaysFromNow(result.ovulationDate)} days`
                    : getDaysFromNow(result.ovulationDate) === 0
                    ? 'Today!'
                    : `${Math.abs(getDaysFromNow(result.ovulationDate))} days ago`
                  }
                </div>
              </div>

              {/* Next Period */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Next Period</h4>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatDate(result.nextPeriod)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getDaysFromNow(result.nextPeriod) > 0 
                    ? `In ${getDaysFromNow(result.nextPeriod)} days`
                    : 'Today or overdue'
                  }
                </div>
              </div>
            </div>

            {/* Fertile Window */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3">Fertile Window (Best Days to Conceive)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Starts</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(result.fertileStart)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ends</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(result.fertileEnd)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-800 dark:text-green-300">
                This is your 6-day fertile window with the highest chance of conception.
              </div>
            </div>

            {/* Calendar View */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Reference</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Fertile Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span>Ovulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Other Days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};