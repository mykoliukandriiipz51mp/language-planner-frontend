// src/app/onboarding/wizard/page.tsx
"use client";

import React, { useState } from "react";
import Step1Birthday from "./steps/Step1Birthday";
import Step2NativeLanguage from "./steps/Step2NativeLanguage";
// import Step2Profile from "./steps/Step2Profile";
import Step3SelectLangs from "./steps/Step3SelectLangs";
import Step4LanguageGoals from "./steps/Step4LanguageGoals";
import { ProgressBar } from "@/components/ui/ProgressBar";
import Step5LanguagePriorities from "./steps/Step5LanguagePriorities";
import Step6StudyDays from "./steps/Step6StudyDays";
import Step7DailyTimeBudget from "./steps/Step7DailyBudget";
import Step8LoadingScreen from "./steps/Step9Loading";
import Step9LoadingScreen from "./steps/Step9Loading";
import Step10ScheduleReady from "./steps/Step10ScheduleReady";
// інші кроки...

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] flex flex-col justify-center items-center p-6 md:p-10">
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[620px] flex flex-col">
        {/* Прогрес та Крок */}

        <ProgressBar currentStep={currentStep} totalSteps={7} />

        {/* Перемикання екранів залежно від стану */}
        {currentStep === 1 && (
          <Step1Birthday onNext={nextStep} data={formData} />
        )}
        {currentStep === 2 && (
          <Step2NativeLanguage onNext={nextStep} data={formData} />
        )}
        {currentStep === 3 && (
          <Step3SelectLangs onNext={nextStep} data={formData} />
        )}
        {currentStep === 4 && (
          <Step4LanguageGoals onNext={nextStep} data={formData} />
        )}
        {currentStep === 5 && (
          <Step5LanguagePriorities onNext={nextStep} data={formData} />
        )}
        {currentStep === 6 && (
          <Step6StudyDays onComplete={nextStep} data={formData} />
        )}
        {currentStep === 7 && (
          <Step7DailyTimeBudget onNext={nextStep} data={formData} />
        )}
        {currentStep === 8 && (
          <Step8LoadingScreen onNext={nextStep} data={formData} />
        )}
        {currentStep === 9 && (
          <Step9LoadingScreen onNext={nextStep} data={formData} />
        )}
        {currentStep === 10 && (
          <Step10ScheduleReady onGoToDashboard={nextStep} data={formData} />
        )}
        {/* ... */}
      </div>
    </div>
  );
}
