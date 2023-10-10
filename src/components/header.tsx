import React, { useState } from "react";
import Wrapper from "./wrapper";
import { Link } from "react-router-dom";
import { orgLogo, orgName } from "../org";
import { useBasketContext } from "./basket/basket-context";
import { useCheckoutContext } from "./checkout/checkout-context";
import { Tooltip, message, Drawer, Button, Dropdown, MenuProps } from "antd";
import AccountModal from "./account/account-modal";
import SignInModal from "./sign-in";
import { DownOutlined } from "@ant-design/icons";

export interface HeaderProps {
  loggedIn?: boolean;
  basketCount?: number;
  hideButtons?: boolean;
  paymentsDue?: boolean;
  name?: string;
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  basketCount,
  hideButtons,
  paymentsDue,
  name = orgName,
  logo = orgLogo,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const { openBasket, itemCount } = useBasketContext();
  const { isCheckout } = useCheckoutContext();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState(String);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sessionsMenu, setSessionsMenu] = useState(false);
  const [locationMenu1, setLocationMenu1] = useState(false);
  const [locationMenu2, setLocationMenu2] = useState(false);

  basketCount = itemCount();

  const toggleSessionsMenu = () => {
    setSessionsMenu((sessionsMenu) => !sessionsMenu);
  };

  const toggleLocationMenu1 = () => {
    setLocationMenu1((locationMenu1) => !locationMenu1);
  };

  const toggleLocationMenu2 = () => {
    setLocationMenu2((locationMenu2) => !locationMenu2);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const openNav = () => {
    setIsNavOpen(true);
  };

  const navClose = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    message.success("Signed out");
  };

  const handleLogin = () => {
    showModal();
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    message.success("Welcome, James!");
  };

  const handleLoginDrawer = () => {
    handleLogin();
    navClose();
  };

  const handleLogoutDrawer = () => {
    handleLogout();
    navClose();
  };

  const showMyAccountModal = () => {
    setIsAccountModalOpen(true);
  };

  const handleOk = () => {
    setIsAccountModalOpen(false);
  };

  const handleCancel = () => {
    setIsAccountModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <>Little Thetford</>,
      children: [
        {
          key: "1-1",
          label: <Link to="/AdultChildLessons">Adult and Child Lessons</Link>,
        },
        {
          key: "1-2",
          label: (
            <Link to="/AdultChildLessons">Independent Children's Lessons</Link>
          ),
        },
        {
          key: "1-3",
          label: <Link to="/AdultChildLessons">Adult Lessons</Link>,
        },
        {
          key: "1-4",
          label: <Link to="/AdultChildLessons">Private Lessons</Link>,
        },
        {
          type: "divider",
        },
        {
          key: "1-5",
          label: <Link to="/Timetable">View All</Link>,
        },
      ],
    },
    {
      key: "2",
      label: <>Newmarket</>,
      children: [
        {
          key: "2-1",
          label: <Link to="/AdultChildLessons">Adult and Child Lessons</Link>,
        },
        {
          key: "2-2",
          label: (
            <Link to="/AdultChildLessons">Independent Children's Lessons</Link>
          ),
        },
        {
          key: "2-3",
          label: <Link to="/AdultChildLessons">Adult Lessons</Link>,
        },
        {
          key: "2-4",
          label: <Link to="/AdultChildLessons">Private Lessons</Link>,
        },
        {
          type: "divider",
        },
        {
          key: "2-5",
          label: <Link to="/Timetable">View All</Link>,
        },
      ],
    },
  ];

  const navLinks = [
    {
      label: (
        <Dropdown
          overlayClassName="!min-w-[10rem] !top-[64px]"
          menu={{ items }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          <button
            onClick={(e) => e.preventDefault()}
            className="py-1.5 px-2.5 -my-1.5 -mx-2.5"
          >
            Timetable
            <DownOutlined className="ml-1.5 text-xs opacity-75" />
          </button>
        </Dropdown>
      ),
      to: "",
    },
    // { label: "Memberships", to: "/Memberships" },
    // { label: "Events", to: "/Events" },
    { label: "Shop", to: "/Shop" },
    { label: "Class Finder", to: "/Finder" },
    { label: "Contact", to: "/Contact" },
  ];

  const navMobileLinks = [
    {
      label: (
        <>
          <a
            className="block text-neutral-800 hover:text-interactive"
            onClick={toggleSessionsMenu}
          >
            <span>Timetable</span>
            <DownOutlined
              className={`ml-1.5 text-xs opacity-50 ${
                sessionsMenu ? "" : "-rotate-90"
              }`}
            />
          </a>
          {sessionsMenu && (
            <ul className="mt-2 mb-3 ml-3 space-y-2">
              <li>
                <a
                  className="block text-neutral-800 hover:text-interactive"
                  onClick={toggleLocationMenu1}
                >
                  <span>Little Telford</span>
                  <DownOutlined
                    className={`ml-1.5 text-xs opacity-50 ${
                      locationMenu1 ? "" : "-rotate-90"
                    }`}
                  />
                </a>
                {locationMenu1 && (
                  <ul className="mt-2 mb-3 ml-3 space-y-2">
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Adult and Child Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Independent Children's Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Adult Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Private Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/Timetable"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        View all
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  className="block text-neutral-800 hover:text-interactive"
                  onClick={toggleLocationMenu2}
                >
                  <span>Newmarket</span>
                  <DownOutlined
                    className={`ml-1.5 text-xs opacity-50 ${
                      locationMenu2 ? "" : "-rotate-90"
                    }`}
                  />
                </a>
                {locationMenu2 && (
                  <ul className="mt-2 mb-3 ml-3 space-y-2">
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Adult and Child Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Independent Children's Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Adult Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/AdultChildLessons"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        Private Lessons
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={navClose}
                        to="/Timetable"
                        className="block text-neutral-800 hover:text-interactive"
                      >
                        View all
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </>
      ),
      to: "",
    },

    {
      label: (
        <Link
          onClick={navClose}
          to="/Shop"
          className="block text-neutral-800 hover:text-interactive"
        >
          Shop
        </Link>
      ),
      to: "",
    },
    {
      label: (
        <Link
          onClick={navClose}
          to="/Finder"
          className="block text-neutral-800 hover:text-interactive"
        >
          Class Finder
        </Link>
      ),
      to: "",
    },
    {
      label: (
        <Link
          onClick={navClose}
          to="/Contact"
          className="block text-neutral-800 hover:text-interactive"
        >
          Contact
        </Link>
      ),
      to: "",
    },
  ];

  const accountLinks = [
    {
      label: "Calendar",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-75"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
          ></path>
        </svg>
      ),
      onclick: () => {
        setSelectedMenuKey("calendar");
        showMyAccountModal();
      },
    },
    {
      label: "Payments",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-75"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
          ></path>
        </svg>
      ),
      onclick: () => {
        setSelectedMenuKey("payments");
        showMyAccountModal();
      },
    },
    {
      label: "Memberships",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-75"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.25 6.75a2 2 0 00-2-2H5.75v14.5h10.5a2 2 0 002-2V6.75z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M14.25 10a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9.75 15.25h4.5"
          ></path>
        </svg>
      ),
      onclick: () => {
        setSelectedMenuKey("memberships");
        showMyAccountModal();
      },
    },
    {
      label: "Family",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-75"
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
      ),
      onclick: () => {
        setSelectedMenuKey("family");
        showMyAccountModal();
      },
    },
    {
      label: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="opacity-60 group-hover:opacity-75"
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
      ),
      onclick: () => {
        setSelectedMenuKey("settings");
        showMyAccountModal();
      },
    },
  ];

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
              className="block !w-auto max-h-[3.5rem] max-w-[5rem] sm:max-h-[4rem] sm:max-w-[6rem] rounded"
              loading="lazy"
            />
            <h1 className="!text-primary_text heading-xl line-clamp-3">
              {name}
            </h1>
          </Link>
          {!hideButtons && !isCheckout && (
            <nav className="hidden lg:block">
              <ul className="flex ml-6 xl:ml-8 gap-x-0.5 xl:gap-x-2">
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="heading-xs !text-primary_text whitespace-nowrap rounded-md py-1.5 px-2.5 hover:bg-white/95   font-medium transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {!hideButtons && (
            <div className="flex items-center gap-2 ml-auto sm:gap-3 lg:gap-2">
              {!isCheckout && isLoggedIn && paymentsDue && (
                <button
                  type="button"
                  className="relative grid px-2 py-1.5 text-center transition-colors rounded-md lg:px-2 lg:py-1.5 group place-items-center hover:bg-white/95"
                >
                  <div className="absolute grid min-w-[1rem] h-4 text-[0.65rem] text-center text-white bg-red-500 rounded-full -top-0.5 -right-0.5 lg:top-1 lg:right-1.5 place-items-center">
                    <span>1</span>
                  </div>
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
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
                    ></path>
                  </svg>
                  <div className="heading-xs !text-primary_text whitespace-nowrap hidden lg:block">
                    Payments
                  </div>
                </button>
              )}
              {!isCheckout && (
                <button
                  type="button"
                  className="relative grid px-2 py-1.5 text-center transition-colors rounded-md lg:px-3 lg:py-1.5 group place-items-center hover:bg-white/95  "
                  onClick={openBasket}
                >
                  {basketCount && basketCount > 0 ? (
                    <div className="absolute grid min-w-[1rem] h-4 text-[0.65rem] text-center text-white bg-red-500 rounded-full -top-0.5 -right-0.5 lg:top-1 lg:right-1.5 place-items-center">
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
                  <div className="heading-xs !text-primary_text whitespace-nowrap hidden lg:block">
                    Basket
                  </div>
                </button>
              )}
              {!isLoggedIn && !isCheckout && (
                <>
                  <button
                    type="button"
                    className="relative hidden lg:grid px-2 py-1.5 text-center transition-colors rounded-md lg:px-3 lg:py-1.5 group place-items-center hover:bg-white/95  "
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
                    <div className="heading-xs !text-primary_text whitespace-nowrap hidden lg:block">
                      Sign in
                    </div>
                  </button>
                </>
              )}
              {isLoggedIn && !isCheckout && (
                <>
                  <button
                    onClick={() => {
                      setSelectedMenuKey("calendar");
                      showMyAccountModal();
                    }}
                    type="button"
                    className="relative hidden lg:grid px-2 py-1.5 text-center transition-colors rounded-md lg:px-3 lg:py-1.5 group place-items-center hover:bg-white/95  "
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
                    <div className="heading-xs !text-primary_text whitespace-nowrap hidden lg:block">
                      Account
                    </div>
                  </button>
                </>
              )}
              {!isCheckout && (
                <button
                  onClick={openNav}
                  type="button"
                  className="relative grid px-2 py-1.5 text-center transition-colors rounded-md lg:hidden lg:px-3 lg:py-1.5 group place-items-center hover:bg-white/95  "
                >
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
                      d="M4.75 5.75h14.5M4.75 18.25h14.5M4.75 12h14.5"
                    ></path>
                  </svg>
                  <div className="heading-xs !text-primary_text whitespace-nowrap hidden lg:block">
                    Account
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

                    <div className="mt-0.5 heading-xs !text-primary_text sm:!leading-4 ">
                      Secure <br />
                      Checkout
                    </div>
                  </div>
                </Tooltip>
              )}
            </div>
          )}
        </Wrapper>
      </header>
      <Drawer
        title={
          <Link className="flex items-center gap-2.5" to="/home">
            <img
              src={logo}
              alt={name + " Logo"}
              className="block max-h-[2.25rem] rounded"
              loading="lazy"
            />
            <div className="!text-primary_text font-medium truncate">
              {name}
            </div>
          </Link>
        }
        placement="right"
        onClose={navClose}
        open={isNavOpen}
        rootClassName={
          "[&>.ant-drawer-content-wrapper]:max-w-full [&>.ant-drawer-content-wrapper]:!w-full sm:[&>.ant-drawer-content-wrapper]:!w-[360px] [&_.ant-drawer-header]:border-0"
        }
      >
        <div className="[&>*]:mb-6 -mt-1">
          <div>
            <ul className="space-y-2">
              {navMobileLinks.map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
            </ul>
          </div>
          {isLoggedIn && (
            <>
              <div>
                <div className="mb-1.5 text-sm font-medium text-neutral-500">
                  My account
                </div>
                <ul>
                  {accountLinks.map((item, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={item.onclick}
                        className="flex items-center gap-2 py-1 text-sm transition group"
                      >
                        <i className="group-hover:text-interactive">
                          {item.icon}
                        </i>
                        <span className="group-hover:text-interactive">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-1.5 text-sm font-medium text-neutral-500">
                  Switch organisation
                </div>
                <ul className="">
                  <li>
                    <Link
                      to="/"
                      className="block py-1 text-sm font-medium transition text-interactive"
                    >
                      CG Swim School
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-1 text-sm transition">
                      Organisation 2
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        {isLoggedIn && (
          <div className="mt-7">
            <Button block size="large" onClick={handleLogoutDrawer}>
              Sign out
            </Button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="sticky pb-6 mt-auto -bottom-8 bg-white/95">
            <div className="mt-6">
              <Button
                block
                size="large"
                type="primary"
                onClick={handleLoginDrawer}
              >
                Sign in
              </Button>
            </div>
          </div>
        )}
      </Drawer>
      <AccountModal
        isOpen={isAccountModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedMenuKey={selectedMenuKey}
        setSelectedMenuKey={setSelectedMenuKey}
      />
      <SignInModal
        isOpen={isModalOpen}
        onClose={hideModal}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
    </>
  );
};

export default Header;
