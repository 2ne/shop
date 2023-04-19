import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CheckoutSteps from "../components/checkout/checkout-steps";
import Basket from "../components/basket/basket";
import CheckoutSelectParticipants from "../components/checkout/checkout-01-select-participants";
function Checkout(): ReactElement {
  return (
    <>
      <Header />
      <CheckoutTimer timer={25} />
      <Main className="gap-4 lg:divide-x lg:grid lg:grid-cols-4">
        <div className="hidden lg:pr-5 lg:block">
          <CheckoutSteps count={1} />
        </div>
        <div className="lg:px-5 lg:col-span-2 lg:text-center">
          <CheckoutSelectParticipants />
        </div>
        <div className="hidden lg:pl-5 lg:block">
          <Basket />
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default Checkout;
