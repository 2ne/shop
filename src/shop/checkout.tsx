import { ReactElement } from "react";
import CheckoutTimer from "../components/checkout/checkout-timer";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
function Checkout(): ReactElement {
  return (
    <>
      <Header checkout={true} />
      <CheckoutTimer />
      <Main>YO</Main>
      <Footer />
    </>
  );
}

export default Checkout;
