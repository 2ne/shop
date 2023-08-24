import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import { Button } from "antd";
import { useBasketContext } from "../components/basket/basket-context";
import { InfoCircleFilled } from "@ant-design/icons";
import { BasketItem } from "../types/types";

function Tshirt(): ReactElement {
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const breadcrumbItems = [
    { label: "Shop", link: "/Shop" },
    { label: "T Shirt", link: "/Tshirt" },
  ];

  const { openBasket, isOpen, addItem } = useBasketContext();

  const item: BasketItem = {
    id: Math.random().toString(36).substring(2, 15),
    image:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    title: "Basic Tee",
    subTitle: "Black",
    description:
      "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.",
    price: "£16.00",
    limitedStock: true,
    outOfStock: true,
    link: "#",
    requiresApproval: true,
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
            <div className="max-lg:row-[1] max-lg:sticky max-lg:top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 max-lg:bg-white/95 max-lg:z-20 -mt-3 mb-6 flex">
              <div className="flex-grow">
                <h2
                  className={`heading-lg ${
                    item.outOfStock
                      ? "text-rose-600"
                      : item.limitedStock && !item.outOfStock
                      ? "text-amber-600"
                      : "text-neutral-900"
                  }`}
                >
                  {item.title}
                </h2>
                <h3 className="sub-heading">{item.subTitle}</h3>
              </div>
              <div
                className={`heading-lg ${
                  item.outOfStock
                    ? "text-rose-600"
                    : item.limitedStock && !item.outOfStock
                    ? "text-amber-600"
                    : "text-neutral-900"
                }`}
              >
                {item.price}
              </div>
            </div>
            <div className="max-lg:row-[3] space-y-6 sm:space-y-10">
              {item.description && (
                <section className="space-y-4">
                  <p>{item.description}</p>
                </section>
              )}
              <section className="space-y-4 lg:contents">
                <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-6">
                  <div className="container lg:p-0">
                    <Button
                      disabled={item.outOfStock}
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
              {item.requiresApproval && (
                <section>
                  <p className="text-sm max-lg:border-t max-lg:pt-4 lg:-mt-4 text-neutral-500">
                    <InfoCircleFilled className="mr-2 opacity-75 max-lg:text-xs" />
                    This purchase requires approval by the organisation prior to
                    the purchase proceeding.
                  </p>
                </section>
              )}
            </div>
          </div>
          <div
            className={`max-lg:row-[2] lg:col-[1] lg:row-[1] grid rounded-md lg:sticky lg:top-6 place-items-center self-start aspect-[3/2] bg-neutral-100 max-lg:mb-6 relative ${
              item.outOfStock ? "bg-rose-50" : ""
            }`}
          >
            <img
              src={item.image}
              className={`aspect-[3/2] transition-all mix-blend-multiply object-contain object-center h-full w-full group-hover:scale-[1.025] ${
                item.outOfStock ? " grayscale " : ""
              }`}
            />
            {item.limitedStock && !item.outOfStock && (
              <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-amber-500">
                Limited Stock
              </div>
            )}
            {item.outOfStock && (
              <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-rose-500">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}

export default Tshirt;
