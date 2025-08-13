"use client";

export default function ProgressIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  const getStepClass = (step: number) => {
    let classes =
      "w-8 h-8 flex items-center justify-center border-2 rounded-full text-base font-medium transition-all duration-500 ";
    if (step < currentStep) {
      classes += "bg-transparent border-white text-white"; // Past
    } else if (step === currentStep) {
      classes += "bg-white text-gray-800 border-white"; // Active
    } else {
      classes +=
        "bg-gray-500/20 border-transparent text-white/70 backdrop-blur-sm"; // Inactive
    }
    return classes;
  };

  return (
    <div className="hidden md:flex flex-col justify-center items-center h-full">
      <div className="flex flex-col gap-[140px] z-20">
        {[1, 2, 3].map((step) => (
          <div key={step} className={getStepClass(step)}>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
