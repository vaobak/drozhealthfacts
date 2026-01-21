import React, { useState } from 'react';
import { FileText, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface LabTest {
  id: string;
  name: string;
  category: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
    gender?: 'male' | 'female';
  }[];
  description: string;
  highMeaning: string;
  lowMeaning: string;
  recommendations: {
    high: string[];
    low: string[];
    normal: string[];
  };
}

interface LabResult {
  testId: string;
  value: number;
  status: 'normal' | 'high' | 'low' | 'critical_high' | 'critical_low';
  interpretation: string;
  recommendations: string[];
}

const LAB_TESTS: LabTest[] = [
  {
    id: 'total_cholesterol',
    name: 'Total Cholesterol',
    category: 'Lipid Panel',
    unit: 'mg/dL',
    normalRange: [{ min: 0, max: 200 }],
    description: 'Measures the total amount of cholesterol in your blood',
    highMeaning: 'Increased risk of heart disease and stroke',
    lowMeaning: 'Generally not concerning, may indicate good heart health',
    recommendations: {
      high: [
        'Follow a heart-healthy diet low in saturated fats',
        'Increase physical activity to at least 150 minutes per week',
        'Consider statin medication if recommended by doctor',
        'Lose weight if overweight',
        'Quit smoking if applicable'
      ],
      low: [
        'Continue current healthy lifestyle',
        'Maintain balanced diet with healthy fats',
        'Regular exercise routine'
      ],
      normal: [
        'Maintain current healthy lifestyle',
        'Continue heart-healthy diet',
        'Regular physical activity',
        'Annual cholesterol screening'
      ]
    }
  },
  {
    id: 'ldl_cholesterol',
    name: 'LDL Cholesterol',
    category: 'Lipid Panel',
    unit: 'mg/dL',
    normalRange: [{ min: 0, max: 100 }],
    description: 'Low-density lipoprotein, often called "bad" cholesterol',
    highMeaning: 'Higher risk of plaque buildup in arteries',
    lowMeaning: 'Lower risk of cardiovascular disease',
    recommendations: {
      high: [
        'Reduce saturated and trans fats in diet',
        'Increase soluble fiber intake',
        'Consider plant sterols and stanols',
        'Regular aerobic exercise',
        'Medication may be necessary'
      ],
      low: [
        'Excellent! Continue current lifestyle',
        'Maintain heart-healthy habits'
      ],
      normal: [
        'Good cholesterol management',
        'Continue healthy diet and exercise'
      ]
    }
  },
  {
    id: 'hdl_cholesterol',
    name: 'HDL Cholesterol',
    category: 'Lipid Panel',
    unit: 'mg/dL',
    normalRange: [
      { min: 40, max: 1000, gender: 'male' },
      { min: 50, max: 1000, gender: 'female' }
    ],
    description: 'High-density lipoprotein, often called "good" cholesterol',
    highMeaning: 'Protective against heart disease',
    lowMeaning: 'Increased risk of heart disease',
    recommendations: {
      high: [
        'Excellent! Continue current lifestyle',
        'Maintain regular exercise',
        'Keep up healthy diet habits'
      ],
      low: [
        'Increase aerobic exercise',
        'Include healthy fats (omega-3s)',
        'Lose weight if overweight',
        'Quit smoking if applicable',
        'Consider niacin supplementation with doctor approval'
      ],
      normal: [
        'Good HDL levels',
        'Continue regular exercise',
        'Maintain healthy weight'
      ]
    }
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    category: 'Lipid Panel',
    unit: 'mg/dL',
    normalRange: [{ min: 0, max: 150 }],
    description: 'Type of fat found in blood, often elevated with diabetes or obesity',
    highMeaning: 'Increased risk of heart disease and pancreatitis',
    lowMeaning: 'Generally healthy, low cardiovascular risk',
    recommendations: {
      high: [
        'Reduce simple carbohydrates and sugars',
        'Limit alcohol consumption',
        'Increase omega-3 fatty acids',
        'Lose weight if overweight',
        'Control diabetes if present'
      ],
      low: [
        'Excellent triglyceride levels',
        'Continue current diet and lifestyle'
      ],
      normal: [
        'Good triglyceride control',
        'Maintain balanced diet',
        'Regular physical activity'
      ]
    }
  },
  {
    id: 'glucose_fasting',
    name: 'Fasting Glucose',
    category: 'Diabetes Panel',
    unit: 'mg/dL',
    normalRange: [{ min: 70, max: 99 }],
    description: 'Blood sugar level after fasting for 8-12 hours',
    highMeaning: 'May indicate prediabetes or diabetes',
    lowMeaning: 'May indicate hypoglycemia',
    recommendations: {
      high: [
        'Consult doctor for diabetes evaluation',
        'Follow diabetic diet guidelines',
        'Increase physical activity',
        'Monitor blood sugar regularly',
        'Lose weight if overweight'
      ],
      low: [
        'Eat regular, balanced meals',
        'Avoid skipping meals',
        'Include complex carbohydrates',
        'Consult doctor if symptoms persist'
      ],
      normal: [
        'Excellent glucose control',
        'Maintain healthy diet',
        'Continue regular exercise'
      ]
    }
  },
  {
    id: 'hemoglobin_a1c',
    name: 'Hemoglobin A1C',
    category: 'Diabetes Panel',
    unit: '%',
    normalRange: [{ min: 4.0, max: 5.6 }],
    description: 'Average blood sugar over the past 2-3 months',
    highMeaning: 'Indicates poor blood sugar control over time',
    lowMeaning: 'Excellent long-term blood sugar control',
    recommendations: {
      high: [
        'Work with healthcare team for diabetes management',
        'Strict blood sugar monitoring',
        'Medication adjustment may be needed',
        'Diabetes education program',
        'Regular endocrinologist visits'
      ],
      low: [
        'Excellent diabetes control',
        'Continue current management plan'
      ],
      normal: [
        'Good long-term glucose control',
        'Maintain current lifestyle',
        'Annual A1C monitoring'
      ]
    }
  },
  {
    id: 'tsh',
    name: 'TSH (Thyroid Stimulating Hormone)',
    category: 'Thyroid Panel',
    unit: 'mIU/L',
    normalRange: [{ min: 0.4, max: 4.0 }],
    description: 'Hormone that regulates thyroid function',
    highMeaning: 'May indicate underactive thyroid (hypothyroidism)',
    lowMeaning: 'May indicate overactive thyroid (hyperthyroidism)',
    recommendations: {
      high: [
        'Consult endocrinologist for thyroid evaluation',
        'May need thyroid hormone replacement',
        'Monitor symptoms of hypothyroidism',
        'Regular thyroid function monitoring'
      ],
      low: [
        'Consult endocrinologist for evaluation',
        'May need anti-thyroid medication',
        'Monitor symptoms of hyperthyroidism',
        'Avoid iodine supplements'
      ],
      normal: [
        'Normal thyroid function',
        'Annual thyroid screening if at risk',
        'Maintain healthy lifestyle'
      ]
    }
  }
];

