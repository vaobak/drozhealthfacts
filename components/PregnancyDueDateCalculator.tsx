import React, { useState } from 'react';
import { Calendar, Baby, Clock, Heart, Calculator } from 'lucide-react';

interface PregnancyResult {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: number;
  conceptionDate: Date;
  firstTrimesterEnd: Date;
  secondTrimesterEnd: Date;
  daysRemaining: number;
}

export const PregnancyDueDateCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<PregnancyResult | null>(null);

  const calculateDueDate = () => {
    if (!lastPeriodDate) return;

    const lmpDate = new Date(lastPeriodDate);
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(lmpDate.getDate() + (cycleLength - 14));
    
    const conceptionDate = new Date(ovulationDate);
    const dueDate = new Date(lmpDate);
    dueDate.setDate(lmpDate.getDate() + 280); // 40 weeks

    const today = new Date();
    const daysSinceConception = Math.floor((today.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeksSinceConception = Math.floor(daysSinceConception / 7);
    const currentWeek = weeksSinceConception + 2; // Add 2 weeks for LMP dating
    const currentDay = (daysSinceConception % 7) + 1;

    const firstTrimesterEnd = new Date(lmpDate);
    firstTrimesterEnd.setDate(lmpDate.getDate() + 84); // 12 weeks

    const secondTrimesterEnd = new Date(lmpDate);
    secondTrimesterEnd.setDate(lmpDate.getDate() + 196); // 28 weeks

    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let trimester = 1;
    if (currentWeek > 28) trimester = 3;
    else if (currentWeek > 12) trimester = 2;

    setResult({
      dueDate,
      currentWeek: Math.max(1, currentWeek),
      currentDay,
      trimester,
      conceptionDate,
      firstTrimesterEnd,
      secondTrimesterEnd,
      daysRemaining
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTrimesterInfo = (trimester: number) => {
    switch (trimester) {
      case 1:
        return {
          name: 'First Trimester',
          weeks: '1-12 weeks',
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800'
        };
      case 2:
        return {
          name: 'Second Trimester',
          weeks: '13-28 weeks',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800'
        };
      case 3:
        return {
          name: 'Third Trimester',
          weeks: '29-40 weeks',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800'
        };
      default:
        return {
          name: 'First Trimester',
          weeks: '1-12 weeks',
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800'
        };
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
          <Calculator className="text-pink-600" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Due Date Calculator
        </h2>
      </div>

      <div className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Day of Last Menstrual Period
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Cycle Length (days)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                {Array.from({ length: 21 }, (_, i) => i + 20).map(days => (
                  <option key={days} value={days}>{days} days</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={calculateDueDate}
          disabled={!lastPeriodDate}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Baby size={20} />
          Calculate Due Date
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {/* Due Date */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
              <div className="flex items-center gap-3 mb-2">
                <Baby className="text-pink-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Estimated Due Date
                </h3>
              </div>
              <p className="text-2xl font-bold text-pink-600 mb-1">
                {formatDate(result.dueDate)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.daysRemaining > 0 
                  ? `${result.daysRemaining} days remaining`
                  : result.daysRemaining === 0 
                    ? 'Due today!'
                    : `${Math.abs(result.daysRemaining)} days overdue`
                }
              </p>
            </div>

            {/* Current Progress */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Current Progress
                </h4>
                <p className="text-lg font-bold text-blue-600">
                  Week {result.currentWeek}, Day {result.currentDay}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  of pregnancy
                </p>
              </div>

              <div className={`rounded-lg p-4 ${getTrimesterInfo(result.trimester).bgColor} border ${getTrimesterInfo(result.trimester).borderColor}`}>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Current Trimester
                </h4>
                <p className={`text-lg font-bold ${getTrimesterInfo(result.trimester).color}`}>
                  {getTrimesterInfo(result.trimester).name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTrimesterInfo(result.trimester).weeks}
                </p>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Heart className="text-red-500" size={20} />
                Important Dates
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Conception Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(result.conceptionDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">End of 1st Trimester:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(result.firstTrimesterEnd)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">End of 2nd Trimester:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(result.secondTrimesterEnd)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};