import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./shop/home";
import AdultChildLessons from "./shop/adult-child-lessons";
import BubbleTheSeahorse from "./shop/bubble-the-seahorse";
import { BasketProvider } from "./components/basket/basket-context";
import BasketLayout from "./components/basket/basket-layout";
import Checkout from "./shop/checkout";
import { CheckoutProvider } from "./components/checkout/checkout-context";
import ClassFinder from "./shop/class-finder";
import CreateAccount from "./shop/create-account";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <CheckoutProvider>
        <BasketProvider>
          <BasketLayout>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route
                path="/AdultChildLessons"
                element={<AdultChildLessons />}
              />
              <Route
                path="/BubbleTheSeahorse"
                element={<BubbleTheSeahorse />}
              />
              <Route path="/Finder" element={<ClassFinder />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BasketLayout>
        </BasketProvider>
      </CheckoutProvider>
    </BrowserRouter>
  );
}

export default App;
