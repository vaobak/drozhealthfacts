import React, { useState, useEffect } from 'react';
import { Pill, Clock, Plus, Bell, Calendar, AlertCircle } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'three_times' | 'four_times' | 'as_needed';
  times: string[];
  startDate: string;
  endDate?: string;
  instructions: string;
  withFood: boolean;
  color: string;
}

interface MedicationLog {
  medicationId: string;
  date: string;
  time: string;
  taken: boolean;
  notes?: string;
}

const FREQUENCY_OPTIONS = [
  { value: 'once', label: 'Once daily', times: ['08:00'] },
  { value: 'twice', label: 'Twice daily', times: ['08:00', '20:00'] },
  { value: 'three_times', label: 'Three times daily', times: ['08:00', '14:00', '20:00'] },
  { value: 'four_times', label: 'Four times daily', times: ['08:00', '12:00', '16:00', '20:00'] },
  { value: 'as_needed', label: 'As needed', times: [] }
];

const MEDICATION_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
];

export const MedicationReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'once' as const,
    customTimes: ['08:00'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    instructions: '',
    withFood: false,
    color: MEDICATION_COLORS[0]
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedMedications = localStorage.getItem('medications');
    const savedLogs = localStorage.getItem('medicationLogs');
    
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
    if (savedLogs) {
      setMedicationLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('medicationLogs', JSON.stringify(medicationLogs));
  }, [medicationLogs]);

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) return;

    const frequencyOption = FREQUENCY_OPTIONS.find(f => f.value === newMedication.frequency);
    const times = newMedication.frequency === 'as_needed' ? [] : 
                 frequencyOption ? frequencyOption.times : newMedication.customTimes;

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency,
      times,
      startDate: newMedication.startDate,
      endDate: newMedication.endDate || undefined,
      instructions: newMedication.instructions,
      withFood: newMedication.withFood,
      color: newMedication.color
    };

    setMedications([...medications, medication]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'once',
      customTimes: ['08:00'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      instructions: '',
      withFood: false,
      color: MEDICATION_COLORS[medications.length % MEDICATION_COLORS.length]
    });
    setShowAddForm(false);
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    setMedicationLogs(medicationLogs.filter(log => log.medicationId !== id));
  };

  const logMedication = (medicationId: string, taken: boolean, notes?: string) => {
    const now = new Date();
    const log: MedicationLog = {
      medicationId,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      taken,
      notes
    };

    setMedicationLogs([...medicationLogs, log]);
  };

  const getTodaysSchedule = () => {
    const today = new Date().toISOString().split('T')[0];
    const schedule: Array<{
      medication: Medication;
      time: string;
      taken: boolean;
      overdue: boolean;
    }> = [];

    medications.forEach(medication => {
      if (medication.frequency === 'as_needed') return;
      
      medication.times.forEach(time => {
        const log = medicationLogs.find(log => 
          log.medicationId === medication.id && 
          log.date === today && 
          log.time === time
        );

        const [hours, minutes] = time.split(':').map(Number);
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);
        
        const isOverdue = currentTime > scheduledTime && !log?.taken;

        schedule.push({
          medication,
          time,
          taken: log?.taken || false,
          overdue: isOverdue
        });
      });
    });

    return schedule.sort((a, b) => a.time.localeCompare(b.time));
  };

  const getUpcomingReminders = () => {
    const schedule = getTodaysSchedule();
    const now = currentTime.toTimeString().split(' ')[0].substring(0, 5);
    
    return schedule.filter(item => 
      !item.taken && 
      item.time >= now &&
      item.time <= addMinutes(now, 60) // Next hour
    );
  };

  const addMinutes = (time: string, minutes: number) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return date.toTimeString().split(' ')[0].substring(0, 5);
  };

  const getFrequencyLabel = (frequency: string) => {
    return FREQUENCY_OPTIONS.find(f => f.value === frequency)?.label || frequency;
  };

  const todaysSchedule = getTodaysSchedule();
  const upcomingReminders = getUpcomingReminders();
  const completedToday = todaysSchedule.filter(item => item.taken).length;
  const totalToday = todaysSchedule.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <Pill size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medication Reminder</h2>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your medications</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-blue-900 dark:text-blue-200">Today's Progress</h3>
              <span className="text-2xl font-bold text-blue-600">
                {completedToday}/{totalToday}
              </span>
            </div>
            
            {totalToday > 0 && (
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${(completedToday / totalToday) * 100}%` }}
                ></div>
              </div>
            )}
            
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
              {completedToday === totalToday && totalToday > 0
                ? "All medications taken today! 🎉"
                : `${totalToday - completedToday} medications remaining`
              }
            </p>
          </div>

          {/* Upcoming Reminders */}
          {upcomingReminders.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="text-yellow-600" size={20} />
                <h3 className="font-bold text-yellow-900 dark:text-yellow-200">
                  Upcoming Reminders
                </h3>
              </div>
              <div className="space-y-2">
                {upcomingReminders.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-yellow-800 dark:text-yellow-300">
                      {item.time} - {item.medication.name} ({item.medication.dosage})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Today's Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Today's Schedule
            </h3>
            
            {todaysSchedule.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No medications scheduled for today
              </p>
            ) : (
              <div className="space-y-3">
                {todaysSchedule.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      item.taken
                        ? 'bg-green-50 border-green-400 dark:bg-green-900/20 dark:border-green-600'
                        : item.overdue
                        ? 'bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-600'
                        : 'bg-gray-50 border-gray-400 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.medication.color }}
                        ></div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.medication.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.medication.dosage} at {item.time}
                            {item.medication.withFood && ' (with food)'}
                          </p>
                          {item.medication.instructions && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {item.medication.instructions}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.overdue && (
                          <AlertCircle className="text-red-600" size={20} />
                        )}
                        {!item.taken ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => logMedication(item.medication.id, true)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              Taken
                            </button>
                            <button
                              onClick={() => logMedication(item.medication.id, false, 'Skipped')}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                            >
                              Skip
                            </button>
                          </div>
                        ) : (
                          <span className="text-green-600 font-medium text-sm">✓ Taken</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Medication Management */}
        <div className="space-y-6">
          {/* Add Medication */}
          <div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Medication
            </button>

            {showAddForm && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                <input
                  type="text"
                  placeholder="Medication name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
                
                <input
                  type="text"
                  placeholder="Dosage (e.g., 10mg, 1 tablet)"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />

                <select
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                >
                  {FREQUENCY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newMedication.startDate}
                      onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">End Date (Optional)</label>
                    <input
                      type="date"
                      value={newMedication.endDate}
                      onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Special instructions (optional)"
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMedication.withFood}
                    onChange={(e) => setNewMedication({...newMedication, withFood: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Take with food</span>
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={addMedication}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Current Medications ({medications.length})
            </h3>
            
            {medications.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
                No medications added yet
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {medications.map(medication => (
                  <div
                    key={medication.id}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: medication.color }}
                        ></div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {medication.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => deleteMedication(medication.id)}
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <p>{medication.dosage}</p>
                      <p>{getFrequencyLabel(medication.frequency)}</p>
                      {medication.times.length > 0 && (
                        <p>Times: {medication.times.join(', ')}</p>
                      )}
                      {medication.withFood && <p>Take with food</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};