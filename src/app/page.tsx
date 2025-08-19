"use client";

import { useState, useEffect } from "react";
import ProgressIndicator from "@/components/ProgressIndicator";
import InfoSidebar from "@/components/InfoSidebar";
import Step1_Invitation from "@/components/Step1_Invitation";
import Step2_Form from "@/components/Step2_Form";
import Step3_ThankYou from "@/components/Step3_ThankYou";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState({ text: "", show: false });

  // Handle message display and timeout
  useEffect(() => {
    if (message.show) {
      const timer = setTimeout(() => {
        setMessage({ text: "", show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNoClick = () => {
    setMessage({ text: "Qué lástima. ¡Te extrañaremos! 😢", show: true });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_Invitation
            onYes={() => setCurrentStep(2)}
            onNo={handleNoClick}
          />
        );
      case 2:
        return <Step2_Form onSubmit={() => setCurrentStep(3)} />;
      case 3:
        return <Step3_ThankYou />;
      default:
        return (
          <Step1_Invitation
            onYes={() => setCurrentStep(2)}
            onNo={handleNoClick}
          />
        );
    }
  };

  return (
    <>
      <div className="relative w-full h-screen md:grid md:grid-cols-[auto_1fr_auto] md:gap-8 lg:gap-12 px-4 sm:px-8 lg:max-w-7xl mx-auto items-stretch overflow-hidden">
        <ProgressIndicator currentStep={currentStep} />

        {/* Main Content Area */}
        <div className="flex flex-col items-center h-full">
          <div className="z-20 w-full relative min-h-[450px] text-center md:text-left flex flex-col justify-center h-full">
            {renderStep()}

            {/* Step 1 horizontal InfoSidebar */}
            {currentStep === 1 && <InfoSidebar horizontal />}
          </div>
        </div>

        {/* Original desktop sidebar */}
        {currentStep !== 3 && <InfoSidebar />}
      </div>

      {/* Message Box */}
      <div
        className={`fixed top-8 left-1/2 -translate-x-1/2 py-3 px-6 rounded-xl bg-[#04102D] text-white text-base shadow-lg z-50 transition-all duration-300 pointer-events-none ${
          message.show ? "opacity-100 visible top-28" : "opacity-0 invisible"
        }`}
      >
        {message.text}
      </div>
    </>
  );
}
