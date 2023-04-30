import React, { useState } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import { orgLogo, orgName } from "../org";
import { useBasketContext } from "./basket/basket-context";
import { useCheckoutContext } from "./checkout/checkout-context";
import { Tooltip, message, Popover, Menu, Button, Modal } from "antd";

export interface HeaderProps {
  loggedIn?: boolean;
  basketCount?: number;
  hideButtons?: boolean;
  name?: string;
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  basketCount,
  hideButtons,
  name = orgName,
  logo = orgLogo,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const { openBasket, itemCount } = useBasketContext();
  const { isCheckout } = useCheckoutContext();
  const [isAccountPopoverVisible, setIsAccountPopoverVisible] = useState(false);
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);

  basketCount = itemCount();

  const handleLogout = () => {
    setIsLoggedIn(false);
    message.success("Successfully signed out");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    message.success("Welcome, James");
  };

  const handleOk = () => {
    setIsMyAccountModalOpen(false);
  };

  const handleCancel = () => {
    setIsMyAccountModalOpen(false);
  };

  const handleVisibleChange = (open: boolean) => {
    setIsAccountPopoverVisible(open);
  };

  const showMyAccountModal = () => {
    setIsAccountPopoverVisible(false);
    setIsMyAccountModalOpen(true);
  };

  const accountMenu = (
    <Menu className="!border-0 -m-2 w-40 [&>li]:!rounded-md [&>li]:!flex [&>li]:!items-center">
      <Menu.Item
        className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800"
        onClick={showMyAccountModal}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mr-2 -ml-2.5 text-center text-neutral-600 w-7"
          >
            <path
              fill="currentColor"
              d="M18.5 12a6.5 6.5 0 01-6.5 6.5V20a8 8 0 008-8h-1.5zM12 18.5A6.5 6.5 0 015.5 12H4a8 8 0 008 8v-1.5zM5.5 12A6.5 6.5 0 0112 5.5V4a8 8 0 00-8 8h1.5zM12 5.5a6.5 6.5 0 016.5 6.5H20a8 8 0 00-8-8v1.5z"
            ></path>
            <path
              fill="currentColor"
              d="M13.5 10a1.5 1.5 0 01-1.5 1.5V13a3 3 0 003-3h-1.5zM12 11.5a1.5 1.5 0 01-1.5-1.5H9a3 3 0 003 3v-1.5zM10.5 10A1.5 1.5 0 0112 8.5V7a3 3 0 00-3 3h1.5zM12 8.5a1.5 1.5 0 011.5 1.5H15a3 3 0 00-3-3v1.5zM6.621 16.52a.75.75 0 101.153.96l-1.153-.96zm9.606.96a.75.75 0 101.152-.96l-1.152.96zm-8.453 0A5.487 5.487 0 0112 15.5V14a6.987 6.987 0 00-5.379 2.52l1.153.96zM12 15.5c1.698 0 3.216.769 4.227 1.98l1.152-.96A6.987 6.987 0 0012 14v1.5z"
            ></path>
          </svg>
          <span className="text-sm font-medium">My account</span>
        </div>
      </Menu.Item>
      <Menu.Item
        onClick={handleLogout}
        className="!text-error hover:!bg-rose-50 hover:!text-error"
      >
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mr-2 -ml-2.5 text-center text-rose-500 w-7"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.75 8.75l3.5 3.25-3.5 3.25M19 12h-8.25M15.25 4.75h-8.5a2 2 0 00-2 2v10.5a2 2 0 002 2h8.5"
            ></path>
          </svg>
          <span className="text-sm font-medium">Sign out</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="relative bg-primary text-primary_text">
        <Wrapper className="flex items-center h-[5.5rem] gap-x-2">
          <Link
            to="/Home"
            className="flex items-center group gap-x-2 sm:gap-x-3"
          >
            <img
              src={logo}
              alt={name + " Logo"}
              className="block max-h-[3.5rem] sm:max-h-[4rem] rounded"
              loading="lazy"
            />
            <h1 className="!text-primary_text heading-xl line-clamp-3 group-hover:underline">
              {name}
            </h1>
          </Link>
          {!hideButtons && (
            <div className="flex items-center gap-6 ml-auto sm:gap-8">
              {!isLoggedIn && !isCheckout && (
                <>
                  <button
                    type="button"
                    className="w-[3.25rem] grid text-center group place-items-center"
                    onClick={handleLogin}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="3.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></circle>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"
                      ></path>
                    </svg>
                    <div className="heading-xs !text-primary_text whitespace-nowrap group-hover:underline">
                      Sign in
                    </div>
                  </button>
                </>
              )}
              {isLoggedIn && !isCheckout && (
                <>
                  <Popover
                    content={accountMenu}
                    trigger="click"
                    open={isAccountPopoverVisible}
                    onOpenChange={handleVisibleChange}
                  >
                    <button
                      type="button"
                      className="w-[3.25rem] grid text-center group place-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-7 h-7"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M18.5 12a6.5 6.5 0 01-6.5 6.5V20a8 8 0 008-8h-1.5zM12 18.5A6.5 6.5 0 015.5 12H4a8 8 0 008 8v-1.5zM5.5 12A6.5 6.5 0 0112 5.5V4a8 8 0 00-8 8h1.5zM12 5.5a6.5 6.5 0 016.5 6.5H20a8 8 0 00-8-8v1.5z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M13.5 10a1.5 1.5 0 01-1.5 1.5V13a3 3 0 003-3h-1.5zM12 11.5a1.5 1.5 0 01-1.5-1.5H9a3 3 0 003 3v-1.5zM10.5 10A1.5 1.5 0 0112 8.5V7a3 3 0 00-3 3h1.5zM12 8.5a1.5 1.5 0 011.5 1.5H15a3 3 0 00-3-3v1.5zM6.621 16.52a.75.75 0 101.153.96l-1.153-.96zm9.606.96a.75.75 0 101.152-.96l-1.152.96zm-8.453 0A5.487 5.487 0 0112 15.5V14a6.987 6.987 0 00-5.379 2.52l1.153.96zM12 15.5c1.698 0 3.216.769 4.227 1.98l1.152-.96A6.987 6.987 0 0012 14v1.5z"
                        ></path>
                      </svg>
                      <div className="heading-xs !text-primary_text whitespace-nowrap group-hover:underline">
                        Account
                      </div>
                    </button>
                  </Popover>
                </>
              )}
              {!isCheckout && (
                <button
                  type="button"
                  className="relative grid text-center group place-items-center"
                  onClick={openBasket}
                >
                  {basketCount && basketCount > 0 ? (
                    <div className="absolute grid min-w-[1rem] h-4 text-[0.65rem] text-center text-white bg-red-500 rounded-full -top-2.5 right-0 place-items-center">
                      <span>{basketCount}</span>
                    </div>
                  ) : null}
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16.5843 17.662L18.25 9.75H5.75L7.41569 17.662C7.61053 18.5875 8.42701 19.25 9.37279 19.25H14.6272C15.573 19.25 16.3895 18.5875 16.5843 17.662Z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8.75 9.5V7.75C8.75 6.09315 10.0931 4.75 11.75 4.75H12.25C13.9069 4.75 15.25 6.09315 15.25 7.75V9.5"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19.25 9.75H4.75"
                    ></path>
                  </svg>
                  <div className="heading-xs !text-primary_text whitespace-nowrap group-hover:underline">
                    Basket
                  </div>
                </button>
              )}
              {isCheckout && (
                <Tooltip
                  trigger="click"
                  title="We use encryption (SSL/TLS) to keep your information safe and partner with trusted payment gateways for secure transactions."
                >
                  <div className="grid text-center cursor-pointer group place-items-center">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7.75 10.5V10.3427C7.75 8.78147 7.65607 7.04125 8.74646 5.9239C9.36829 5.2867 10.3745 4.75 12 4.75C13.6255 4.75 14.6317 5.2867 15.2535 5.9239C16.3439 7.04125 16.25 8.78147 16.25 10.3427V10.5"
                      ></path>
                    </svg>

                    <div className="mt-0.5 heading-xs !text-primary_text sm:!leading-4 group-hover:underline">
                      Secure <br />
                      Checkout
                    </div>
                  </div>
                </Tooltip>
              )}
              <></>
            </div>
          )}
        </Wrapper>
      </header>
      <Modal
        title="My JoinIn Account"
        open={isMyAccountModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={800}
      >
        <div className="grid grid-cols-[14rem,1fr] gap-x-6">
          <aside>
            <Menu className="!border-0 -mx-2 w-full [&>li]:!rounded-md [&>li]:!flex [&>li]:!items-center">
              <Menu.Item className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800">
                <div className="flex items-center">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mr-2 -ml-2.5 text-center text-neutral-600 w-7"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Calendar</span>
                </div>
              </Menu.Item>
              <Menu.Item className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mr-2 -ml-2.5 text-center text-neutral-600 w-7"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Payments</span>
                </div>
              </Menu.Item>
              <Menu.Item className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mr-2 -ml-2.5 pl-0.5 text-center text-neutral-600 w-7"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11.25 7a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16.498 5.403c-.55-.715-1.467-.907-2.156-.253-.688.654-.785 1.748-.244 2.521l2.4 2.579 2.4-2.579c.542-.773.456-1.874-.244-2.52-.701-.648-1.606-.463-2.156.252z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 9.75c-3.4 0-4.25 1.75-4.25 4.5h2v3a2 2 0 002 2h.5a2 2 0 002-2v-3h2c0-2.75-.85-4.5-4.25-4.5z"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Family</span>
                </div>
              </Menu.Item>
              <Menu.Item className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mr-2 -ml-2.5 text-center text-neutral-600 w-7"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19.25 7a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9.25 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM19.25 17a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM14.5 16L9 13.5M14.5 8.5L9 11"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Organisations</span>
                </div>
              </Menu.Item>
              <Menu.Item className="!text-neutral-600 hover:!bg-neutral-10 hover:!text-neutral-800">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mr-2 -ml-2.5 text-center text-neutral-600 w-7"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5.621 14.963l1.101.172c.813.127 1.393.872 1.333 1.71l-.081 1.137a.811.811 0 00.445.787l.814.4c.292.145.641.09.88-.134l.818-.773a1.55 1.55 0 012.138 0l.818.773a.776.776 0 00.88.135l.815-.402a.808.808 0 00.443-.785l-.08-1.138c-.06-.838.52-1.583 1.332-1.71l1.101-.172a.798.798 0 00.651-.62l.201-.9a.816.816 0 00-.324-.847l-.918-.643a1.634 1.634 0 01-.476-2.132l.555-.988a.824.824 0 00-.068-.907l-.563-.723a.78.78 0 00-.85-.269l-1.064.334a1.567 1.567 0 01-1.928-.949l-.407-1.058a.791.791 0 00-.737-.511l-.903.002a.791.791 0 00-.734.516l-.398 1.045a1.566 1.566 0 01-1.93.956l-1.11-.348a.78.78 0 00-.851.27l-.56.724a.823.823 0 00-.062.91l.568.99c.418.73.213 1.666-.469 2.144l-.907.636a.817.817 0 00-.324.847l.2.9c.072.325.33.57.651.62z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13.591 10.409a2.25 2.25 0 11-3.183 3.182 2.25 2.25 0 013.183-3.182z"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </Menu.Item>
            </Menu>
          </aside>
          <div>yo</div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
