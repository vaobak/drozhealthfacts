import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { ScrollToTop } from './components/ScrollToTop';
import { AskQuestion } from './components/AskQuestion';
import { Home } from './views/Home';
import { Topics } from './views/Topics';
import { Articles } from './views/Articles';
import { ArticleDetail } from './views/ArticleDetail';
import { Category } from './views/Category';
import { About } from './views/About';
import { Contact } from './views/Contact';
import { HealthTools } from './views/HealthTools';
import { BMICalculatorPage } from './views/BMICalculatorPage';
import { BMRCalculatorPage } from './views/BMRCalculatorPage';
import { BloodPressureTrackerPage } from './views/BloodPressureTrackerPage';
import { BodyFatCalculatorPage } from './views/BodyFatCalculatorPage';
import { CaffeineCalculatorPage } from './views/CaffeineCalculatorPage';
import { CalorieCalculatorPage } from './views/CalorieCalculatorPage';
import { DiabetesRiskCalculatorPage } from './views/DiabetesRiskCalculatorPage';
import { HeartRateCalculatorPage } from './views/HeartRateCalculatorPage';
import { HeartRateZonePage } from './views/HeartRateZonePage';
import { IdealWeightCalculatorPage } from './views/IdealWeightCalculatorPage';
import { MacroCalculatorPage } from './views/MacroCalculatorPage';
import { PregnancyDueDateCalculatorPage } from './views/PregnancyDueDateCalculatorPage';
import { ProteinIntakeCalculatorPage } from './views/ProteinIntakeCalculatorPage';
import { SleepCalculatorPage } from './views/SleepCalculatorPage';
import { TDEECalculatorPage } from './views/TDEECalculatorPage';
import { WaterIntakePage } from './views/WaterIntakePage';
import { SymptomCheckerPage } from './views/SymptomCheckerPage';
import { DrugInteractionCheckerPage } from './views/DrugInteractionCheckerPage';
import { CalorieCounterPage } from './views/CalorieCounterPage';
import { WorkoutPlannerPage } from './views/WorkoutPlannerPage';
import { MedicationReminderPage } from './views/MedicationReminderPage';
import { HealthRiskAssessmentPage } from './views/HealthRiskAssessmentPage';
import { LabResultsInterpreterPage } from './views/LabResultsInterpreterPage';
import { OvulationCalculatorPage } from './views/OvulationCalculatorPage';
import { SearchResults } from './views/SearchResults';
import { ArticleRedirect } from './components/ArticleRedirect';
import { AffiliateRedirect } from './components/AffiliateRedirect';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
        <SEO />
        <ScrollToTop />
        <Header />
        
        <div className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Health Topics */}
            <Route path="/health-topics" element={<Topics />} />
            
            {/* All Articles */}
            <Route path="/articles" element={<Articles />} />
            
            {/* Search Results */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* Category - Dynamic route */}
            <Route path="/category/:slug" element={<Category />} />
            
            {/* Health Tools - Main Hub Page */}
            <Route path="/health-tools" element={<HealthTools />} />
            
            {/* Health Tools - Individual Pages (Flat Structure for SEO) */}
            <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
            <Route path="/bmr-calculator" element={<BMRCalculatorPage />} />
            <Route path="/blood-pressure-tracker" element={<BloodPressureTrackerPage />} />
            <Route path="/body-fat-calculator" element={<BodyFatCalculatorPage />} />
            <Route path="/caffeine-calculator" element={<CaffeineCalculatorPage />} />
            <Route path="/calorie-calculator" element={<CalorieCalculatorPage />} />
            <Route path="/calorie-counter" element={<CalorieCounterPage />} />
            <Route path="/diabetes-risk-calculator" element={<DiabetesRiskCalculatorPage />} />
            <Route path="/drug-interaction-checker" element={<DrugInteractionCheckerPage />} />
            <Route path="/health-risk-assessment" element={<HealthRiskAssessmentPage />} />
            <Route path="/heart-rate-calculator" element={<HeartRateCalculatorPage />} />
            <Route path="/heart-rate-zone-calculator" element={<HeartRateZonePage />} />
            <Route path="/ideal-weight-calculator" element={<IdealWeightCalculatorPage />} />
            <Route path="/lab-results-interpreter" element={<LabResultsInterpreterPage />} />
            <Route path="/ovulation-calculator" element={<OvulationCalculatorPage />} />
            <Route path="/macro-calculator" element={<MacroCalculatorPage />} />
            <Route path="/medication-reminder" element={<MedicationReminderPage />} />
            <Route path="/pregnancy-due-date-calculator" element={<PregnancyDueDateCalculatorPage />} />
            <Route path="/protein-intake-calculator" element={<ProteinIntakeCalculatorPage />} />
            <Route path="/sleep-calculator" element={<SleepCalculatorPage />} />
            <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="/tdee-calculator" element={<TDEECalculatorPage />} />
            <Route path="/water-intake-calculator" element={<WaterIntakePage />} />
            <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
            
            {/* About Us */}
            <Route path="/about" element={<About />} />
            
            {/* Contact */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Affiliate Dashboard - Protected Route */}
            <Route path="/affiliate" element={<AdminDashboard />} />
            <Route path="/affiliate/dashboard" element={<AdminDashboard />} />
            
            {/* Article Detail - Flat Structure for SEO (Must be after all static routes) */}
            <Route path="/:slug" element={<ArticleDetail />} />
            
            {/* Legacy redirect - Old /article/:slug to /:slug */}
            <Route path="/article/:slug" element={<ArticleRedirect />} />
          </Routes>
        </div>

        <Footer />
        <AskQuestion />
      </div>
    </Router>
  );
}

export default App;
