import React, { useState } from 'react';
import { Pill, AlertTriangle, Search, Plus, X, Shield } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonUses: string[];
}

interface Interaction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  effects: string[];
  recommendations: string[];
}

const MEDICATIONS_DATABASE: Medication[] = [
  {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic acid',
    category: 'Pain reliever/Blood thinner',
    commonUses: ['Pain relief', 'Fever reduction', 'Heart attack prevention']
  },
  {
    id: 'warfarin',
    name: 'Warfarin (Coumadin)',
    genericName: 'Warfarin sodium',
    category: 'Anticoagulant',
    commonUses: ['Blood clot prevention', 'Atrial fibrillation', 'DVT prevention']
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen (Advil, Motrin)',
    genericName: 'Ibuprofen',
    category: 'NSAID',
    commonUses: ['Pain relief', 'Inflammation reduction', 'Fever reduction']
  }
];

const INTERACTIONS_DATABASE: Interaction[] = [
  {
    id: 'aspirin_warfarin',
    drug1: 'aspirin',
    drug2: 'warfarin',
    severity: 'major',
    description: 'Increased risk of bleeding when taken together',
    effects: ['Excessive bleeding', 'Bruising', 'Internal bleeding risk'],
    recommendations: ['Monitor closely', 'Regular blood tests', 'Consult doctor immediately']
  }
];

export const DrugInteractionChecker: React.FC = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customMedication, setCustomMedication] = useState('');
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filteredMedications = MEDICATIONS_DATABASE.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMedication = (medicationId: string) => {
    if (!selectedMedications.includes(medicationId)) {
      setSelectedMedications([...selectedMedications, medicationId]);
    }
    setSearchTerm('');
  };

  const addCustomMedication = () => {
    if (customMedication.trim() && !selectedMedications.includes(customMedication)) {
      setSelectedMedications([...selectedMedications, customMedication.trim()]);
      setCustomMedication('');
    }
  };

  const removeMedication = (medicationId: string) => {
    setSelectedMedications(selectedMedications.filter(id => id !== medicationId));
  };

  const checkInteractions = () => {
    const foundInteractions: Interaction[] = [];
    
    for (let i = 0; i < selectedMedications.length; i++) {
      for (let j = i + 1; j < selectedMedications.length; j++) {
        const interaction = INTERACTIONS_DATABASE.find(int =>
          (int.drug1 === selectedMedications[i] && int.drug2 === selectedMedications[j]) ||
          (int.drug1 === selectedMedications[j] && int.drug2 === selectedMedications[i])
        );
        if (interaction) {
          foundInteractions.push(interaction);
        }
      }
    }
    
    setInteractions(foundInteractions);
    setShowResults(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'major': return 'text-red-600 bg-red-50 border-red-200';
      case 'contraindicated': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <Pill size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Drug Interaction Checker</h2>
          <p className="text-gray-600 dark:text-gray-400">Check for interactions between medications</p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* Search Medications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Medications
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search medications (e.g., Aspirin, Warfarin)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Medication Results */}
          {searchTerm && (
            <div className="max-h-40 overflow-y-auto">
              {filteredMedications.map(medication => (
                <button
                  key={medication.id}
                  onClick={() => addMedication(medication.id)}
                  className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{medication.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{medication.genericName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{medication.category}</div>
                </button>
              ))}
            </div>
          )}

          {/* Add Custom Medication */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add Custom Medication
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customMedication}
                onChange={(e) => setCustomMedication(e.target.value)}
                placeholder="Enter medication name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={addCustomMedication}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Selected Medications */}
          {selectedMedications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Selected Medications ({selectedMedications.length})
              </h3>
              <div className="space-y-2">
                {selectedMedications.map(medicationId => {
                  const medication = MEDICATIONS_DATABASE.find(m => m.id === medicationId);
                  return (
                    <div
                      key={medicationId}
                      className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-200">
                          {medication?.name || medicationId}
                        </div>
                        {medication && (
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {medication.genericName} - {medication.category}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeMedication(medicationId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Check Interactions Button */}
          <button
            onClick={checkInteractions}
            disabled={selectedMedications.length < 2}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Shield size={20} />
            Check Interactions ({selectedMedications.length} medications)
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Interaction Results
            </h3>
            <button
              onClick={() => setShowResults(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Medications
            </button>
          </div>

          {/* Interactions Found */}
          {interactions.length > 0 ? (
            <div className="space-y-4">
              {interactions.map((interaction, index) => (
                <div
                  key={interaction.id}
                  className={`border rounded-lg p-6 ${getSeverityColor(interaction.severity)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={24} />
                      <div>
                        <h4 className="text-lg font-bold">
                          {interaction.severity.toUpperCase()} Interaction
                        </h4>
                        <p className="text-sm opacity-75">
                          Between selected medications
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{interaction.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">Possible Effects:</h5>
                      <ul className="text-sm space-y-1">
                        {interaction.effects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-current mt-1">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Recommendations:</h5>
                      <ul className="text-sm space-y-1">
                        {interaction.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-current mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="mx-auto text-green-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-green-600 mb-2">No Interactions Found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No known interactions were found between your selected medications.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Important Disclaimer
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This drug interaction checker is for informational purposes only. Always consult with your healthcare 
              provider or pharmacist before starting, stopping, or changing any medications. This tool may not include 
              all possible interactions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};