import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Clock, User } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Condition {
  id: string;
  name: string;
  description: string;
  commonSymptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'emergency';
  recommendations: string[];
  whenToSeeDoctor: string;
}

const SYMPTOMS_DATABASE: Symptom[] = [
  { id: 'headache', name: 'Headache', category: 'neurological', severity: 'mild' },
  { id: 'fever', name: 'Fever', category: 'general', severity: 'moderate' },
  { id: 'cough', name: 'Cough', category: 'respiratory', severity: 'mild' },
  { id: 'chest_pain', name: 'Chest Pain', category: 'cardiovascular', severity: 'severe' },
  { id: 'shortness_breath', name: 'Shortness of Breath', category: 'respiratory', severity: 'moderate' },
  { id: 'nausea', name: 'Nausea', category: 'digestive', severity: 'mild' },
  { id: 'vomiting', name: 'Vomiting', category: 'digestive', severity: 'moderate' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', severity: 'mild' },
  { id: 'fatigue', name: 'Fatigue', category: 'general', severity: 'mild' },
  { id: 'dizziness', name: 'Dizziness', category: 'neurological', severity: 'moderate' },
  { id: 'sore_throat', name: 'Sore Throat', category: 'respiratory', severity: 'mild' },
  { id: 'muscle_pain', name: 'Muscle Pain', category: 'musculoskeletal', severity: 'mild' },
  { id: 'joint_pain', name: 'Joint Pain', category: 'musculoskeletal', severity: 'moderate' },
  { id: 'rash', name: 'Skin Rash', category: 'dermatological', severity: 'mild' },
  { id: 'abdominal_pain', name: 'Abdominal Pain', category: 'digestive', severity: 'moderate' },
];

const CONDITIONS_DATABASE: Condition[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract',
    commonSymptoms: ['cough', 'sore_throat', 'headache', 'fatigue'],
    severity: 'mild',
    recommendations: [
      'Get plenty of rest',
      'Stay hydrated',
      'Use throat lozenges',
      'Consider over-the-counter pain relievers'
    ],
    whenToSeeDoctor: 'If symptoms persist for more than 10 days or worsen significantly'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    description: 'A viral infection that attacks the respiratory system',
    commonSymptoms: ['fever', 'cough', 'muscle_pain', 'fatigue', 'headache'],
    severity: 'moderate',
    recommendations: [
      'Rest and stay home',
      'Drink plenty of fluids',
      'Consider antiviral medication if caught early',
      'Use fever reducers as needed'
    ],
    whenToSeeDoctor: 'If you have difficulty breathing, persistent chest pain, or high fever'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis (Stomach Flu)',
    description: 'Inflammation of the stomach and intestines',
    commonSymptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
    severity: 'moderate',
    recommendations: [
      'Stay hydrated with clear fluids',
      'Follow the BRAT diet (bananas, rice, applesauce, toast)',
      'Rest and avoid solid foods initially',
      'Use oral rehydration solutions'
    ],
    whenToSeeDoctor: 'If you have signs of severe dehydration or blood in vomit/stool'
  },
  {
    id: 'heart_attack',
    name: 'Heart Attack (Emergency)',
    description: 'A serious medical emergency requiring immediate attention',
    commonSymptoms: ['chest_pain', 'shortness_breath', 'nausea', 'dizziness'],
    severity: 'emergency',
    recommendations: [
      'Call emergency services immediately (911)',
      'Chew aspirin if not allergic',
      'Stay calm and rest',
      'Do not drive yourself to hospital'
    ],
    whenToSeeDoctor: 'IMMEDIATELY - This is a medical emergency'
  },
  {
    id: 'migraine',
    name: 'Migraine Headache',
    description: 'A severe headache often accompanied by other symptoms',
    commonSymptoms: ['headache', 'nausea', 'dizziness'],
    severity: 'moderate',
    recommendations: [
      'Rest in a dark, quiet room',
      'Apply cold or warm compress',
      'Stay hydrated',
      'Consider over-the-counter pain relievers'
    ],
    whenToSeeDoctor: 'If headaches are frequent, severe, or accompanied by neurological symptoms'
  }
];

