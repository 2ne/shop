import {
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Main from "../components/main";
import Basket, { BasketTotals } from "../components/basket/basket";
import CheckoutSteps from "../components/checkout/checkout-steps";
import { Button } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import Wrapper from "../components/wrapper";
import { CheckoutButton } from "../components/checkout/checkout-buttons";
import CheckoutSelectParticipants, {
  CheckoutSelectParticipantsHandles,
} from "../components/checkout/checkout-01-select-participants";

import CheckoutAdditionalProducts, {
  CheckoutAdditionalProductsHandles,
} from "../components/checkout/checkout-02-additional-products";

function Checkout(): ReactElement {
  const selectParticipantsRef = useRef<CheckoutSelectParticipantsHandles>(null);
  const additionalProductsRef = useRef<CheckoutAdditionalProductsHandles>(null);

  const stepsData = [
    {
      Component: CheckoutSelectParticipants,
      title: "Select participants",
      ref: selectParticipantsRef,
    },
    {
      Component: CheckoutAdditionalProducts,
      title: "Additional products",
      ref: additionalProductsRef,
    },
  ];

  const [activeSteps, setActiveSteps] = useState<number[]>([0, 1]);
  const { openBasket, closeBasket, isOpen } = useBasketContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(currentStep);

  const renderStepComponent = (stepIndex: number) => {
    const { Component, ref } = stepsData[stepIndex];
    return (
      <Component
        key={stepIndex}
        ref={ref}
        onFormValidation={(isValid: boolean) =>
          updateValidationStatus(stepIndex, isValid)
        }
      />
    );
  };

  const [validationStatus, setValidationStatus] = useState<boolean[]>(
    Array(activeSteps.length).fill(false)
  );

  useEffect(() => {
    if (currentStep > furthestStep) {
      setFurthestStep(currentStep);
    }
  }, [currentStep]);

  const updateValidationStatus = (stepIndex: number, isValid: boolean) => {
    setValidationStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[stepIndex] = isValid;
      return newStatus;
    });
  };

  const submitCurrentForm = async () => {
    let result = false;

    const currentStepRef = stepsData[currentStep].ref;

    if (currentStepRef && currentStepRef.current) {
      result = await currentStepRef.current.submitForm();
    }

    if (result) {
      handleNext();
    }
  };

  const handleStepClick = (stepIndex: SetStateAction<number>) => {
    setCurrentStep(stepIndex);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <Header />
      <CheckoutTimer timer={25} />
      <Main className="lg:divide-x lg:grid lg:grid-cols-4 max-lg:pb-[11rem]">
        <aside className="lg:pr-5">
          <div className="lg:sticky lg:top-4">
            <div className="flex items-center justify-between -mt-1.5 lg:hidden h-6 mb-2">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="flex items-center -ml-2 text-sm"
                  onClick={handlePrev}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.25"
                      d="M13.25 8.75L9.75 12l3.5 3.25"
                    ></path>
                  </svg>
                  <div className="-ml-0.5">Back</div>
                </button>
              )}
              <div className="lg:hidden sub-heading">
                Step {currentStep + 1} of {activeSteps.length}
              </div>
            </div>
            <CheckoutSteps
              currentStep={currentStep}
              furthestStep={furthestStep}
              handleStepClick={handleStepClick}
              steps={stepsData.map((step) => ({ title: step.title }))}
            />
          </div>
        </aside>
        <section className="lg:px-5 lg:col-span-2 lg:text-center">
          <div className="lg:max-w-[22rem] lg:m-auto">
            {activeSteps.map((stepIndex, index) => (
              <div
                key={index}
                className={
                  currentStep === index ? "space-y-4 lg:space-y-6" : "hidden"
                }
              >
                {renderStepComponent(stepIndex)}
              </div>
            ))}
            <div className="hidden lg:block lg:pt-4">
              <CheckoutButton onClick={submitCurrentForm} />
            </div>
          </div>
        </section>
        <aside className="hidden lg:pl-5 lg:block">
          <div className="lg:sticky lg:top-4">
            <Basket />
            <div className="pt-5 mt-5 border-t border-neutral-200">
              <BasketTotals />
            </div>
          </div>
        </aside>
        <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 rounded-t-md lg:hidden shadow-t bg-white/95 ring-black/10">
          <Wrapper>
            <Button
              onClick={isOpen ? closeBasket : openBasket}
              shape="circle"
              className="bg-white !rounded-full absolute -top-4 left-1/2 -translate-x-1/2"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className={`transition-all transform relative mx-auto  ${
                  isOpen ? " rotate-180 " : " -top-px "
                }`}
                aria-label="Toggle basket"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.25 14.25L12 10.75l-3.25 3.5"
                ></path>
              </svg>
            </Button>
            <div className="space-y-4">
              <BasketTotals />
              <CheckoutButton onClick={submitCurrentForm} />
            </div>
          </Wrapper>
        </footer>
      </Main>
    </>
  );
}

export default Checkout;
