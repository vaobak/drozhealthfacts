import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Heart } from 'lucide-react';

interface RiskFactor {
  id: string;
  category: string;
  question: string;
  type: 'boolean' | 'number' | 'select';
  options?: string[];
  weight: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendations: string[];
}

const RISK_FACTORS: RiskFactor[] = [
  // Cardiovascular Risk
  {
    id: 'age',
    category: 'Cardiovascular',
    question: 'What is your age?',
    type: 'number',
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'smoking',
    category: 'Cardiovascular',
    question: 'Do you currently smoke or have you smoked in the past 5 years?',
    type: 'boolean',
    weight: 3,
    riskLevel: 'high'
  },
  {
    id: 'family_heart_disease',
    category: 'Cardiovascular',
    question: 'Do you have a family history of heart disease?',
    type: 'boolean',
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'blood_pressure',
    category: 'Cardiovascular',
    question: 'What is your blood pressure status?',
    type: 'select',
    options: ['Normal (120/80 or lower)', 'Elevated (120-129/80)', 'High Stage 1 (130-139/80-89)', 'High Stage 2 (140/90 or higher)'],
    weight: 3,
    riskLevel: 'high'
  },
  {
    id: 'cholesterol',
    category: 'Cardiovascular',
    question: 'Do you have high cholesterol?',
    type: 'boolean',
    weight: 2,
    riskLevel: 'moderate'
  },
  
  // Diabetes Risk
  {
    id: 'family_diabetes',
    category: 'Diabetes',
    question: 'Do you have a family history of diabetes?',
    type: 'boolean',
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'overweight',
    category: 'Diabetes',
    question: 'Are you overweight (BMI > 25)?',
    type: 'boolean',
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'physical_activity',
    category: 'Diabetes',
    question: 'How often do you exercise?',
    type: 'select',
    options: ['Daily', '3-4 times per week', '1-2 times per week', 'Rarely or never'],
    weight: 2,
    riskLevel: 'moderate'
  },
  
  // Cancer Risk
  {
    id: 'family_cancer',
    category: 'Cancer',
    question: 'Do you have a family history of cancer?',
    type: 'boolean',
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'alcohol_consumption',
    category: 'Cancer',
    question: 'How much alcohol do you consume?',
    type: 'select',
    options: ['None', '1-2 drinks per week', '3-7 drinks per week', 'More than 7 drinks per week'],
    weight: 1,
    riskLevel: 'low'
  },
  {
    id: 'sun_exposure',
    category: 'Cancer',
    question: 'Do you have excessive sun exposure without protection?',
    type: 'boolean',
    weight: 1,
    riskLevel: 'low'
  },
  
  // Mental Health
  {
    id: 'stress_level',
    category: 'Mental Health',
    question: 'How would you rate your stress level?',
    type: 'select',
    options: ['Low', 'Moderate', 'High', 'Very High'],
    weight: 2,
    riskLevel: 'moderate'
  },
  {
    id: 'sleep_quality',
    category: 'Mental Health',
    question: 'How many hours of sleep do you get per night?',
    type: 'select',
    options: ['8+ hours', '7-8 hours', '6-7 hours', 'Less than 6 hours'],
    weight: 1,
    riskLevel: 'low'
  },
  {
    id: 'social_support',
    category: 'Mental Health',
    question: 'Do you have adequate social support?',
    type: 'boolean',
    weight: 1,
    riskLevel: 'low'
  }
];

