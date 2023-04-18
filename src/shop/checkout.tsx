import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CheckoutSteps from "../components/checkout/checkout-steps";
function Checkout(): ReactElement {
  return (
    <>
      <Header checkout={true} />
      <CheckoutTimer timer={25} />
      <Main className="grid sm:grid-cols-4 sm:[&>*]:px-4">
        <div className="hidden sm:border-r sm:block">
          <CheckoutSteps step={1} />
        </div>
        <div className="col-span-2">2</div>
        <div className="hidden sm:border-l sm:block">3</div>
      </Main>
      <Footer />
    </>
  );
}

export default Checkout;