export const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Condition[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState<'male' | 'female' | ''>('');

  const filteredSymptoms = SYMPTOMS_DATABASE.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    const matchedConditions = CONDITIONS_DATABASE.map(condition => {
      const matchCount = condition.commonSymptoms.filter(symptom =>
        selectedSymptoms.includes(symptom)
      ).length;
      
      const matchPercentage = (matchCount / condition.commonSymptoms.length) * 100;
      
      return {
        ...condition,
        matchPercentage,
        matchCount
      };
    }).filter(condition => condition.matchCount > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setResults(matchedConditions);
    setShowResults(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'severe': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'emergency': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild': return <CheckCircle size={20} />;
      case 'moderate': return <Clock size={20} />;
      case 'severe': return <AlertTriangle size={20} />;
      case 'emergency': return <XCircle size={20} />;
      default: return <CheckCircle size={20} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
          <Search size={24} className="text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Symptom Checker</h2>
          <p className="text-gray-600 dark:text-gray-400">Analyze your symptoms and get health insights</p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* User Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age (optional)
              </label>
              <input
                type="number"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender (optional)
              </label>
              <select
                value={userGender}
                onChange={(e) => setUserGender(e.target.value as 'male' | 'female' | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Symptom Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search and Select Your Symptoms
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search symptoms (e.g., headache, fever, cough)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Symptom Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Available Symptoms
            </h3>
            <div className="grid md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {filteredSymptoms.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{symptom.name}</span>
                    {selectedSymptoms.includes(symptom.id) && (
                      <CheckCircle size={16} className="text-red-600" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {symptom.category}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Selected Symptoms ({selectedSymptoms.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(symptomId => {
                  const symptom = SYMPTOMS_DATABASE.find(s => s.id === symptomId);
                  return (
                    <span
                      key={symptomId}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm dark:bg-red-900/20 dark:text-red-300"
                    >
                      {symptom?.name}
                      <button
                        onClick={() => toggleSymptom(symptomId)}
                        className="hover:text-red-900 dark:hover:text-red-100"
                      >
                        <XCircle size={14} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Analyze Symptoms ({selectedSymptoms.length})
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Analysis Results
            </h3>
            <button
              onClick={() => setShowResults(false)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              ← Back to Symptoms
            </button>
          </div>

          {/* Emergency Warning */}
          {results.some(r => r.severity === 'emergency') && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/20 dark:border-red-800">
              <div className="flex items-center">
                <AlertTriangle className="text-red-400" size={24} />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                    Emergency Symptoms Detected
                  </h3>
                  <p className="text-red-700 dark:text-red-300">
                    Some of your symptoms may indicate a medical emergency. Seek immediate medical attention or call 911.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Possible Conditions */}
          <div className="space-y-4">
            {results.map((condition, index) => (
              <div
                key={condition.id}
                className={`border rounded-lg p-6 ${getSeverityColor(condition.severity)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(condition.severity)}
                    <div>
                      <h4 className="text-lg font-bold">{condition.name}</h4>
                      <p className="text-sm opacity-75">
                        {condition.matchPercentage.toFixed(0)}% symptom match
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                    #{index + 1}
                  </span>
                </div>

                <p className="text-sm mb-4">{condition.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Recommendations:</h5>
                    <ul className="text-sm space-y-1">
                      {condition.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-current mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">When to See a Doctor:</h5>
                    <p className="text-sm">{condition.whenToSeeDoctor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Important Disclaimer
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This symptom checker is for informational purposes only and should not replace professional medical advice. 
              Always consult with a healthcare provider for proper diagnosis and treatment. If you're experiencing a medical 
              emergency, call 911 immediately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};