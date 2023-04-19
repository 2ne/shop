import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CheckoutSteps from "../components/checkout/checkout-steps";
import Basket from "../components/basket/basket";
function Checkout(): ReactElement {
  return (
    <>
      <Header checkout={true} />
      <CheckoutTimer timer={25} />
      <Main className="gap-4 sm:divide-x sm:grid sm:grid-cols-4">
        <div className="hidden sm:pr-4 sm:block">
          <CheckoutSteps count={1} />
        </div>
        <div className="sm:px-4 sm:col-span-2">2</div>
        <div className="hidden sm:pl-4 sm:block">
          <Basket />
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default Checkout;
