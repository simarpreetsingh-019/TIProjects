import { useState, useEffect } from "react";
import TokenDetailsComponent from "../Components/TokenDetailsComponent";
import ChooseChainComponent from "../Components/ChooseChainComponent";
import ToWBTCComponent from "./toWBTCComponent";
import { Button } from "flowbite-react";
import { useAccount } from "wagmi";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const account = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stepperOptions = [
    {
      label: 1,
      value: "Chain of Deployment",
    },
    {
      label: 2,
      value: "Wrapped Tokens Import",
    },
    {
      label: 3,
      value: "Token Details",
    },
    {
      label: 4,
      value: "Confirmation",
    },
  ];

  const renderStepContent = () => {
    if (!isClient) return null;

    switch (currentStep) {
      case 1:
        return <ChooseChainComponent />;
      case 2:
        return <ToWBTCComponent />;
      case 3:
        return <TokenDetailsComponent />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < stepperOptions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {isClient && (
        <>
          <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            {stepperOptions.map((option, index) => {
              if (option.label === 2 && account.chainId !== 11155111) {
                return null;
              }

              return (
                <li
                  key={index}
                  className={`flex items-center space-x-3 ${
                    currentStep === option.label
                      ? "text-blue-600 dark:text-blue-500 font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 text-lg border rounded-full ${
                      currentStep === option.label
                        ? "border-blue-800 bg-blue-300 dark:border-blue-400 dark:bg-blue-900"
                        : "border-gray-600 bg-gray-300 dark:border-gray-500 dark:bg-gray-700"
                    }`}
                  >
                    {option.label > 2
                      ? account.chainId === 11155111
                        ? option.label
                        : option.label - 1
                      : option.label}
                  </span>

                  <span className="flex-1">{option.value}</span>

                  {option.label !== 4 && (
                    <svg
                      className="w-7 h-7 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m7 9 4-4-4-4M1 9l4-4-4-4"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="step-content">{renderStepContent()}</div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <Button
              // color="purple"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-[#00a3ff] px-8 py-4 font-bold w-48"
            >
              Previous
            </Button>
            <Button
              // color="purple"
              onClick={handleNext}
              disabled={currentStep === stepperOptions.length}
              className="bg-[#00a3ff] px-8 py-4 font-bold w-48"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Stepper;
