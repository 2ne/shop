import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import Basket from "../components/basket/basket";
import CheckoutSelectParticipants from "../components/checkout/checkout-01-select-participants";
import CheckoutSteps from "../components/checkout/checkout-steps";
import { Button } from "antd";

function Checkout(): ReactElement {
  return (
    <>
      <Header />
      <CheckoutTimer timer={25} />
      <Main className="gap-4 lg:divide-x lg:grid lg:grid-cols-4">
        <aside className="lg:pr-5">
          <CheckoutSteps />
        </aside>
        <section className="lg:px-5 lg:col-span-2 lg:text-center">
          <div className="space-y-4 lg:space-y-6 lg:max-w-xs lg:m-auto">
            <CheckoutSelectParticipants />
            <div className="pt-2">
              <Button type="primary" size="large" block>
                Continue
              </Button>
            </div>
          </div>
        </section>
        <aside className="hidden lg:pl-5 lg:block">
          <Basket />
        </aside>
      </Main>
      <Footer />
    </>
  );
}

export default Checkout;
