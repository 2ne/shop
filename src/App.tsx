import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./shop/home";
import AdultChildLessons from "./shop/adult-child-lessons";
import BubbleTheSeahorse from "./shop/bubble-the-seahorse";
import { BasketProvider } from "./components/basket/basket-context";
import BasketLayout from "./components/basket/basket-layout";
import Checkout from "./shop/checkout";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <BasketProvider>
        <BasketLayout>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/AdultChildLessons" element={<AdultChildLessons />} />
            <Route path="/BubbleTheSeahorse" element={<BubbleTheSeahorse />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BasketLayout>
      </BasketProvider>
    </BrowserRouter>
  );
}

export default App;
