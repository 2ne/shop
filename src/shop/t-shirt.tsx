import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import { Button, Radio } from "antd";
import { useBasketContext } from "../components/basket/basket-context";

function Tshirt(): ReactElement {
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const breadcrumbItems = [
    { label: "Shop", link: "/Shop" },
    { label: "T Shirt", link: "/Tshirt" },
  ];

  const { openBasket, isOpen, addItem } = useBasketContext();

  const item = {
    id: Math.random().toString(36).substring(2, 15),
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    title: "Basic Tee",
    subTitle: "Black",
    price: "£16.00",
    limtedStock: true,
  };

  const handleBasketClick = () => {
    setBasketIsClicked(true);

    setTimeout(() => {
      setBasketIsClicked(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isOpen) {
      setBasketIsClicked(false);
    }
  }, [isOpen]);

  const addToBasketAndOpen = () => {
    handleBasketClick();
    addItem(item);
    openBasket();
  };

  const basketButtonClasses =
    basketIsClicked && "pointer-events-none !bg-emerald-600";

  const basketButtonText = basketIsClicked ? "Added" : "Add to basket";

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-24 space-y-4 sm:space-y-8 lg:mt-2">
        <div className="grid items-start grid-cols-1 max-lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-x-10">
          <div className="contents lg:block lg:col-[2] lg:row-[1]">
            <div className="max-lg:row-[1] sticky top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 bg-white/95 z-20 -mt-3 mb-6">
              <h2 className="heading-lg">{item.title}</h2>
              <h3 className="sub-heading">{item.subTitle}</h3>
            </div>
            <div className="max-lg:row-[3] space-y-6 sm:space-y-10">
              <section className="space-y-4">
                <p>
                  The Basic tee is an honest new take on a classic. The tee uses
                  super soft, pre-shrunk cotton for true comfort and a
                  dependable fit. They are hand cut and sewn locally, with a
                  special dye technique that gives each tee it's own look.
                </p>
              </section>

              <section className="space-y-4 lg:contents">
                <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-6">
                  <div className="container lg:p-0">
                    <Button
                      size="large"
                      type="primary"
                      block
                      className={`!transition-all !duration-500 ${basketButtonClasses}`}
                      onClick={addToBasketAndOpen}
                    >
                      {basketButtonText}
                    </Button>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                  Details
                </div>
                <dl className="grid grid-cols-4 sm:grid-cols-5 [&>dt]:col-span-1 [&>dt]:truncate [&>dd]:col-span-3 sm:[&>dd]:col-span-4 gap-y-3 sm:gap-y-4 gap-x-2">
                  <dt>Approval</dt>
                  <dd>
                    This purchase requires approval by the organisation prior to
                    the purchase proceeding.
                  </dd>
                </dl>
              </section>
            </div>
          </div>
          <div className="max-lg:row-[2] lg:col-[1] lg:row-[1] grid rounded-md lg:sticky lg:top-6 place-items-center self-start aspect-[3/2] bg-neutral-100 max-lg:mb-6">
            <img
              src={item.image}
              className="rounded-md aspect-[3/2] object-contain h-full w-full"
              loading="lazy"
              alt="Product illustration"
            />
          </div>
        </div>
      </Main>
    </>
  );
}

export default Tshirt;
