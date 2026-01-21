import React, { useState } from 'react';
import { Calculator, AlertTriangle, Heart, Activity, TrendingUp } from 'lucide-react';

interface DiabetesRiskResult {
  score: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  riskPercentage: number;
  recommendations: string[];
  riskFactors: string[];
}

export const DiabetesRiskCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [waistCircumference, setWaistCircumference] = useState<string>('');
  const [physicalActivity, setPhysicalActivity] = useState<string>('daily');
  const [familyHistory, setFamilyHistory] = useState<string>('none');
  const [bloodPressure, setBloodPressure] = useState<string>('normal');
  const [gestationalDiabetes, setGestationalDiabetes] = useState<string>('no');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<DiabetesRiskResult | null>(null);

  const calculateRisk = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const waistNum = parseFloat(waistCircumference);

    if (!ageNum || !weightNum || !heightNum || !waistNum || ageNum <= 0 || weightNum <= 0 || heightNum <= 0 || waistNum <= 0) {
      return;
    }

    let score = 0;
    const riskFactors: string[] = [];

    // Age scoring
    if (ageNum >= 65) {
      score += 4;
      riskFactors.push('Age 65 or older');
    } else if (ageNum >= 45) {
      score += 2;
      riskFactors.push('Age 45-64');
    }

    // BMI calculation and scoring
    let weightKg = weightNum;
    let heightM = heightNum / 100;

    if (unit === 'imperial') {
      weightKg = weightNum * 0.453592;
      heightM = (heightNum * 2.54) / 100;
    }

    const bmi = weightKg / (heightM * heightM);

    if (bmi >= 35) {
      score += 3;
      riskFactors.push('BMI ≥35 (severely obese)');
    } else if (bmi >= 30) {
      score += 2;
      riskFactors.push('BMI 30-34.9 (obese)');
    } else if (bmi >= 25) {
      score += 1;
      riskFactors.push('BMI 25-29.9 (overweight)');
    }

    // Waist circumference scoring
    let waistCm = waistNum;
    if (unit === 'imperial') {
      waistCm = waistNum * 2.54;
    }

    if (gender === 'male') {
      if (waistCm >= 102) {
        score += 2;
        riskFactors.push('Large waist circumference (male ≥102cm/40in)');
      }
    } else {
      if (waistCm >= 88) {
        score += 2;
        riskFactors.push('Large waist circumference (female ≥88cm/35in)');
      }
    }

    // Physical activity scoring
    if (physicalActivity === 'never') {
      score += 2;
      riskFactors.push('No regular physical activity');
    } else if (physicalActivity === 'sometimes') {
      score += 1;
      riskFactors.push('Irregular physical activity');
    }

    // Family history scoring
    if (familyHistory === 'parent') {
      score += 1;
      riskFactors.push('Parent with diabetes');
    } else if (familyHistory === 'sibling') {
      score += 1;
      riskFactors.push('Sibling with diabetes');
    } else if (familyHistory === 'both') {
      score += 2;
      riskFactors.push('Multiple family members with diabetes');
    }

    // Blood pressure scoring
    if (bloodPressure === 'high') {
      score += 1;
      riskFactors.push('High blood pressure');
    } else if (bloodPressure === 'medication') {
      score += 2;
      riskFactors.push('Taking blood pressure medication');
    }

    // Gestational diabetes (for females)
    if (gender === 'female' && gestationalDiabetes === 'yes') {
      score += 1;
      riskFactors.push('History of gestational diabetes');
    }

    // Determine risk level and percentage
    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
    let riskPercentage: number;

    if (score <= 2) {
      riskLevel = 'Low';
      riskPercentage = 5;
    } else if (score <= 4) {
      riskLevel = 'Moderate';
      riskPercentage = 15;
    } else if (score <= 7) {
      riskLevel = 'High';
      riskPercentage = 30;
    } else {
      riskLevel = 'Very High';
      riskPercentage = 50;
    }

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (bmi >= 25) {
      recommendations.push('Maintain a healthy weight through balanced diet and exercise');
    }
    
    if (physicalActivity !== 'daily') {
      recommendations.push('Engage in at least 150 minutes of moderate exercise per week');
    }
    
    if (waistCm >= (gender === 'male' ? 94 : 80)) {
      recommendations.push('Reduce abdominal fat through targeted exercise and diet');
    }
    
    recommendations.push('Follow a balanced diet rich in vegetables, whole grains, and lean proteins');
    recommendations.push('Limit processed foods, sugary drinks, and refined carbohydrates');
    recommendations.push('Get regular health screenings and blood glucose tests');
    
    if (riskLevel === 'High' || riskLevel === 'Very High') {
      recommendations.push('Consult with a healthcare provider for personalized prevention plan');
      recommendations.push('Consider diabetes prevention programs in your area');
    }

    const newResult: DiabetesRiskResult = {
      score,
      riskLevel,
      riskPercentage,
      recommendations,
      riskFactors
    };

    setResult(newResult);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'Moderate': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'High': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Very High': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Diabetes Risk Calculator</h2>
          <p className="text-gray-600 dark:text-gray-400">Assess your risk of developing Type 2 diabetes</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={unit === 'metric'}
                onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Metric (kg, cm)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Imperial (lbs, inches)</span>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Waist Circumference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={waistCircumference}
              onChange={(e) => setWaistCircumference(e.target.value)}
              placeholder={`Enter waist size in ${unit === 'metric' ? 'cm' : 'inches'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Physical Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Physical Activity
            </label>
            <select
              value={physicalActivity}
              onChange={(e) => setPhysicalActivity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="daily">Daily exercise</option>
              <option value="sometimes">Sometimes exercise</option>
              <option value="never">No regular exercise</option>
            </select>
          </div>

          {/* Family History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Family History of Diabetes
            </label>
            <select
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="none">No family history</option>
              <option value="parent">Parent with diabetes</option>
              <option value="sibling">Sibling with diabetes</option>
              <option value="both">Multiple family members</option>
            </select>
          </div>

          {/* Blood Pressure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blood Pressure Status
            </label>
            <select
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="normal">Normal blood pressure</option>
              <option value="high">High blood pressure</option>
              <option value="medication">Taking BP medication</option>
            </select>
          </div>
        </div>

        {/* Gestational Diabetes (for females) */}
        {gender === 'female' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              History of Gestational Diabetes
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  checked={gestationalDiabetes === 'no'}
                  onChange={(e) => setGestationalDiabetes(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">No</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  checked={gestationalDiabetes === 'yes'}
                  onChange={(e) => setGestationalDiabetes(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Yes</span>
              </label>
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculateRisk}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate Diabetes Risk
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className={`rounded-lg p-6 border ${getRiskBgColor(result.riskLevel)}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-red-600" />
                Your Diabetes Risk Assessment
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Risk Score</div>
                  <div className="text-2xl font-bold text-red-600">{result.score} points</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Risk Level</div>
                  <div className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>{result.riskLevel}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Risk</div>
                  <div className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>{result.riskPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            {result.riskFactors.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-orange-600" />
                  Your Risk Factors
                </h4>
                <ul className="space-y-2">
                  {result.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart size={20} className="text-green-600" />
                Prevention Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Disclaimer:</strong> This calculator provides an estimate based on common risk factors. 
                It is not a substitute for professional medical advice. Please consult with a healthcare provider 
                for proper diabetes screening and personalized risk assessment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};