import React from "react";

interface Step {
  title: string;
}

interface CheckoutStepsProps {
  currentStep: number;
  furthestStep: number;
  steps: Step[];
  handleStepClick: (stepIndex: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomSteps: React.FC<CheckoutStepsProps> = ({
  currentStep,
  furthestStep,
  steps,
  handleStepClick,
}) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < furthestStep;
          const isClickable = index <= furthestStep;
          const isActiveAndCompleted = isActive && isCompleted;

          return (
            <li
              key={index}
              className={classNames(
                index !== steps.length - 1 ? "pb-8" : "",
                "relative"
              )}
            >
              {isActiveAndCompleted ? (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-interactive"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8">
                      <span className="relative z-10 flex items-center justify-center bg-white border-2 rounded-full w-7 h-7 border-interactive group-hover:border-interactive/80">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-interactive w-7 h-7"
                          aria-hidden="true"
                        >
                          <path
                            d="M7.75 12.75L10 15.25L16.25 8.75"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-interactive">
                        <span
                          className={isClickable ? "group-hover:underline" : ""}
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : isCompleted ? (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-interactive"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8">
                      <span className="relative z-10 flex items-center justify-center rounded-full w-7 h-7 bg-interactive group-hover:bg-interactive/80">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white w-7 h-7"
                          aria-hidden="true"
                        >
                          <path
                            d="M7.75 12.75L10 15.25L16.25 8.75"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium">
                        <span
                          className={isClickable ? "group-hover:underline" : ""}
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : isActive ? (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    aria-current="step"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center bg-white border-2 rounded-full w-7 h-7 border-interactive group-hover:border-interactive/80">
                        <span className="h-2.5 w-2.5 rounded-full bg-interactive" />
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-interactive">
                        <span
                          className={isClickable ? "group-hover:underline" : ""}
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {index !== steps.length - 1 ? (
                    <div
                      className="absolute left-3.5 top-8 rounded-full -ml-px mt-0.5 bottom-0.5 w-0.5 bg-neutral-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    className="relative flex items-start group"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isClickable) {
                        handleStepClick(index);
                      }
                    }}
                  >
                    <span className="flex items-center h-8" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center bg-white border-2 rounded-full w-7 h-7 border-neutral-300 group-hover:border-neutral-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent  group-hover:bg-neutral-300" />
                      </span>
                    </span>
                    <span className="flex items-center h-8 min-w-0 ml-3">
                      <span className="text-sm font-medium text-neutral-500">
                        <span
                          className={isClickable ? "group-hover:underline" : ""}
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CustomSteps;