export const LabResultsInterpreter: React.FC = () => {
  const [selectedTests, setSelectedTests] = useState<{ [key: string]: string }>({});
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [results, setResults] = useState<LabResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleTestValueChange = (testId: string, value: string) => {
    setSelectedTests({ ...selectedTests, [testId]: value });
  };

  const interpretResults = () => {
    const interpretedResults: LabResult[] = [];

    Object.entries(selectedTests).forEach(([testId, valueStr]) => {
      const value = parseFloat(valueStr);
      if (isNaN(value)) return;

      const test = LAB_TESTS.find(t => t.id === testId);
      if (!test) return;

      // Find appropriate normal range based on gender
      const normalRange = test.normalRange.find(range => 
        !range.gender || range.gender === gender
      ) || test.normalRange[0];

      let status: LabResult['status'];
      let interpretation: string;
      let recommendations: string[];

      // Determine status
      if (value < normalRange.min) {
        // Check for critically low values
        if (value < normalRange.min * 0.5) {
          status = 'critical_low';
          interpretation = `Critically low ${test.name}. ${test.lowMeaning} Immediate medical attention may be required.`;
        } else {
          status = 'low';
          interpretation = `Low ${test.name}. ${test.lowMeaning}`;
        }
        recommendations = test.recommendations.low;
      } else if (value > normalRange.max) {
        // Check for critically high values
        if (value > normalRange.max * 2) {
          status = 'critical_high';
          interpretation = `Critically high ${test.name}. ${test.highMeaning} Immediate medical attention may be required.`;
        } else {
          status = 'high';
          interpretation = `High ${test.name}. ${test.highMeaning}`;
        }
        recommendations = test.recommendations.high;
      } else {
        status = 'normal';
        interpretation = `Normal ${test.name}. This is within the healthy range.`;
        recommendations = test.recommendations.normal;
      }

      interpretedResults.push({
        testId,
        value,
        status,
        interpretation,
        recommendations
      });
    });

    setResults(interpretedResults);
    setShowResults(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'high': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'critical_high':
      case 'critical_low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle size={20} />;
      case 'high':
      case 'low': return <Info size={20} />;
      case 'critical_high':
      case 'critical_low': return <AlertTriangle size={20} />;
      default: return <Info size={20} />;
    }
  };

  const categories = Array.from(new Set(LAB_TESTS.map(test => test.category)));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
          <FileText size={24} className="text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lab Results Interpreter</h2>
          <p className="text-gray-600 dark:text-gray-400">Understand your lab test results and get recommendations</p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender (affects some normal ranges)
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Female</span>
              </label>
            </div>
          </div>

          {/* Lab Tests by Category */}
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {LAB_TESTS.filter(test => test.category === category).map(test => {
                  const normalRange = test.normalRange.find(range => 
                    !range.gender || range.gender === gender
                  ) || test.normalRange[0];

                  return (
                    <div key={test.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">{test.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Normal range: {normalRange.min}-{normalRange.max} {test.unit}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          placeholder={`Enter value (${test.unit})`}
                          value={selectedTests[test.id] || ''}
                          onChange={(e) => handleTestValueChange(test.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white text-sm"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{test.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Interpret Button */}
          <button
            onClick={interpretResults}
            disabled={Object.keys(selectedTests).length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp size={20} />
            Interpret Results ({Object.keys(selectedTests).length} tests)
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Lab Results Interpretation
            </h3>
            <button
              onClick={() => setShowResults(false)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to Input
            </button>
          </div>

          {/* Critical Results Alert */}
          {results.some(r => r.status.includes('critical')) && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/20 dark:border-red-800">
              <div className="flex items-center">
                <AlertTriangle className="text-red-400" size={24} />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                    Critical Results Detected
                  </h3>
                  <p className="text-red-700 dark:text-red-300">
                    Some of your lab results are critically abnormal. Please contact your healthcare provider immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="grid md:grid-cols-4 gap-4">
            {['normal', 'high', 'low', 'critical'].map(status => {
              const count = results.filter(r => 
                status === 'critical' ? r.status.includes('critical') : r.status === status
              ).length;
              
              return (
                <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm capitalize">{status} Results</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Individual Results */}
          <div className="space-y-4">
            {results.map((result, index) => {
              const test = LAB_TESTS.find(t => t.id === result.testId);
              if (!test) return null;

              const normalRange = test.normalRange.find(range => 
                !range.gender || range.gender === gender
              ) || test.normalRange[0];

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-6 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h4 className="text-lg font-bold">{test.name}</h4>
                        <p className="text-sm opacity-75">
                          Your result: {result.value} {test.unit} 
                          (Normal: {normalRange.min}-{normalRange.max} {test.unit})
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-white/50">
                      {result.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm mb-4">{result.interpretation}</p>

                  <div>
                    <h5 className="font-semibold mb-2">Recommendations:</h5>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-current mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* General Recommendations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-4">
              General Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>• Discuss these results with your healthcare provider</li>
              <li>• Follow up on any abnormal results as recommended</li>
              <li>• Keep a record of your lab results for future reference</li>
              <li>• Ask your doctor about the frequency of future testing</li>
              <li>• Implement lifestyle changes as suggested</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Important Medical Disclaimer
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This lab results interpreter is for educational purposes only and should not replace professional medical interpretation. 
              Lab results should always be reviewed by qualified healthcare providers who can consider your complete medical history, 
              symptoms, and other factors. Normal ranges may vary between laboratories. If you have concerning results, 
              contact your healthcare provider immediately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};