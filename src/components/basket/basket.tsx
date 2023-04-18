import { Button, Drawer, Tooltip } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useBasketContext } from "./basket-context";

const Basket: React.FC = () => {
  const { isOpen, closeBasket, items, removeItem } = useBasketContext();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const drawerPlacement = isMobile ? "bottom" : "right";

  return (
    <Drawer
      title={
        items.length === 0
          ? "Basket"
          : `Basket · ${items.length} item${items.length > 1 ? "s" : ""}`
      }
      placement={drawerPlacement}
      onClose={closeBasket}
      open={isOpen}
    >
      <div className="divide-y">
        {items.length === 0 ? (
          <div className="grid h-64 gap-4 text-center place-items-center text-neutral-400">
            <div className="grid gap-2 place-items-center">
              <div>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-12 h-12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.25"
                    d="M16.5843 17.662L18.25 9.75H5.75L7.41569 17.662C7.61053 18.5875 8.42701 19.25 9.37279 19.25H14.6272C15.573 19.25 16.3895 18.5875 16.5843 17.662Z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.25"
                    d="M8.75 9.5V7.75C8.75 6.09315 10.0931 4.75 11.75 4.75H12.25C13.9069 4.75 15.25 6.09315 15.25 7.75V9.5"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.25"
                    d="M19.25 9.75H4.75"
                  ></path>
                </svg>
              </div>
              <div className="text-base font-medium">Your basket is empty.</div>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="grid gap-4 py-6 first-of-type:pt-0">
              <div className="flex gap-3.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-20 rounded aspect-square"
                />
                <div className="grid flex-1 min-w-0 text-sm">
                  <div className="font-medium">{item.title}</div>
                  <div className="-mt-1 font-medium text-neutral-500">
                    {item.subTitle}
                  </div>
                  <div className="mt-auto mb-0.5">
                    <Tooltip title="Remove item" placement="right">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="grid transition-colors rounded-full w-7 h-7 place-items-center bg-neutral-100 hover:bg-neutral-200"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-px"
                        >
                          <path
                            d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.75 10.75V16.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M13.25 10.75V16.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.75 7.75H18.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <dl className="grid grid-cols-[5rem,1fr] [&>dt]:truncate gap-y-2.5 gap-x-3.5 text-sm tracking-normal">
                <dt>Dates</dt>
                <dd>
                  {item.dates} ·{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
                <dt>Price</dt>
                <dd>
                  {item.price}
                  <span className="text-neutral-500"> · per session</span>
                </dd>
                <dt>Cost</dt>
                <dd>
                  {item.cost}
                  <span className="text-neutral-500"> · per month</span>
                </dd>
              </dl>
            </div>
          ))
        )}
      </div>
      <div className="sticky z-10 px-4 py-4 mt-auto -mx-4 -mb-4 sm:px-5 sm:py-5 sm:-mx-5 -bottom-4 bg-white/95">
        {items.length !== 0 ? (
          <Button size="large" type="primary" block className="!h-10 lg:!h-12">
            <div className="text-sm sm:text-base">Checkout</div>
          </Button>
        ) : (
          <Button
            size="large"
            block
            className="!h-10 lg:!h-12"
            onClick={closeBasket}
          >
            <div className="text-sm sm:text-base">Continue shopping</div>
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default Basket;
