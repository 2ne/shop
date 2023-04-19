import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Main from "../components/main";
import Basket, { BasketTotals } from "../components/basket/basket";
import CheckoutSelectParticipants from "../components/checkout/checkout-01-select-participants";
import CheckoutSteps from "../components/checkout/checkout-steps";
import { Button } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import Wrapper from "../components/wrapper";
import { CheckoutButton } from "../components/checkout/checkout-buttons";

function Checkout(): ReactElement {
  const { openBasket, closeBasket, isOpen } = useBasketContext();
  return (
    <>
      <Header />
      <CheckoutTimer timer={25} />
      <Main className="lg:divide-x lg:grid lg:grid-cols-4 max-lg:pb-[11rem]">
        <aside className="lg:pr-5">
          <CheckoutSteps />
        </aside>
        <section className="lg:px-5 lg:col-span-2 lg:text-center">
          <div className="space-y-4 lg:space-y-6 lg:max-w-[22rem] lg:m-auto">
            <CheckoutSelectParticipants />
            <div className="hidden lg:block lg:pt-4">
              <CheckoutButton />
            </div>
          </div>
        </section>
        <aside className="hidden lg:pl-5 lg:block">
          <Basket />
          <div className="pt-5 mt-5 border-t border-neutral-200">
            <BasketTotals />
          </div>
        </aside>
        <footer className="rounded-t-md z-40 lg:hidden fixed bottom-0 left-0 right-0 py-4 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)] bg-white/95 ring-black/10">
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
              <CheckoutButton />
            </div>
          </Wrapper>
        </footer>
      </Main>
    </>
  );
}

export default Checkout;