export const HealthRiskAssessment: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (factorId: string, answer: any) => {
    setAnswers({ ...answers, [factorId]: answer });
  };

  const calculateRisk = () => {
    const categories = Array.from(new Set(RISK_FACTORS.map(f => f.category)));
    const assessmentResults: AssessmentResult[] = [];

    categories.forEach(category => {
      const categoryFactors = RISK_FACTORS.filter(f => f.category === category);
      let score = 0;
      let maxScore = 0;

      categoryFactors.forEach(factor => {
        const answer = answers[factor.id];
        maxScore += factor.weight;

        if (answer !== undefined && answer !== null) {
          let riskScore = 0;

          switch (factor.type) {
            case 'boolean':
              riskScore = answer ? factor.weight : 0;
              break;
            case 'number':
              if (factor.id === 'age') {
                if (answer > 65) riskScore = factor.weight;
                else if (answer > 45) riskScore = factor.weight * 0.7;
                else if (answer > 35) riskScore = factor.weight * 0.3;
              }
              break;
            case 'select':
              const optionIndex = factor.options?.indexOf(answer) || 0;
              const optionCount = factor.options?.length || 1;
              riskScore = (optionIndex / (optionCount - 1)) * factor.weight;
              break;
          }

          score += riskScore;
        }
      });

      const riskPercentage = (score / maxScore) * 100;
      let riskLevel: 'low' | 'moderate' | 'high';
      
      if (riskPercentage < 30) riskLevel = 'low';
      else if (riskPercentage < 60) riskLevel = 'moderate';
      else riskLevel = 'high';

      const recommendations = getRecommendations(category, riskLevel, answers);

      assessmentResults.push({
        category,
        score,
        maxScore,
        riskLevel,
        recommendations
      });
    });

    setResults(assessmentResults);
    setShowResults(true);
  };

  const getRecommendations = (category: string, riskLevel: string, userAnswers: any): string[] => {
    const recommendations: { [key: string]: { [key: string]: string[] } } = {
      'Cardiovascular': {
        'low': [
          'Maintain regular exercise routine',
          'Continue healthy diet with fruits and vegetables',
          'Monitor blood pressure annually',
          'Avoid smoking and limit alcohol'
        ],
        'moderate': [
          'Increase physical activity to 150 minutes per week',
          'Follow a heart-healthy diet (Mediterranean or DASH)',
          'Monitor blood pressure every 6 months',
          'Consider stress management techniques',
          'Discuss with doctor about preventive measures'
        ],
        'high': [
          'Consult cardiologist for comprehensive evaluation',
          'Start supervised exercise program',
          'Follow strict heart-healthy diet',
          'Monitor blood pressure monthly',
          'Consider medication if recommended by doctor',
          'Quit smoking immediately if applicable',
          'Regular cardiac screenings'
        ]
      },
      'Diabetes': {
        'low': [
          'Maintain healthy weight',
          'Continue regular physical activity',
          'Eat balanced diet with limited processed foods',
          'Annual blood sugar screening'
        ],
        'moderate': [
          'Lose weight if overweight (5-10% reduction)',
          'Exercise at least 150 minutes per week',
          'Follow low-glycemic diet',
          'Blood sugar screening every 6 months',
          'Consider pre-diabetes education program'
        ],
        'high': [
          'Consult endocrinologist for evaluation',
          'Structured weight loss program',
          'Daily physical activity monitoring',
          'Strict dietary management',
          'Quarterly blood sugar monitoring',
          'Consider diabetes prevention program',
          'Regular foot and eye exams'
        ]
      },
      'Cancer': {
        'low': [
          'Follow recommended cancer screening schedules',
          'Maintain healthy lifestyle',
          'Limit alcohol consumption',
          'Use sun protection'
        ],
        'moderate': [
          'Discuss enhanced screening with doctor',
          'Consider genetic counseling if family history',
          'Maintain healthy weight',
          'Avoid tobacco and limit alcohol',
          'Regular self-examinations'
        ],
        'high': [
          'Consult oncologist for risk assessment',
          'Enhanced screening protocols',
          'Genetic testing consideration',
          'Lifestyle modification program',
          'Regular specialist consultations',
          'Consider chemoprevention if appropriate'
        ]
      },
      'Mental Health': {
        'low': [
          'Continue stress management practices',
          'Maintain social connections',
          'Regular exercise for mental health',
          'Adequate sleep hygiene'
        ],
        'moderate': [
          'Learn stress reduction techniques',
          'Consider counseling or therapy',
          'Improve sleep quality',
          'Build stronger social support network',
          'Regular mental health check-ins'
        ],
        'high': [
          'Seek professional mental health evaluation',
          'Consider therapy or counseling',
          'Stress management program',
          'Sleep disorder evaluation',
          'Social support group participation',
          'Regular mental health monitoring'
        ]
      }
    };

    return recommendations[category]?.[riskLevel] || [];
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle size={24} />;
      case 'moderate': return <AlertTriangle size={24} />;
      case 'high': return <AlertTriangle size={24} />;
      default: return <Shield size={24} />;
    }
  };

  const currentFactor = RISK_FACTORS[currentStep];
  const progress = ((currentStep + 1) / RISK_FACTORS.length) * 100;

  if (showResults) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Shield size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Risk Assessment Results</h2>
            <p className="text-gray-600 dark:text-gray-400">Your personalized health risk analysis</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Overall Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
              <TrendingUp size={24} />
              Overall Health Risk Profile
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {results.map(result => (
                <div key={result.category} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-2 ${getRiskColor(result.riskLevel)}`}>
                    {getRiskIcon(result.riskLevel)}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{result.category}</h4>
                  <p className={`text-xs font-medium ${result.riskLevel === 'low' ? 'text-green-600' : result.riskLevel === 'moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {result.riskLevel.toUpperCase()} RISK
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.category} className={`rounded-lg p-6 border ${getRiskColor(result.riskLevel)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(result.riskLevel)}
                    <div>
                      <h4 className="text-lg font-bold">{result.category} Risk</h4>
                      <p className="text-sm opacity-75">
                        Risk Score: {Math.round((result.score / result.maxScore) * 100)}%
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">
                    {result.riskLevel.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(result.score / result.maxScore) * 100}%`,
                        backgroundColor: result.riskLevel === 'low' ? '#10B981' : result.riskLevel === 'moderate' ? '#F59E0B' : '#EF4444'
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Recommendations:</h5>
                  <ul className="space-y-1 text-sm">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-current mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Action Items */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
              <Heart size={20} />
              Next Steps
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
              <li>• Schedule regular check-ups with your healthcare provider</li>
              <li>• Discuss these results with your doctor</li>
              <li>• Follow the specific recommendations for each risk category</li>
              <li>• Retake this assessment annually or after lifestyle changes</li>
              <li>• Keep track of your health metrics and improvements</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Important Disclaimer
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This health risk assessment is for educational purposes only and should not replace professional medical advice. 
              The results are estimates based on general risk factors and may not reflect your individual health status. 
              Always consult with qualified healthcare providers for personalized medical guidance.
            </p>
          </div>

          <button
            onClick={() => {
              setShowResults(false);
              setCurrentStep(0);
              setAnswers({});
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <Shield size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Risk Assessment</h2>
          <p className="text-gray-600 dark:text-gray-400">Evaluate your health risks across multiple categories</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentStep + 1} of {RISK_FACTORS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      {currentFactor && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300">
                {currentFactor.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentFactor.question}
            </h3>

            <div className="space-y-3">
              {currentFactor.type === 'boolean' && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer(currentFactor.id, true)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      answers[currentFactor.id] === true
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(currentFactor.id, false)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      answers[currentFactor.id] === false
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                    }`}
                  >
                    No
                  </button>
                </div>
              )}

              {currentFactor.type === 'number' && (
                <input
                  type="number"
                  value={answers[currentFactor.id] || ''}
                  onChange={(e) => handleAnswer(currentFactor.id, parseInt(e.target.value))}
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              )}

              {currentFactor.type === 'select' && currentFactor.options && (
                <div className="space-y-2">
                  {currentFactor.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentFactor.id, option)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        answers[currentFactor.id] === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Previous
            </button>

            {currentStep < RISK_FACTORS.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={answers[currentFactor.id] === undefined}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={calculateRisk}
                disabled={answers[currentFactor.id] === undefined}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
              >
                Get Results
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};